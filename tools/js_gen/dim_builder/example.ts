import {DimensionType} from "./lib/worldgen/dimensionType";
import {Dimension, DimensionBiome} from "./lib/worldgen/dimension";
import {Biome} from "./lib/worldgen/biome";
import {loadJsonFromPath} from "./lib/utils";
import {ExpansionPack} from "./lib/expansionPack";
import {Material} from "./lib/material/material";
import {Ore} from "./lib/material/ore";
import {OreFeatureConfiguration, VARIANTS} from "./lib/material/oreFeatureConfiguration";
import {OreFeaturePlacement} from "./lib/material/oreFeaturePlacement";
import {Armory} from "./lib/material/armory";
import {ItemTextureWrapper} from "./lib/textureGen/itemTextureWrapper";
import {StructureDefinition} from "./lib/worldgen/structureDefinition";
import {ReplaceBlockCommand} from "./lib/worldgen/nbtStructure";
import {ChromaCreator} from "./lib/material/ArmoryTypes";

const dataTemplatePath = "./mc/data"


// const structure = new StructureDefinition("watchtower")
//     .withNbt(new NbtStructure()
//         .fromTemplateNbt("./mc/data/structures/pillager_outpost/watchtower.nbt")
//         .replaceBlock("minecraft:dark_oak_planks", "minecraft:redstone_block")
//         .replaceEntity("minecraft:iron_golem", "minecraft:zombie"))
//     .withStuctureSetJson(new StructureSet())
//     .withStructureJson(new Structure()
//         .onBiomes([biome]))

const structureMap: ReplaceBlockCommand[] = [
    {
        oldBlock: 'minecraft:dark_oak_log',
        newBlock: 'minecraft:warped_stem'
    },
    { oldBlock: 'minecraft:air', newBlock: 'minecraft:air' },
    {
        oldBlock: 'minecraft:dark_oak_fence',
        newBlock: 'minecraft:warped_fence'
    },
    {
        oldBlock: 'minecraft:dark_oak_slab',
        newBlock: 'minecraft:warped_slab'
    },
    {
        oldBlock: 'minecraft:dark_oak_stairs',
        newBlock: 'minecraft:warped_stairs'
    },
    { oldBlock: 'minecraft:jigsaw', newBlock: 'minecraft:jigsaw' },
    {
        oldBlock: 'minecraft:crafting_table',
        newBlock: 'minecraft:crafting_table'
    },
    {
        oldBlock: 'minecraft:white_wool',
        newBlock: 'minecraft:blue_wool'
    },
    { oldBlock: 'minecraft:pumpkin', newBlock: 'minecraft:blue_ice' },
    { oldBlock: 'minecraft:hay_block', newBlock: 'minecraft:prismarine' },
    {
        oldBlock: 'minecraft:carved_pumpkin',
        newBlock: 'minecraft:sea_lantern'
    },
    {
        oldBlock: 'minecraft:cobblestone',
        newBlock: 'minecraft:prismarine_bricks'
    },
    {
        oldBlock: 'minecraft:birch_planks',
        newBlock: 'minecraft:warped_planks'
    },
    {
        oldBlock: 'minecraft:dark_oak_planks',
        newBlock: 'minecraft:warped_planks'
    },
    {
        oldBlock: 'minecraft:cobblestone_stairs',
        newBlock: 'minecraft:prismarine_brick_stairs'
    },
    {
        oldBlock: 'minecraft:cobblestone_slab',
        newBlock: 'minecraft:prismarine_brick_slab'
    },
    {
        oldBlock: 'minecraft:cobblestone_wall',
        newBlock: 'minecraft:prismarine_wall'
    },
    { oldBlock: 'minecraft:torch', newBlock: 'minecraft:soul_torch' },
    {
        oldBlock: 'minecraft:white_wall_banner',
        newBlock: 'minecraft:blue_banner'
    },
    { oldBlock: 'minecraft:chest', newBlock: 'minecraft:chest' },
    {
        oldBlock: 'minecraft:mossy_cobblestone',
        newBlock: 'minecraft:warped_nylium'
    },
    { oldBlock: 'minecraft:vine', newBlock: 'minecraft:twisting_vines' },
    {
        oldBlock: 'minecraft:mossy_cobblestone_stairs',
        newBlock: 'minecraft:warped_nylium'
    },
    {
        oldBlock: 'minecraft:mossy_cobblestone_slab',
        newBlock: 'minecraft:warped_slab'
    },
    {
        oldBlock: 'minecraft:mossy_cobblestone_wall',
        newBlock: 'minecraft:prismarine_wall'
    }
];




async function main() {
    const material = new Material()
        .withName("vibranium")
        .withColor("#8cd58c")
        .withOre(new Ore()
            .withMiningLevel(2)
            .withRawMaterialTexture(new ItemTextureWrapper()
                .fromAssets("item/raw_copper", false)
                .withChromaKey(ChromaCreator.create("#aa3d25", "#168716", 0.2, "linear"))
                .withChromaKey(ChromaCreator.create("#3a7663", "#1519bb", 0.2, "linear")))
            .withConfig(new OreFeatureConfiguration()
                .withSize(10)
                .withStoneReplacement()
                .withDeepslateReplacement())
            .withPlacement(new OreFeaturePlacement()
                .withHeightRange(-64, 64)
                .withCount(30))
            .withVariants([VARIANTS.STONE, VARIANTS.DEEPSLATE]))
        .withArmory(new Armory()
            .full())

    const obsceneMaterial = new Material()
        .withName("obscene")
        .withColor("#801616")
        .withLevel(5)
        .withOre(new Ore()
            .withMiningLevel(4)
            .withConfig(new OreFeatureConfiguration()
                .withSize(10)
                .withStoneReplacement()
                .withDeepslateReplacement())
            .withPlacement(new OreFeaturePlacement()
                .withHeightRange(-64, 64)
                .withCount(30))
            .withVariants([VARIANTS.STONE, VARIANTS.DEEPSLATE]))
        .withArmory(new Armory()
            .full()
            .withBaseArmor(100)
            .withArmorToughness(10)
            .withKnockbackResistance(0.25)
            .withBaseDamage(100)
            .withDurability(9999)
            .withPmmoLevel(0)
            .withToolSpeed(12))

    const biome = new Biome("test_biome")
        .fromTemplate(await loadJsonFromPath(`${dataTemplatePath}/worldgen/biome/forest.json`))
        .removeMobs()
        .withSkyColor("#094e52")
        .withFogColor("#b3e6b3")
        .withWaterColor("#061127")
        .withWaterFogColor("#061127")
        .withFoliageColor("#3f76e4")
        .withGrassColor("#094560")
        .withMonsterMob("minecraft:warden", 1, 4, 4)
        .withOresPlacements(material.ore.placements)


    const dimensionType = new DimensionType("test_dim_type")
    const dimension = new Dimension("test_dim")
        .removeBiomes()
        .withDimensionType(dimensionType)
        .withBiome(new DimensionBiome().fromBiome(biome)
            .withTemperature(0, 1)
            .withHumidity(0, 1)
            .withContinentalness(0, 1)
            .withErosion(0, 1)
            .withWeirdness(0, 1)
            .withDepth(0)
            .withOffset(0))

    const structure = await new StructureDefinition("pillager_outpost", "kjs-test")
        .fromTemplate("./mc/data/worldgen/structure_set/pillager_outposts.json")
    structure.replaceBlocks(structureMap)
        .removeBiomes()
        .onBiomes([biome])

    const jarStructure = await new StructureDefinition("ancient_battleground", "kjs-test")
        .fromTemplate("jar:irons_spellbooks:data/irons_spellbooks/worldgen/structure_set/ancient_battleground.json");
    jarStructure.replaceBlocks(structureMap)
        .removeBiomes()
        .onBiomes([biome])

    const expansionPack = new ExpansionPack()
        .withNamespace("kjs-test")
        .withName("KubeJS Datagen Test")
        .withDimensionType(dimensionType)
        .withDimension(dimension)
        .withBiome(biome)
        .withMaterial(material)
        .withMaterial(obsceneMaterial)
        .withStructure(structure)
        .withStructure(jarStructure)

    await expansionPack.build();
    expansionPack.validate();
    await expansionPack.writeSelf()
    console.log("Done")
}



main();
