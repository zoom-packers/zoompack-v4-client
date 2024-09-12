import {SelfWritingJson} from "../selfWritingJson";
import {Biome} from "./biome";
import {TemplatePool} from "./templatePool";

export class Structure extends SelfWritingJson {
    static outputPath = "data/<internalNamespace>/worldgen/structure/<internalName>.json";
    type = "minecraft:jigsaw";
    biomes: string[] = [];
    max_distance_from_center = 80;
    project_start_to_heightmap = "WORLD_SURFACE_WG"
    use_expansion_hack = false;
    size = 1;
    terrain_adaptation = "beard_thin"
    start_pool = ""
    start_height = {
        absolute: 0
    }
    spawn_overrides = {}
    step: "raw_generation" | "lakes" | "local_modifications" | "underground_structures" | "surface_structures" | "strongholds" | "underground_ores" | "underground_decoration" | "fluid_springs" | "vegetal_decoration" | "top_layer_modification" = "surface_structures";
    internalBiomes: Biome[] = [];
    template_pools: TemplatePool[] = []

    constructor(name: string = "", namespace: string = "") {
        super(namespace, name, Structure.outputPath);
    }

    withBiomeTag(tag: string) {
        this.biomes = [...this.biomes, `${tag}`];
        return this;
    }

    onBiomes(biomes: (Biome | string)[]) {
        biomes.forEach(biome => {
            if (typeof biome === "string") {
                this.biomes.push(biome);
            } else {
                this.internalBiomes.push(biome);
            }
        })
        return this;
    }

    withStep(step: "raw_generation" | "lakes" | "local_modifications" | "underground_structures" | "surface_structures" | "strongholds" | "underground_ores" | "underground_decoration" | "fluid_springs" | "vegetal_decoration" | "top_layer_modification") {
        this.step = step;
        return this;
    }

    afterBuild() {
        if (this.internalBiomes && this.internalBiomes.length > 0) {
            this.biomes = [...this.biomes, ...this.internalBiomes.map(biome => `${biome.internalNamespace}:${biome.internalName}`)];
        }
    }

    cleanBeforeWrite() {
        super.cleanBeforeWrite();
        this.internalBiomes = undefined;
    }

    override async writeSelf(): Promise<void> {
        for (const templatePool of this.template_pools) {
            await templatePool.writeSelf();
        }
        this.template_pools = undefined;
        await super.writeSelf();
    }

    removeBiomes() {
        this.biomes = [];
        this.internalBiomes = [];
        return this;
    }
}
