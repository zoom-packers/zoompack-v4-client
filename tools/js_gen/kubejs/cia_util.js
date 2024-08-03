
/**
 * Auto-generated Enum
 * @readonly
 * @enum {string}
 */
const operation = {
    ADDITION: "ADDITION",
    MULTIPLY_BASE: "MULTIPLY_BASE",
    MULTIPLY_TOTAL: "MULTIPLY_TOTAL",
};

/**
 * A CIA attribute modifier
 * @typedef {Object} CiaModifier
 * @property {string} attribute - The attribute to modify
 * @property {number} value - The value to modify the attribute by
 * @property {operation} operation - The operation to perform on the attribute
 */

/**
 * A CIA entry
 * @typedef {Object} CiaEntry
 * @property {string} item - The item id
 * @property {CiaModifier[]} overrides_off_hand - The attribute modifiers to apply to the off hand
 * @property {CiaModifier[]} overrides_main_hand - The attribute modifiers to apply to the main hand
 * @property {CiaModifier[]} overrides_head - The attribute modifiers to apply to the head
 * @property {CiaModifier[]} overrides_chest - The attribute modifiers to apply to the chest
 * @property {CiaModifier[]} overrides_legs - The attribute modifiers to apply to the legs
 * @property {CiaModifier[]} overrides_feet - The attribute modifiers to apply to the feet
 * @property {boolean} unbreakable - Whether the item should be unbreakable
 */

/**
 * A CIA
 * @typedef {Object} Cia
 * @property {CiaEntry[]} items - The entries in the CIA
 */

/**
 * Create an attribute modifier for the given attribute, operation, and value.
 * @param attribute {string} - The attribute to modify
 * @param operation {operation} - The operation to perform on the attribute
 * @param value {number} - The value to modify the attribute by
 * @returns {CiaModifier}
 */
function createCiaModifier(attribute, operation, value) {
    return {
        attribute,
        value,
        operation,
    };
}

/**
 * Create a CIA entry with the given item
 * @param item {string} - The item id
 * @returns {CiaEntry} - The CIA entry
 */
function createCiaEntry(item) {
    return {
        item,
        overrides_off_hand: [],
        overrides_main_hand: [],
        overrides_head: [],
        overrides_chest: [],
        overrides_legs: [],
        overrides_feet: [],
        unbreakable: false
    }
}

/**
 * Create a CIA helmet with the given item, attribute modifiers, and unbreakable flag
 * @param item {string} - The item id to apply the modifiers to
 * @param attributeModifiers {CiaModifier[]} - The attribute modifiers to apply to the item
 * @param unbreakable {boolean} - Whether the item should be unbreakable
 * @returns {CiaEntry} - The CIA entry
 */
function createCiaHelmet(item, attributeModifiers, unbreakable = false) {
    const entry = createCiaEntry(item);
    entry.overrides_head = attributeModifiers;
    entry.unbreakable = unbreakable;
    return entry;
}

/**
 * Create a CIA chestplate with the given item, attribute modifiers, and unbreakable flag
 * @param item {string} - The item id to apply the modifiers to
 * @param attributeModifiers {CiaModifier[]} - The attribute modifiers to apply to the item
 * @param unbreakable {boolean} - Whether the item should be unbreakable
 * @returns {CiaEntry} - The CIA entry
 */
function createCiaChestplate(item, attributeModifiers, unbreakable = false) {
    const entry = createCiaEntry(item);
    entry.overrides_chest = attributeModifiers;
    entry.unbreakable = unbreakable;
    return entry;
}

/**
 * Create a CIA leggings with the given item, attribute modifiers, and unbreakable flag
 * @param item {string} - The item id to apply the modifiers to
 * @param attributeModifiers {CiaModifier[]} - The attribute modifiers to apply to the item
 * @param unbreakable {boolean} - Whether the item should be unbreakable
 * @returns {CiaEntry} - The CIA entry
 */
function createCiaLeggings(item, attributeModifiers, unbreakable = false) {
    const entry = createCiaEntry(item);
    entry.overrides_legs = attributeModifiers;
    entry.unbreakable = unbreakable;
    return entry;
}

/**
 * Create a CIA boots with the given item, attribute modifiers, and unbreakable flag
 * @param item {string} - The item id to apply the modifiers to
 * @param attributeModifiers {CiaModifier[]} - The attribute modifiers to apply to the item
 * @param unbreakable {boolean} - Whether the item should be unbreakable
 * @returns {CiaEntry} - The CIA entry
 */
function createCiaBoots(item, attributeModifiers, unbreakable = false) {
    const entry = createCiaEntry(item);
    entry.overrides_feet = attributeModifiers;
    entry.unbreakable = unbreakable;
    return entry;
}

/**
 * Create a CIA offhand with the given item, attribute modifiers, and unbreakable flag
 * @param item {string}
 * @param attributeModifiers {CiaModifier[]} - The attribute modifiers to apply to the item
 * @param unbreakable {boolean} - Whether the item should be unbreakable
 * @returns {CiaEntry} - The CIA entry
 */
function createCiaOffhand(item, attributeModifiers, unbreakable = false) {
    const entry = createCiaEntry(item);
    entry.overrides_off_hand = attributeModifiers;
    entry.unbreakable = unbreakable;
    return entry;
}

/**
 * Add an item to the CIA
 * @param cia {Cia} - The CIA to add the item to
 * @param entry {CiaEntry} - The entry to add to the CIA
 */
function addItemToCia(cia, entry) {
    const entryIndex = cia.items.findIndex(x => x.item === entry.item);
    if (entryIndex === -1) {
        cia.items.push(entry);
    } else {
        cia.items[entryIndex] = entry;
    }
}

module.exports = {
    operation,
    createCiaModifier,
    createCiaHelmet,
    createCiaChestplate,
    createCiaLeggings,
    createCiaBoots,
    createCiaOffhand,
    addItemToCia
}
