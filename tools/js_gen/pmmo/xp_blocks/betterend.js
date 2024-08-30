const {Template} = require('./template.js');
const {item_enlightened_end} = require("../../typedefs/item_typedefs");

const malachite = Template.build()
    .withTagFor(item_enlightened_end.i_malachite_ore)
    .withBreakXpValue('mining', 750)
    .withPlaceXpValue('mining', 10);

const irradium = Template.build()
    .withTagFor(item_enlightened_end.i_irradium_ore)
    .withBreakXpValue('mining', 850)
    .withPlaceXpValue('mining', 10);

const bismuth = Template.build()
    .withTagFor(item_enlightened_end.i_bismuth_ore)
    .withBreakXpValue('mining', 850)
    .withPlaceXpValue('mining', 10);

const ores = [
    malachite,
    irradium,
    bismuth
];

module.exports = {
    ores
}
