let ELITE_MOBS_UUID = "f3f8f5f1-0f1b-4b8f-8b8b-5f3f8f6b4b8f";
const ELITE_TICK_INTERVAL = 69;

let elite_hostileMobs = [
    "aether:blue_swet",
    "aether:cockatrice",
    "aether:fire_minion",
    "aether:golden_swet",
    "aether:mimic",
    "aether:sentry",
    "aether:valkyrie",
    "aether:zephyr",
    "aquamirae:anglerfish",
    "aquamirae:maw",
    "aquamirae:tortured_soul",
    "betternether:jungle_skeleton",
    "betternether:naga",
    "betternether:skull",
    "blue_skies:crynocerous",
    "blue_skies:diophyde_prowler",
    "blue_skies:emberback",
    "blue_skies:frost_spirit",
    "blue_skies:infested_swarmer",
    "blue_skies:nested_spider",
    "blue_skies:nyctofly",
    "blue_skies:polargeist",
    "blue_skies:stonelet",
    "blue_skies:venom_spider",
    "callfromthedepth_:deepspider",
    "callfromthedepth_:riper",
    "callfromthedepth_:rotwalker",
    "callfromthedepth_:screamer",
    "callfromthedepth_:sculkcreeper",
    "minecraft:blaze",
    "minecraft:cave_spider",
    "minecraft:drowned",
    "minecraft:enderman",
    "minecraft:endermite",
    "minecraft:ghast",
    "minecraft:hoglin",
    "minecraft:guardian",
    "minecraft:husk",
    "minecraft:magma_cube",
    "minecraft:phantom",
    "minecraft:piglin",
    "minecraft:piglin_brute",
    "minecraft:pillager",
    "minecraft:polar_bear",
    "minecraft:ravager",
    "minecraft:shulker",
    "minecraft:shulker_bullet",
    "minecraft:silverfish",
    "minecraft:skeleton",
    "minecraft:skeleton_horse",
    "minecraft:slime",
    "minecraft:spider",
    "minecraft:stray",
    "minecraft:vindicator",
    "minecraft:witch",
    "minecraft:wither_skeleton",
    "minecraft:zoglin",
    "minecraft:zombie",
    "minecraft:zombie_horse",
    "minecraft:zombie_villager",
    "minecraft:zombified_piglin",
    "trials:bogged",
    "trials:breeze",
    "kobolds:kobold_warrior",
    "kobolds:kobold_zombie",
    "kobolds:kobold_skeleton",
    "phantasm:behemoth",
    "mimic:mimic",
    "undergarden:rotling",
    "undergarden:rotwalker",
    "undergarden:rotbeast",
    "undergarden:dweller",
    "undergarden:brute",
    "undergarden:nargoyle",
    "undergarden:muncher",
    "undergarden:sploogie",
    "undergarden:forgotten",
    "undergarden:forgotten_guardian",
    "outer_end:himmelite",
    "outer_end:entombed",
    "outer_end:sinker",
    "theabyss:ice_skeleton",
    "theabyss:ice_knight",
    "theabyss:infected_spider",
    "theabyss:infected_creeper",
    "theabyss:soul_guard",
    "theabyss:guard",
    "theabyss:mud_zombie",
    "theabyss:infected_zombie",
    "theabyss:raptor",
    "theabyss:end_spider",
    "theabyss:haunted_skeleton",
    "theabyss:shattered_zombie",
    "theabyss:infected_wolf",
    "theabyss:infected_phantom",
    "theabyss:frost_spider",
    "theabyss:abyssal_lion",
];

EntityEvents.spawned(elite_onEntitySpawned);
EntityEvents.death(elite_onDeath);
ServerEvents.commandRegistry(elite_commands);

let elite_commands_to_run = [];
let elites = [];
let eliteLifetimeInMinutes = 10;

function elite_onEntitySpawned(event) {
    let entity = event.getEntity();
    if (elite_isElite(entity)) {
        return;
    }
    let world = entity.getLevel();
    let type = entity.getType();
    if (elite_allowsEliteMobs(type)) {
        if (!elite_canSpawn()) {
            return;
        }
        let difficulty = elite_getDifficulty();
        let config = elite_getDifficultyConfig(difficulty);
        let friends = elite_summonFriends(world, entity, config.groupSize - 1, difficulty);
        let minionConfig = elite_getMinionCountAndDifficulty(difficulty);
        let minions = elite_summonFriends(world, entity, minionConfig.count, difficulty);
        elite_initElite(entity, difficulty);
        for (let friend of friends) {
            elite_initElite(friend, difficulty);
        }
        for (let minion of minions) {
            elite_initElite(minion, minionConfig.difficulty);
        }
    }
}


function elite_onDeath(event) {
    let entity = event.getEntity();
    if (!elite_isElite(entity)) {
        return;
    }
    let server = event.getServer();
    let damageSource = event.getSource();
    let killingEntity = damageSource.causingEntity;
    if (killingEntity !== null && !killingEntity.getType() === "player" && !killingEntity.getType() === "minecraft:player") {
        return;
    }
    /**
     @type {ServerPlayer}
     */
    let player = killingEntity;
    if (!player) {
        return;
    }
    let mainHandItem = player.getMainHandItem();
    let lootingLevel = 0;
    let dimensionRL = event.level.dimension.toString();
    let loot = null;
    let diff = entity.getPersistentData().getString("elite");
    let rolls = elite_getRolls(diff) + lootingLevel;
    switch (dimensionRL) {
        case "minecraft:overworld":
            loot = global.overworldEliteDrops(rolls);
            break;
        case "blue_skies:everbright":
            loot = global.everbrightEliteDrops(rolls);
            break;
        case "blue_skies:everdawn":
            loot = global.everdawnEliteDrops(rolls);
            break;
        case "aether:the_aether":
            loot = global.aetherEliteDrops(rolls);
            break;
        case "minecraft:the_nether":
            loot = global.netherEliteDrops(rolls);
            break;
        case "undergarden:undergarden":
            loot = global.undergardenEliteDrops(rolls);
            break;
        case "minecraft:the_end":
            loot = global.endEliteDrops(rolls);
            break;
        case "callfromthedepth_:depth":
            loot = global.deepEliteDrops(rolls);
            break;
        case "theabyss:the_abyss":
            loot = global.abyssEliteDrops(rolls);
            break;

    }
    if (loot == null) {
        return;
    }
    let pos = entity.getPos();
    for (let item of loot) {
        global.lootlib_summonItem(server, dimensionRL, pos.x(), pos.y(), pos.z(), item);
    }
}

function eliteScheduler(event) {
    let server = event.getServer();
    for (let command of elite_commands_to_run) {
        server.runCommandSilent(command);
    }
    elite_commands_to_run = [];

    let $AuraCapabilityProvider = Java.loadClass("com.pandaismyname1.zoompack_overrides_forge.aura.AuraCapabilityProvider");
    let currentTime = Date.now();
    let isDedicatedServer = server.isDedicated();
    event.getServer().getAllLevels().forEach(level => {
        var entities = level.getEntities();
        entities.forEach(entity => {
            let isElite = elite_isElite(entity);
            if (!isElite) {
                return;
            }
            let spawnEpoch = entity.getPersistentData().getLong("eliteSpawnedEpoch");
            let timeDiff = currentTime - spawnEpoch;
            if (timeDiff > eliteLifetimeInMinutes * 60 * 1000) {
                entity.remove("discarded")
                return;
            }
            if (!isDedicatedServer) {
                let capability = entity.getCapability($AuraCapabilityProvider.AURA_CAPABILITY).orElse(null);
                if (capability == null) {
                    return;
                }
                let auraId = capability.getAuraId();
                $AuraCapabilityProvider.setAuraId(entity, auraId);
            }
        });
    });
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
    elite_setDifficulty(entity, difficulty);
    elite_setGlowEffect(entity, difficulty);
    elite_setPehkuiSize(entity.getServer(), entity, difficulty);
    let config = elite_getDifficultyConfig(difficulty);
    if(config == undefined){
        return false;
    }
    else{
        let baseName = entity.getName().getString();
        let newName = Component.literal(config.name + " " + baseName).withStyle(config.chatColor);
        entity.setCustomName(newName);
        for (const modifier of Object.keys(config.modifiers)) {
            addModifier(entity, modifier, config.modifiers[modifier], "multiply_total");
        }
        entity.heal(entity.getMaxHealth());
        elites.push(entity);
        return true;
    }
    
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
    var rand = Math.random();
    if (rand < 0.02) {
        return "miniboss";
    } else if (rand < 0.05) {
        return "champion";
    } else if (rand < 0.25) {
        return "elite";
    } else if (rand < 0.26) {
        return "annoying"
    } else {
        return "trained"
    }
}

function elite_getRolls(difficulty) {
    switch (difficulty) {
        case "annoying":
            return 2;
        case "trained":
            return 1;
        case "elite":
            return 2;
        case "champion":
            return 4;
        case "miniboss":
            return 8;
    }
}

function elite_canSpawn() {
    let rand = Math.random();
    return rand < 0.05;
}

function elite_getMinionCountAndDifficulty(difficulty) {
    switch (difficulty) {
        case "annoying":
            return { count: 0, difficulty: "trained" };
        case "trained":
            return { count: 0, difficulty: "trained" };
        case "elite":
            return { count: 0, difficulty: "trained" };
        case "champion":
            return { count: 3, difficulty: "trained" };
        case "miniboss":
            return { count: 3, difficulty: "elite" };
    }
}

function elite_getDifficultyConfig(difficulty) {
    let $ChatFormatting = Java.loadClass("net.minecraft.ChatFormatting");
    switch (difficulty) {
        case "annoying":
            return {
                modifiers: {
                    "generic.max_health": -0.5,
                    "generic.attack_damage": 1,
                    "projectile_damage:generic": 1,
                },
                name: "Lil'",
                chatColor: $ChatFormatting.GRAY,
                groupSize: 5,
            }
        case "trained":
            return {
                modifiers: {
                    "generic.max_health": 0.5,
                    "generic.attack_damage": 0.1,
                    "projectile_damage:generic": 0.1,
                },
                name: "Trained",
                chatColor: $ChatFormatting.GREEN,
                groupSize: 3,
            }
        case "elite":
            return {
                modifiers: {
                    "generic.max_health": 3,
                    "generic.attack_damage": 0.5,
                    "projectile_damage:generic": 0.5,
                },
                name: "Elite",
                chatColor: $ChatFormatting.BLUE,
                groupSize: 2,
            }
        case "champion":
            return {
                modifiers: {
                    "generic.max_health": 9,
                    "generic.attack_damage": 1,
                    "projectile_damage:generic": 1
                },
                name: "Champion",
                chatColor: $ChatFormatting.GOLD,
                groupSize: 1
            }
        case "miniboss":
            return {
                modifiers: {
                    "generic.max_health": 19,
                    "generic.attack_damage": 2,
                    "projectile_damage:generic": 2
                },
                name: "Miniboss",
                chatColor: $ChatFormatting.DARK_RED,
                groupSize: 1
            }
    }
}

function elite_allowsEliteMobs(type) {
    return elite_hostileMobs.includes(type);
}

function elite_isElite(entity) {
    var compoundTag = entity.getPersistentData();
    return compoundTag.contains("elite");
}

function elite_setDifficulty(entity, difficulty) {
    var compoundTag = entity.getPersistentData();
    compoundTag.putString("elite", difficulty);
    compoundTag.putLong("eliteSpawnedEpoch", Date.now());
}

function elite_setGlowEffect(entity, difficulty) {
    var auraCapabilityProvider = Java.loadClass("com.pandaismyname1.zoompack_overrides_forge.aura.AuraCapabilityProvider");
    var auraCapability = auraCapabilityProvider;
    auraCapability.setAuraId(entity, `zoompack_overrides_forge:aura_${difficulty}`);
}


function elite_setPehkuiSize(server, entity, difficulty) {
    let height, width, stepHeight, speed;
    switch (difficulty) {
        case "annoying":
            height = 0.5;
            width = 0.5;
            stepHeight = 1;
            speed = 3;
            break;
        case "trained":
            height = 1.2;
            width = 1.2;
            stepHeight = 1
            break;
        case "elite":
            height = 1.4;
            width = 1.5;
            stepHeight = 1.5
            break;
        case "champion":
            height = 1.7;
            width = 2;
            stepHeight = 1.5
            break;
        case "miniboss":
            height = 2
            width = 2.5
            stepHeight = 2
            break;
    }
    let entitySelector = entity.getStringUuid();
    let heightCommand = `execute as ${entitySelector} run scale set pehkui:height ${height}`;
    let widthCommand = `execute as ${entitySelector} run scale set pehkui:width ${width}`;
    let stepHeightCommand = `execute as ${entitySelector} run scale set pehkui:step_height ${stepHeight}`;
    if (speed !== undefined) {
        let speedCommand = `execute as ${entitySelector} run scale set pehkui:speed ${speed}`;
        elite_commands_to_run.push(speedCommand);
    }
    elite_commands_to_run.push(heightCommand);
    elite_commands_to_run.push(widthCommand);
    elite_commands_to_run.push(stepHeightCommand);
}

function tranverseElites(lambda) {
    let entitiesToRemove = [];
    for (let entity of elites) {
        if (entity == null || entity.isRemoved() || entity.isDead()) {
            entitiesToRemove.push(entity);
        }
    }
    elites = elites.filter(entity => !entitiesToRemove.includes(entity));
    for (let entity of elites) {
        lambda(entity);
    }
}


function addModifier(entity, attributeId, amount, operation) {
    let $BuiltInRegistries = Java.loadClass("net.minecraft.core.registries.BuiltInRegistries");
    let $AttributeModifier = Java.loadClass("net.minecraft.world.entity.ai.attributes.AttributeModifier");
    let attribute = $BuiltInRegistries.ATTRIBUTE.get(new ResourceLocation(attributeId));
    if (attribute == null) {
        return;
    }
    let attributeInstance = entity.getAttribute(attribute);
    if (attributeInstance == null) {
        return;
    }
    let modifier = new $AttributeModifier(UUID.fromString(ELITE_MOBS_UUID), "Elite Modifier", amount, operation);
    attributeInstance.removeModifier(UUID.fromString(ELITE_MOBS_UUID));
    attributeInstance.addTransientModifier(modifier);
}

function loopEliteMobsEvent(event){
    eliteScheduler(event);
    event.server.scheduleInTicks(ELITE_TICK_INTERVAL, callback => {
        eliteScheduler(event);
    });
}

ServerEvents.loaded(event => {
    loopEliteMobsEvent(event);
})