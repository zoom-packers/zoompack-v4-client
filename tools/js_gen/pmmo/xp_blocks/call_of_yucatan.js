const {Template} = require('./template.js');

const jade = Template.build()
    .withTagFor("call_of_yucatan:jade_ore")
    .withTagFor("call_of_yucatan:deepslate_jade_ore")
    .withBreakXpValue('mining', 60)
    .withPlaceXpValue('mining', 10);

const ores = [
    jade
];

module.exports = {
    ores
}
