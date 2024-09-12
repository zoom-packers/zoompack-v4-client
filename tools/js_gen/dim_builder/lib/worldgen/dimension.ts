import {DimensionType} from "./dimensionType";
import {SelfWritingJson} from "../selfWritingJson";
import {Biome} from "./biome";

export class Dimension extends SelfWritingJson {
    static outputPath = "data/<internalNamespace>/dimension/<internalName>.json";
    type = "minecraft:overworld";
    generator = {
        type: "minecraft:noise",
        settings: {
            sea_level: 63,
            disable_mob_generation: false,
            aquifers_enabled: true,
            ore_veins_enabled: true,
            legacy_random_source: false,
            default_block: {
                Name: "minecraft:stone"
            },
            default_fluid: {
                Name: "minecraft:water",
                Properties: {
                    level: "0"
                }
            },
            noise: {
                min_y: -64,
                height: 384,
                size_horizontal: 1,
                size_vertical: 2
            },
            noise_router: {
                barrier: 0,
                fluid_level_floodedness: 0,
                fluid_level_spread: 0,
                lava: 0,
                temperature: 0,
                vegetation: 0,
                continents: 0,
                erosion: 0,
                depth: 0,
                ridges: 0,
                initial_density_without_jaggedness: 0,
                final_density: {
                    type: "minecraft:interpolated",
                    argument: "minecraft:overworld/base_3d_noise"
                },
                vein_toggle: 0,
                vein_ridged: 0,
                vein_gap: 0
            },
            spawn_target: [],
            surface_rule: {
                type: "minecraft:sequence",
                sequence: []
            }
        },
        biome_source: {
            type: "minecraft:multi_noise",
            biomes: []
        }
    }
    private dimensionType: DimensionType;


    constructor(name: string, namespace: string = "") {
        super(namespace, name, Dimension.outputPath);
    }

    withDimensionType(type: string | DimensionType) {
        if (type instanceof DimensionType) {
            this.dimensionType = type;
        } else {
            this.type = type;
        }
        return this;
    }

    withSeaLevel(seaLevel: number) {
        this.generator.settings.sea_level = seaLevel;
        return this;
    }

    withDefaultBlock(block: string) {
        this.generator.settings.default_block.Name = block;
        return this;
    }

    withDefaultFluid(fluid: string, properties: any) {
        this.generator.settings.default_fluid.Name = fluid;
        this.generator.settings.default_fluid.Properties = {
            level: "0"
        }
        return this;
    }

    withWorldHeight(minY: number, maxY: number) {
        this.generator.settings.noise.min_y = minY;
        this.generator.settings.noise.height = maxY;
        return this;
    }

    removeBiomes() {
        this.generator.biome_source.biomes = [];
        return this;
    }

    withBiome(biome: DimensionBiome) {
        this.generator.biome_source.biomes.push(biome);
        return this;
    }

    withBiomes(biomes: DimensionBiome[]) {
        this.generator.biome_source.biomes = [...this.generator.biome_source.biomes, ...biomes];
        return this;
    }

    afterBuild() {
        if (this.dimensionType) {
            this.type = `${this.dimensionType.internalNamespace}:${this.dimensionType.internalName}`;
        }
        this.generator.biome_source.biomes.forEach(biome => {
            const dimBiome = biome as DimensionBiome;
            if (dimBiome.afterBuild) {
                dimBiome.afterBuild();
            }
        })
        this.dimensionType = undefined;
    }
}

export type DimensionBiomeParameters = {
    temperature: number[] | number,
    humidity: number[] | number,
    continentalness: number[] | number,
    erosion: number[] | number,
    weirdness: number[] | number,
    depth: number[] | number,
    offset: number
}

export class DimensionBiome {
    biome = "";
    parameters: DimensionBiomeParameters = {
        temperature: [],
        humidity: [],
        continentalness: [],
        erosion: [],
        weirdness: [],
        depth: 0,
        offset: 0
    }
    private biomeObject: Biome;

    withName(biome: string) {
        this.biome = biome;
        return this;
    }

    fromBiome(biome: Biome) {
        this.biomeObject = biome;
        return this;
    }

    withTemperature(min: number, max: number) {
        this.parameters.temperature = [min, max];
        return this;
    }

    withHumidity(min: number, max: number) {
        this.parameters.humidity = [min, max];
        return this;
    }

    withContinentalness(min: number, max: number) {
        this.parameters.continentalness = [min, max];
        return this;
    }

    withErosion(min: number, max: number) {
        this.parameters.erosion = [min, max];
        return this;
    }

    withWeirdness(min: number, max: number) {
        this.parameters.weirdness = [min, max];
        return this;
    }

    withDepth(depth: number) {
        this.parameters.depth = depth;
        return this;
    }

    withOffset(offset: number) {
        this.parameters.offset = offset;
        return this;
    }

    afterBuild() {
        if (this.biomeObject) {
            this.biome = `${this.biomeObject.internalNamespace}:${this.biomeObject.internalName}`;
        }
        this.biomeObject = undefined;
    }

    withProperties(properties: {
        parameters: DimensionBiomeParameters
    }) {
        this.parameters = properties.parameters;
        return this;
    }
}

