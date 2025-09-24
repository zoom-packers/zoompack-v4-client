import fs from "fs-extra";
import {LootTableRegistry} from "../../lib/vfs/vfsRegistry";

async function main() {
    const lootTableRegistry = new LootTableRegistry();
    await lootTableRegistry.load()

    fs.writeFileSync("lootTableRegistry.json", JSON.stringify(lootTableRegistry.keys()), "utf-8");

    const rl = `irons_spellbooks:chests\\additional_nether_loot`;
    const reader = lootTableRegistry.get(rl);
    const content = reader();

    fs.writeFileSync("additional_nether_loot.json", JSON.stringify(JSON.parse(content as string), null, 4), 'utf8');
}

main();
