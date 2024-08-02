const {item} = require("../libs/item_typedefs");

const craftingTemplate = `
event.shaped('{resultCount}x {resultId}', {recipePattern}, {recipeItems});
`
const shapelessTemplate = `
event.shapeless('{resultCount}x {resultId}', {recipeItems});
`
const smithingTemplate = `
event.smithing('{resultCount}x {resultId}', '{baseId}', '{additionId}');
`
const smeltingTemplate = `
event.smelting('{resultCount}x {resultId}', '{inputId}');
`
const blastingTemplate = `
event.blasting('{resultCount}x {resultId}', '{inputId}');
`
const smokingTemplate = `
event.smoking('{resultCount}x {resultId}', '{inputId}');
`
const campfireCookingTemplate = `
event.campfire_cooking('{resultCount}x {resultId}', '{inputId}');
`

/**
 * Generates a crafting recipe
 * @param resultId {item} - The result item
 * @param recipe {item[9]} - The recipe pattern
 * @param resultCount {number} - The result count
 */
function craftingRecipe(resultId, recipe, resultCount = 1) {
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
    return craftingTemplate.replace('{resultId}', resultId).replace('{recipePattern}', JSON.stringify(shape)).replace('{recipeItems}', JSON.stringify(maps)).replace('{resultCount}', resultCount);
}

/**
 * Generates a shapeless recipe
 * @param resultId {item} - The result item
 * @param recipeItems {item[]} - The recipe
 * @param resultCount {number} - The result count
 * @returns {string} - The generated recipe
 */
function shapelessRecipe(resultId, recipeItems, resultCount = 1) {
    return shapelessTemplate.replace('{resultId}', resultId).replace('{recipeItems}', JSON.stringify(recipeItems)).replace('{resultCount}', resultCount);
}

/**
 * Generates a smithing recipe
 * @param resultId {item} - The result item
 * @param baseId {item} - The base item
 * @param additionId {item} - The addition item
 * @param resultCount {number} - The result count
 * @returns {string} - The generated recipe
 */
function smithingRecipe(resultId, baseId, additionId, resultCount = 1) {
    return smithingTemplate.replace('{resultId}', resultId).replace('{baseId}', baseId).replace('{additionId}', additionId).replace('{resultCount}', resultCount);
}

/**
 * Generates a smelting recipe
 * @param resultId {item} - The result item
 * @param inputId {item} - The input item
 * @param resultCount {number} - The result count
 * @returns {string} - The generated recipe
 */
function smeltingRecipe(resultId, inputId, resultCount = 1) {
    return smeltingTemplate.replace('{resultId}', resultId).replace('{inputId}', inputId).replace('{resultCount}', resultCount);
}

/**
 * Generates a blasting recipe
 * @param resultId {item}
 * @param inputId {item}
 * @param resultCount {number}
 * @returns {string} - The generated recipe
 */
function blastingRecipe(resultId, inputId, resultCount = 1) {
    return blastingTemplate.replace('{resultId}', resultId).replace('{inputId}', inputId).replace('{resultCount}', resultCount);
}

/**
 * Generates a smoking recipe
 * @param resultId {item}
 * @param inputId {item}
 * @param resultCount {number}
 * @returns {string} - The generated recipe
 */
function smokingRecipe(resultId, inputId, resultCount = 1) {
    return smokingTemplate.replace('{resultId}', resultId).replace('{inputId}', inputId).replace('{resultCount}', resultCount);
}

/**
 * Generates a campfire cooking recipe
 * @param resultId {item} - The result item
 * @param inputId {item} - The input item
 * @param resultCount {number} - The result count
 * @returns {string} - The generated recipe
 */
function campfireCookingRecipe(resultId, inputId, resultCount = 1) {
    return campfireCookingTemplate.replace('{resultId}', resultId).replace('{inputId}', inputId).replace('{resultCount}', resultCount);
}

module.exports = {
    craftingRecipe,
    shapelessRecipe,
    smithingRecipe,
    smeltingRecipe,
    blastingRecipe,
    smokingRecipe,
    campfireCookingRecipe
}

