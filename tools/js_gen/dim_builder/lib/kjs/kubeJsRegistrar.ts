// @ts-ignore
import fs from "fs";
import {BasicDataHolder} from "../selfWritingJson";
import {ensureFolderExists, kubejsServerScriptsPath, kubejsStartupScriptsPath} from "../utils";
import {KubeJSBlock, KubeJsItem} from "./kubeJsItem";
import {GENERAL_DURABILITY_MULTIPLIER, PER_TIER_MULTIPLIER} from "../material/armory";
import {CiaModifier} from "../cia/util";

export const REGISTRATION_TEMPLATE =`
StartupEvents.registry({type}, e => {
{content}
});
`
const TOOL_TIER_REGISTRY_TEMPLATE = `
ItemEvents.toolTierRegistry(event => {
{content}
});
`
const ARMOR_TIER_REGISTRY_TEMPLATE = `
ItemEvents.armorTierRegistry(event => {
{content}
});
`
const TAG_REGISTRATION_TEMPLATE = `
ServerEvents.tags('item', event => {
{content}
});
`

const ARMORY_TEMPLATE = `e.create("{id}", {type}).displayName("{displayName}").maxDamage({durability});`
const TIERED_ITEM_TEMPLATE = `e.create("{id}", "{type}").displayName("{displayName}").tier("{tier}");`
const ITEM_TEMPLATE = `e.create("{id}").displayName("{displayName}");`
const ITEM_WITH_DURABILITY_TEMPLATE = `e.create("{id}").displayName("{displayName}").maxDamage({durability});`
const BLOCK_TEMPLATE = `e.create("{id}").displayName("{displayName}");`
const TOOL_TIER_TEMPLATE = `  event.add("{id}", tier => {
    tier.uses = {uses}
    tier.speed = {speed}
    tier.attackDamageBonus = {attackDamageBonus}
    tier.level = {level}
    tier.enchantmentValue = {enchantmentValue}
    tier.repairIngredient = "#{repairIngredient}"
  });`
const ARMOR_TIER_TEMPLATE = `  event.add("{id}", tier => {
    tier.durabilityMultiplier = {durabilityMultiplier} // Each slot will be multiplied with [13, 15, 16, 11]
    tier.slotProtections = [{slotProtections}] // Slot indicies are [FEET, LEGS, BODY, HEAD] 
    tier.enchantmentValue = {enchantmentValue}
    tier.equipSound = 'minecraft:item.armor.equip_iron'
    tier.repairIngredient = "#{repairIngredient}" // #forge:ingots/iron'
    tier.toughness = {toughness} // diamond has 2.0, netherite 3.0
    tier.knockbackResistance = {knockbackResistance} // diamond has 0.0, netherite 0.1
  });`
const GECKO_ARMOR_TEMPLATE =
`global.createGeckoArmorTier(e, "{modId}", "{prefix}", "{tierId}", global.getMaterialTexturesObject("{modId}", "{tierId}"), "{helmName}", "{chestName}", "{legName}", "{bootName}", "{nameSuffix}",
    "{modelPath}", "{texturePath}", "{modelPath}", "{texturePath}", "{modelPath}", "{texturePath}", "{modelPath}", "{texturePath}");`

export class KubeJsRegistrar extends BasicDataHolder<KubeJsRegistrar> {
    items: string[] = [];
    blocks: string[] = [];
    toolTiers: string[] = [];
    armorTiers: string[] = [];
    repairTags: string[] = [];
    curios: string[] = [];

    registerBlock(id: string, displayName: string) {
        this.blocks.push(new KubeJSBlock().withId(id).withDisplayName(displayName).toString());
    }

    registerOreBlock(id: string, displayName: string) {
        this.blocks.push(new KubeJSBlock().withId(id).withDisplayName(displayName).withRequiresTool(true).withMaterial("stone").toString());
    }

    registerItem(id: string, displayName: string, durability?: number) {
        this.items.push(new KubeJsItem().withId(id).withDisplayName(displayName).withDurability(durability).toString());
    }

    registerArmoryItem(id: string, type: string, displayName: string, durability: number, tier: string) {
        this.items.push(new KubeJsItem().withId(id).withType(type).withDisplayName(displayName).withDurability(durability).withTier(tier).toString());
    }

    registerTieredItem(id: string, type: string, displayName: string, tier: string) {
        this.items.push(new KubeJsItem().withId(id).withType(type).withDisplayName(displayName).withTier(tier).toString());
    }

    registerCurioVariant(id: string, displayName: string, attributes: CiaModifier[]) {
        this.curios.push(`global.createCurio(e, "${id}", "${displayName}", ${JSON.stringify(attributes)});`);
    }

    registerToolTier(id: string, uses: number, speed: number, attackDamageBonus: number, level: number, enchantmentValue: number, repairIngredient: string) {
        this.toolTiers.push(TOOL_TIER_TEMPLATE.replace("{id}", id).replace("{uses}", uses.toString()).replace("{speed}", speed.toString()).replace("{attackDamageBonus}", attackDamageBonus.toString()).replace("{level}", level.toString()).replace("{enchantmentValue}", enchantmentValue.toString()).replace("{repairIngredient}", repairIngredient));
        this.registerIngredientTag(repairIngredient);
    }

    registerArmorTier(id: string, tier: number, durabilityMultiplier: number, slotProtections: number[], enchantmentValue: number, repairIngredient: string, toughness: number, knockbackResistance: number) {
        var durabilityFormula = durabilityMultiplier * (Math.pow(1.0 + PER_TIER_MULTIPLIER * tier, 2)) * GENERAL_DURABILITY_MULTIPLIER;
        this.armorTiers.push(ARMOR_TIER_TEMPLATE.replace("{id}", id).replace("{durabilityMultiplier}", durabilityFormula.toString()).replace("{slotProtections}", slotProtections.toString()).replace("{enchantmentValue}", enchantmentValue.toString()).replace("{repairIngredient}", repairIngredient).replace("{toughness}", toughness.toString()).replace("{knockbackResistance}", knockbackResistance.toString()));
        this.registerIngredientTag(repairIngredient);
    }

    registerIngredientTag(tag: string) {
        if (!this.repairTags.includes(tag)) {
            this.repairTags.push(tag);
        }
    }

    registerGeckoArmor(modId: string, prefix: string, tierId: string, helmName: string, chestName: string, legName: string, bootName: string, nameSuffix: string, modelPath: string, texturePath: string) {
        this.items.push(GECKO_ARMOR_TEMPLATE
            .replace("{modId}", modId)
            .replace("{prefix}", prefix)
            .replace("{tierId}", tierId)
            .replace("{modId}", modId)
            .replace("{tierId}", tierId)
            .replace("{helmName}", helmName)
            .replace("{chestName}", chestName)
            .replace("{legName}", legName)
            .replace("{bootName}", bootName)
            .replace("{nameSuffix}", nameSuffix)
            .replace("{modelPath}", modelPath)
            .replace("{texturePath}", texturePath)
            .replace("{modelPath}", modelPath)
            .replace("{texturePath}", texturePath)
            .replace("{modelPath}", modelPath)
            .replace("{texturePath}", texturePath)
            .replace("{modelPath}", modelPath)
            .replace("{texturePath}", texturePath));
    }

    writeToFile() {
        const kjsPath = kubejsStartupScriptsPath();
        const folder = `${kjsPath}/${this.internalNamespace}`;
        ensureFolderExists(folder);
        const path = `${folder}/registrar.js`;
        const toolTierContent = TOOL_TIER_REGISTRY_TEMPLATE.replace("{content}", this.toolTiers.join("\n"));
        const armorTierContent = ARMOR_TIER_REGISTRY_TEMPLATE.replace("{content}", this.armorTiers.join("\n"));
        const itemContent = REGISTRATION_TEMPLATE.replace("{type}", "\"item\"").replace("{content}", this.items.join("\n") + "\n" + this.curios.join("\n"));
        const blockContent = REGISTRATION_TEMPLATE.replace("{type}", "\"block\"").replace("{content}", this.blocks.join("\n"));
        const content = [toolTierContent, armorTierContent, itemContent, blockContent].join("\n");
        fs.writeFileSync(path, content);

        function buildTagContent(tags: string[]) {
            return tags.map(tag => `event.add("${tag}", "${tag}");`).join("\n");
        }

        const serverPath = kubejsServerScriptsPath();
        const serverFolder = `${serverPath}/${this.internalNamespace}`;
        ensureFolderExists(serverFolder);
        const tagsPathFile = `${serverFolder}/tags.js`;
        const tagsFileContent = TAG_REGISTRATION_TEMPLATE.replace("{content}", buildTagContent(this.repairTags));
        fs.writeFileSync(tagsPathFile, tagsFileContent);
    }
}

export class KubeJsTagger extends BasicDataHolder<KubeJsTagger> {
    tags: { [key: string]: string[] } = {};

    tagItem(item: string, tag: string) {
        if (!this.tags[tag]) {
            this.tags[tag] = [];
        }
        this.tags[tag].push(item);
    }

    writeToFile() {
        const kjsPath = kubejsServerScriptsPath();
        const folder = `${kjsPath}/${this.internalNamespace}`;
        ensureFolderExists(folder);
        const path = `${folder}/tags.js`;
        const content = Object.keys(this.tags).map(tag => `ServerEvents.tags('item', event => {
${this.tags[tag].map(item => `  event.add("${tag}", "${item}");`).join("\n")}
});`).join("\n");
        fs.writeFileSync(path, content);
    }
}
