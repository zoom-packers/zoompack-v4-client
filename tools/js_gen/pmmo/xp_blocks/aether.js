const {Template} = require('./template.js');
const {item_aether} = require("../../typedefs/item_typedefs");

const ambrosium = Template.build()
    .withTagFor(item_aether.i_ambrosium_ore)
    .withBreakXpValue('mining', 240)
    .withPlaceXpValue('mining', 10);

const zanite = Template.build()
    .withTagFor(item_aether.i_zanite_ore)
    .withBreakXpValue('mining', 300)
    .withPlaceXpValue('mining', 10);

const gravitite = Template.build()
    .withTagFor(item_aether.i_gravitite_ore)
    .withBreakXpValue('mining', 300)
    .withPlaceXpValue('mining', 10);

const ores = [
    ambrosium,
    zanite,
    gravitite
];

module.exports = {
    ores
}
