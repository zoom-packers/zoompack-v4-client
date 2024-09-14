import {ensureFolderExists, rootPath} from "../utils";
// @ts-ignore
import fs from "fs";

const basePath = rootPath() + "/config/hltweaker"
const levelsPath = basePath + "/levels"

export function createNewLevel (id: string, level: number, color: string, icons: string[] | undefined) {
    const template = {
        level: level,
        color: color
    };
    if (icons) {
        template["icons"] = {
            "minecraft:mineable/pickaxe": icons[0],
            "minecraft:mineable/axe": icons[1],
            "minecraft:mineable/shovel": icons[2],
            "minecraft:mineable/hoe": icons[3],
        }
    }
    ensureFolderExists(levelsPath);
    fs.writeFileSync(`${levelsPath}/${id}.json`, JSON.stringify(template, null, 4));
}

export function loadItemHarvestLevelOverrides() {
    const path = basePath + "/item_harvest_level_overrides.json";
    if (!fs.existsSync(path)) {
        return {};
    }
    return JSON.parse(fs.readFileSync(path, "utf-8"));
}

export function saveItemHarvestLevelOverrides(overrides: any) {
    fs.writeFileSync(`${basePath}/item_harvest_level_overrides.json`, JSON.stringify(overrides, null, 4));
}

export function addItemHarvestLevelOverride(overrides: any, itemId: string, levelId: string) {
    const map = {
        "pickaxe": "minecraft:mineable/pickaxe",
        "axe": "minecraft:mineable/axe",
        "shovel": "minecraft:mineable/shovel",
        "hoe": "minecraft:mineable/hoe"
    }
    const itemIdSplit = itemId.split("_");
    let itemType = itemIdSplit[itemIdSplit.length - 1];
    if (itemId.includes("pickaxe")) {
        itemType = "pickaxe";
    } else if (itemId.includes("axe")) {
        itemType = "axe";
    } else if (itemId.includes("shovel")) {
        itemType = "shovel";
    } else if (itemId.includes("hoe")) {
        itemType = "hoe";
    }
    const itemMapping = map[itemType];
    if (!itemMapping) {
        throw new Error("Invalid item type");
    }
    overrides[itemId] = {
        [itemMapping]: levelId
    }
}

export function createDatapackForLevel(folderPath: string, tierId: string, tags: string[]) {
    const path = `${folderPath}/needs_${tierId}_tool.json`;
    if (!fs.existsSync(folderPath)) {
        ensureFolderExists(folderPath);
    }
    if (!fs.existsSync(path)) {
        const content = {
            values: tags
        }
        fs.writeFileSync(path, JSON.stringify(content, null, 4));
    } else {
        const content = JSON.parse(fs.readFileSync(path, "utf-8"));
        tags.forEach(tag => {
            if (!content.values.includes(tag)) {
                content.values.push(tag);
            }
        })
        fs.writeFileSync(path, JSON.stringify(content, null, 4));
    }
}


export function createDatapackForToolType(datapackPath: string, toolType: string, tags: string[]) {
    const folderPath = `${datapackPath}/data/minecraft/tags/blocks/mineable/`
    const path = `${folderPath}${toolType}.json`;
    if (!fs.existsSync(folderPath)) {
        ensureFolderExists(folderPath);
    }
    if (!fs.existsSync(path)) {
        const content = {
            values: tags
        }
        fs.writeFileSync(path, JSON.stringify(content, null, 4));
    } else {
        const content = JSON.parse(fs.readFileSync(path, "utf-8"));
        tags.forEach(tag => {
            if (!content.values.includes(tag)) {
                content.values.push(tag);
            }
        })
        fs.writeFileSync(path, JSON.stringify(content, null, 4));
    }
}

export function createHLDatapackForLevel(datapackPath: string, tierId: string, tags: string[]) {
    const folderPath = `${datapackPath}/data/hltweaker/tags/blocks`;
    createDatapackForLevel(folderPath, tierId, tags);
}

export function createMCDatapackForLevel(datapackPath: string, tierId: string, tags: string[]) {
    const folderPath = `${datapackPath}/data/minecraft/tags/blocks`;
    createDatapackForLevel(folderPath, tierId, tags);
}

export function createFGDatapackForLevel(datapackPath: string, tierId: string, tags: string[]) {
    const folderPath = `${datapackPath}/data/forge/tags/blocks`;
    createDatapackForLevel(folderPath, tierId, tags);
}

