import {SelfWritingJson} from "../selfWritingJson";

export class OreFeatureConfiguration extends SelfWritingJson {
    static outputPath = "data/<internalNamespace>/worldgen/configured_feature/<internalName>.json";
    type = "minecraft:ore";
    config = {
        discard_chance_on_air_exposure: 0,
        size: 10,
        targets: []
    }

    constructor(namespace: string = "autofilled", name: string = "autofilled") {
        super(namespace, name, OreFeatureConfiguration.outputPath);
    }

    withoutAirExposure() {
        this.config.discard_chance_on_air_exposure = 1;
        return this;
    }

    withSize(size: number) {
        this.config.size = size;
        return this;
    }

    withReplacement(oreId: string, tagOrBlock: string) {
        const target = {
            state: {
                Name: oreId
            },
            target: {}
        } as any;
        // @ts-ignore
        if (tagOrBlock.startsWith("#")) {
            target.target.tag = tagOrBlock.substring(1);
            target.target.predicate_type = "minecraft:tag_match";
        } else {
            target.target.block = tagOrBlock;
            target.target.predicate_type = "minecraft:block_match";
        }
        this.config.targets.push(target);
        return this;
    }

    withStoneReplacement() {
        return this.withReplacement(VARIANTS.STONE, "#minecraft:stone_ore_replaceables");
    }

    withDeepslateReplacement() {
        return this.withReplacement(VARIANTS.DEEPSLATE, "#minecraft:deepslate_ore_replaceables");
    }
}

export enum VARIANTS {
    STONE = "STONE",
    DEEPSLATE = "DEEPSLATE"
}

export const VARIANTS_BASE_TEXTURE_MAP = {
    [VARIANTS.STONE]: "./mc/assets/textures/block/stone.png",
    [VARIANTS.DEEPSLATE]: "./mc/assets/textures/block/deepslate.png"
}
