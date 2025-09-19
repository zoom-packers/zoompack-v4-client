import fs from "fs"
import * as nbt from "prismarine-nbt"
import {List, Tags, TagType} from "prismarine-nbt"
import {gzip} from "node-gzip";
import {getModData, loadBufferFromMod, loadTextFromMod} from "../jar_util";
import {BlockResourceLocation, EntityResourceLocation} from "../types";

export async function readNbtFile(path: string) {
    if (path.startsWith("jar:")) {
        const split = path.split(":");
        const modId = split[1];
        const pathInJar = split[2];
        const buffer = await loadBufferFromMod(modId, pathInJar);
        if (buffer) {
            const { parsed, type } = await nbt.parse(buffer);
            return { parsed, type };
        } else {
            throw new Error(`Could not load buffer from mod ${modId} at path ${pathInJar}`);
        }
    }
    if (!fs.existsSync(path)) {
        console.error(`Could not load buffer from mod ${path}`);
        return {parsed: null, type: null};
    }
    const fileContent = fs.readFileSync(path)
    const { parsed, type } = await nbt.parse(fileContent)
    return { parsed, type };
}

export async function writeNbtFile(path: string, data: nbt.NBT, type: nbt.NBTFormat) {
    const buffer = nbt.writeUncompressed(data, type)
    const gzipped = await gzip(buffer);
    fs.createWriteStream(path).write(gzipped);
}

export function findJigsawBlocks(data: nbt.NBT) {
    const jigsawBlockIndicies = [];
    const palette = data.value.palette as List<TagType.String>
    for (let i = 0; i < palette.value.value.length; i++){
        const entry = palette.value.value[i];
        const blockEntry = entry as any;
        if (blockEntry.Name.value === "minecraft:jigsaw") {
            jigsawBlockIndicies.push(i);
        }
    }
    const resultingBlocks = [];
    const blocks = data.value.blocks as List<TagType.Compound>
    for (const block of blocks.value.value) {
        const blockData = block as any;
        if (jigsawBlockIndicies.includes(blockData.state.value)) {
            resultingBlocks.push(blockData);
        }
    }
    return resultingBlocks;
}

export async function editNbtPalette(data: nbt.NBT, oldBlock: string, newBlock: string) {
    const palette = data.value.palette as List<TagType.String>
    for (const entry of palette.value.value) {
        const blockEntry = entry as any;
        if (blockEntry.Name.value === oldBlock) {
            blockEntry.Name.value = newBlock;
        }
    }
}

export function exportNbtPalette(data: nbt.NBT): BlockResourceLocation[] {
    const palette = data.value.palette as List<TagType.String>
    const blocks: BlockResourceLocation[] = [];
    for (const entry of palette.value.value) {
        const blockEntry = entry as any;
        blocks.push(blockEntry.Name.value);
    }
    return blocks;
}

export function exportNbtEntities(data: nbt.NBT): EntityResourceLocation[] {
    const palette = data.value.entities as List<TagType.String>
    const entities: EntityResourceLocation[] = [];
    for (const entry of palette.value.value) {
        const entityEntry = entry as any;
        entities.push(entityEntry.nbt.value.id.value);
    }
    return entities;
}

export async function editNbtEntities(data: nbt.NBT, oldEntity: string, newEntity: string) {
    const palette = data.value.entities as List<TagType.String>
    for (const entry of palette.value.value) {
        const entityEntry = entry as any;
        const id = entityEntry.nbt.value.id as Tags[TagType.String];
        if (id.value === oldEntity) {
            id.value = newEntity;
        }
    }
}

