const {Template} = require('./template.js');
const {item_theabyss} = require("../../typedefs/item_typedefs");

const fusion = Template.build()
    .withTagFor(item_theabyss.i_fusion_ore)
    .withBreakXpValue('mining', 1000)
    .withPlaceXpValue('mining', 10);

const loran = Template.build()
    .withTagFor(item_theabyss.i_loran_ore)
    .withTagFor(item_theabyss.i_loran_end_ore)
    .withBreakXpValue('mining', 1000)
    .withPlaceXpValue('mining', 10);

const garnite = Template.build()
    .withTagFor(item_theabyss.i_garnite_ore)
    .withBreakXpValue('mining', 1000)
    .withPlaceXpValue('mining', 10);

const ignisithe = Template.build()
    .withTagFor(item_theabyss.i_ignisithe_ore)
    .withBreakXpValue('mining', 1000)
    .withPlaceXpValue('mining', 10);

const glacerythe = Template.build()
    .withTagFor(item_theabyss.i_glacerythe_ore)
    .withBreakXpValue('mining', 1000)
    .withPlaceXpValue('mining', 10);

const aberythe = Template.build()
    .withTagFor(item_theabyss.i_aberythe_ore)
    .withBreakXpValue('mining', 1000)
    .withPlaceXpValue('mining', 10);

const incorythe = Template.build()
    .withTagFor(item_theabyss.i_incorythe_ore)
    .withBreakXpValue('mining', 1000)
    .withPlaceXpValue('mining', 10);

const diamond = Template.build()
    .withTagFor(item_theabyss.i_diamond_variant)
    .withBreakXpValue('mining', 1100)
    .withPlaceXpValue('mining', 10);

const gold = Template.build()
    .withTagFor(item_theabyss.i_gold_variant)
    .withBreakXpValue('mining', 950)
    .withPlaceXpValue('mining', 10);

const iron = Template.build()
    .withTagFor(item_theabyss.i_iron_variant)
    .withBreakXpValue('mining', 850)
    .withPlaceXpValue('mining', 10);

const emerald = Template.build()
    .withTagFor(item_theabyss.i_emerald_variant)
    .withBreakXpValue('mining', 1200)
    .withPlaceXpValue('mining', 10);

const ores = [
    fusion,
    loran,
    garnite,
    ignisithe,
    glacerythe,
    aberythe,
    incorythe,
    diamond,
    gold,
    iron,
    emerald
];

module.exports = {
    ores
}
