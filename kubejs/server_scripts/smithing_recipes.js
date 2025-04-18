ServerEvents.recipes(event => {
    // Smithing Templates
    event.shaped('2x callfromthedepth_:immemorialupgradesmithingtemplate', ["ABA","CCC","ACA"], {"A":"callfromthedepth_:immemorialscrap","B":"callfromthedepth_:immemorialupgradesmithingtemplate","C":"callfromthedepth_:deepstone"});
    event.remove({ output: 'enderitemod:enderite_upgrade_smithing_template' })
    event.shaped('2x enderitemod:enderite_upgrade_smithing_template', ["ABA","CCC","ACA"], {"A":"minecraft:netherite_ingot","B":"enderitemod:enderite_upgrade_smithing_template","C":"minecraft:end_stone"});

    event.shaped('2x zoomers_armory:everbright_smithing_template', ['ABA', 'AAA', 'AAA'], {
        A: 'blue_skies:aquite',
        B: 'zoomers_armory:everbright_smithing_template'
    })

    event.shaped('2x zoomers_armory:aether_smithing_template', ['ABA', 'AAA', 'AAA'], {
        A: 'aether:zanite_gemstone',
        B: 'zoomers_armory:aether_smithing_template'
    })

    event.shaped('2x zoomers_armory:abyssal_smithing_template', ['ABA', 'AAA', 'AAA'], {
        A: 'theabyss:fusion_ingot',
        B: 'zoomers_armory:abyssal_smithing_template'
    })


    // Mod Item conversion:
    // Item types: sword, axe, pickaxe, shovel, hoe, helmet, chestplate, leggings, boots
    // blue skies materials: pyrope, aquite, diopside, charoite, horizonite
    let tools = ['sword', 'axe', 'pickaxe', 'shovel', 'hoe'];
    let armors = ['helmet', 'chestplate', 'leggings', 'boots'];
    let items = ['sword', 'axe', 'pickaxe', 'shovel', 'hoe', 'helmet', 'chestplate', 'leggings', 'boots'];

    function doInBulk(modId, material, oldMaterial, smithingTemplate, materialItem, skip) {
        items.forEach(i => {
            if (!!skip && skip.includes(i)) return;
            event.remove({ output: `${modId}:${material}_${i}` });
            console.log(`smithing recipe: `, `1x ${modId}:${material}_${i}`, smithingTemplate, `${modId}:${oldMaterial}_${i}`, materialItem);
            event.smithing(`1x ${modId}:${material}_${i}`, smithingTemplate, `${modId}:${oldMaterial}_${i}`, materialItem);
        })
    }
    function doArmorBulk(modId, material, oldMaterial, smithingTemplate, materialItem, skip) {
        armors.forEach(i => {
            if (!!skip && skip.includes(i)) return;
            event.remove({ output: `${modId}:${material}_${i}` });
            console.log(`smithing recipe: `, `1x ${modId}:${material}_${i}`, smithingTemplate, `${modId}:${oldMaterial}_${i}`, materialItem);
            event.smithing(`1x ${modId}:${material}_${i}`, smithingTemplate, `${modId}:${oldMaterial}_${i}`, materialItem);
        })
    }
    function doToolsBulk(modId, material, oldMaterial, smithingTemplate, materialItem, skip) {
        tools.forEach(i => {
            if (!!skip && skip.includes(i)) return;
            event.remove({ output: `${modId}:${material}_${i}` });
            console.log(`smithing recipe: `, `1x ${modId}:${material}_${i}`, smithingTemplate, `${modId}:${oldMaterial}_${i}`, materialItem);
            event.smithing(`1x ${modId}:${material}_${i}`, smithingTemplate, `${modId}:${oldMaterial}_${i}`, materialItem);
        })
    }
    function doInBulkSpecificID(newId, smithingTemplate, oldId, materialItem, skip) {
        items.forEach(i => {
            if (!!skip && skip.includes(i)) return;
            event.remove({ output: `${newId}` });
            console.log(`smithing recipe: `, `1x ${newId}_${i}`, smithingTemplate, `${oldId}`, materialItem);
            event.smithing(`1x ${newId}_${i}`, smithingTemplate, `${oldId}_${i}`, materialItem);
        })
    }
    function doArmorInBulkSpecificID(newId, smithingTemplate, oldId, materialItem, skip) {
        armors.forEach(i => {
            if (!!skip && skip.includes(i)) return;
            event.remove({ output: `${newId}` });
            console.log(`smithing recipe: `, `1x ${newId}_${i}`, smithingTemplate, `${oldId}`, materialItem);
            event.smithing(`1x ${newId}_${i}`, smithingTemplate, `${oldId}_${i}`, materialItem);
        })
    }
    function doToolsInBulkSpecificID(newId, smithingTemplate, oldId, materialItem, skip) {
        tools.forEach(i => {
            if (!!skip && skip.includes(i)) return;
            event.remove({ output: `${newId}` });
            console.log(`smithing recipe: `, `1x ${newId}_${i}`, smithingTemplate, `${oldId}`, materialItem);
            event.smithing(`1x ${newId}_${i}`, smithingTemplate, `${oldId}_${i}`, materialItem);
        })
    }



    doInBulk('blue_skies', 'aquite', 'pyrope', 'zoomers_armory:everbright_smithing_template', 'blue_skies:aquite');
    doInBulk('blue_skies', 'diopside', 'aquite', 'zoomers_armory:everbright_smithing_template', 'blue_skies:diopside_gem');
    doInBulk('blue_skies', 'charoite', 'diopside', 'zoomers_armory:everbright_smithing_template', 'blue_skies:charoite');
    doInBulk('blue_skies', 'horizonite', 'charoite', 'zoomers_armory:everbright_smithing_template', 'blue_skies:horizonite_ingot');

    // aether materials: zanite, gravitite
    doInBulk('aether', 'gravitite', 'zanite', 'zoomers_armory:aether_smithing_template', 'aether:enchanted_gravitite');

    // nether materials: cincinnasite, cincinnasite_diamond, nether_ruby, flaming_ruby, netherite
    // doInBulk('betternether', 'cincinnasite_diamond', 'cincinnasite', 'minecraft:netherite_upgrade_smithing_template', 'minecraft:diamond');
    event.remove({ output: 'betternether:cincinnasite_sword_diamond' });
    event.smithing('1x betternether:cincinnasite_sword_diamond', 'minecraft:netherite_upgrade_smithing_template', 'betternether:cincinnasite_sword', 'minecraft:diamond');
    event.remove({ output: 'betternether:cincinnasite_axe_diamond' });
    event.smithing('1x betternether:cincinnasite_axe_diamond', 'minecraft:netherite_upgrade_smithing_template', 'betternether:cincinnasite_axe', 'minecraft:diamond');
    event.remove({ output: 'betternether:cincinnasite_pickaxe_diamond' });
    event.smithing('1x betternether:cincinnasite_pickaxe_diamond', 'minecraft:netherite_upgrade_smithing_template', 'betternether:cincinnasite_pickaxe', 'minecraft:diamond');
    event.remove({ output: 'betternether:cincinnasite_shovel_diamond' });
    event.smithing('1x betternether:cincinnasite_shovel_diamond', 'minecraft:netherite_upgrade_smithing_template', 'betternether:cincinnasite_shovel', 'minecraft:diamond');
    event.remove({ output: 'betternether:cincinnasite_hoe_diamond' });
    event.smithing('1x betternether:cincinnasite_hoe_diamond', 'minecraft:netherite_upgrade_smithing_template', 'betternether:cincinnasite_hoe', 'minecraft:diamond');
    event.remove({ output: 'kubejs:cincinnasite_diamond_helmet' });
    event.smithing('1x kubejs:cincinnasite_diamond_helmet', 'minecraft:netherite_upgrade_smithing_template', 'betternether:cincinnasite_helmet', 'minecraft:diamond');
    event.remove({ output: 'kubejs:cincinnasite_diamond_chestplate' });
    event.smithing('1x kubejs:cincinnasite_diamond_chestplate', 'minecraft:netherite_upgrade_smithing_template', 'betternether:cincinnasite_chestplate', 'minecraft:diamond');
    event.remove({ output: 'kubejs:cincinnasite_diamond_leggings' });
    event.smithing('1x kubejs:cincinnasite_diamond_leggings', 'minecraft:netherite_upgrade_smithing_template', 'betternether:cincinnasite_leggings', 'minecraft:diamond');
    event.remove({ output: 'kubejs:cincinnasite_diamond_boots' });
    event.smithing('1x kubejs:cincinnasite_diamond_boots', 'minecraft:netherite_upgrade_smithing_template', 'betternether:cincinnasite_boots', 'minecraft:diamond');


    event.remove({ output: 'betternether:nether_ruby_sword' });
    event.smithing('1x betternether:nether_ruby_sword', 'minecraft:netherite_upgrade_smithing_template', 'betternether:cincinnasite_sword_diamond', 'betternether:nether_ruby');
    event.remove({ output: 'betternether:nether_ruby_axe' });
    event.smithing('1x betternether:nether_ruby_axe', 'minecraft:netherite_upgrade_smithing_template', 'betternether:cincinnasite_axe_diamond', 'betternether:nether_ruby');
    event.remove({ output: 'betternether:nether_ruby_pickaxe' });
    event.smithing('1x betternether:nether_ruby_pickaxe', 'minecraft:netherite_upgrade_smithing_template', 'betternether:cincinnasite_pickaxe_diamond', 'betternether:nether_ruby');
    event.remove({ output: 'betternether:nether_ruby_shovel' });
    event.smithing('1x betternether:nether_ruby_shovel', 'minecraft:netherite_upgrade_smithing_template', 'betternether:cincinnasite_shovel_diamond', 'betternether:nether_ruby');
    event.remove({ output: 'betternether:nether_ruby_hoe' });
    event.smithing('1x betternether:nether_ruby_hoe', 'minecraft:netherite_upgrade_smithing_template', 'betternether:cincinnasite_hoe_diamond', 'betternether:nether_ruby');
    event.remove({ output: 'betternether:nether_ruby_helmet' });
    event.smithing('1x betternether:nether_ruby_helmet', 'minecraft:netherite_upgrade_smithing_template', 'kubejs:cincinnasite_diamond_helmet', 'betternether:nether_ruby');
    event.remove({ output: 'betternether:nether_ruby_chestplate' });
    event.smithing('1x betternether:nether_ruby_chestplate', 'minecraft:netherite_upgrade_smithing_template', 'kubejs:cincinnasite_diamond_chestplate', 'betternether:nether_ruby');
    event.remove({ output: 'betternether:nether_ruby_leggings' });
    event.smithing('1x betternether:nether_ruby_leggings', 'minecraft:netherite_upgrade_smithing_template', 'kubejs:cincinnasite_diamond_leggings', 'betternether:nether_ruby');
    event.remove({ output: 'betternether:nether_ruby_boots' });
    event.smithing('1x betternether:nether_ruby_boots', 'minecraft:netherite_upgrade_smithing_template', 'kubejs:cincinnasite_diamond_boots', 'betternether:nether_ruby');

    // doInBulk('betternether', 'nether_ruby', 'cincinnasite_diamond', 'minecraft:netherite_upgrade_smithing_template', 'betternether:nether_ruby');
    doInBulk('betternether', 'flaming_ruby', 'nether_ruby', 'minecraft:netherite_upgrade_smithing_template', 'minecraft:sculk_catalyst');
    doInBulkSpecificID('minecraft:netherite', 'minecraft:netherite_upgrade_smithing_template', 'betternether:flaming_ruby', 'minecraft:netherite_ingot');

    // undergarden materials: cloggrum, froststeel, utherium, forgotten, jade
    doInBulk('undergarden', 'froststeel', 'cloggrum', 'undergarden:forgotten_upgrade_smithing_template', 'undergarden:froststeel_ingot');
    doInBulk('undergarden', 'utherium', 'froststeel', 'undergarden:forgotten_upgrade_smithing_template', 'undergarden:utherium_crystal');
    doToolsInBulkSpecificID( "call_of_yucutan:jade", 'undergarden:forgotten_upgrade_smithing_template', 'undergarden:utherium', 'call_of_yucutan:jade');
    doArmorInBulkSpecificID( "call_of_yucutan:jades", 'undergarden:forgotten_upgrade_smithing_template', 'undergarden:utherium', 'call_of_yucutan:jade');
    doToolsInBulkSpecificID('undergarden:forgotten', 'undergarden:forgotten_upgrade_smithing_template', 'call_of_yucutan:jade', 'undergarden:forgotten_ingot');

    // end materials: crystaline, dragon, enderite <<<<<<<<<<========
    event.smithing('1x ender_dragon_loot_:dragon_armor_helmet', 'enderitemod:enderite_upgrade_smithing_template', 'zoomers_armory:crystalline_helmet', 'ender_dragon_loot_:dragon_scale');
    event.smithing('1x ender_dragon_loot_:dragon_armor_chestplate', 'enderitemod:enderite_upgrade_smithing_template', 'zoomers_armory:crystalline_chestplate', 'ender_dragon_loot_:dragon_scale');
    event.smithing('1x ender_dragon_loot_:dragon_armor_leggings', 'enderitemod:enderite_upgrade_smithing_template', 'zoomers_armory:crystalline_leggings', 'ender_dragon_loot_:dragon_scale');
    event.smithing('1x ender_dragon_loot_:dragon_armor_boots', 'enderitemod:enderite_upgrade_smithing_template', 'zoomers_armory:crystalline_boots', 'ender_dragon_loot_:dragon_scale');
    event.smithing('1x ender_dragon_loot_:dragon_sword', 'enderitemod:enderite_upgrade_smithing_template', 'phantasm:crystalline_sword', 'ender_dragon_loot_:dragon_scale');
    event.smithing('1x ender_dragon_loot_:dragon_axe', 'enderitemod:enderite_upgrade_smithing_template', 'phantasm:crystalline_axe', 'ender_dragon_loot_:dragon_scale');
    event.smithing('1x ender_dragon_loot_:dragon_picaxe', 'enderitemod:enderite_upgrade_smithing_template', 'phantasm:crystalline_pickaxe', 'ender_dragon_loot_:dragon_scale');
    event.smithing('1x ender_dragon_loot_:dragon_shovel', 'enderitemod:enderite_upgrade_smithing_template', 'phantasm:crystalline_shovel', 'ender_dragon_loot_:dragon_scale');
    event.smithing('1x ender_dragon_loot_:dragon_hoe', 'enderitemod:enderite_upgrade_smithing_template', 'phantasm:crystalline_hoe', 'ender_dragon_loot_:dragon_scale');
    
    event.smithing('1x enderitemod:enderite_helmet', 'enderitemod:enderite_upgrade_smithing_template', 'ender_dragon_loot_:dragon_armor_helmet', 'enderitemod:enderite_ingot');
    event.smithing('1x enderitemod:enderite_chestplate', 'enderitemod:enderite_upgrade_smithing_template', 'ender_dragon_loot_:dragon_armor_chestplate', 'enderitemod:enderite_ingot');
    event.smithing('1x enderitemod:enderite_leggings', 'enderitemod:enderite_upgrade_smithing_template', 'ender_dragon_loot_:dragon_armor_leggings', 'enderitemod:enderite_ingot');
    event.smithing('1x enderitemod:enderite_boots', 'enderitemod:enderite_upgrade_smithing_template', 'ender_dragon_loot_:dragon_armor_boots', 'enderitemod:enderite_ingot');
    event.smithing('1x enderitemod:enderite_sword', 'enderitemod:enderite_upgrade_smithing_template', 'ender_dragon_loot_:dragon_sword', 'enderitemod:enderite_ingot');
    event.smithing('1x enderitemod:enderite_axe', 'enderitemod:enderite_upgrade_smithing_template', 'ender_dragon_loot_:dragon_axe', 'enderitemod:enderite_ingot');
    event.smithing('1x enderitemod:enderite_pickaxe', 'enderitemod:enderite_upgrade_smithing_template', 'ender_dragon_loot_:dragon_picaxe', 'enderitemod:enderite_ingot');
    event.smithing('1x enderitemod:enderite_shovel', 'enderitemod:enderite_upgrade_smithing_template', 'ender_dragon_loot_:dragon_shovel', 'enderitemod:enderite_ingot');
    event.smithing('1x enderitemod:enderite_hoe', 'enderitemod:enderite_upgrade_smithing_template', 'ender_dragon_loot_:dragon_hoe', 'enderitemod:enderite_ingot');

    doArmorBulk('theabyss', 'aberythe_armor', 'fusion_armor', 'zoomers_armory:abyssal_smithing_template', 'theabyss:aberythe_gem');
    doToolsBulk('theabyss', 'aberythe', 'fusion', 'zoomers_armory:abyssal_smithing_template', 'theabyss:aberythe_gem');

    doArmorBulk('theabyss', 'ignisithe_armor', 'aberythe_armor', 'zoomers_armory:abyssal_smithing_template', 'theabyss:ignisithe_gem');
    doToolsBulk('theabyss', 'ignisithe', 'aberythe', 'zoomers_armory:abyssal_smithing_template', 'theabyss:ignisithe_gem', ['axe', 'pickaxe', 'hoe', 'shovel']);
    doToolsBulk('theabyss', 'knight', 'ignisithe', 'zoomers_armory:abyssal_smithing_template', 'theabyss:fixed_bone', ['axe', 'pickaxe', 'shovel', 'hoe']);

    doArmorBulk('theabyss', 'glacerythe_armor', 'ignisithe_armor', 'zoomers_armory:abyssal_smithing_template', 'theabyss:glacerythe_gem');   
    
    doArmorBulk('theabyss', 'garnite_armor', 'glacerythe_armor', 'zoomers_armory:abyssal_smithing_template', 'theabyss:garnite_ingot');
    
    doArmorBulk('theabyss', 'phantom_armor', 'garnite_armor', 'zoomers_armory:abyssal_smithing_template', 'theabyss:phantom_ingot');
    doToolsBulk('theabyss', 'phantom', 'garnite', 'zoomers_armory:abyssal_smithing_template', 'theabyss:phantom_ingot');
    
    doArmorBulk('theabyss', 'unorithe_armor', 'phantom_armor', 'zoomers_armory:abyssal_smithing_template', 'theabyss:unorithe_ingot');
    doToolsBulk('theabyss', 'unorithe', 'phantom', 'zoomers_armory:abyssal_smithing_template', 'theabyss:unorithe_ingot', ['pickaxe']);
    event.smithing('1x theabyss:unorithe_pick_axe', 'zoomers_armory:abyssal_smithing_template', 'theabyss:phantom_pickaxe', 'theabyss:unorithe_ingot');

    doArmorBulk('theabyss', 'incorythe_armor', 'unorithe_armor', 'zoomers_armory:abyssal_smithing_template', 'theabyss:incorythe_gem');
    doToolsBulk('theabyss', 'incorythe', 'unorithe', 'zoomers_armory:abyssal_smithing_template', 'theabyss:incorythe_gem', ['pickaxe']);
    event.smithing('1x theabyss:incorythe_pickaxe', 'zoomers_armory:abyssal_smithing_template', 'theabyss:unorithe_pick_axe', 'theabyss:incorythe_gem');

});
