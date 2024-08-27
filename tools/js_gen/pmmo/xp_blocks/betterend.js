const {Template} = require('./template.js');
const {item_betterend} = require("../../typedefs/item_typedefs");

const ender = Template.build()
    .withTagFor(item_betterend.i_ender_ore)
    .withBreakXpValue('mining', 750)
    .withPlaceXpValue('mining', 10);

const amber = Template.build()
    .withTagFor(item_betterend.i_amber_ore)
    .withBreakXpValue('mining', 850)
    .withPlaceXpValue('mining', 10);

const thallasium = Template.build()
    .withTagFor(item_betterend.i_thallasium_ore)
    .withBreakXpValue('mining', 850)
    .withPlaceXpValue('mining', 10);

const ores = [
    ender,
    amber,
    thallasium
];

module.exports = {
    ores
}
