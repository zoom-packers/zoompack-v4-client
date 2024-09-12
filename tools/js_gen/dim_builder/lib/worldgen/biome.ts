import {hexToMinecraftColor} from "../utils";
import {SelfWritingJson} from "../selfWritingJson";
import {OreFeaturePlacement} from "../material/oreFeaturePlacement";

export class Biome extends SelfWritingJson {
    static outputPath = "data/<internalNamespace>/worldgen/biome/<internalName>.json";
    temperature = 0.7
    downfall = 0.8
    has_precipitation = true
    effects = {
        sky_color: 7972607,
        fog_color: 12638463,
        water_color: 4159204,
        water_fog_color: 329011,
        foliage_color: 4764952,
        grass_color: 9286496,
        mood_sound: {
            sound: "minecraft:ambient.cave",
            tick_delay: 6000,
            block_search_extent: 8,
            offset: 2
        },
        music: {
            sound: "minecraft:music.overworld.forest",
            min_delay: 12000,
            max_delay: 24000,
            replace_current_music: false
        },
        particles: {
            options: {
                type: ""
            },
            probability: 0
        }
    }
    spawners = {
        ambient: [],
        axolotls: [],
        creature: [],
        misc: [],
        monster: [],
        underground_water_creature: [],
        water_ambient: [],
        water_creature: []
    }
    creature_spawn_probability = 0.1
    spawn_costs = {}
    carvers = {
        air: [],
        liquid: []
    }
    features = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
    ]
    private orePlacements: OreFeaturePlacement[] = [];

    constructor(name: string, namespace: string = "") {
        super(namespace, name, Biome.outputPath);
    }

    withTemperature(temp: number) {
        this.temperature = temp;
        return this;
    }

    withDownfall(downfall: number) {
        this.downfall = downfall;
        return this;
    }

    withoutPrecipitation() {
        this.has_precipitation = false;
        return this;
    }

    withSkyColor(hex: string) {
        this.effects.sky_color = hexToMinecraftColor(hex);
        return this;
    }

    withFogColor(hex: string) {
        this.effects.fog_color = hexToMinecraftColor(hex);
        return this;
    }

    withWaterColor(hex: string) {
        this.effects.water_color = hexToMinecraftColor(hex);
        return this;
    }

    withWaterFogColor(hex: string) {
        this.effects.water_fog_color = hexToMinecraftColor(hex);
        return this;
    }

    withFoliageColor(hex: string) {
        this.effects.foliage_color = hexToMinecraftColor(hex);
        return this;
    }

    withGrassColor(hex: string) {
        this.effects.grass_color = hexToMinecraftColor(hex);
        return this;
    }

    withMoodSound(sound: string, tick_delay: number, block_search_extent: number, offset: number) {
        this.effects.mood_sound.sound = sound;
        this.effects.mood_sound.tick_delay = tick_delay;
        this.effects.mood_sound.block_search_extent = block_search_extent;
        this.effects.mood_sound.offset = offset;
        return this;
    }

    withMusic(sound: string, min_delay: number, max_delay: number, replace_current_music: boolean) {
        this.effects.music.sound = sound;
        this.effects.music.min_delay = min_delay;
        this.effects.music.max_delay = max_delay;
        this.effects.music.replace_current_music = replace_current_music;
        return this;
    }

    withParticles(type: string, probability: number) {
        this.effects.particles.options.type = type;
        this.effects.particles.probability = probability;
        return this;
    }

    removeMobs() {
        this.spawners.ambient = [];
        this.spawners.axolotls = [];
        this.spawners.creature = [];
        this.spawners.misc = [];
        this.spawners.monster = [];
        this.spawners.underground_water_creature = [];
        this.spawners.water_ambient = [];
        this.spawners.water_creature = [];
        return this;
    }

    withAmbientMob(mob: string, weight: number, minCount: number, maxCount: number) {
        this.addMob(mob, weight, minCount, maxCount, this.spawners.ambient);
        return this;
    }

    withAxolotlMob(mob: string, weight: number, minCount: number, maxCount: number) {
        this.addMob(mob, weight, minCount, maxCount, this.spawners.axolotls);
        return this;
    }

    withPassiveMob(mob: string, weight: number, minCount: number, maxCount: number) {
        this.addMob(mob, weight, minCount, maxCount, this.spawners.creature);
        return this;
    }

    withMiscMob(mob: string, weight: number, minCount: number, maxCount: number) {
        this.addMob(mob, weight, minCount, maxCount, this.spawners.misc);
        return this;
    }

    withMonsterMob(mob: string, weight: number, minCount: number, maxCount: number) {
        this.addMob(mob, weight, minCount, maxCount, this.spawners.monster);
        return this;
    }

    withUndergroundWaterMob(mob: string, weight: number, minCount: number, maxCount: number) {
        this.addMob(mob, weight, minCount, maxCount, this.spawners.underground_water_creature);
        return this;
    }

    withWaterAmbientMob(mob: string, weight: number, minCount: number, maxCount: number) {
        this.addMob(mob, weight, minCount, maxCount, this.spawners.water_ambient);
        return this;
    }

    withWaterPassiveMob(mob: string, weight: number, minCount: number, maxCount: number) {
        this.addMob(mob, weight, minCount, maxCount, this.spawners.water_creature);
        return this;
    }

    withCreatureSpawnProbability(probability: number) {
        this.creature_spawn_probability = probability;
        return this;
    }

    withAirCarver(type: string) {
        this.carvers.air.push(type);
        return this;
    }

    withLiquidCarver(type: string) {
        this.carvers.liquid.push(type);
        return this;
    }

    withRawGenerationFeature(type: string) {
        this.features[0].push(type);
        return this;
    }

    withLakeGenerationFeature(type: string) {
        this.features[1].push(type);
        return this;
    }

    withLocalModificationFeature(type: string) {
        this.features[2].push(type);
        return this;
    }

    withUndergroundStructureFeature(type: string) {
        this.features[3].push(type);
        return this;
    }

    withSurfaceStructureFeature(type: string) {
        this.features[4].push(type);
        return this;
    }

    withStrongholdFeature(type: string) {
        this.features[5].push(type);
        return this;
    }

    withUndergroundOreFeature(type: string) {
        this.features[6].push(type);
        return this;
    }

    withUndergroundDecorationFeature(type: string) {
        this.features[7].push(type);
        return this;
    }

    withFluidSpringFeature(type: string) {
        this.features[8].push(type);
        return this;
    }

    withVegetalDecorationFeature(type: string) {
        this.features[9].push(type);
        return this;
    }

    withTopLayerModificationFeature(type: string) {
        this.features[10].push(type);
        return this;
    }

    private addMob(mob: string, weight: number, minCount: number, maxCount: number, list: any[]) {
        list.push({
            type: mob,
            weight: weight,
            minCount: minCount,
            maxCount: maxCount
        });
    }

    withOresPlacements(placements: string[] | OreFeaturePlacement[]) {
        if (placements[0] instanceof OreFeaturePlacement) {
            this.orePlacements = placements as OreFeaturePlacement[];
            return this;
        }
        placements.forEach((ore) => { this.withUndergroundOreFeature(ore); });
        return this;
    }

    afterBuild() {
        if (this.orePlacements === undefined) {
            return;
        }
        this.orePlacements.forEach(placement => {
            this.withUndergroundOreFeature(`${placement.internalNamespace}:${placement.internalName}`);
        })
        this.orePlacements = undefined;
    }
}

