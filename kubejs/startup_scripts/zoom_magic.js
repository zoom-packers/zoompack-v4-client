StartupEvents.registry("item", event => {
    event.create("irons_spellbooks:superior_blood_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(15)
        	.addDefaultAttribute("irons_spellbooks:blood_spell_power", "Blood Spell Power", 0.5, "multiply_total")
        	.addDefaultAttribute("minecraft:generic.movement_speed", "Movement Speed", 0.1, "multiply_total")
            .displayName("Superior Blood Spell Book")
});