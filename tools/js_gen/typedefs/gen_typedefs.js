const fs = require('fs');
const {replaceAll} = require("../utils/string_utils");
const MOD_TEMPLATE = `
/**
 * Auto-generated Enum
 * @readonly
 * @enum {string}
 */
const {{MODID}} = {
    {{values}}
};
`;
const MOD_TS_TEMPLATE = `
export enum {{MODID}} {
    {{values}}
}`;
const TYPE_TEMPLATE = `
/**
 * Auto-generated Typedef
 * @typedef {{{CHILDREN}}} {{TYPE}}
 */
`
const TYPE_TS_TEMPLATE = `
export type {{TYPE}} = {{CHILDREN}};
`
const EXPORT_TEMPLATE = `
module.exports = {
    {{values}}
}
`
const dumpsPath = "../../configs"

function createItemEnumTypedefs(inputPath, template, outputPath, prefix, replaceDots = true) {
    const registryPath = `${dumpsPath}/${inputPath}`;
    const registryContent = fs.readFileSync(registryPath, 'utf8');
    let entries = registryContent.split('\r\n').filter(entry => entry.length > 0).map( entry => replaceAll(entry, '-','_'));
    if (replaceDots) {
        entries = entries.map(entry => replaceAll(entry, ".", "_"));
    }
    const modIds = removeDuplicates(entries.map(entry => entry.split(":")[0]));
    const perModEntries = modIds.map(modId => entries.filter(entry => entry.startsWith(modId)));
    let resultStr = "";
    for (const modId of modIds) {
        let modStr = "";
        const entries = perModEntries[modIds.indexOf(modId)];
        let enumNames = entries.map(entry => entry.toLowerCase().substring(entry.indexOf(":") + 1).replace("/","_").replace(/\//g, "_"));
        enumNames = enumNames.map(entry => replaceAll(entry, ".", "_"));
        for (let i = 0; i < enumNames.length; i++) {
            modStr += `/** @type {string} */\n`
            modStr += `${prefix.toLowerCase()[0]}_${enumNames[i]}: "${entries[i]}",\n`;
        }
        const result = template.replace("{{values}}", modStr).replace("{{MODID}}", prefix + "_" + modId.toLowerCase());
        resultStr += result;
        resultStr += "\n\n\n";
    }
    const modIdEnums = modIds.map(modId => prefix + "_" + modId.toLowerCase());
    const modIdEnumStr = modIdEnums.join(" | ");

    const typeDef = TYPE_TEMPLATE.replace("{{CHILDREN}}", modIdEnumStr).replace("{{TYPE}}", prefix);
    resultStr += typeDef;

    const exportStr = EXPORT_TEMPLATE.replace("{{values}}", modIdEnums.join(", "));
    resultStr += exportStr;

    fs.writeFileSync(`./${outputPath}`, resultStr);
}

function createItemTSEnumTypedefs(inputPath, template, outputPath, prefix, replaceDots = true) {
    const registryPath = `${dumpsPath}/${inputPath}`;
    const registryContent = fs.readFileSync(registryPath, 'utf8');
    let entries = registryContent.split('\r\n').filter(entry => entry.length > 0).map( entry => replaceAll(entry, '-','_'));
    if (replaceDots) {
        entries = entries.map(entry => replaceAll(entry, ".", "_"));
    }
    const modIds = removeDuplicates(entries.map(entry => entry.split(":")[0]));
    const perModEntries = modIds.map(modId => entries.filter(entry => entry.startsWith(modId)));
    let resultStr = "";
    for (const modId of modIds) {
        let modStr = "";
        const entries = perModEntries[modIds.indexOf(modId)];
        let enumNames = entries.map(entry => entry.toLowerCase().substring(entry.indexOf(":") + 1).replace("/","_").replace(/\//g, "_"));
        enumNames = enumNames.map(entry => replaceAll(entry, ".", "_"));
        for (let i = 0; i < enumNames.length; i++) {
            modStr += `${prefix.toLowerCase()[0]}_${enumNames[i]} = "${entries[i]}",\n`;
        }
        const result = template.replace("{{values}}", modStr).replace("{{MODID}}", prefix + "_" + modId.toLowerCase());
        resultStr += result;
        resultStr += "\n\n\n";
    }
    const modIdEnums = modIds.map(modId => prefix + "_" + modId.toLowerCase());
    const modIdEnumStr = modIdEnums.join(" | ");

    const typeDef = TYPE_TS_TEMPLATE.replace("{{CHILDREN}}", modIdEnumStr).replace("{{TYPE}}", prefix);
    resultStr += typeDef;

    const exportStr = EXPORT_TEMPLATE.replace("{{values}}", modIdEnums.join(", "));
    resultStr += exportStr;

    fs.writeFileSync(`./${outputPath}`, resultStr);
}

function removeDuplicates(arr) {
    return [...new Set(arr)];
}

createItemEnumTypedefs("item_registry_dump", MOD_TEMPLATE, "item_typedefs.js","item");
createItemEnumTypedefs("block_registry_dump", MOD_TEMPLATE, "block_typedefs.js","block");
createItemEnumTypedefs("entity_registry_dump", MOD_TEMPLATE, "entity_typedefs.js","entity");
createItemEnumTypedefs("dimension_registry_dump", MOD_TEMPLATE, "dimension_typedefs.js","dimension");
createItemEnumTypedefs("biome_registry_dump", MOD_TEMPLATE, "biome_typedefs.js","biome");
createItemEnumTypedefs("loot_table_registry_dump", MOD_TEMPLATE, "loot_table_typedefs.js","loot_table");
createItemEnumTypedefs("attribute_registry_dump", MOD_TEMPLATE, "attribute_typedefs.js","attribute", false);

createItemTSEnumTypedefs("item_registry_dump", MOD_TS_TEMPLATE, "item_typedefs.ts","item");
createItemTSEnumTypedefs("block_registry_dump", MOD_TS_TEMPLATE, "block_typedefs.ts","block");
createItemTSEnumTypedefs("entity_registry_dump", MOD_TS_TEMPLATE, "entity_typedefs.ts","entity");
createItemTSEnumTypedefs("dimension_registry_dump", MOD_TS_TEMPLATE, "dimension_typedefs.ts","dimension");
createItemTSEnumTypedefs("biome_registry_dump", MOD_TS_TEMPLATE, "biome_typedefs.ts","biome");
createItemTSEnumTypedefs("loot_table_registry_dump", MOD_TS_TEMPLATE, "loot_table_typedefs.ts","loot_table");
createItemTSEnumTypedefs("attribute_registry_dump", MOD_TS_TEMPLATE, "attribute_typedefs.ts","attribute", false);

