import {ExpansionPack} from "./lib/expansionPack";
import {armoryMaterials} from "./expansions/armory/materials";
import {existingMaterials, pickaxeLevelModifications, pickaxeLevels} from "./expansions/armory/ores";
import {Config} from "./lib/config";
import {Debug} from "./lib/debug";

Config.instance.skipAssets = false;

const expansionPack = new ExpansionPack()
    .withNamespace("zoomers_armory")
    .withName("Zoomers Armory")
    .withHarvestLevels(pickaxeLevels)
    .withVanillaModifications(pickaxeLevelModifications)
    .withMaterials(armoryMaterials)
    .withMaterials(existingMaterials)

async function build() {
    await expansionPack.build()
    expansionPack.validate();
    await expansionPack.writeSelf();
    Debug.printActionStatistics();
}

build()
