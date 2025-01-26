import {rootPath} from "../utils";
import exp from "node:constants";

export enum operation {
    ADDITION = "ADDITION",
    MULTIPLY_BASE = "MULTIPLY_BASE",
    MULTIPLY_TOTAL = "MULTIPLY_TOTAL",
    LOWERCASE_ADDITION = "addition",
    LOWERCASE_MULTIPLY_BASE = "multiply_base",
    LOWERCASE_MULTIPLY_TOTAL = "multiply_total",
}

/**
 * A CIA attribute modifier
 */
export interface CiaModifier {
    uuid?: string | undefined;
    attribute: string;
    value: number;
    operation: operation;
}

export class CiaModifierBuilder {
    static create(attribute: string, operation: operation, value: number): CiaModifier {
        return {
            attribute,
            operation,
            value
        }
    }
}

/**
 * A CIA entry
 */
export interface CiaEntry {
    item: string;
    overrides_off_hand: CiaModifier[];
    overrides_main_hand: CiaModifier[];
    overrides_head: CiaModifier[];
    overrides_chest: CiaModifier[];
    overrides_legs: CiaModifier[];
    overrides_feet: CiaModifier[];
    unbreakable: boolean;
}

/**
 * A CIA
 */
export interface Cia {
    items: CiaEntry[];
}

/**
 * Create an attribute modifier for the given attribute, operation, and value.
 * @param attribute {string} - The attribute to modify
 * @param operation {operation} - The operation to perform on the attribute
 * @param value {number} - The value to modify the attribute by
 * @returns {CiaModifier}
 */
export function createCiaModifier(attribute, operation, value) {
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
export function createCiaEntry(item) {
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
export function createCiaHelmet(item, attributeModifiers, unbreakable = false) {
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
export function createCiaChestplate(item, attributeModifiers, unbreakable = false) {
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
export function createCiaLeggings(item, attributeModifiers, unbreakable = false) {
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
export function createCiaBoots(item, attributeModifiers, unbreakable = false) {
    const entry = createCiaEntry(item);
    entry.overrides_feet = attributeModifiers;
    entry.unbreakable = unbreakable;
    return entry;
}

export function createCiaGenericArmor(item, attributeModifiers, type, unbreakable = false) {
    const entry = createCiaEntry(item);
    switch (type) {
        case "helmet":
            entry.overrides_head = attributeModifiers;
            break;
        case "chestplate":
            entry.overrides_chest = attributeModifiers;
            break;
        case "leggings":
            entry.overrides_legs = attributeModifiers;
            break;
        case "boots":
            entry.overrides_feet = attributeModifiers;
            break;
    }
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
export function createCiaOffhand(item, attributeModifiers, unbreakable = false) {
    const entry = createCiaEntry(item);
    entry.overrides_off_hand = attributeModifiers;
    entry.unbreakable = unbreakable;
    return entry;
}

/**
 * Create a CIA main hand with the given item, attribute modifiers, and unbreakable flag
 * @param item {string} - The item id
 * @param attributeModifiers {CiaModifier[]} - The attribute modifiers to apply to the item
 * @param unbreakable {boolean} - Whether the item should be unbreakable
 * @returns {CiaEntry} - The CIA entry
 */
export function createCiaMainHand(item, attributeModifiers, unbreakable = false) {
    const entry = createCiaEntry(item);
    entry.overrides_main_hand = attributeModifiers;
    entry.unbreakable = unbreakable;
    return entry;
}

export function getCiaPath() {
    return `${rootPath()}/config/custom_item_attributes.json5`
}

/**
 * Add an item to the CIA
 * @param cia {Cia} - The CIA to add the item to
 * @param entry {CiaEntry} - The entry to add to the CIA
 */
export function addItemToCia(cia, entry) {
    const entryIndex = cia.items.findIndex(x => x.item === entry.item);
    if (entryIndex === -1) {
        cia.items.push(entry);
    } else {
        cia.items[entryIndex] = entry;
    }
}
