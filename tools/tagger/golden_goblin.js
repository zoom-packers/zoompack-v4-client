import {getAllItems, createTag} from "./lib.js";

const items = getAllItems();
const goldenMaterials = [
    'pyrope',
    'zanite',
    'cincinnasite',
    'jade',
    'crystalline',
    'marble',
    'aberythe'
]

let golden_armor_tags = [];
goldenMaterials.forEach(material => {
    const matches = items.filter(item => (item.includes(material) &&
        (item.includes('helmet') || item.includes('chestplate') || item.includes('leggings') || item.includes('boots')) &&
        !item.includes('diamond')
    ));
    golden_armor_tags = [...golden_armor_tags, ...matches];
    // const matchesCount = matches.length;
    // console.log(material, matchesCount);
})
createTag('medievalorigins:golden_armor', 'items', golden_armor_tags);
// console.log(golden_armor_tags.length);

let golden_tools_tags = [];
goldenMaterials.forEach(material => {
    const matches = items.filter(item => (item.includes(material) &&
        (item.includes('axe') || item.includes('pickaxe') || item.includes('shovel') || item.includes('hoe')) &&
        !item.includes('diamond') && !item.includes('battleaxe')
    ));
    golden_tools_tags = [...golden_tools_tags, ...matches];
    // const matchesCount = matches.length;
    // console.log(material, matches);
})
// console.log(golden_armor_tags.length);
createTag('medievalorigins:golden_tools', 'items', golden_tools_tags);

let golden_weapons_tags = [];
goldenMaterials.forEach(material => {
    const matches = items.filter(item => (item.includes(material) &&
        (   item.includes('claws') || item.includes('dagger') || item.includes('sword') || item.includes('cutlass')  ||
            item.includes('mace') || item.includes('hammer') || item.includes('battleaxe') || item.includes('spear') ||
            item.includes('halberd') || item.includes('scythe') || item.includes('katana') || item.includes('twinblade') ||
            item.includes('sai') || item.includes('musashi') || item.includes('warglaive')) &&
        !item.includes('diamond')
    ));
    golden_weapons_tags = [...golden_weapons_tags, ...matches];
    // const matchesCount = matches.length;
    // console.log(material, matches);
})
// console.log(golden_armor_tags.length);
createTag('medievalorigins:golden_weapons', 'items', golden_weapons_tags);


let golden_ranged_tags = [];
goldenMaterials.forEach(material => {
    const matches = items.filter(item => (item.includes(material) &&
        (   item.includes('bow')) &&
        !item.includes('diamond')
    ));
    golden_ranged_tags = [...golden_ranged_tags, ...matches];
    // const matchesCount = matches.length;
    // console.log(material, matches);
})
// console.log(golden_armor_tags.length);
createTag('medievalorigins:golden_ranged', 'items', golden_ranged_tags);


let golden_staff_tags = [];
goldenMaterials.forEach(material => {
    const matches = items.filter(item => (item.includes(material) &&
        (   item.includes('staff')) &&
        !item.includes('diamond')
    ));
    golden_staff_tags = [...golden_staff_tags, ...matches];
    // const matchesCount = matches.length;
    // console.log(material, matches);
})
// console.log(golden_armor_tags.length);
createTag('medievalorigins:golden_staff', 'items', golden_staff_tags);
