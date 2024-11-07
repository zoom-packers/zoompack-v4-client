import {ensureFolderExists, paxiDatapacksPath} from "../utils";
// @ts-ignore
import fs from "fs";

function armor (value) {
    return {
        requirements: {
            WEAR: {
                endurance: value
            },
            USE: {
                endurance: value
            }
        }
    }
}

function sword (value) {
    return {
        requirements: {
            WEAPON: {
                swordsmanship: value
            },
            WEAR: {
                swordsmanship: value,
            },
            TOOL: {
                farming : 0
            }
        }
    }
}

function staff(value) {
    return {
        requirements: {
            WEAPON: {
                magic: value
            },
            WEAR: {
                magic: value,
            },
            TOOL: {
                farming : 0
            }
        }
    }
}

function axe (value) {
    return {
        requirements: {
            TOOL: {
                woodcutting: value
            },
            WEAPON: {
                swordsmanship: value
            },
            WEAR: {
                woodcutting: value
            }
        }
    }
}

function bow (value) {
    return {
        requirements: {
            WEAPON: {
                archery: value
            },
            WEAR: {
                archery: value
            },
            USE: {
                archery: value
            }
        }
    }
}

function tool(skill, value) {
    return {
        requirements: {
            TOOL: {
                [skill]: value
            },
            WEAR: {
                [skill]: value
            },
            WEAPON: {
                combat: 0
            },
        }
    }
}

function offhand(value) {
    return {
        requirements: {
            WEAR: {
                magic: value
            }
        }
    }

}

function mount(skill, value) {
    return {
        requirements: {
            RIDE: {
                [skill]: value
            }
        }
    }
}

function use(skill, value) {
    return {
        requirements: {
            USE: {
                [skill]: value
            }
        }
    }
}

function generalUse(skill, value) {
    return {
        requirements: {
            WEAR: {
                [skill]: value
            },
            INTERACT: {
                [skill]: value
            },
            PLACE: {
                [skill]: value
            },
            USE: {
                [skill]: value
            }
        }
    }
}

function place(skill, value) {
    return {
        requirements: {
            PLACE: {
                [skill]: value
            }
        }
    }
}


// CONFIG
const item_types = ["helmet", "chestplate", "leggings", "boots", "axe", "sword", "pickaxe", "shovel", "hoe"];
const item_functions = {
    "helmet": armor,
    "chestplate": armor,
    "leggings": armor,
    "boots": armor,
    "axe": axe,
    "sword": sword,
    "shield": armor,
    "pickaxe": tool,
    "shovel": tool,
    "hoe": tool,
    "bow": bow,
    "crossbow": bow,
    "offhand": offhand,
    "staff": staff,
    "curio": armor,
}
const tool_skills = {
    "pickaxe": "mining",
    "shovel": "excavation",
    "hoe": "farming",
    "bow": "archery",
}

// EXPORTS
function modifySetRequirements(modId, set_name, level, items = undefined, set_formatting = "{set_name}_{item}") {
    let folder = `${paxiDatapacksPath()}/${modId}/data/${modId}/pmmo/items`;
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

export function modifySingleItem(modId, modItem, type, level) {
    let folder = `${paxiDatapacksPath()}/${modId}/data/${modId}/pmmo/items`;
    let filePath = `${folder}/${modItem}.json`;
    checkFileExists(filePath, modId, modItem, type, level);
    const template = createItemRequirement(type, level);
    ensureFolderExists(folder)
    writeJson(template, filePath);
}

export function modifySingleItemWithSkill(modId, modItem, type, level, skill) {
    let folder = `${paxiDatapacksPath()}/${modId}/data/${modId}/pmmo/items`;
    let filePath = `${folder}/${modItem}.json`;
    checkFileExists(filePath, modId, modItem, type, level);
    const template = createItemRequirement(type, level);
    const requirements = template.requirements;
    const keys = Object.keys(requirements);
    for (const key of keys) {
        const requirementKeys = Object.keys(requirements[key]);
        for (const requirementKey of requirementKeys) {
            requirements[key][requirementKey] = undefined;
        }
        requirements[key][skill] = level;
    }
    ensureFolderExists(folder)
    writeJson(template, filePath);
}

function modifySingleItemForMount(modId, modItem, skill, level) {
    let folder = `${paxiDatapacksPath()}/${modId}/data/${modId}/pmmo/items`;
    let filePath = `${folder}/${modItem}.json`;
    checkFileExists(filePath, modId, modItem, skill, level);
    const template = use(skill, level)
    ensureFolderExists(folder)
    writeJson(template, filePath);
}

function modifyEntityMountable(modId, entity, skill, level) {
    let folder = `${paxiDatapacksPath()}/${modId}/data/${modId}/pmmo/entities`;
    let filePath = `${folder}/${entity}.json`;
    checkFileExists(filePath, modId, entity, skill, level);
    const template = mount(skill, level) as any;
    template.override = true;
    ensureFolderExists(folder)
    writeJson(template, filePath);
}

function modifyGeneralUseItemRequirements(modId, modItem, skill, level) {
    let folder = `${paxiDatapacksPath()}/${modId}/data/${modId}/pmmo/items`;
    let filePath = `${folder}/${modItem}.json`;
    checkFileExists(filePath, modId, modItem, skill, level);
    const template = generalUse(skill, level)
    ensureFolderExists(folder)
    writeJson(template, filePath);
}

function modifyPlaceBlockRequirements(modId, modItem, skill, level) {
    let folder = `${paxiDatapacksPath()}/${modId}/data/${modId}/pmmo/items`;
    let filePath = `${folder}/${modItem}.json`;
    checkFileExists(filePath, modId, modItem, skill, level);
    const template = place(skill, level)
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
    if (templateFunction === tool) {
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
