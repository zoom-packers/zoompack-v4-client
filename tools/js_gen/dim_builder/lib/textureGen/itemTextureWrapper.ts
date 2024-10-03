import {WorkingTexture} from "./workingTexture";
import {hexToRGB, rgbToHsv} from "../utils";
import {ChromaKeyOperation} from "../material/ArmoryTypes";

export class ItemTextureWrapper {
    path: string;
    useTint: boolean;
    tint: string;
    chromaKeyOperations: ChromaKeyOperation[] = [];

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

    withChromaKey(chromaKey: ChromaKeyOperation) {
        this.chromaKeyOperations.push(chromaKey);
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
