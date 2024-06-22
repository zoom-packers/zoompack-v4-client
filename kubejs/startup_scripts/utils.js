// API: KubeJS
// KubeJS: 1.0.0
// MC: 1.20.1
// Utils for creating items and tiers
// Copy these to use them, as KubeJS doesn't support imports yet

var global = {}

global.createToolTier = (event, id, uses, speed, attackDamageBonus, level, enchantmentValue, repairIngredientTag) => {
    event.add(id, tier => {
        tier.uses = uses;
        tier.speed = speed;
        tier.attackDamageBonus = attackDamageBonus;
        tier.level = level;
        tier.enchantmentValue = enchantmentValue;
        tier.repairIngredient = repairIngredientTag;
    });
}

global.createArmorTier = (event, id, durabilityMultiplier, slotProtections, enchantmentValue, armorToughness, knockbackResistance, repairIngredientTag) => {
    event.add(id, tier => {
        tier.durabilityMultiplier = durabilityMultiplier
        tier.slotProtections = slotProtections
        tier.enchantmentValue = enchantmentValue
        tier.equipSound = 'minecraft:item.armor.equip_iron'
        tier.repairIngredient = repairIngredientTag
        tier.toughness = armorToughness
        tier.knockbackResistance = knockbackResistance
    });
}

global.createSwordCustom = (event, id, texture, tier, name, attackDamage, maxDamage) => {
    global.createTool(event, id, "sword", texture, tier, name, attackDamage, maxDamage);
}

global.createAxeCustom = (event, id, texture, tier, name, attackDamage, maxDamage) => {
    global.createTool(event, id, "axe", texture, tier, name, attackDamage, maxDamage);
}

global.createPickaxeCustom = (event, id, texture, tier, name, attackDamage, maxDamage) => {
    global.createTool(event, id, "pickaxe", texture, tier, name, attackDamage, maxDamage);
}

global.createShovelCustom = (event, id, texture, tier, name, attackDamage, maxDamage) => {
    global.createTool(event, id, "shovel", texture, tier, name, attackDamage, maxDamage);
}

global.createHoeCustom = (event, id, texture, tier, name, attackDamage, maxDamage) => {
    global.createTool(event, id, "hoe", texture, tier, name, attackDamage, maxDamage);
}

global.createHelmetCustom = (event, id, texture, tier, name, armorProtection, armorToughness, maxDamage) => {
    global.createTool(event, id, "helmet", texture, tier, name, armorProtection, armorToughness, maxDamage);
}

global.createChestplateCustom = (event, id, texture, tier, name, armorProtection, armorToughness, maxDamage) => {
    global.createTool(event, id, "chestplate", texture, tier, name, armorProtection, armorToughness, maxDamage);
}

global.createLeggingsCustom = (event, id, texture, tier, name, armorProtection, armorToughness, maxDamage) => {
    global.createTool(event, id, "leggings", texture, tier, name, armorProtection, armorToughness, maxDamage);
}

global.createBootsCustom = (event, id, texture, tier, name, armorProtection, armorToughness, maxDamage) => {
    global.createTool(event, id, "boots", texture, tier, name, armorProtection, armorToughness, maxDamage);
}

global.createToolCustom = (event, id, type, texture, tier, name, attackDamage, maxDamage) => {
    event.create(id, type)
        .tier(tier)
        .displayName(name)
        .texture(texture)
        .attackDamage(attackDamage)
        .maxDamage(maxDamage);
}

global.createSword = (event, id, texture, tier, name) => {
    global.createTool(event, id, "sword", texture, tier, name);
}

global.createAxe = (event, id, texture, tier, name) => {
    global.createTool(event, id, "axe", texture, tier, name);
}

global.createPickaxe = (event, id, texture, tier, name) => {
    global.createTool(event, id, "pickaxe", texture, tier, name);
}

global.createShovel = (event, id, texture, tier, name) => {
    global.createTool(event, id, "shovel", texture, tier, name);
}

global.createHoe = (event, id, texture, tier, name) => {
    global.createTool(event, id, "hoe", texture, tier, name);
}

global.createHelmet = (event, id, texture, tier, name) => {
    global.createTool(event, id, "helmet", texture, tier, name);
}

global.createChestplate = (event, id, texture, tier, name) => {
    global.createTool(event, id, "chestplate", texture, tier, name);
}

global.createLeggings = (event, id, texture, tier, name) => {
    global.createTool(event, id, "leggings", texture, tier, name);
}

global.createBoots = (event, id, texture, tier, name) => {
    global.createTool(event, id, "boots", texture, tier, name);
}

global.createTool = (event, id, type, texture, tier, name) => {
    event.create(id, type)
        .tier(tier)
        .displayName(name)
        .texture(texture);
}

global.createAllToolsForTier = (event, tier, textures) => {
    var tierFancyName = tier.charAt(0).toUpperCase() + tier.slice(1);

    global.createSword(event, `${tier}_sword`, textures.sword, tier, `${tierFancyName} Sword`);
    global.createAxe(event, `${tier}_axe`, textures.axe, tier, `${tierFancyName} Axe`);
    global.createPickaxe(event, `${tier}_pickaxe`, textures.pickaxe, tier, `${tierFancyName} Pickaxe`);
    global.createShovel(event, `${tier}_shovel`, textures.shovel, tier, `${tierFancyName} Shovel`);
    global.createHoe(event, `${tier}_hoe`, textures.hoe, tier, `${tierFancyName} Hoe`);
    global.createHelmet(event, `${tier}_helmet`, textures.helmet, tier, `${tierFancyName} Helmet`);
    global.createChestplate(event, `${tier}_chestplate`, textures.chestplate, tier, `${tierFancyName} Chestplate`);
    global.createLeggings(event, `${tier}_leggings`, textures.leggings, tier, `${tierFancyName} Leggings`);
    global.createBoots(event, `${tier}_boots`, textures.boots, tier, `${tierFancyName} Boots`);
}

global.getMockTexturesObject = () => {
    return {
        sword: 'kubejs:item/example_item',
        axe: 'minecraft:item/diamond_axe',
        pickaxe: 'minecraft:item/diamond_pickaxe',
        shovel: 'minecraft:item/diamond_shovel',
        hoe: 'minecraft:item/diamond_hoe',
        helmet: 'minecraft:item/diamond_helmet',
        chestplate: 'minecraft:item/diamond_chestplate',
        leggings: 'minecraft:item/diamond_leggings',
        boots: 'minecraft:item/diamond_boots'
    }
}

global.getMaterialTexturesObject = (modid, material) => {
    return {
        sword: `${modid}:item/${material}_sword`,
        axe: `${modid}:item/${material}_axe`,
        pickaxe: `${modid}:item/${material}_pickaxe`,
        shovel: `${modid}:item/${material}_shovel`,
        hoe: `${modid}:item/${material}_hoe`,
        helmet: `${modid}:item/${material}_helmet`,
        chestplate: `${modid}:item/${material}_chestplate`,
        leggings: `${modid}:item/${material}_leggings`,
        boots: `${modid}:item/${material}_boots`
    }
}


global.modifyModItems = (event, modId, materialIds, durabilities, attackDamages, armorTotals, armorToughnessesTotals, armorDistributions, armorToughnessDistributions) => {
    materialIds.forEach((materialId, index) => {
        event.modify(`${modId}:${materialId}_sword`, item => {
            item.attackDamage = attackDamages[index];
            item.maxDamage = durabilities[index];
        });

        event.modify(`${modId}:${materialId}_axe`, item => {
            item.maxDamage = durabilities[index];
        });

        event.modify(`${modId}:${materialId}_helmet`, item => {
            item.armorProtection = armorDistributions[index][0];
            item.armorToughness = armorToughnessDistributions[index];
            item.maxDamage = durabilities[index] - 125;
        });

        event.modify(`${modId}:${materialId}_chestplate`, item => {
            item.armorProtection = armorDistributions[index][1];
            item.armorToughness = armorToughnessDistributions[index];
            item.maxDamage = durabilities[index];
        });

        event.modify(`${modId}:${materialId}_leggings`, item => {
            item.armorProtection = armorDistributions[index][2];
            item.armorToughness = armorToughnessDistributions[index];
            item.maxDamage = durabilities[index] - 100;
        });

        event.modify(`${modId}:${materialId}_boots`, item => {
            item.armorProtection = armorDistributions[index][3];
            item.armorToughness = armorToughnessDistributions[index];
            item.maxDamage = durabilities[index] - 150;
        });
    });
}


// Progression:

// Overworld -> Aether -> Nether -> Undergarden -> End -> Void Scape -> Twilight Forest
// Deeper & Darker dimension ???

// Weapons:
// Overworld Balanced
// Overworld Mods NOT
// Aether Balanced
// Nether needs more equipment reserving damage 20 - 50
// Nether recipe changes. Netherite = Valkyrie + Smithing + Netherite ingot
// Undergarden