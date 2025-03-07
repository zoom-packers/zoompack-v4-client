from PIL import Image, ImageEnhance, ImageOps, ImageChops
from PIL.Image import Resampling
import colorsys

def rgb_to_hsv(r, g, b):
    max_val = max(r, g, b)
    min_val = min(r, g, b)
    delta = max_val - min_val

    h = 0.0
    if delta != 0:
        if max_val == r:
            h = (g - b) / delta
            if g < b:
                h += 6
        elif max_val == g:
            h = (b - r) / delta + 2
        else:
            h = (r - g) / delta + 4
        h /= 6

    s = delta / max_val if max_val != 0 else 0.0
    v = max_val / 255.0

    return (h, s, v)

def hsv_to_rgb(h, s, v):
    if s == 0.0:
        r = g = b = int(v * 255)
    else:
        h *= 6
        i = int(h)
        f = h - i
        p = v * (1 - s)
        q = v * (1 - s * f)
        t = v * (1 - s * (1 - f))

        i %= 6
        if i == 0:
            r, g, b = v, t, p
        elif i == 1:
            r, g, b = q, v, p
        elif i == 2:
            r, g, b = p, v, t
        elif i == 3:
            r, g, b = p, q, v
        elif i == 4:
            r, g, b = t, p, v
        else:
            r, g, b = v, p, q

        r = int(r * 255)
        g = int(g * 255)
        b = int(b * 255)

    return (r, g, b)

class WorkingTexture:
    def __init__(self):
        self.path = ""
        self.tint = (0, 0, 0)
        self.hue = 0.0  # in degrees
        self.brightness = 1.0
        self.width = 0
        self.height = 0
        self.chroma_key_operations = []

    def with_path(self, path: str):
        self.path = path
        return self

    def scale(self, width: int, height: int):
        self.width = width
        self.height = height
        return self

    def with_tint(self, rgb: dict):
        r = rgb.get('r', 0)
        g = rgb.get('g', 0)
        b = rgb.get('b', 0)

        h, s, v = rgb_to_hsv(r, g, b)
        self.brightness = v

        max_val = max(r, g, b)
        if max_val == 0:
            normalized_r, normalized_g, normalized_b = 0, 0, 0
        else:
            scale = 255.0 / max_val
            normalized_r = int(r * scale)
            normalized_g = int(g * scale)
            normalized_b = int(b * scale)

        self.tint = (normalized_r, normalized_g, normalized_b)
        return self

    def with_hue(self, hue: float):
        self.hue = hue
        return self

    def with_brightness(self, brightness: float):
        self.brightness = brightness
        return self

    def with_chroma_key(self, operation):
        self.chroma_key_operations.append(operation)
        return self

    def with_chroma_keys(self, operations):
        self.chroma_key_operations.extend(operations)
        return self

    def adapt_hue_for_chroma_keying(self, h: float):
        offset = 0.0
        if h > 0.66:
            offset = 0.33
        elif h < 0.33:
            offset = -0.33
        return offset

    def apply_chroma_key(self, img: Image.Image, op):
        color_to_replace = op['colorToReplace']
        replace_with = op['replaceWith']
        tolerance = op['tolerance']

        old_rgb = self.hex_to_rgb(color_to_replace)
        old_h, old_s, old_v = rgb_to_hsv(*old_rgb)

        h_offset = self.adapt_hue_for_chroma_keying(old_h)
        old_h += h_offset
        old_h = old_h % 1.0

        new_rgb = self.hex_to_rgb(replace_with)
        new_h, new_s, new_v = rgb_to_hsv(*new_rgb)

        img = img.convert('RGBA')
        pixels = img.load()
        width, height = img.size

        for y in range(height):
            for x in range(width):
                r, g, b, a = pixels[x, y]
                pixel_h, pixel_s, pixel_v = rgb_to_hsv(r, g, b)
                pixel_h += h_offset
                pixel_h %= 1.0

                h_diff = abs(pixel_h - old_h)
                s_diff = abs(pixel_s - old_s)
                v_diff = abs(pixel_v - old_v)

                if h_diff <= tolerance:
                    new_r, new_g, new_b = hsv_to_rgb(new_h, pixel_s, pixel_v)
                    new_a = a
                else:
                    new_r, new_g, new_b = r, g, b
                    new_a = 0

                pixels[x, y] = (new_r, new_g, new_b, new_a)

        return img

    def tint_image_chroma(self, img: Image.Image, color: str):
        tint_color = self.hex_to_rgb(color)
        tinted = Image.new('RGB', img.size, tint_color)
        tinted = tinted.convert('RGBA')
        return ImageChops.multiply(img, tinted)

    def process(self):
        if not self.path:
            raise ValueError("Path is not set")

        original_img = Image.open(self.path).convert('RGBA')
        buffer = original_img.copy()

        for op in self.chroma_key_operations:
            chroma_img = self.apply_chroma_key(original_img.copy(), op)
            chroma_tinted = self.tint_image_chroma(chroma_img, op['replaceWith'])
            chroma_tinted = chroma_img

            if 'brightness' in op and op['brightness'] != 0:
                enhancer = ImageEnhance.Brightness(chroma_tinted)
                chroma_tinted = enhancer.enhance(op['brightness'] + 1.0)

            buffer = Image.alpha_composite(buffer, chroma_tinted)

        if self.tint != (0, 0, 0):
            gray = ImageOps.grayscale(buffer)
            tinted = ImageOps.colorize(gray, (0, 0, 0), self.tint).convert('RGBA')
            tinted.putalpha(buffer.getchannel('A'))
            buffer = tinted

        if self.hue != 0:
            buffer = buffer.convert('RGBA')
            pixels = buffer.load()
            width, height = buffer.size
            for y in range(height):
                for x in range(width):
                    r, g, b, a = pixels[x, y]
                    h, s, v = rgb_to_hsv(r, g, b)
                    h += self.hue / 360.0
                    h %= 1.0
                    r_new, g_new, b_new = hsv_to_rgb(h, s, v)
                    pixels[x, y] = (r_new, g_new, b_new, a)

        if self.brightness != 0.0:
            enhancer = ImageEnhance.Brightness(buffer)
            buffer = enhancer.enhance(self.brightness + 1.0)

        if self.width > 0 and self.height > 0:
            buffer = buffer.resize((self.width, self.height), Resampling.NEAREST)

        return buffer

    def save_to_disk(self, file_path: str):
        img = self.process()
        img.save(file_path, format='PNG')

    @staticmethod
    def hex_to_rgb(hex_color: str):
        hex_color = hex_color.lstrip('#')
        return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

    @staticmethod
    def rgb_to_hex(rgb: tuple):
        return '#{:02x}{:02x}{:02x}'.format(*rgb)
