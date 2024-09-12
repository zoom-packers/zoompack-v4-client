import {SelfWritingJson} from "../selfWritingJson";

export class DimensionType extends SelfWritingJson{
    static outputPath = "data/<internalNamespace>/dimension_type/<internalName>.json";
    ultrawarm = false
    natural = true
    piglin_safe = false
    respawn_anchor_works = false
    bed_works = true
    has_raids = false
    has_skylight = true
    has_ceiling = false
    coordinate_scale = 1
    ambient_light = 0
    logical_height = 384
    effects = "minecraft:overworld"
    infiniburn = "#minecraft:infiniburn_overworld"
    min_y = -64
    height = 384
    monster_spawn_light_level = {
        type: "minecraft:uniform",
        value: {
            min_inclusive: 0,
            max_inclusive: 7
        }
    }
    monster_spawn_block_light_limit = 0


    constructor(name: string, namespace: string = "") {
        super(namespace, name, DimensionType.outputPath);
    }

    withName(name: string) {
        this.internalName = name;
        return this;
    }

    withWaterBanned() {
        this.ultrawarm = true;
        return this;
    }

    withExplodingBeds() {
        this.bed_works = false;
        return this;
    }

    withRaids() {
        this.has_raids = true;
        return this;
    }

    withoutSkylight() {
        this.has_skylight = false;
        return this;
    }

    withCeiling() {
        this.has_ceiling = true;
        return this;
    }

    withCoordinateScale(scale: number) {
        this.coordinate_scale = scale;
        return this;
    }

    withAmbientLight(light: number) {
        this.ambient_light = light;
        return this;
    }

    withHeight(minY: number, maxY: number) {
        this.min_y = minY;
        this.height = maxY;
        this.logical_height = maxY;
        return this;
    }

    withSkyEffects(effects: string) {
        this.effects = effects;
        return this;
    }

    withMonsterSpawnLightLevel(min: number = 0, max: number = 7) {
        this.monster_spawn_light_level.value.min_inclusive = min;
        this.monster_spawn_light_level.value.max_inclusive = max;
        return this;
    }
}

