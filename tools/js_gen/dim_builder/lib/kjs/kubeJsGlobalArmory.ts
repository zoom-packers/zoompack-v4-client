import {
    ArmorVariant,
    BaseVariant,
    BowVariant,
    CrossbowVariant,
    ShieldVariant,
    SwordVariant,
    ToolVariant
} from "../material/ArmoryTypes";
import {ensureFolderExists, idToDisplayName, kubejsServerScriptsPath, kubejsStartupScriptsPath} from "../utils";
import fs from "fs";
import {KubeJsRecipes, RECIPES_REGISTRATION_TEMPLATE} from "./kubeJsRecipes";
import {REGISTRATION_TEMPLATE} from "./kubeJsRegistrar";


export class KubeJsGlobalArmory {
    public static readonly MOD_ID = "armoryjs";
    private static _instance: KubeJsGlobalArmory;
    public static get INSTANCE(): KubeJsGlobalArmory {
        if (this._instance == null) {
            this._instance = new KubeJsGlobalArmory();
        }
        return this._instance;
    }
    private items: BaseVariant[] = [];
    private swords: SwordVariant[] = [];
    private shields: ShieldVariant[] = [];
    private armors: ArmorVariant[] = [];
    private bows: BowVariant[] = [];
    private crossbows: CrossbowVariant[] = [];
    private tools: ToolVariant[] = [];

    addSword(sword: SwordVariant) {
        this.swords.push(sword);
    }

    addShield(shield: ShieldVariant) {
        this.shields.push(shield);
    }

    addArmor(armor: ArmorVariant) {
        this.armors.push(armor);
    }

    addBow(bow: BowVariant) {
        this.bows.push(bow);
    }

    addCrossbow(crossbow: CrossbowVariant) {
        this.crossbows.push(crossbow);
    }

    addTool(tool: ToolVariant) {
        this.tools.push(tool);
    }

    getVariantRegistrationString(variant: BaseVariant) {
        let content = `e.create("${KubeJsGlobalArmory.MOD_ID}:${variant.id}").type("${variant.type}")`;
        if (variant.type === "sword") {
            const sword = variant as SwordVariant;
            content += `.attackDamage(${sword.damageMultiplier})`;
            content += `.attackSpeed(${sword.speedMultiplier})`;
            content += `.reach(${sword.reachMultiplier})`;
        } else if (variant.type === "shield") {
            const shield = variant as ShieldVariant;
            content += `.armor(${shield.armorMultiplier})`;
            content += `.speedDebuff(${shield.speedMultiplier})`;
        } else if (variant.type === "armor") {
            const armor = variant as ArmorVariant;
            content += `.armor(${armor.armorMultiplier})`;
            content += `.toughness(${armor.toughnessMultiplier})`;
            content += `.knockbackResistance(${armor.knockbackResistanceMultiplier})`;
        } else if (variant.type === "archery") {
            const bow = variant as BowVariant;
            content += `.projectileDamage(${bow.damageMultiplier})`;
            content += `.drawSpeed(${bow.speedMultiplier})`;
        } else if (variant.type === "tool") {
            const tool = variant as ToolVariant;
            content += `.toolType("${tool.toolType}")`;
            content += `.attackDamage(${tool.damageMultiplier})`;
            content += `.harvestSpeed(${tool.speedMultiplier})`;
        }

        if (variant.additionalAttributes) {
            variant.additionalAttributes.forEach(attribute => {
                content += `.attribute("${attribute.attribute}", "${attribute.value}", "${attribute.operation}")`;
            });
        }

        content += ";";
        return content;
    }

    getVariantItemRegistrationString(variant: BaseVariant) {
        let content = `e.create("${KubeJsGlobalArmory.MOD_ID}:${variant.id}", "polymorph_${variant.type}").displayName("${variant.displayName}").variant("armoryjs:${variant.id}")`;
        if (variant.type === "armor") {
            const armor = variant as ArmorVariant;
            content += `.slot("${armor.slot}")`;
        }
        content += ";";

        return content;
    }

    // getVariantItemDependencyItemsRegistrationString(variant: BaseVariant) {
    //     const recipes = [...variant.recipe].filter(recipe => recipe.resultId !== variant.id);
    //     const itemIds = recipes.map(recipe => recipe.resultId);
    //     return itemIds.map(itemId => `e.create("${KubeJsGlobalArmory.MOD_ID}:${itemId}", "polymorph_item").displayName("${idToDisplayName(itemId)}");`).join("\n");
    // }
    //
    // getRecipeRegistrationString(variant: BaseVariant) {
    //     variant.recipe.forEach(recipe => {if (recipe.recipe.length !== 9) throw new Error(`Recipe for ${variant.id} must have 9 entries`)});
    //     return variant.recipe.map(recipe => KubeJsRecipes.craftingRecipe(
    //         `${KubeJsGlobalArmory.MOD_ID}:${recipe.resultId}`,
    //         recipe.recipe.map(entry => entry === "material" ? `#${KubeJsGlobalArmory.MOD_ID}:material` : entry),
    //         recipe.resultCount)).join("\n");
    // }

    writeToFile() {
        // [this.items, this.swords, this.shields, this.armors, this.bows, this.crossbows, this.tools].forEach(variants => {
        //     variants.forEach(variant => {
        //         if (variant.recipe.length === 0) {
        //             throw new Error(`No recipes provided for ${variant.id}`);
        //         }
        //         variant.recipe.forEach(recipe => {
        //             recipe.recipe = recipe.recipe.map(entry => {
        //                 if (entry.length !== 0 && entry !== "material" && !entry.includes(":")) {
        //                     return `${KubeJsGlobalArmory.MOD_ID}:${entry}`;
        //                 }
        //                 return entry;
        //             });
        //         });
        //     });
        // });
        // this.writeStartupScript();
        // this.writeServerScript();
    }
    

    private writeServerScript() {
        // const kjsServerScriptsPath = kubejsServerScriptsPath();
        // ensureFolderExists(kjsServerScriptsPath);
        // const serverScriptPath = `${kjsServerScriptsPath}/armory.js`;
        // const serverScriptContent =
        //     RECIPES_REGISTRATION_TEMPLATE
        //         .replace("{content}", [this.items, this.swords, this.shields, this.armors, this.bows, this.crossbows, this.tools]
        //             .map(variants => variants.map(variant => this.getRecipeRegistrationString(variant))
        //                 .join("\n")).join("\n\n")
        //         );
        // fs.writeFileSync(serverScriptPath, serverScriptContent);
    }

    private writeStartupScript() {
        // const kjsStartupScriptsPath = kubejsStartupScriptsPath();
        // ensureFolderExists(kjsStartupScriptsPath);
        // const startupScriptPath = `${kjsStartupScriptsPath}/armory.js`;
        // const startupScriptContent =
        //     REGISTRATION_TEMPLATE.replace("{type}", `"armoryjs:variant"`)
        //         .replace("{content}", [this.items, this.swords, this.shields, this.armors, this.bows, this.crossbows, this.tools]
        //             .map(variants => variants.map(variant => this.getVariantRegistrationString(variant))
        //                 .join("\n")).join("\n\n")
        //         )
        //     + "\n\n\n" +
        //     REGISTRATION_TEMPLATE.replace("{type}", `"item"`)
        //         .replace("{content}",
        //             [this.items, this.swords, this.shields, this.armors, this.bows, this.crossbows, this.tools]
        //                 .map(variants => variants.map(variant =>
        //                     this.getVariantItemRegistrationString(variant)
        //                     + "\n" +
        //                     this.getVariantItemDependencyItemsRegistrationString(variant)
        //                 )
        //                     .join("\n")).join("\n\n")
        //         );
        // fs.writeFileSync(startupScriptPath, startupScriptContent);
    }
}
