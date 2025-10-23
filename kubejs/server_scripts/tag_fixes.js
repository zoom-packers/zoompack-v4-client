ServerEvents.tags('item', event => {
    event.remove('forge:coffee_beans', 'farmersrespite:coffee_beans')
    event.remove('forge:coffees', 'farmersdelight:coffee')
    event.removeAll('farmersrespite:tea_leaves')
    event.removeAll('fabric:mineable/needs_tool_level_0')
    event.removeAll('fabric:mineable/needs_tool_level_1')
    event.removeAll('fabric:mineable/needs_tool_level_2')
    event.removeAll('fabric:mineable/needs_tool_level_3')
    event.removeAll('fabric:mineable/needs_tool_level_4')

    event.remove('quark:vertical_slabs', 'outer_end:azure_vertical_slab')

    let zoompackOresTag = 'zoompack:ores';
    let logTag = 'minecraft:logs';

    let minecraftNormalOres = ['minecraft:coal_ore','minecraft:iron_ore','minecraft:copper_ore','minecraft:gold_ore','minecraft:diamond_ore','minecraft:redstone_ore','minecraft:emerald_ore','minecraft:lapis_ore'];
    let minecraftDeepslateOres = ['minecraft:deepslate_coal_ore','minecraft:deepslate_iron_ore','minecraft:deepslate_copper_ore','minecraft:deepslate_gold_ore','minecraft:deepslate_diamond_ore','minecraft:deepslate_redstone_ore','minecraft:deepslate_emerald_ore','minecraft:deepslate_lapis_ore'];
    let minecraftNetherOres = ['minecraft:nether_gold_ore','minecraft:nether_quartz_ore'];
    let betterNetherOres = ['betternether:cincinnasite_ore', 'betternether:nether_ruby_ore', 'betternether:nether_lapis_ore', 'betternether:nether_redstone_ore'];
    let undergardenOres = ['undergarden:depthrock_coal_ore','undergarden:shiverstone_coal_ore','undergarden:depthrock_iron_ore','undergarden:shiverstone_iron_ore','undergarden:depthrock_gold_ore','undergarden:depthrock_diamond_ore','undergarden:shiverstone_diamond_ore','undergarden:depthrock_cloggrum_ore','undergarden:shiverstone_cloggrum_ore','undergarden:shiverstone_froststeel_ore','undergarden:depthrock_utherium_ore','undergarden:shiverstone_utherium_ore','undergarden:depthrock_regalium_ore','undergarden:shiverstone_regalium_ore','undergarden:tremblecrust_utherium_ore'];
    let blueSkiesOres = ['blue_skies:everbright_moonstone_ore','blue_skies:everdawn_moonstone_ore','blue_skies:everbright_pyrope_ore','blue_skies:everdawn_pyrope_ore','blue_skies:everbright_aquite_ore','blue_skies:everdawn_aquite_ore','blue_skies:everbright_diopside_ore','blue_skies:everdawn_diopside_ore','blue_skies:everbright_charoite_ore','blue_skies:everdawn_charoite_ore','blue_skies:falsite_ore','blue_skies:ventium_ore','blue_skies:horizonite_ore','blue_skies:everbright_emerald_ore','blue_skies:everdawn_emerald_ore'];
    let aetherOres = ['aether:ambrosium_ore','aether:zanite_ore','aether:gravitite_ore'];
    let meadowOres = ['meadow:alpine_salt_ore','meadow:alpine_coal_ore','meadow:alpine_lapis_ore','meadow:alpine_gold_ore','meadow:alpine_emerald_ore','meadow:alpine_iron_ore','meadow:alpine_copper_ore','meadow:alpine_diamond_ore','meadow:alpine_redstone_ore'];
    let createOres = ['create:zinc_ore','create:deepslate_zinc_ore'];
    let allOres = minecraftNormalOres.concat(minecraftDeepslateOres).concat(minecraftNetherOres).concat(betterNetherOres).concat(undergardenOres).concat(blueSkiesOres).concat(aetherOres).concat(meadowOres).concat(createOres);

    allOres.forEach(block=>{
        event.add(zoompackOresTag, block);
    })

    let logFix = ['newer_caves:grassy_wood','newer_caves:grassy_log','newer_caves:glowing_wood','newer_caves:glowing_log','newer_caves:magma_wood','newer_caves:magma_log', 'newer_caves:violet_wood','newer_caves:violet_log', 'newer_caves:darkness_infused_wood','newer_caves:darkness_infused_log'];

    logFix.forEach(block=>{
        event.add(logTag, block);
    })
});
