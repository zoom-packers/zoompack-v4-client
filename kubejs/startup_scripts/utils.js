//priority: 1000
// API: KubeJS
// KubeJS: 1.0.0
// MC: 1.20.1
// Utils for creating items and tiers
// Copy these to use them, as KubeJS doesn't support imports yet

var global = {}
var hasGeckoJs = Platform.isLoaded("geckojs");
console.info("GeckoJS is " + (hasGeckoJs ? "enabled" : "disabled"));


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
    return global.createTool(event, id, "sword", texture, tier, name);
}

global.createAxe = (event, id, texture, tier, name) => {
    return global.createTool(event, id, "axe", texture, tier, name);
}

global.createPickaxe = (event, id, texture, tier, name) => {
    return global.createTool(event, id, "pickaxe", texture, tier, name);
}

global.createShovel = (event, id, texture, tier, name) => {
    return global.createTool(event, id, "shovel", texture, tier, name);
}

global.createHoe = (event, id, texture, tier, name) => {
    return global.createTool(event, id, "hoe", texture, tier, name);
}

global.createHelmet = (event, id, texture, tier, name) => {
    return global.createTool(event, id, "helmet", texture, tier, name);
}

global.createChestplate = (event, id, texture, tier, name) => {
    return global.createTool(event, id, "chestplate", texture, tier, name);
}

global.createLeggings = (event, id, texture, tier, name) => {
    return global.createTool(event, id, "leggings", texture, tier, name);
}

global.createBoots = (event, id, texture, tier, name) => {
    return global.createTool(event, id, "boots", texture, tier, name);
}

global.createTool = (event, id, type, texture, tier, name) => {
    return event.create(id, type)
        .tier(tier)
        .displayName(name)
        .texture(texture);
}

global.createToolsForTier = (event, tier, textures, name_base) => {
    global.createSword(event, `${tier}_sword`, textures.sword, tier, `${name_base} Sword`);
    global.createAxe(event, `${tier}_axe`, textures.axe, tier, `${name_base} Axe`);
    global.createPickaxe(event, `${tier}_pickaxe`, textures.pickaxe, tier, `${name_base} Pickaxe`);
    global.createShovel(event, `${tier}_shovel`, textures.shovel, tier, `${name_base} Shovel`);
    global.createHoe(event, `${tier}_hoe`, textures.hoe, tier, `${name_base} Hoe`);
}

global.creatArmorForTier = (event, tier, textures, name_base) => {
    global.createHelmet(event, `${tier}_helmet`, textures.helmet, tier, `${name_base} Helmet`);
    global.createChestplate(event, `${tier}_chestplate`, textures.chestplate, tier, `${name_base} Chestplate`);
    global.createLeggings(event, `${tier}_leggings`, textures.leggings, tier, `${name_base} Leggings`);
    global.createBoots(event, `${tier}_boots`, textures.boots, tier, `${name_base} Boots`);
}

global.createOffhand = (event, id, texture, name) => {
    event.create(id)
        .texture(texture)
        .displayName(name)
        .maxStackSize(1)
}


global.createCurio = (event, id, displayName, attributes) => {
    var capability = CuriosCapabilityBuilder.CURIOS.itemStack();
    capability.canEquip((stack, context) => true);
    capability.canUnequip((stack, context) => true);
    for (let attribute of attributes) {
        capability.modifyAttribute(attribute.attribute, attribute.uuid, attribute.value, attribute.operation);
    }

    return event.create(id)
        .displayName(displayName)
        .maxStackSize(1)
        .attachCapability(capability);
}

global.createAugument = (event, id, name, texture, attributes) => {
    var curio = global.createCurio(event, id, name, attributes);
    curio.displayName(name)
    curio.texture(texture)
    return curio;
}

global.createGeckoArmorTier = (event, modId, prefix, tier, textures, helmName, chestName, pantsName, legName, nameSuffix,
                               helmModelPath, helmTexturePath, chestModelPath, chestTexturePath, pantsModelPath, pantsTexturePath, bootsModelPath, bootsTexturePath) => {
    let itemTypePrefix = !hasGeckoJs ? "" : "anim_";
    let helmet = event.create(`${modId}:${prefix}_helmet`, `${itemTypePrefix}helmet`).displayName(`${helmName} ${nameSuffix}`).texture(textures.helmet).tier(tier);
    let chestplate = event.create(`${modId}:${prefix}_chestplate`, `${itemTypePrefix}chestplate`).displayName(`${chestName} ${nameSuffix}`).texture(textures.chestplate).tier(tier);
    let leggings = event.create(`${modId}:${prefix}_leggings`, `${itemTypePrefix}leggings`).displayName(`${pantsName} ${nameSuffix}`).texture(textures.leggings).tier(tier);
    let boots = event.create(`${modId}:${prefix}_boots`, `${itemTypePrefix}boots`).displayName(`${legName} ${nameSuffix}`).texture(textures.boots).tier(tier);
    if (hasGeckoJs) {
        helmet
            .geoModel(geo => {
                geo.setSimpleModel(helmModelPath);
                geo.setSimpleTexture(helmTexturePath);
            })
            .boneVisibility((renderer, slot) => {
                renderer.setAllVisible(false);
                if (slot === "head") {
                    renderer.setBoneVisible(renderer.getHeadBone(), true);
                }
            });
        chestplate
            .geoModel(geo => {
                geo.setSimpleModel(chestModelPath);
                geo.setSimpleTexture(chestTexturePath);
            })
            .boneVisibility((renderer, slot) => {
                renderer.setAllVisible(false);
                if (slot === "chest") {
                    renderer.setBoneVisible(renderer.getBodyBone(), true);
                    renderer.setBoneVisible(renderer.getRightArmBone(), true);
                    renderer.setBoneVisible(renderer.getLeftArmBone(), true);
                }
            });
        leggings
            .geoModel(geo => {
                geo.setSimpleModel(pantsModelPath);
                geo.setSimpleTexture(pantsTexturePath);
            })
            .boneVisibility((renderer, slot) => {
                renderer.setAllVisible(false);
                if (slot === "legs") {
                    renderer.setBoneVisible(renderer.getRightLegBone(), true);
                    renderer.setBoneVisible(renderer.getLeftLegBone(), true);
                }
            });
        boots
            .geoModel(geo => {
                geo.setSimpleModel(bootsModelPath);
                geo.setSimpleTexture(bootsTexturePath);
            })
            .boneVisibility((renderer, slot) => {
                renderer.setAllVisible(false);
                if (slot === "feet") {
                    renderer.setBoneVisible(renderer.getRightBootBone(), true);
                    renderer.setBoneVisible(renderer.getLeftBootBone(), true);
                }
            });
    }
    return { helmet: helmet, chestplate: chestplate, leggings: leggings, boots: boots };
}

global.enhanceWithAttributes = (item, attributesJson) => {
    let attributes = JSON.parse(attributesJson);
    for (let attribute of attributes) {
        item.modifyAttribute(attribute.attribute, attribute.uuid, attribute.amount, attribute.operation);
    }
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


global.setMaterialDurabilityTools = (event, mod_id, material_id, tool_durability) => {
    ['sword', 'axe', 'pickaxe', 'shovel', 'hoe'].forEach(piece=>{
        event.modify(`${mod_id}:${material_id}_${piece}`, item => {
            item.maxDamage = tool_durability;
        });
    });
}

global.setMaterialDurabilityArmor = (event, mod_id, material_id, armor_durability_list) => {    
    event.modify(`${mod_id}:${material_id}_helmet`, item => {
        item.maxDamage = armor_durability_list[0];
    });
    event.modify(`${mod_id}:${material_id}_chestplate`, item => {
        item.maxDamage = armor_durability_list[1];
    });
    event.modify(`${mod_id}:${material_id}_leggings`, item => {
        item.maxDamage = armor_durability_list[2];
    });
    event.modify(`${mod_id}:${material_id}_boots`, item => {
        item.maxDamage = armor_durability_list[0];
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
