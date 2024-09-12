import {BasicDataHolder} from "../selfWritingJson";
import {IArmory} from "./IArmory";
import {ChromaKeyOperation} from "./ArmoryTypes";
import {Material} from "./material";
import {idToDisplayName} from "../utils";

export class PolymorphMaterial extends BasicDataHolder<PolymorphMaterial> implements IArmory<PolymorphMaterial> {
    id: string = "";
    displayName: string = "";
    craftingMaterial: string = "";
    pmmoLevel: number = 0;
    durability: number = 1;
    harvestLevel: number = 0;
    harvestSpeed: number = 0;
    baseDamage: number = 0;
    baseArmor: number = 0;
    baseArmorToughness: number = 0;
    baseArmorKnockbackResistance: number = 0;
    color: string = "#ffffff";
    chromaKeyOperations: ChromaKeyOperation[] = [];

    withId(id: string) {
        this.id = id;
        return this;
    }

    withDisplayName(name: string) {
        this.displayName = name;
        return this;
    }

    withColor(color: string) {
        this.color = color;
        return this;
    }

    withChromaKey(colorToReplace: string, tolerance: number, functionType: "linear" | "square" | "cubic", replaceWith: string) {
        this.chromaKeyOperations.push({colorToReplace, tolerance, function: functionType, replaceWith});
        return this;
    }

    withChromaKeys(chromaKeyOperations: ChromaKeyOperation[]) {
        this.chromaKeyOperations = chromaKeyOperations;
        return this;
    }

    withCraftingMaterial(craftingMaterial: string) {
        this.craftingMaterial = craftingMaterial;
        return this;
    }

    withPmmoLevel(level: number) {
        this.pmmoLevel = level;
        return this;
    }

    withDurability(durability: number) {
        this.durability = durability;
        return this;
    }

    withHarvestLevel(harvestLevel: number) {
        this.harvestLevel = harvestLevel;
        return this;
    }

    withToolSpeed(harvestSpeed: number) {
        this.harvestSpeed = harvestSpeed;
        return this;
    }

    withBaseDamage(baseDamage: number) {
        this.baseDamage = baseDamage;
        return this;
    }

    withBaseArmor(baseArmor: number) {
        this.baseArmor = baseArmor;
        return this;
    }

    withArmorToughness(baseArmorToughness: number) {
        this.baseArmorToughness = baseArmorToughness;
        return this;
    }

    withKnockbackResistance(baseArmorKnockbackResistance: number) {
        this.baseArmorKnockbackResistance = baseArmorKnockbackResistance;
        return this;
    }

    withMaterial(material: Material): PolymorphMaterial {
        return this.withId(material.internalName)
            .withDisplayName(idToDisplayName(material.internalName))
            .withCraftingMaterial(material.ore.getSmeltedMaterialId())
            .withColor(material.color)
            .withHarvestLevel(material.level)
    }

    async build() {
        this.kubeJsContainer.armory.addMaterial(this);
    }
}
