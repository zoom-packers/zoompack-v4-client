const { requireGlobal } = require("../utils/requireGlobal")
const TOML = requireGlobal("smol-toml");
const fs = require("fs");

const rootPath = "../../..";
const defaultConfigsPath = `${rootPath}/defaultconfigs`
const ironSpellbooksServerPath = `${defaultConfigsPath}/irons_spellbooks-server.toml`

const ironTomlContent = fs.readFileSync(ironSpellbooksServerPath, "utf8");
const ironToml = TOML.parse(ironTomlContent);

const spellsIds = Object.keys(ironToml.Spells);
const spells = Object.values(ironToml.Spells);
for (let spellIndex = 0; spellIndex < spells.length; spellIndex++) {
    const spellId = spellsIds[spellIndex];
    const spell = spells[spellIndex];
    spell.MaxLevel = 20;
    spell.ManaCostMultiplier = 2.5;
    spell.SpellPowerMultiplier = 2.5;
}

const newIronTomlContent = TOML.stringify(ironToml);
fs.writeFileSync(ironSpellbooksServerPath, newIronTomlContent, "utf8");
