let techProgLearningBench = "kubejs:engineering_table"
let techProgPmmoSkillName = "engineering"

let techProgMilestones = [
    {
        id: "the_beginning",
        name: "The Beginning",
        description: "Start your engineering journey",
        requirements: [
            {
                item: "minecraft:redstone",
                amount: 64
            }
        ],
        pmmoLevelSet: 5,
    },
    {
        id: "mechanical_power",
        name: "Mechanical Power",
        description: "Harness the power of mechanical energy",
        requirements: [
            {
                item: "create:andesite_casing",
                amount: 64
            },
            {
                item: "create:gearbox",
                amount: 16
            },
            {
                item: "create:water_wheel",
                amount: 8
            }
        ],
        pmmoLevelSet: 10,
    },
    {
        id: "automation",
        name: "Automation",
        description: "Belt go brrrr",
        requirements: [
            {
                item: "create:belt_connector",
                amount: 64
            },
            {
                item: "create:mechanical_press",
                amount: 16
            },
            {
                item: "create:mechanical_mixer",
                amount: 16
            },
        ],
        pmmoLevelSet: 15,
    },
    {
        id: "brass_age",
        name: "Brass Age",
        description: "Brass is the new iron",
        requirements: [
            {
                item: "create:iron_sheet",
                amount: 128
            },
            {
                item: "createaddition:zinc_sheet",
                amount: 96
            },
            {
                item: "create:brass_casing",
                amount: 64
            },
            {
                item: "create:brass_hand",
                amount: 8
            },
        ],
        pmmoLevelSet: 20,
    },
    {
        id: "big_machines",
        name: "Big Machines",
        description: "You'll need a bigger workshop",
        requirements: [
            {
                item: "create:brass_sheet",
                amount: 256
            },
            {
                item: "create:brass_casing",
                amount: 128
            },
            {
                item: "create:mechanical_crafter",
                amount: 64
            },
            {
                item: "create:electron_tube",
                amount: 64
            },
        ],
        pmmoLevelSet: 25,
    },
    {
        id: "steam_power",
        name: "Steam Power",
        description: "Is it me or is it getting hot in here?",
        requirements: [
            {
                item: "create:brass_sheet",
                amount: 256
            },
            {
                item: "create:mechanical_crafter",
                amount: 128,
            },
            {
                item: "create:mechanical_pump",
                amount: 128,
            },
            {
                item: "create:steam_engine",
                amount: 64
            },
        ],
        pmmoLevelSet: 30,
    },
    {
        id: "electricity",
        name: "Electricity",
        description: "Dan, stop probing the power outlets",
        requirements: [
            {
                item: "createaddition:copper_spool",
                amount: 512
            },
            {
                item: "createaddition:capacitor",
                amount: 256
            },
            {
                item: "createaddition:large_connector",
                amount: 256
            },
            {
                item: "createaddition:electric_motor",
                amount: 64
            },
            {
                item: "createaddition:alternator",
                amount: 64
            }
        ],
        pmmoLevelSet: 35,
    },
    {
        id: "digital_age",
        name: "Digital Age",
        description: "Alright, you can get your engineering degree now",
        requirements: [
            {
                item: "refinedstorage:quartz_enriched_iron",
                amount: 512
            },
            {
                item: "refinedstorage:improved_processor",
                amount: 256
            },
            {
                item: "refinedstorage:silicon",
                amount: 256
            },
            {
                item: "refinedstorage:construction_core",
                amount: 64
            },
            {
                item: "refinedstorage:destruction_core",
                amount: 64
            },
        ],
        pmmoLevelSet: 40,
    }
]

let lockedBlocksPmmoLevels = {
    // Create
    "create:andesite_casing": 5,
    "create:shaft": 10,
    "create:cogwheel": 10,
    "create:large_cogwheel": 10,
    "create:hand_crank": 10,
    "create:gearbox": 10,
    "copycats:copycat_cogwheel": 10,
    "copycats:copycat_large_cogwheel": 10,
    "create:mechanical_press": 10,
    "createlowheated:basic_burner": 15,
    "create:mechanical_mixer": 15,
    "create:mechanical_piston": 15,
    "create:sticky_mechanical_piston": 15,
    "create:mechanical_bearing": 15,
    "create:mechanical_drill": 15,
    "create:mechanical_saw": 15,
    "create:mechanical_harvester": 15,
    "create:mechanical_plough": 15,
    "create:mechanical_roller": 15,
    "create:belt_connector": 15,
    "trials:crafter": 15,
    "create:brass_casing": 20,
    "create:deployer": 20,
    "create:mechanical_crafter": 25,
    "create:mechanical_arm": 25,
    "create:blaze_burner": 30,
    "create:empty_blaze_burner": 30,
    "create:mechanical_pump": 30,
    "create:steam_engine": 30,
    "createaddition:electric_motor": 35,
    "createaddition:alternator": 35,


    // Refined Storage
    "refinedstorage:controller": 40,
    "refinedstorage:grid": 40,
    "refinedstorage:crafting_grid": 40,
    "refinedstorage:fluid_grid": 40,
    "refinedstorage:pattern_grid": 40,
    "refinedstorage:crafter_manager": 40,
    "refinedstorage:crafting_monitor": 40,

    "refinedstorage:1k_storage_block": 40,
    "refinedstorage:4k_storage_block": 40,
    "refinedstorage:16k_storage_block": 40,
    "refinedstorage:64k_storage_block": 40,
    "refinedstorage:1k_fluid_storage_block": 40,
    "refinedstorage:4k_fluid_storage_block": 40,
    "refinedstorage:16k_fluid_storage_block": 40,
    "refinedstorage:64k_fluid_storage_block": 40,

    "refinedstorage:disk_drive": 40,
    "refinedstorage:importer": 40,
    "refinedstorage:cable": 40,
    "refinedstorage:exporter": 40,
    "refinedstorage:external_storage": 40
}

BlockEvents.rightClicked(event => {
    let player = event.player;
    let block = event.block;
    // Logic: Check if the player is right clicking the learning bench
    // If this is true, we get the player's persistent data and we check their current milestone id
    // Next up we check if they have the required items for the next milestone in their whole inventory
    // If they don't, we send a message to the player telling them they don't have the required items
    // If they do, we remove the required items from their inventory and set their current milestone to the next milestone
    // Once we do that, we send a message to the player telling them they've completed the milestone
    // We need to also set their PMMO level according to the milestone

    let blockId = block.id;
    if (blockId !== techProgLearningBench) {
        return;
    }


    let playerData = player.persistentData;
    let currentMilestone = techProgGetCurrentMilestone(playerData);


    let mainHandItem = player.getMainHandItem()
    let mainHandItemId = Item.getId(mainHandItem);
    if (mainHandItemId === null || mainHandItemId === "" || mainHandItemId === "minecraft:air") {
        if (currentMilestone === techProgMilestones[0]) {
            techProgSendWelcomeMessage(player);
        }
        if (currentMilestone !== null) {
            techProgSendCurrentMilestone(player, currentMilestone);
        }
    }

    if (currentMilestone === null) {
        player.sendSystemMessage("You've completed all the milestones");
        return;
    }

    let hasRequiredItems = techProgPlayerHasMilestoneItems(currentMilestone, player);

    if (!hasRequiredItems) {
        player.sendSystemMessage("You don't have the required items to complete this milestone");
        return;
    }

    techProgAdvanceToNextMilestone(player, currentMilestone, playerData);
});

function techProgAdvanceToNextMilestone(player, currentMilestone, playerData) {
    let pmmoApiUtils = Java.loadClass('harmonised.pmmo.api.APIUtils');
    PmmoAPIUtils.setLevel(techProgPmmoSkillName, player, currentMilestone.pmmoLevelSet);

    techProgRemoveMilestoneItems(currentMilestone, player);

    playerData.putString("techProgLastCompletedMilestone", currentMilestone.id);
    player.sendSystemMessage("You've completed the milestone: " + currentMilestone.name);
}

function techProgPlayerHasMilestoneItems(milestone, player) {
    let requirementsCount = {};
    let playerInventory = player.inventory.items;
    for (const inventoryItemStack of playerInventory) {
        console.info(inventoryItemStack);
        let inventoryItem = inventoryItemStack.item;
        let inventoryItemId = Item.getId(inventoryItem);
        for (const milestoneElement of milestone.requirements) {
            let item = milestoneElement.item;
            if (inventoryItemId === item) {
                if (requirementsCount[item] === undefined) {
                    requirementsCount[item] = 0;
                }
                requirementsCount[item] += inventoryItemStack.count;
            }
        }
    }
    console.info(requirementsCount);

    let hasRequiredItems = true;
    for (const requirement of milestone.requirements) {
        let item = requirement.item;
        let amount = requirement.amount;
        if (requirementsCount[item] === undefined) {
            hasRequiredItems = false;
            player.sendSystemMessage("§cYou are missing §r§4" + amount + "x " + item + "§r");
        } else if (requirementsCount[item] < amount) {
            hasRequiredItems = false;
            let diff = amount - requirementsCount[item];
            player.sendSystemMessage("§cYou are missing §r§4" + diff + "x " + item + "§r");
        }
    }

    return hasRequiredItems;
}

function techProgRemoveMilestoneItems(milestone, player) {
    let requirementsCount = {};
    for (const requirement of milestone.requirements) {
        requirementsCount[requirement.item] = requirement.amount;
    }

    let playerInventory = player.inventory.items;
    for (const playerInventoryItemStack of playerInventory) {
        let playerInventoryItem = playerInventoryItemStack.item;
        let playerInventoryItemId = Item.getId(playerInventoryItem);
        if (requirementsCount[playerInventoryItemId] > 0) {
            let amountToRemove = requirementsCount[playerInventoryItemId];
            let inventoryItemStackCount = playerInventoryItemStack.count;
            if (amountToRemove >= inventoryItemStackCount) {
                playerInventoryItemStack.setCount(0);
                requirementsCount[playerInventoryItemId] -= inventoryItemStackCount;
            } else {
                playerInventoryItemStack.setCount(inventoryItemStackCount - amountToRemove);
                requirementsCount[playerInventoryItemId] = 0;
            }
        }
    }
}


function techProgGetCurrentMilestone(playerData) {
    let lastCompletedMilestone = playerData.getString("techProgLastCompletedMilestone");
    let currentMilestone = null;
    if (lastCompletedMilestone === null || lastCompletedMilestone === "") {
        return techProgMilestones[0];
    } else {
        let lastCompletedMilestoneIndex = techProgMilestones.findIndex(milestone => milestone.id === lastCompletedMilestone);
        if (lastCompletedMilestoneIndex === techProgMilestones.length - 1) {
            return null;
        } else {
            return techProgMilestones[lastCompletedMilestoneIndex + 1];
        }
    }
}

function techProgSendCurrentMilestone(player, currentMilestone) {
    player.sendSystemMessage("==============================================================");
    player.sendSystemMessage("Your §ecurrent milestone§r is: §a" + currentMilestone.name + "§r - §3" + currentMilestone.description + "§r");
    player.sendSystemMessage("");
    player.sendSystemMessage("Requirements: ");
    for (const requirement of currentMilestone.requirements) {
        let item = requirement.item;
        let amount = requirement.amount;
        player.sendSystemMessage("§d" + amount + "x §4" + item + "§r");
    }
    player.sendSystemMessage("");
    player.sendSystemMessage("Completing this milestone will set your Engineering level to §b" + currentMilestone.pmmoLevelSet + "§r");
    player.sendSystemMessage("==============================================================");
}

function techProgSendWelcomeMessage(player) {
    player.sendSystemMessage("§eWelcome to the Engineering progression system. §r" +
        "In order to progress, you need to complete milestones. Each milestone grants you 5 levels in the Engineering skill.");
    player.sendSystemMessage("To §a complete a milestone§r, you need to §3right click the lectern with a piece of redstone in your hand§r. ");
    player.sendSystemMessage("You can §acheck your current milestone§r by §3right clicking the lectern with an empty hand§r. ");
    player.sendSystemMessage("Good luck!");
}

// TODO COMMANDS
// TODO DOCUMENTATION