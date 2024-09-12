import sharp from "sharp";
import {WorkingTexture} from "./workingTexture";

/**
 * @param {WorkingTexture} textures - The textures to combine.
 * @returns
 * A class that represents a texture.
 */
// @ts-ignore
export async function combine(textures : (WorkingTexture | Buffer)[]) {
    let base;
    if (textures[0] instanceof WorkingTexture) {
        base = await textures[0].sharpProcess();
    } else {
        base = textures[0]
    }
    const sharpBase = sharp(base);
    const texs = textures.slice(1);
    const buffers = [];
    for (const texture of texs) {
        let buffer;
        if (texture instanceof WorkingTexture) {
            buffer = await texture.sharpProcess()
        } else {
            buffer = texture;
        }
        buffers.push(buffer);
    }
    sharpBase.composite(buffers.map(buffer => ({input: buffer})));
    return sharpBase;
}
