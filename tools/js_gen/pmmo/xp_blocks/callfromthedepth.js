const {Template} = require('./template.js');

const marble = Template.build()
    .withTagFor("callfromthedepth_:marble_ore")
    .withBreakXpValue('mining', 900)
    .withPlaceXpValue('mining', 10);

const ores = [
    marble
];

module.exports = {
    ores
}
