const {Template} = require('./template.js');
const {item_undergarden} = require("../../typedefs/item_typedefs");

const coal = Template.build()
    .withTagFor(item_undergarden.i_depthrock_coal_ore)
    .withTagFor(item_undergarden.i_shiverstone_coal_ore)
    .withBreakXpValue('mining', 450)
    .withPlaceXpValue('mining', 10);

const iron = Template.build()
    .withTagFor(item_undergarden.i_depthrock_iron_ore)
    .withTagFor(item_undergarden.i_shiverstone_iron_ore)
    .withBreakXpValue('mining', 500)
    .withPlaceXpValue('mining', 10);

const gold = Template.build()
    .withTagFor(item_undergarden.i_depthrock_gold_ore)
    .withBreakXpValue('mining', 550)
    .withPlaceXpValue('mining', 10);

const diamond = Template.build()
    .withTagFor(item_undergarden.i_depthrock_diamond_ore)
    .withTagFor(item_undergarden.i_shiverstone_diamond_ore)
    .withBreakXpValue('mining', 600)
    .withPlaceXpValue('mining', 10);

const cloggrum = Template.build()
    .withTagFor(item_undergarden.i_depthrock_cloggrum_ore)
    .withTagFor(item_undergarden.i_shiverstone_cloggrum_ore)
    .withBreakXpValue('mining', 700)
    .withPlaceXpValue('mining', 10);

const froststeel = Template.build()
    .withTagFor(item_undergarden.i_shiverstone_froststeel_ore)
    .withBreakXpValue('mining', 650)
    .withPlaceXpValue('mining', 10);

const utherium = Template.build()
    .withTagFor(item_undergarden.i_depthrock_utherium_ore)
    .withTagFor(item_undergarden.i_shiverstone_utherium_ore)
    .withTagFor(item_undergarden.i_tremblecrust_utherium_ore)
    .withBreakXpValue('mining', 650)
    .withPlaceXpValue('mining', 10);

const ores = [
    coal,
    iron,
    gold,
    diamond,
    cloggrum,
    froststeel,
    utherium
];

module.exports = {
    ores
}
