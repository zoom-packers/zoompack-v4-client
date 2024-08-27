const {Template} = require('./template.js');
const {item_blue_skies} = require("../../typedefs/item_typedefs");

const moonstone = Template.build()
    .withTagFor(item_blue_skies.i_everdawn_moonstone_ore)
    .withTagFor(item_blue_skies.i_everbright_moonstone_ore)
    .withBreakXpValue('mining', 60)
    .withPlaceXpValue('mining', 10);

const pyrope = Template.build()
    .withTagFor(item_blue_skies.i_everbright_pyrope_ore)
    .withTagFor(item_blue_skies.i_everdawn_pyrope_ore)
    .withBreakXpValue('mining', 70)
    .withPlaceXpValue('mining', 10);

const aquite = Template.build()
    .withTagFor(item_blue_skies.i_everdawn_aquite_ore)
    .withTagFor(item_blue_skies.i_everbright_aquite_ore)
    .withBreakXpValue('mining', 70)
    .withPlaceXpValue('mining', 10);

const diopside = Template.build()
    .withTagFor(item_blue_skies.i_everdawn_diopside_ore)
    .withTagFor(item_blue_skies.i_everbright_diopside_ore)
    .withBreakXpValue('mining', 70)
    .withPlaceXpValue('mining', 10);

const charoite = Template.build()
    .withTagFor(item_blue_skies.i_everdawn_charoite_ore)
    .withTagFor(item_blue_skies.i_everbright_charoite_ore)
    .withBreakXpValue('mining', 90)
    .withPlaceXpValue('mining', 10);

const emerald = Template.build()
    .withTagFor(item_blue_skies.i_everbright_emerald_ore)
    .withTagFor(item_blue_skies.i_everdawn_emerald_ore)
    .withBreakXpValue('mining', 150)
    .withPlaceXpValue('mining', 10);


const falsite = Template.build()
    .withTagFor(item_blue_skies.i_falsite_ore)
    .withBreakXpValue('mining', 100)
    .withPlaceXpValue('mining', 10);

const ventium = Template.build()
    .withTagFor(item_blue_skies.i_ventium_ore)
    .withBreakXpValue('mining', 100)
    .withPlaceXpValue('mining', 10);

const horizonite = Template.build()
    .withTagFor(item_blue_skies.i_horizonite_ore)
    .withBreakXpValue('mining', 200)
    .withPlaceXpValue('mining', 10);

const ores = [
    moonstone,
    pyrope,
    aquite,
    diopside,
    charoite,
    emerald,
    falsite,
    ventium,
    horizonite,
];

module.exports = {
    ores
}
