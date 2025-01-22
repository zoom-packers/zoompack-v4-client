import sharp from "sharp";
import {combine} from "./util";
import {hexToRGB, hsvToRgb, rgbToHsv} from "../utils";
import {ChromaKeyOperation} from "../material/ArmoryTypes";

export class WorkingTexture {
    path = "";
    tint = {r: 0, g: 0, b: 0};
    hue = 0;
    brightness = 0;
    width = 0;
    height = 0;
    chromaKeyOperations: ChromaKeyOperation[] = [];

    withPath(path: string) {
        this.path = path;
        return this;
    }

    scale(width: number, height: number) {
        this.width = width;
        this.height = height;
        return this;
    }

    withTint(hex: string) {
        let r = parseInt(hex.substring(1, 3), 16);
        let g = parseInt(hex.substring(3, 5), 16);
        let b = parseInt(hex.substring(5, 7), 16);
        const hsv = rgbToHsv(r, g, b);
        const boost = hsv.v
        this.brightness = boost;
        const normalized = 255 / Math.max(r, g, b);
        r = Math.round(r * normalized);
        g = Math.round(g * normalized);
        b = Math.round(b * normalized);
        this.tint = {r, g, b};
        return this;
    }

    withHue(hue: number) {
        this.hue = hue;
        return this;
    }

    withBrightness(brightness: number) {
        this.brightness = brightness;
        return this
    }

    withChromaKey(operations: ChromaKeyOperation) {
        this.chromaKeyOperations.push(operations);
        return this;
    }

    withChromaKeys(operations: ChromaKeyOperation[]) {
        this.chromaKeyOperations = [...this.chromaKeyOperations, ...operations];
        return this;
    }

    toSharpTexture() {
        return sharp(this.path);
    }

    async toBitmap() {
        const sharpTexture = this.toSharpTexture();
        const buffer = await sharpTexture.raw().toBuffer();
        const metadata = await sharpTexture.metadata();
        const width = metadata.width;
        const height = metadata.height;
        return {
            buffer,
            width,
            height
        }
    }

    async chromaKey(oldH: number, oldS: number, oldV: number, newH: number, newS: number, newV: number, tolerance: number) {
        const hOffset = this.adaptHueForChromaKeying(oldH);
        oldH += hOffset;
        const bitmap = await this.toBitmap();
        const data = new Uint8Array(bitmap.buffer);
        const result = new Uint8Array(data.length);
        for (let i = 0; i < data.length; i += 4) {
            const pixelR = data[i];
            const pixelG = data[i + 1];
            const pixelB = data[i + 2];
            const pixelA = data[i + 3];
            const pixelHsv = rgbToHsv(pixelR, pixelG, pixelB);
            pixelHsv.h += hOffset;
            const hDiff = Math.abs(pixelHsv.h - oldH);
            const sDiff = Math.abs(pixelHsv.s - oldS);
            const vDiff = Math.abs(pixelHsv.v - oldV);


            const newHSV = {h: newS, s: pixelHsv.s, v: pixelHsv.v};
            const newRGB = hsvToRgb(newHSV.h, newHSV.s, newHSV.v);
            const newA = hDiff < tolerance ? pixelA : 0;
            result[i] = newRGB.r;
            result[i + 1] = newRGB.g;
            result[i + 2] = newRGB.b;
            result[i + 3] = newA;
        }
        if (data.length < 32) {
            console.log("data length", data.length);
        }
        const sharpImage = sharp(result, {raw: {width: bitmap.width, height: bitmap.height, channels: 4}});
        return sharpImage;
    }

    async sharpProcess() {
        if (this.path.includes("undefined")) {
            console.log("!!!!!!!!!!!!!!!!!!!Path is undefined!!!!!!!!!!!!!!!!!!!!!", this.path);
            throw new Error("Path is undefined");
        }
        let buffer = await this.toSharpTexture().png().toBuffer();
        for (const op of this.chromaKeyOperations) {
            const oldRGB = hexToRGB(op.colorToReplace);
            const oldHSV = rgbToHsv(oldRGB.r, oldRGB.g, oldRGB.b);
            const newRGB = hexToRGB(op.replaceWith);
            const newHSV = rgbToHsv(newRGB.r, newRGB.g, newRGB.b);
            const chromaKeyed = await this.chromaKey(oldHSV.h, oldHSV.s, oldHSV.v, newHSV.h, newHSV.s, newHSV.v, op.tolerance);
            chromaKeyed.tint(op.replaceWith);
            let chromaBuffer = await chromaKeyed.png().toBuffer();
            if (op.brightness) {
                const texture = sharp(chromaBuffer);
                texture.modulate({brightness: op.brightness});
                chromaBuffer = await texture.png().toBuffer();
            }
            const result = await combine([buffer, chromaBuffer]);
            buffer = await result.png().toBuffer();
        }
        let texture = sharp(buffer);
        if (this.tint.r || this.tint.g || this.tint.b) {
            texture = sharp(await texture.grayscale().toBuffer());
            texture.tint({r: this.tint.r, g: this.tint.g, b: this.tint.b})
        }
        if (this.hue) {
            texture.modulate({hue: this.hue});
        }
        if (this.brightness) {
            texture.modulate({brightness: this.brightness});
        }
        if (this.width && this.height) {
            texture.resize(this.width, this.height, {kernel: "nearest"});
        }
        return await texture.toBuffer();
    }

    private adaptHueForChromaKeying(h: number) {
        let offset = 0;
        if (h > 0.66) {
            offset = 0.33;
        } else if (h < 0.33) {
            offset = -0.33;
        }
        return offset;
    }
}
