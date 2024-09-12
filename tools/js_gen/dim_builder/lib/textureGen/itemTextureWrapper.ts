import {WorkingTexture} from "./workingTexture";
import {hexToRGB, rgbToHsv} from "../utils";

export class ItemTextureWrapper {
    path: string;
    useTint: boolean;
    tint: string;
    chromaKeyOperations: {h: number, s: number, v: number, tolerance: number, fun: "linear" | "squared" | "cubic", newTintColor: string}[] = [];

    fromPath(path: string) {
        this.path = path;
        return this;
    }

    withTint(useTint: boolean) {
        this.useTint = useTint;
        return this;
    }

    fromAssets(path: string, tint = true) {
        this.path = `./mc/assets/textures/${path}.png`;
        this.useTint = tint;
        return this;
    }

    withTintColor(color: string) {
        this.tint = color;
        return this;
    }

    withChromaKey(keyColor: string, tolerance: number, fun: "linear" | "squared" | "cubic", newTintColor: string) {
        const rgb = hexToRGB(keyColor);
        const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
        this.chromaKeyOperations.push({h: hsv.h, s: hsv.s, v: hsv.v, tolerance, fun, newTintColor});
        return this;
    }

    toWorkingTexture() {
        const texture = new WorkingTexture().withPath(this.path);
        if (this.useTint) {
            texture.withTint(this.tint);
        }
        this.chromaKeyOperations.forEach(op => { texture.withChromaKey(op) });
        return texture;
    }
}
