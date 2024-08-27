const {Template} = require('./template.js');
const {item_betternether} = require("../../typedefs/item_typedefs");

const cincinnasite = Template.build()
    .withTagFor(item_betternether.i_cincinnasite_ore)
    .withBreakXpValue('mining', 300)
    .withPlaceXpValue('mining', 10);

const nether_ruby = Template.build()
    .withTagFor(item_betternether.i_nether_ruby_ore)
    .withBreakXpValue('mining', 400)
    .withPlaceXpValue('mining', 10);

const nether_lapis = Template.build()
    .withTagFor(item_betternether.i_nether_lapis_ore)
    .withBreakXpValue('mining', 350)
    .withPlaceXpValue('mining', 10);

const nether_redstone = Template.build()
    .withTagFor(item_betternether.i_nether_redstone_ore)
    .withBreakXpValue('mining', 350)
    .withPlaceXpValue('mining', 10);

const ores = [
    cincinnasite,
    nether_ruby,
    nether_lapis,
    nether_redstone
];

module.exports = {
    ores
}
