import {BasicDataHolder} from "../selfWritingJson";
import {ensureFolderExists, kubejsServerScriptsPath, readScriptTemplate} from "../utils";
import fs from "fs";

export class KubeJsLoot extends BasicDataHolder<KubeJsLoot> {
    ores: { blockId: string, noSilkTouchDropId: string }[] = [];

    withOreLoot(blockId: string, noSilkTouchDropId: string) {
        this.ores.push({blockId, noSilkTouchDropId});
        return this;
    }

    writeToFile() {
        const template = readScriptTemplate("loot_js.js");
        const kjsPath = kubejsServerScriptsPath();
        const folder = `${kjsPath}/${this.internalNamespace}`;
        ensureFolderExists(folder);
        const path = `${folder}/loot.js`;
        const content = this.ores.map(ore => `ores.push({ blockId: "${ore.blockId}", noSilkTouchDropId: "${ore.noSilkTouchDropId}" });`).join("\n    ");
        const finalContent = template.replace("// ADD ORES HERE", content);
        fs.writeFileSync(path, finalContent);
    }
}
