const {Template} = require('./template.js');
const {item_betterend} = require("../../typedefs/item_typedefs");

const malachite = Template.build()
    .withTagFor('enlightened_end:malachite_ore')
    .withBreakXpValue('mining', 750)
    .withPlaceXpValue('mining', 10);

const irradium = Template.build()
    .withTagFor('enlightened_end:irradium_ore')
    .withBreakXpValue('mining', 850)
    .withPlaceXpValue('mining', 10);

const bismuth = Template.build()
    .withTagFor('enlightened_end:bismuth_ore')
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
