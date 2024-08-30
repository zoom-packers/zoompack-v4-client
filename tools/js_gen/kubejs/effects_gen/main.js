const {WorkingTexture, combine} = require("../../utils/texture_util");
const {kubejsAssetsPath} = require("../../utils/path_util");
const skills = [
    {skill: 'combat', color: 14937324},
    {skill: 'swordsmanship', color: 13127231},
    {skill: 'archery', color: 8634943},
    {skill: 'magic', color: 4869045},
    {skill: 'endurance', color: 7407124},
    {skill: 'agility', color: 3857271},
    {skill: 'swimming', color: 3827157},
    {skill: 'mining', color: 6704448},
    {skill: 'woodcutting', color: 4530449},
    {skill: 'fishing', color: 9228517},
    {skill: 'farming', color: 6192150},
    {skill: 'alchemy', color: 15961002},
    {skill: 'cooking', color: 16371082},
    {skill: 'smithing', color: 4673419},
    {skill: 'crafting', color: 16701501},
    {skill: 'excavation', color: 11833187},
    {skill: 'engineering', color: 16723494},
]

const outputAssetsDir = `${kubejsAssetsPath()}/zoompack_overrides_forge`;
const outputTexturesDir = `${outputAssetsDir}/textures/mob_effect`;
const base10To16 = (num) => {
    return num.toString(16).toUpperCase();
}

async function genTextures() {
    for (const skill of skills) {
        const background = new WorkingTexture().withPath("./assets/textures/background.png")
        const glow = new WorkingTexture().withPath("./assets/textures/glow.png").withTint("#" + base10To16(skill.color))
        var result = await combine([background, glow]);
        result.toFile(`${outputTexturesDir}/${skill.skill}_xp_multiplier.png`);
    }
}

genTextures();
