import {SelfWritingJson} from "./selfWritingJson";
import {loadJsonFromPath, paxiDatapacksPath, replaceStringPropertyRecursive} from "./utils";

export class LootTable extends SelfWritingJson {
    static outputPath = "data/<internalNamespace>/loot_tables<subfolder>/<internalName>.json";
    type: string = "minecraft:block";
    pools: any[] = [];
    subFolder: string = ""

    constructor(name: string = "", namespace: string = "") {
        super(namespace, name, LootTable.outputPath);
    }

    override updateFilePath() {
        this.filePath = `${paxiDatapacksPath()}/${this.internalNamespace}/${this.template.replace("<internalNamespace>", this.internalNamespace).replace("<internalName>", this.internalName).replace("<subfolder>", this.subFolder)}`;
    }

    withSubFolder(subFolder: string) {
        this.subFolder = subFolder;
        return this;
    }

    static OreBlock(blockId: string, noSilkTouchDropId: string) {
        const lootTable = new LootTable()
        lootTable.fromTemplate(loadJsonFromPath(`./mc/data/loot_tables/blocks/diamond_ore.json`))
        replaceStringPropertyRecursive(lootTable, "minecraft:diamond_ore", blockId);
        replaceStringPropertyRecursive(lootTable, "minecraft:diamond", noSilkTouchDropId);
        lootTable.withName(blockId.split(":")[1]).withSubFolder("/blocks");
        return lootTable;
    }
}
