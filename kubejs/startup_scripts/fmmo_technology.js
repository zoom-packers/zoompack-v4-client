// priority: 0

// Visit the wiki for more info - https://kubejs.com/

console.info('Hello, World! (Loaded startup scripts)')

function createSchematic(e, name, displayName, rarity, texture, tooltip) {
    return e.create(name)
        .displayName(displayName)
        .texture(texture)
        .rarity(rarity)
        .tooltip(tooltip)
        .food(food => {
            food.hunger(0)
                .saturation(0)
                .alwaysEdible()
                .fastToEat();
        });
}

StartupEvents.registry("item", e => {

    createSchematic(e, "forgotten_scroll_piece",
        "Forgotten Schematic Piece",
        "COMMON",
        'create:item/schematic',
        "A source to learn technology from.");

    createSchematic(e, "forgotten_scroll",
        "Forgotten Schematic",
        "UNCOMMON",
        'create:item/schematic',
        "A good source to learn technology from.");

    createSchematic(e, "forgotten_scroll_book",
        "Forgotten Schematic Manual",
        "RARE",
        'create:item/schematic',
        "The great source to learn technology from.");

   createSchematic(e, "forgotten_scroll_tome",
        "Forgotten Schematic Tome",
        "EPIC",
        'create:item/schematic',
        "The ultimate source to learn technology from.");
})
