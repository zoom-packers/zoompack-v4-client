import {IBasicDataHolder} from "../selfWritingJson";
import {ChromaKeyOperation} from "./ArmoryTypes";
import {Material} from "./material";

export interface IArmory<T> extends IBasicDataHolder<IArmory<T>> {
    id: string;
    displayName: string;
    craftingMaterial: string;
    pmmoLevel: number;
    durability: number;
    harvestLevel: number;
    harvestSpeed: number;
    baseDamage: number;
    baseArmor: number;
    baseArmorToughness: number;
    baseArmorKnockbackResistance: number;
    color: string;
    chromaKeyOperations: ChromaKeyOperation[];

    withId(id: string): T;

    withDisplayName(name: string): T;

    withColor(color: string): T;

    withChromaKey(colorToReplace: string, tolerance: number, functionType: "linear" | "square" | "cubic", replaceWith: string): T;

    withChromaKeys(chromaKeyOperations: ChromaKeyOperation[]): T;

    withCraftingMaterial(craftingMaterial: string): T;

    withPmmoLevel(level: number): T;

    withDurability(durability: number): T;

    withHarvestLevel(harvestLevel: number): T;

    withToolSpeed(harvestSpeed: number): T;

    withBaseDamage(baseDamage: number): T;

    withBaseArmor(baseArmor: number): T;

    withArmorToughness(baseArmorToughness: number): T;

    withKnockbackResistance(baseArmorKnockbackResistance: number): T;

    build(): Promise<void>;

    withMaterial(mateiral: Material): T;
}
