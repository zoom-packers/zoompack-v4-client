import {SelfWritingJson} from "../selfWritingJson";

export class OreFeaturePlacement extends SelfWritingJson {
    static outputPath = "data/<internalNamespace>/worldgen/placed_feature/<internalName>.json";
    feature = ""
    placement = [
        {
            type: "minecraft:count",
            count: 10
        },
        {
            type: "minecraft:in_square",
        },
        {
            type: "minecraft:height_range",
            height: {
                type: "minecraft:uniform",
                min_inclusive: {
                    absolute: 0
                },
                max_inclusive: {
                    absolute: 64
                }
            }
        },
        {
            type: "minecraft:biome"
        }
    ]

    constructor(namespace: string = "autofilled", name: string = "autofilled") {
        super(namespace, name, OreFeaturePlacement.outputPath);
    }

    withFeature(feature: string) {
        this.feature = feature;
        return this;
    }

    withCount(count: number) {
        this.placement[0].count = count;
        return this;
    }

    withHeightRange(minY: number, maxY: number) {
        this.placement[2].height.min_inclusive.absolute = minY;
        this.placement[2].height.max_inclusive.absolute = maxY;
        return this;
    }
}
