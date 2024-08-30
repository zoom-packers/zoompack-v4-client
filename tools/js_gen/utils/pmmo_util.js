const templateFormatter = require("./pmmo_templates");
const fs = require("fs")
const {paxiDatapacksPath} = require("./path_util");

// CONFIG
const item_types = ["helmet", "chestplate", "leggings", "boots", "axe", "sword", "pickaxe", "shovel", "hoe"];
const item_functions = {
    "helmet": templateFormatter.armor,
    "chestplate": templateFormatter.armor,
    "leggings": templateFormatter.armor,
    "boots": templateFormatter.armor,
    "axe": templateFormatter.axe,
    "sword": templateFormatter.sword,
    "shield": templateFormatter.armor,
    "pickaxe": templateFormatter.tool,
    "shovel": templateFormatter.tool,
    "hoe": templateFormatter.tool,
    "bow": templateFormatter.bow,
    "offhand": templateFormatter.offhand
}
const tool_skills = {
    "pickaxe": "mining",
    "shovel": "excavation",
    "hoe": "farming",
    "bow": "archery",
}

// EXPORTS
function modifySetRequirements(modId, set_name, level, items = undefined, set_formatting = "{set_name}_{item}") {
    let folder = `${paxiDatapacksPath()}/pmmo_level_limiter/data/${modId}/pmmo/items`;
    let item_types = ["helmet", "chestplate", "leggings", "boots", "axe", "sword", "pickaxe", "shovel", "hoe"];
    item_types = filterItems(items, item_types);
    ensureFolderExists(folder);
    item_types.forEach((type) => {
        let itemId = set_formatting.replace("{set_name}", set_name).replace("{item}", type);
        let filePath = `${folder}/${itemId}.json`;
        checkFileExists(filePath, modId, itemId, type, level);
        const template = createItemRequirement(type, level);
        writeJson(template, filePath);
    });
}

function modifySingleItem(modId, modItem, type, level) {
    let folder = `${paxiDatapacksPath()}/pmmo_level_limiter/data/${modId}/pmmo/items`;
    let filePath = `${folder}/${modItem}.json`;
    checkFileExists(filePath, modId, modItem, type, level);
    const template = createItemRequirement(type, level);
    ensureFolderExists(folder)
    writeJson(template, filePath);
}

function modifySingleItemForMount(modId, modItem, skill, level) {
    let folder = `${paxiDatapacksPath()}/pmmo_level_limiter/data/${modId}/pmmo/items`;
    let filePath = `${folder}/${modItem}.json`;
    checkFileExists(filePath, modId, modItem, skill, level);
    const template = templateFormatter.use(skill, level)
    ensureFolderExists(folder)
    writeJson(template, filePath);
}

function modifyEntityMountable(modId, entity, skill, level) {
    let folder = `${paxiDatapacksPath()}/pmmo_level_limiter/data/${modId}/pmmo/entities`;
    let filePath = `${folder}/${entity}.json`;
    checkFileExists(filePath, modId, entity, skill, level);
    const template = templateFormatter.mount(skill, level)
    template.override = true;
    ensureFolderExists(folder)
    writeJson(template, filePath);
}

function modifyGeneralUseItemRequirements(modId, modItem, skill, level) {
    let folder = `${paxiDatapacksPath()}/pmmo_level_limiter/data/${modId}/pmmo/items`;
    let filePath = `${folder}/${modItem}.json`;
    checkFileExists(filePath, modId, modItem, skill, level);
    const template = templateFormatter.generalUse(skill, level)
    ensureFolderExists(folder)
    writeJson(template, filePath);
}

function modifyPlaceBlockRequirements(modId, modItem, skill, level) {
    let folder = `${paxiDatapacksPath()}/pmmo_level_limiter/data/${modId}/pmmo/items`;
    let filePath = `${folder}/${modItem}.json`;
    checkFileExists(filePath, modId, modItem, skill, level);
    const template = templateFormatter.place(skill, level)
    ensureFolderExists(folder)
    writeJson(template, filePath);
}

// INTERNALS
function filterItems(items, item_types) {
    if (items !== undefined) {
        if (items === "tools") {
            item_types = ["pickaxe", "shovel", "hoe", "sword", "axe"];
        } else if (items === "weapons") {
            item_types = ["sword", "axe"];
        } else if (items === "armor") {
            item_types = ["helmet", "chestplate", "leggings", "boots"];
        } else {
            item_types = items;
        }
    }
    return item_types;
}
function writeJson(template, filePath) {
    let templateJson = JSON.stringify(template, null, 4);
    fs.writeFileSync(filePath, templateJson);
}

function createItemRequirement(type, level) {
    let template = undefined;
    let templateFunction = item_functions[type];
    if (templateFunction === templateFormatter.tool) {
        template = templateFunction(tool_skills[type], level);
    } else {
        template = templateFunction(level);
    }
    template.override = true;
    return template;
}

function checkFileExists(filePath, modId, modItem, type, level) {
    let fileExists = fs.existsSync(filePath);
    if (!fileExists) {
        console.warn(`File ${filePath} does not exist. Command modifySingleItem("${modId}", "${modItem}", "${type}", ${level}) will create one.`);
    }
}

function ensureFolderExists(path) {
    let folders = path.split("/");
    let currentPath = "";
    folders.forEach((folder) => {
        currentPath += folder + "/";
        if (!fs.existsSync(currentPath)) {
            fs.mkdirSync(currentPath);
        }
    });
}

module.exports = {
    modifySetRequirements,
    modifySingleItem,
    modifyEntityMountable,
    modifySingleItemForMount,
    modifyGeneralUseItemRequirements,
    modifyPlaceBlockRequirements
}
