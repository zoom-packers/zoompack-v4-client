// @ts-ignore
import fs from "fs";
import {BasicDataHolder} from "../selfWritingJson";
import {ensureFolderExists, kubejsStartupScriptsPath} from "../utils";
import {KubeJSBlock, KubeJsItem} from "./kubeJsItem";

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
    tier.repairIngredient = "{repairIngredient}"
  });`
const ARMOR_TIER_TEMPLATE = `  event.add("{id}", tier => {
    tier.durabilityMultiplier = {durabilityMultiplier} // Each slot will be multiplied with [13, 15, 16, 11]
    tier.slotProtections = [{slotProtections}] // Slot indicies are [FEET, LEGS, BODY, HEAD] 
    tier.enchantmentValue = {enchantmentValue}
    tier.equipSound = 'minecraft:item.armor.equip_iron'
    tier.repairIngredient = "{repairIngredient}" // #forge:ingots/iron'
    tier.toughness = {toughness} // diamond has 2.0, netherite 3.0
    tier.knockbackResistance = {knockbackResistance} // diamond has 0.0, netherite 0.1
  });`

export class KubeJsRegistrar extends BasicDataHolder<KubeJsRegistrar> {
    items: string[] = [];
    blocks: string[] = [];
    toolTiers: string[] = [];
    armorTiers: string[] = [];

    registerBlock(id: string, displayName: string) {
        this.blocks.push(new KubeJSBlock().withId(id).withDisplayName(displayName).toString());
    }

    registerOreBlock(id: string, displayName: string) {
        this.blocks.push(new KubeJSBlock().withId(id).withDisplayName(displayName).withRequiresTool(true).withMaterial("stone").toString());
    }

    registerItem(id: string, displayName: string, durability?: number) {
        this.items.push(new KubeJsItem().withId(id).withDisplayName(displayName).withDurability(durability).toString());
    }

    registerArmoryItem(id: string, type: string, displayName: string, durability: number) {
        this.items.push(new KubeJsItem().withId(id).withType(type).withDisplayName(displayName).withDurability(durability).toString());
    }

    registerTieredItem(id: string, type: string, displayName: string, tier: string) {
        this.items.push(new KubeJsItem().withId(id).withType(type).withDisplayName(displayName).withTier(tier).toString());
    }

    registerToolTier(id: string, uses: number, speed: number, attackDamageBonus: number, level: number, enchantmentValue: number, repairIngredient: string) {
        this.toolTiers.push(TOOL_TIER_TEMPLATE.replace("{id}", id).replace("{uses}", uses.toString()).replace("{speed}", speed.toString()).replace("{attackDamageBonus}", attackDamageBonus.toString()).replace("{level}", level.toString()).replace("{enchantmentValue}", enchantmentValue.toString()).replace("{repairIngredient}", repairIngredient));
    }

    registerArmorTier(id: string, durabilityMultiplier: number, slotProtections: number[], enchantmentValue: number, repairIngredient: string, toughness: number, knockbackResistance: number) {
        this.armorTiers.push(ARMOR_TIER_TEMPLATE.replace("{id}", id).replace("{durabilityMultiplier}", durabilityMultiplier.toString()).replace("{slotProtections}", slotProtections.toString()).replace("{enchantmentValue}", enchantmentValue.toString()).replace("{repairIngredient}", repairIngredient).replace("{toughness}", toughness.toString()).replace("{knockbackResistance}", knockbackResistance.toString()));
    }

    writeToFile() {
        const kjsPath = kubejsStartupScriptsPath();
        const folder = `${kjsPath}/${this.internalNamespace}`;
        ensureFolderExists(folder);
        const path = `${folder}/registrar.js`;
        const toolTierContent = TOOL_TIER_REGISTRY_TEMPLATE.replace("{content}", this.toolTiers.join("\n"));
        const armorTierContent = ARMOR_TIER_REGISTRY_TEMPLATE.replace("{content}", this.armorTiers.join("\n"));
        const itemContent = REGISTRATION_TEMPLATE.replace("{type}", "\"item\"").replace("{content}", this.items.join("\n"));
        const blockContent = REGISTRATION_TEMPLATE.replace("{type}", "\"block\"").replace("{content}", this.blocks.join("\n"));
        const content = [toolTierContent, armorTierContent, itemContent, blockContent].join("\n");
        fs.writeFileSync(path, content);
    }
}

