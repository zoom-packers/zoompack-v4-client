// @ts-ignore
import fs from "fs";
import {BasicDataHolder} from "../selfWritingJson";
import {ensureFolderExists, kubejsServerScriptsPath} from "../utils";

export const RECIPES_REGISTRATION_TEMPLATE =`
ServerEvents.recipes(event => { 
{content}
});
`
const craftingTemplate = `event.shaped('{resultCount}x {resultId}', {recipePattern}, {recipeItems});`
const shapelessTemplate = `event.shapeless('{resultCount}x {resultId}', {recipeItems});`
const smithingTemplate = `event.smithing('{resultCount}x {resultId}', '{baseId}', '{additionId}');`
const smeltingTemplate = `event.smelting('{resultCount}x {resultId}', '{inputId}');`
const blastingTemplate = `event.blasting('{resultCount}x {resultId}', '{inputId}');`
const smokingTemplate = `event.smoking('{resultCount}x {resultId}', '{inputId}');`
const campfireCookingTemplate = `event.campfire_cooking('{resultCount}x {resultId}', '{inputId}');`

export type RecipeType = "crafting" | "shapeless" | "smithing" | "smelting" | "blasting" | "smoking" | "campfire_cooking";

export type CraftingRecipe = {
    type: "crafting",
    resultId: string,
    recipe: string[],
    resultCount?: number
}

export class KubeJsRecipes extends BasicDataHolder<KubeJsRecipes> {
    recipes: string[] = [];

    static craftingRecipe(resultId, recipe, resultCount = 1) {
        if (recipe.length !== 9) {
            throw new Error('Recipe must have 9 items. Use null for empty slots.');
        }
        const identifiers = "ABCDEFGHI";
        let shapeStr = "";
        for (let i = 0; i < 9; i++) {
            if (recipe[i] === null) {
                shapeStr += " ";
            } else {
                shapeStr += identifiers[i];
            }
            if (i % 3 === 2) {
                shapeStr += ",";
            }
        }
        const shape = shapeStr.slice(0, -1).split(',');
        const maps = {};
        for (let i = 0; i < 9; i++) {
            if (recipe[i] !== null) {
                maps[identifiers[i]] = recipe[i];
            }
        }
        return craftingTemplate.replace('{resultId}', resultId).replace('{recipePattern}', JSON.stringify(shape)).replace('{recipeItems}', JSON.stringify(maps)).replace('{resultCount}', resultCount.toString());
    }

    static shapelessRecipe(resultId, recipeItems, resultCount = 1) {
        return shapelessTemplate.replace('{resultId}', resultId).replace('{recipeItems}', JSON.stringify(recipeItems)).replace('{resultCount}', resultCount.toString());
    }

    static smithingRecipe(resultId, baseId, additionId, resultCount = 1) {
        return smithingTemplate.replace('{resultId}', resultId).replace('{baseId}', baseId).replace('{additionId}', additionId).replace('{resultCount}', resultCount.toString());
    }

    static smeltingRecipe(resultId, inputId, resultCount = 1) {
        return smeltingTemplate.replace('{resultId}', resultId).replace('{inputId}', inputId).replace('{resultCount}', resultCount.toString());
    }

    static blastingRecipe(resultId, inputId, resultCount = 1) {
        return blastingTemplate.replace('{resultId}', resultId).replace('{inputId}', inputId).replace('{resultCount}', resultCount.toString());
    }

    static smokingRecipe(resultId, inputId, resultCount = 1) {
        return smokingTemplate.replace('{resultId}', resultId).replace('{inputId}', inputId).replace('{resultCount}', resultCount.toString());
    }

    static campfireCookingRecipe(resultId, inputId, resultCount = 1) {
        return campfireCookingTemplate.replace('{resultId}', resultId).replace('{inputId}', inputId).replace('{resultCount}', resultCount.toString());
    }

    craftingRecipe(resultId, recipe, resultCount = 1) {
        this.recipes.push(KubeJsRecipes.craftingRecipe(resultId, recipe, resultCount));
    }

    shapelessRecipe(resultId, recipeItems, resultCount = 1) {
        this.recipes.push(KubeJsRecipes.shapelessRecipe(resultId, recipeItems, resultCount));
    }

    smithingRecipe(resultId, baseId, additionId, resultCount = 1) {
        this.recipes.push(KubeJsRecipes.smithingRecipe(resultId, baseId, additionId, resultCount));
    }

    smeltingRecipe(resultId, inputId, resultCount = 1) {
        this.recipes.push(KubeJsRecipes.smeltingRecipe(resultId, inputId, resultCount));
    }

    blastingRecipe(resultId, inputId, resultCount = 1) {
        this.recipes.push(KubeJsRecipes.blastingRecipe(resultId, inputId, resultCount));
    }

    smokingRecipe(resultId, inputId, resultCount = 1) {
        this.recipes.push(KubeJsRecipes.smokingRecipe(resultId, inputId, resultCount));
    }

    campfireCookingRecipe(resultId, inputId, resultCount = 1) {
        this.recipes.push(KubeJsRecipes.campfireCookingRecipe(resultId, inputId, resultCount));
    }

    writeToFile() {
        const kjsPath = kubejsServerScriptsPath();
        const folder = `${kjsPath}/${this.internalNamespace}`;
        ensureFolderExists(folder);
        const path = `${folder}/recipes.js`;
        const content = RECIPES_REGISTRATION_TEMPLATE.replace("{content}", this.recipes.join("\n"));
        fs.writeFileSync(path, content);
    }
}

