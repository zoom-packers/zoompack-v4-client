# Zoompack Content Forge

Zoompack Content Forge is a tool for generating Minecraft content such as datapacks, KubeJS scripts, and configurations for various mods like Custom Item Attributes and Harvest Level Tweaker. This project aims to streamline the creation and management of custom Minecraft content.

## Features

- Generate custom materials with specific properties
- Create and configure biomes and dimensions
- Define and replace structures within the game
- Seamlessly integrate with mods like KubeJS, Custom Item Attributes, and Harvest Level Tweaker

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Pandaismyname1/zoompack-content-forge.git
    cd zoompack-content-forge
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Usage

### Running the Main Script

The main script generates the content included inside it. Feel free to modify the script to include your own custom content.

```sh
npm start
```

### Example

Below is an example of how to define and generate custom content using the main script:

```typescript
import { DimensionType } from "./lib/worldgen/dimensionType";
import { Dimension, DimensionBiome } from "./lib/worldgen/dimension";
import { Biome } from "./lib/worldgen/biome";
import { loadJsonFromPath } from "./lib/utils";
import { ExpansionPack } from "./lib/expansionPack";
import { Material } from "./lib/material/material";
import { Ore } from "./lib/material/ore";
import { OreFeatureConfiguration, VARIANTS } from "./lib/material/oreFeatureConfiguration";
import { OreFeaturePlacement } from "./lib/material/oreFeaturePlacement";
import { Armory } from "./lib/material/armory";
import { ItemTextureWrapper } from "./lib/textureGen/itemTextureWrapper";
import { StructureDefinition } from "./lib/worldgen/structureDefinition";
import { NbtStructure, ReplaceBlockCommand } from "./lib/worldgen/nbtStructure";
import { StructureSet } from "./lib/worldgen/structureSet";
import { Structure } from "./lib/worldgen/structure";

const dataTemplatePath = "./mc/data";

const material = new Material()
    .withName("vibranium")
    .withColor("#8cd58c")
    .withOre(new Ore()
        .withMiningLevel(2)
        .withRawMaterialTexture(new ItemTextureWrapper()
            .fromAssets("item/raw_copper", false)
            .withChromaKey("#aa3d25", 0.2, "linear", "#168716")
            .withChromaKey("#3a7663", 0.2, "linear", "#1519bb"))
        .withConfig(new OreFeatureConfiguration()
            .withSize(10)
            .withStoneReplacement()
            .withDeepslateReplacement())
        .withPlacement(new OreFeaturePlacement()
            .withHeightRange(-64, 64)
            .withCount(30))
        .withVariants([VARIANTS.STONE, VARIANTS.DEEPSLATE]))
    .withArmory(new Armory()
        .full());

const biome = new Biome("test_biome")
    .fromTemplate(loadJsonFromPath(`${dataTemplatePath}/worldgen/biome/forest.json`))
    .removeMobs()
    .withSkyColor("#094e52")
    .withFogColor("#b3e6b3")
    .withWaterColor("#061127")
    .withWaterFogColor("#061127")
    .withFoliageColor("#3f76e4")
    .withGrassColor("#094560")
    .withMonsterMob("minecraft:warden", 1, 4, 4)
    .withOresPlacements(material.ore.placements);

const dimensionType = new DimensionType("test_dim_type");
const dimension = new Dimension("test_dim")
    .fromTemplate(loadJsonFromPath(`${dataTemplatePath}/dimension/overworld.json`))
    .removeBiomes()
    .withDimensionType(dimensionType)
    .withBiome(new DimensionBiome().fromBiome(biome)
        .withTemperature(0, 1)
        .withHumidity(0, 1)
        .withContinentalness(0, 1)
        .withErosion(0, 1)
        .withWeirdness(0, 1)
        .withDepth(0)
        .withOffset(0));

const structureMap: ReplaceBlockCommand[] = [
    { oldBlock: 'minecraft:dark_oak_log', newBlock: 'minecraft:warped_stem' },
    { oldBlock: 'minecraft:air', newBlock: 'minecraft:air' },
    { oldBlock: 'minecraft:dark_oak_fence', newBlock: 'minecraft:warped_fence' },
    { oldBlock: 'minecraft:dark_oak_slab', newBlock: 'minecraft:warped_slab' },
    { oldBlock: 'minecraft:dark_oak_stairs', newBlock: 'minecraft:warped_stairs' },
    { oldBlock: 'minecraft:jigsaw', newBlock: 'minecraft:jigsaw' },
    { oldBlock: 'minecraft:crafting_table', newBlock: 'minecraft:crafting_table' },
    { oldBlock: 'minecraft:white_wool', newBlock: 'minecraft:blue_wool' },
    { oldBlock: 'minecraft:pumpkin', newBlock: 'minecraft:blue_ice' },
    { oldBlock: 'minecraft:hay_block', newBlock: 'minecraft:prismarine' },
    { oldBlock: 'minecraft:carved_pumpkin', newBlock: 'minecraft:sea_lantern' },
    { oldBlock: 'minecraft:cobblestone', newBlock: 'minecraft:prismarine_bricks' },
    { oldBlock: 'minecraft:birch_planks', newBlock: 'minecraft:warped_planks' },
    { oldBlock: 'minecraft:dark_oak_planks', newBlock: 'minecraft:warped_planks' },
    { oldBlock: 'minecraft:cobblestone_stairs', newBlock: 'minecraft:prismarine_brick_stairs' },
    { oldBlock: 'minecraft:cobblestone_slab', newBlock: 'minecraft:prismarine_brick_slab' },
    { oldBlock: 'minecraft:cobblestone_wall', newBlock: 'minecraft:prismarine_wall' },
    { oldBlock: 'minecraft:torch', newBlock: 'minecraft:soul_torch' },
    { oldBlock: 'minecraft:white_wall_banner', newBlock: 'minecraft:blue_banner' },
    { oldBlock: 'minecraft:chest', newBlock: 'minecraft:chest' },
    { oldBlock: 'minecraft:mossy_cobblestone', newBlock: 'minecraft:warped_nylium' },
    { oldBlock: 'minecraft:vine', newBlock: 'minecraft:twisting_vines' },
    { oldBlock: 'minecraft:mossy_cobblestone_stairs', newBlock: 'minecraft:warped_nylium' },
    { oldBlock: 'minecraft:mossy_cobblestone_slab', newBlock: 'minecraft:warped_slab' },
    { oldBlock: 'minecraft:mossy_cobblestone_wall', newBlock: 'minecraft:prismarine_wall' }
];

async function main() {
    const structure = await new StructureDefinition("pillager_outpost", "kjs-test")
        .fromTemplate("./mc/data/worldgen/structure_set/pillager_outposts.json");
    structure.replaceBlocks(structureMap)
        .removeBiomes()
        .onBiomes([biome]);

    const expansionPack = new ExpansionPack()
        .withNamespace("kjs-test")
        .withName("KubeJS Datagen Test")
        .withDimensionType(dimensionType)
        .withDimension(dimension)
        .withBiome(biome)
        .withMaterial(material)
        .withStructure(structure);

    await expansionPack.build();
    expansionPack.validate();
    await expansionPack.writeSelf();
    console.log("Done");
}

main();
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

## License

Distributed under the MIT License. See `LICENSE` for more information.
```
