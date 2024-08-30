const fs = require('fs');
const sharp = require('sharp');

/**
 * @typedef {Object} WorkingTexture
 * A class that represents a texture that is being worked on.
 */
class WorkingTexture {
    path = "";
    tint = {r: 0, g: 0, b: 0};
    hue = 0;
    brightness = 0;
    width = 0;
    height = 0;

    withPath(path) {
        this.path = path;
        return this;
    }

    scale(width, height) {
        this.width = width;
        this.height = height;
        return this;
    }

    withTint(hex) {
        let r = parseInt(hex.substring(1, 3), 16);
        let g = parseInt(hex.substring(3, 5), 16);
        let b = parseInt(hex.substring(5, 7), 16);
        const hsv = this.rgbToHsv(r, g, b);
        const grayscale = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
        const dumbGrayscale = (r + g + b) / 3;
        const boost = hsv.v
        this.brightness = boost;
        const normalized = 255 / Math.max(r, g, b);
        r = Math.round(r * normalized);
        g = Math.round(g * normalized);
        b = Math.round(b * normalized);
        this.tint = {r, g, b};
        return this;
    }

    withHue(hue) {
        this.hue = hue;
        return this;
    }

    withBrightness(brightness) {
        this.brightness = brightness;
        return this
    }

    toSharpTexture() {
        return sharp(this.path)
    }

    async sharpProcess() {
        const texture = this.toSharpTexture()
        if (this.width && this.height) {
            texture.resize(this.width, this.height, {kernel: "nearest"});
        }
        if (this.tint.r || this.tint.g || this.tint.b) {
            texture.tint({r: this.tint.r, g: this.tint.g, b: this.tint.b})
        }
        if (this.hue) {
            texture.modulate({hue: this.hue});
        }
        if (this.brightness) {
            texture.modulate({brightness: this.brightness});
        }
        return await texture.toBuffer();
    }

    rgbToHsv(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, v = max;
        const d = max - min;
        s = max === 0 ? 0 : d / max;
        if (max === min) {
            h = 0;
        } else {
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return {h, s, v};
    }
}

/**
 * @param {WorkingTexture} textures - The textures to combine.
 * @returns
 * A class that represents a texture.
 */
async function combine(textures) {
    const base = await textures[0].sharpProcess()
    const sharpBase = sharp(base);
    const texs = textures.slice(1);
    const buffers = [];
    for (const texture of texs) {
        const buffer = await texture.sharpProcess()
        buffers.push(buffer);
    }
    sharpBase.composite(buffers.map(buffer => ({input: buffer})));
    return sharpBase;
}

module.exports = {
    WorkingTexture,
    combine
}
