const ELITE_MOBS_UUID = "f3f8f5f1-0f1b-4b8f-8b8b-5f3f8f6b4b8f";
const ELITE_TICK_INTERVAL = 80;
const ELITE_LIFETIME_MINUTES = 10;

// Convert array to Set for faster lookups
const ELITE_HOSTILE_MOBS = new Set([
    "aether:blue_swet", "aether:cockatrice", "aether:fire_minion", "aether:golden_swet",
    "aether:mimic", "aether:sentry", "aether:valkyrie", "aether:zephyr",
    "aquamirae:anglerfish", "aquamirae:maw", "aquamirae:tortured_soul",
    "betternether:jungle_skeleton", "betternether:naga", "betternether:skull",
    "blue_skies:crynocerous", "blue_skies:diophyde_prowler", "blue_skies:emberback",
    "blue_skies:frost_spirit", "blue_skies:infested_swarmer", "blue_skies:nested_spider",
    "blue_skies:nyctofly", "blue_skies:polargeist", "blue_skies:stonelet",
    "blue_skies:venom_spider",
    "callfromthedepth_:deepspider", "callfromthedepth_:riper", "callfromthedepth_:rotwalker",
    "callfromthedepth_:screamer", "callfromthedepth_:sculkcreeper",
    "minecraft:blaze", "minecraft:cave_spider", "minecraft:drowned", "minecraft:enderman",
    "minecraft:endermite", "minecraft:ghast", "minecraft:hoglin", "minecraft:guardian",
    "minecraft:husk", "minecraft:magma_cube", "minecraft:phantom", "minecraft:piglin",
    "minecraft:piglin_brute", "minecraft:pillager", "minecraft:polar_bear",
    "minecraft:ravager", "minecraft:shulker", "minecraft:shulker_bullet",
    "minecraft:silverfish", "minecraft:skeleton", "minecraft:skeleton_horse",
    "minecraft:slime", "minecraft:spider", "minecraft:stray", "minecraft:vindicator",
    "minecraft:witch", "minecraft:wither_skeleton", "minecraft:zoglin",
    "minecraft:zombie", "minecraft:zombie_horse", "minecraft:zombie_villager",
    "minecraft:zombified_piglin",
    "trials:bogged", "trials:breeze",
    "kobolds:kobold_warrior", "kobolds:kobold_zombie", "kobolds:kobold_skeleton",
    "phantasm:behemoth", "mimic:mimic",
    "undergarden:rotling", "undergarden:rotwalker", "undergarden:rotbeast",
    "undergarden:dweller", "undergarden:brute", "undergarden:nargoyle",
    "undergarden:muncher", "undergarden:sploogie", "undergarden:forgotten",
    "undergarden:forgotten_guardian",
    "outer_end:himmelite", "outer_end:entombed", "outer_end:sinker",
    "theabyss:ice_skeleton", "theabyss:ice_knight", "theabyss:infected_spider",
    "theabyss:infected_creeper", "theabyss:soul_guard", "theabyss:guard",
    "theabyss:mud_zombie", "theabyss:infected_zombie", "theabyss:raptor",
    "theabyss:end_spider", "theabyss:haunted_skeleton", "theabyss:shattered_zombie",
    "theabyss:infected_wolf", "theabyss:infected_phantom", "theabyss:frost_spider",
    "theabyss:abyssal_lion"
]);

// Pre-loaded Java classes
const $ChatFormatting = Java.loadClass("net.minecraft.ChatFormatting");
const $BuiltInRegistries = Java.loadClass("net.minecraft.core.registries.BuiltInRegistries");
const $AttributeModifier = Java.loadClass("net.minecraft.world.entity.ai.attributes.AttributeModifier");
const $MobSpawnType = Java.loadClass("net.minecraft.world.entity.MobSpawnType");
const $ForgeEventFactory = Java.loadClass("net.minecraftforge.event.ForgeEventFactory");
const $AuraCapabilityProvider = Java.loadClass("com.pandaismyname1.zoompack_overrides_forge.aura.AuraCapabilityProvider");

// Difficulty configs (precomputed)
const DIFFICULTY_CONFIGS = {
    "annoying": {
        modifiers: {
            "generic.max_health": -0.5,
            "generic.attack_damage": 1,
            "projectile_damage:generic": 1,
        },
        name: "Lil'",
        chatColor: $ChatFormatting.GRAY,
        groupSize: 5,
        rolls: 2,
        minions: { count: 0, difficulty: "trained" },
        size: { height: 0.5, width: 0.5, stepHeight: 1, speed: 3 }
    },
    "trained": {
        modifiers: {
            "generic.max_health": 0.5,
            "generic.attack_damage": 0.1,
            "projectile_damage:generic": 0.1,
        },
        name: "Trained",
        chatColor: $ChatFormatting.GREEN,
        groupSize: 3,
        rolls: 1,
        minions: { count: 0, difficulty: "trained" },
        size: { height: 1.2, width: 1.2, stepHeight: 1 }
    },
    "elite": {
        modifiers: {
            "generic.max_health": 3,
            "generic.attack_damage": 0.5,
            "projectile_damage:generic": 0.5,
        },
        name: "Elite",
        chatColor: $ChatFormatting.BLUE,
        groupSize: 2,
        rolls: 2,
        minions: { count: 0, difficulty: "trained" },
        size: { height: 1.4, width: 1.5, stepHeight: 1.5 }
    },
    "champion": {
        modifiers: {
            "generic.max_health": 9,
            "generic.attack_damage": 1,
            "projectile_damage:generic": 1
        },
        name: "Champion",
        chatColor: $ChatFormatting.GOLD,
        groupSize: 1,
        rolls: 4,
        minions: { count: 3, difficulty: "trained" },
        size: { height: 1.7, width: 2, stepHeight: 1.5 }
    },
    "miniboss": {
        modifiers: {
            "generic.max_health": 19,
            "generic.attack_damage": 2,
            "projectile_damage:generic": 2
        },
        name: "Miniboss",
        chatColor: $ChatFormatting.DARK_RED,
        groupSize: 1,
        rolls: 8,
        minions: { count: 3, difficulty: "elite" },
        size: { height: 2, width: 2.5, stepHeight: 2 }
    }
};

// Probability table for difficulties
const DIFFICULTY_PROBABILITIES = [
    { threshold: 0.02, difficulty: "miniboss" },
    { threshold: 0.05, difficulty: "champion" },
    { threshold: 0.25, difficulty: "elite" },
    { threshold: 0.26, difficulty: "annoying" },
    { threshold: 1.0, difficulty: "trained" }
];

// Dimension loot tables
const DIMENSION_LOOT_TABLES = {
    "minecraft:overworld": global.overworldEliteDrops,
    "blue_skies:everbright": global.everbrightEliteDrops,
    "blue_skies:everdawn": global.everdawnEliteDrops,
    "aether:the_aether": global.aetherEliteDrops,
    "minecraft:the_nether": global.netherEliteDrops,
    "undergarden:undergarden": global.undergardenEliteDrops,
    "minecraft:the_end": global.endEliteDrops,
    "callfromthedepth_:depth": global.deepEliteDrops,
    "theabyss:the_abyss": global.abyssEliteDrops
};

// Cache for elite entities
let eliteEntities = new Set();
let eliteCommandsToRun = [];

EntityEvents.spawned(elite_onEntitySpawned);
EntityEvents.death(elite_onDeath);
ServerEvents.commandRegistry(elite_commands);

function elite_onEntitySpawned(event) {
    const entity = event.getEntity();
    if (elite_isElite(entity)) return;
    
    const type = entity.getType();
    if (!elite_canSpawn()) return;
    if (!ELITE_HOSTILE_MOBS.has(type)) return;
    
    const world = entity.getLevel();
    const difficulty = elite_getDifficulty();
    const config = DIFFICULTY_CONFIGS[difficulty];
    
    // Spawn friends and minions
    const friends = elite_summonFriends(world, entity, config.groupSize - 1, difficulty);
    const minions = elite_summonFriends(world, entity, config.minions.count, config.minions.difficulty);
    
    // Initialize all entities
    elite_initElite(entity, difficulty);
    friends.forEach(friend => elite_initElite(friend, difficulty));
    minions.forEach(minion => elite_initElite(minion, config.minions.difficulty));
}

function elite_onDeath(event) {
    const entity = event.getEntity();
    if (!elite_isElite(entity)) return;
    
    const damageSource = event.getSource();
    const killer = damageSource.causingEntity;
    if (!killer || (killer.getType() !== "player" && killer.getType() !== "minecraft:player")) return;
    
    const player = killer;
    const dimensionRL = event.level.dimension.toString();
    const lootFunction = DIMENSION_LOOT_TABLES[dimensionRL];
    if (!lootFunction) return;
    
    const diff = entity.getPersistentData().getString("elite");
    const rolls = DIFFICULTY_CONFIGS[diff].rolls + player.getMainHandItem().getEnchantmentLevel("minecraft:looting");
    const loot = lootFunction(rolls);
    if (!loot) return;
    
    const pos = entity.getPos();
    const server = event.getServer();
    loot.forEach(item => {
        global.lootlib_summonItem(server, dimensionRL, pos.x(), pos.y(), pos.z(), item);
    });
}

function eliteScheduler(event) {
    const server = event.getServer();
    const currentTime = Date.now();
    const isDedicatedServer = server.isDedicated();
    
    // Process commands
    eliteCommandsToRun.forEach(cmd => server.runCommandSilent(cmd));
    eliteCommandsToRun = [];
    
    // Clean up and process elites
    const toRemove = [];
    eliteEntities.forEach(entity => {
        if (!entity || entity.isRemoved() || entity.isDead()) {
            toRemove.push(entity);
            return;
        }
        
        // Check lifetime
        const spawnEpoch = entity.getPersistentData().getLong("eliteSpawnedEpoch");
        if (currentTime - spawnEpoch > ELITE_LIFETIME_MINUTES * 60 * 1000) {
            entity.remove("discarded");
            toRemove.push(entity);
            return;
        }
        
        // Handle aura for non-dedicated servers
        if (!isDedicatedServer) {
            const capability = entity.getCapability($AuraCapabilityProvider.AURA_CAPABILITY).orElse(null);
            if (capability) {
                $AuraCapabilityProvider.setAuraId(entity, capability.getAuraId());
            }
        }
    });
    
    // Remove dead entities from cache
    toRemove.forEach(entity => eliteEntities.delete(entity));
}


function elite_commands(event) {
    let { commands, arguments } = event;
    let StringArgument = Java.loadClass("com.mojang.brigadier.arguments.StringArgumentType");

    event.register(
        commands.literal('summon_elite')
            .requires(cs => cs.hasPermission(2))
            .then(commands.argument("entity_type", StringArgument.string())
                .then(commands.argument("difficulty", StringArgument.string())
                    .executes(ctx => {
                        let server = ctx.getSource().getServer();
                        let entityTypeString = StringArgument.getString(ctx, "entity_type");
                        let difficulty = StringArgument.getString(ctx, "difficulty");
                        let $BuiltInRegistries = Java.loadClass("net.minecraft.core.registries.BuiltInRegistries");
                        let entityType = $BuiltInRegistries.ENTITY_TYPE.get(new ResourceLocation(entityTypeString));
                        if (entityType == null) {
                            return 0;
                        }
                        let world = ctx.getSource().getPlayerOrException().getLevel();
                        let entity = entityType.create(world);
                        if (entity == null) {
                            return 0;
                        }
                        let pos = ctx.getSource().getPlayerOrException().getPos();
                        entity.setPosition(pos.x(), pos.y(), pos.z());
                        world.addFreshEntity(entity);

                        if(elite_initElite(entity, difficulty)){
                            return 1;
                        }
                        else{
                            return 0;
                        }
                    })
                )
            )
    );
}

function elite_initElite(entity, difficulty) {
    let config = DIFFICULTY_CONFIGS[difficulty];
    if (!config) return false;
    
    // Set elite properties
    elite_setDifficulty(entity, difficulty);
    elite_setGlowEffect(entity, difficulty);
    elite_setPehkuiSize(entity, difficulty);
    
    // Apply name and modifiers
    let baseName = entity.getName().getString();
    let newName = Component.literal(`${config.name} ${baseName}`).withStyle(config.chatColor);
    entity.setCustomName(newName);
    
    // Apply modifiers
    for (const [modifier, amount] of Object.entries(config.modifiers)) {
        addModifier(entity, modifier, amount, "multiply_total");
    }
    
    entity.heal(entity.getMaxHealth());
    eliteEntities.add(entity);
    return true;
}


function elite_summonFriends(world, entity, groupSize, difficulty) {
    let entityPos = entity.getPos();
    let type = entity.getEntityType();
    let $MobSpawnType = Java.loadClass("net.minecraft.world.entity.MobSpawnType");
    let $ForgeEventFactory = Java.loadClass("net.minecraftforge.event.ForgeEventFactory");
    let friends = [];
    for (let i = 0; i < groupSize; i++) {
        let friend = type.create(world);
        elite_initElite(friend, difficulty);

        friend.setPosition(entityPos.x(), entityPos.y(), entityPos.z());
        world.addFreshEntity(friend);
        // Fuck you minecraft, Fuck you Java, Fuck you Forge, and finally, Fuck you Microsoft
        $ForgeEventFactory.onFinalizeSpawn(friend, world, world.getCurrentDifficultyAt(entityPos), $MobSpawnType.EVENT, null, null);

        friends.push(friend);
    }

    return friends;
}

function elite_getDifficulty() {
    const rand = Math.random();
    for (const { threshold, difficulty } of DIFFICULTY_PROBABILITIES) {
        if (rand < threshold) return difficulty;
    }
    return "trained";
}

function elite_canSpawn() {
    return Math.random() < 0.05;
}

function elite_allowsEliteMobs(type) {
    return ELITE_HOSTILE_MOBS.has(type);
}

function elite_isElite(entity) {
    return entity.getPersistentData().contains("elite");
}

function elite_setDifficulty(entity, difficulty) {
    const compoundTag = entity.getPersistentData();
    compoundTag.putString("elite", difficulty);
    compoundTag.putLong("eliteSpawnedEpoch", Date.now());
}

function elite_setGlowEffect(entity, difficulty) {
    $AuraCapabilityProvider.setAuraId(entity, `zoompack_overrides_forge:aura_${difficulty}`);
}

function elite_setPehkuiSize(entity, difficulty) {
    const { height, width, stepHeight, speed } = DIFFICULTY_CONFIGS[difficulty].size;
    let mob_speed = 1;

    if (speed !== undefined) {
        mob_speed = speed;
    }
    entity.mergeNbt({"pehkui:scale_data_types": {"pehkui:height": {scale: height}, "pehkui:width":{scale: width} ,"pehkui:step_height":{scale: stepHeight} , "pehkui:speed":{scale: mob_speed}}})
}

function addModifier(entity, attributeId, amount, operation) {
    const attribute = $BuiltInRegistries.ATTRIBUTE.get(new ResourceLocation(attributeId));
    if (!attribute) return;
    
    const attributeInstance = entity.getAttribute(attribute);
    if (!attributeInstance) return;
    
    const uuid = UUID.fromString(ELITE_MOBS_UUID);
    attributeInstance.removeModifier(uuid);
    
    const modifier = new $AttributeModifier(uuid, "Elite Modifier", amount, operation);
    attributeInstance.addTransientModifier(modifier);
}

function loopEliteMobsEvent(event) {
    eliteScheduler(event);
    event.server.scheduleInTicks(ELITE_TICK_INTERVAL, callback => {
        eliteScheduler(callback);
    });
}

ServerEvents.loaded(event => {
    loopEliteMobsEvent(event);
});