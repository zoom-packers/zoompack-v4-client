StartupEvents.registry('item', event => {

    event.create("irons_spellbooks:specialized_blood_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(8)
        	.addDefaultAttribute("irons_spellbooks:blood_spell_power", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 100, "addition")
            .displayName("Specialized Blood Spellbook");

    event.create("irons_spellbooks:improved_blood_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(10)
        	.addDefaultAttribute("irons_spellbooks:blood_spell_power", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 100, "addition")
            .displayName("Improved Blood Spellbook");

    event.create("irons_spellbooks:enchanted_blood_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(11)
        	.addDefaultAttribute("irons_spellbooks:blood_spell_power", "", 0.1, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.1, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 200, "addition")
            .displayName("Enchanted Blood Spellbook");

    event.create("irons_spellbooks:merlin_blood_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(12)
        	.addDefaultAttribute("irons_spellbooks:blood_spell_power", "", 0.15, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.15, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 300, "addition")
            .displayName("Merlin Blood Spellbook");

    event.create("irons_spellbooks:ancient_blood_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(14)
        	.addDefaultAttribute("irons_spellbooks:blood_spell_power", "", 0.2, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.2, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 400, "addition")
            .displayName("Ancient Blood Spellbook");

    event.create("irons_spellbooks:legendary_blood_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(15)
        	.addDefaultAttribute("irons_spellbooks:blood_spell_power", "", 0.3, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.3, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 600, "addition")
            .displayName("Legendary Blood Spellbook");

    event.create("irons_spellbooks:specialized_ender_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(8)
        	.addDefaultAttribute("irons_spellbooks:ender_spell_power", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 100, "addition")
            .displayName("Specialized Ender Spellbook");

    event.create("irons_spellbooks:improved_ender_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(10)
        	.addDefaultAttribute("irons_spellbooks:ender_spell_power", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 100, "addition")
            .displayName("Improved Ender Spellbook");

    event.create("irons_spellbooks:enchanted_ender_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(11)
        	.addDefaultAttribute("irons_spellbooks:ender_spell_power", "", 0.1, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.1, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 200, "addition")
            .displayName("Enchanted Ender Spellbook");

    event.create("irons_spellbooks:merlin_ender_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(12)
        	.addDefaultAttribute("irons_spellbooks:ender_spell_power", "", 0.15, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.15, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 300, "addition")
            .displayName("Merlin Ender Spellbook");

    event.create("irons_spellbooks:ancient_ender_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(14)
        	.addDefaultAttribute("irons_spellbooks:ender_spell_power", "", 0.2, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.2, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 400, "addition")
            .displayName("Ancient Ender Spellbook");

    event.create("irons_spellbooks:legendary_ender_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(15)
        	.addDefaultAttribute("irons_spellbooks:ender_spell_power", "", 0.3, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.3, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 600, "addition")
            .displayName("Legendary Ender Spellbook");

    event.create("irons_spellbooks:specialized_evocation_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(8)
        	.addDefaultAttribute("irons_spellbooks:evocation_spell_power", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 100, "addition")
            .displayName("Specialized Evocation Spellbook");

    event.create("irons_spellbooks:improved_evocation_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(10)
        	.addDefaultAttribute("irons_spellbooks:evocation_spell_power", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 100, "addition")
            .displayName("Improved Evocation Spellbook");

    event.create("irons_spellbooks:enchanted_evocation_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(11)
        	.addDefaultAttribute("irons_spellbooks:evocation_spell_power", "", 0.1, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.1, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 200, "addition")
            .displayName("Enchanted Evocation Spellbook");

    event.create("irons_spellbooks:merlin_evocation_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(12)
        	.addDefaultAttribute("irons_spellbooks:evocation_spell_power", "", 0.15, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.15, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 300, "addition")
            .displayName("Merlin Evocation Spellbook");

    event.create("irons_spellbooks:ancient_evocation_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(14)
        	.addDefaultAttribute("irons_spellbooks:evocation_spell_power", "", 0.2, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.2, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 400, "addition")
            .displayName("Ancient Evocation Spellbook");

    event.create("irons_spellbooks:legendary_evocation_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(15)
        	.addDefaultAttribute("irons_spellbooks:evocation_spell_power", "", 0.3, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.3, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 600, "addition")
            .displayName("Legendary Evocation Spellbook");

    event.create("irons_spellbooks:specialized_fire_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(8)
        	.addDefaultAttribute("irons_spellbooks:fire_spell_power", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 100, "addition")
            .displayName("Specialized Fire Spellbook");

    event.create("irons_spellbooks:improved_fire_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(10)
        	.addDefaultAttribute("irons_spellbooks:fire_spell_power", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 100, "addition")
            .displayName("Improved Fire Spellbook");

    event.create("irons_spellbooks:enchanted_fire_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(11)
        	.addDefaultAttribute("irons_spellbooks:fire_spell_power", "", 0.1, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.1, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 200, "addition")
            .displayName("Enchanted Fire Spellbook");

    event.create("irons_spellbooks:merlin_fire_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(12)
        	.addDefaultAttribute("irons_spellbooks:fire_spell_power", "", 0.15, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.15, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 300, "addition")
            .displayName("Merlin Fire Spellbook");

    event.create("irons_spellbooks:ancient_fire_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(14)
        	.addDefaultAttribute("irons_spellbooks:fire_spell_power", "", 0.2, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.2, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 400, "addition")
            .displayName("Ancient Fire Spellbook");

    event.create("irons_spellbooks:legendary_fire_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(15)
        	.addDefaultAttribute("irons_spellbooks:fire_spell_power", "", 0.3, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.3, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 600, "addition")
            .displayName("Legendary Fire Spellbook");

    event.create("irons_spellbooks:specialized_holy_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(8)
        	.addDefaultAttribute("irons_spellbooks:holy_spell_power", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 100, "addition")
            .displayName("Specialized Holy Spellbook");

    event.create("irons_spellbooks:improved_holy_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(10)
        	.addDefaultAttribute("irons_spellbooks:holy_spell_power", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 100, "addition")
            .displayName("Improved Holy Spellbook");

    event.create("irons_spellbooks:enchanted_holy_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(11)
        	.addDefaultAttribute("irons_spellbooks:holy_spell_power", "", 0.1, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.1, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 200, "addition")
            .displayName("Enchanted Holy Spellbook");

    event.create("irons_spellbooks:merlin_holy_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(12)
        	.addDefaultAttribute("irons_spellbooks:holy_spell_power", "", 0.15, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.15, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 300, "addition")
            .displayName("Merlin Holy Spellbook");

    event.create("irons_spellbooks:ancient_holy_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(14)
        	.addDefaultAttribute("irons_spellbooks:holy_spell_power", "", 0.2, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.2, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 400, "addition")
            .displayName("Ancient Holy Spellbook");

    event.create("irons_spellbooks:legendary_holy_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(15)
        	.addDefaultAttribute("irons_spellbooks:holy_spell_power", "", 0.3, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.3, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 600, "addition")
            .displayName("Legendary Holy Spellbook");

    event.create("irons_spellbooks:specialized_ice_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(8)
        	.addDefaultAttribute("irons_spellbooks:ice_spell_power", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 100, "addition")
            .displayName("Specialized Ice Spellbook");

    event.create("irons_spellbooks:improved_ice_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(10)
        	.addDefaultAttribute("irons_spellbooks:ice_spell_power", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 100, "addition")
            .displayName("Improved Ice Spellbook");

    event.create("irons_spellbooks:enchanted_ice_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(11)
        	.addDefaultAttribute("irons_spellbooks:ice_spell_power", "", 0.1, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.1, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 200, "addition")
            .displayName("Enchanted Ice Spellbook");

    event.create("irons_spellbooks:merlin_ice_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(12)
        	.addDefaultAttribute("irons_spellbooks:ice_spell_power", "", 0.15, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.15, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 300, "addition")
            .displayName("Merlin Ice Spellbook");

    event.create("irons_spellbooks:ancient_ice_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(14)
        	.addDefaultAttribute("irons_spellbooks:ice_spell_power", "", 0.2, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.2, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 400, "addition")
            .displayName("Ancient Ice Spellbook");

    event.create("irons_spellbooks:legendary_ice_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(15)
        	.addDefaultAttribute("irons_spellbooks:ice_spell_power", "", 0.3, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.3, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 600, "addition")
            .displayName("Legendary Ice Spellbook");

    event.create("irons_spellbooks:specialized_lightning_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(8)
        	.addDefaultAttribute("irons_spellbooks:lightning_spell_power", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 100, "addition")
            .displayName("Specialized Lightning Spellbook");

    event.create("irons_spellbooks:improved_lightning_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(10)
        	.addDefaultAttribute("irons_spellbooks:lightning_spell_power", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 100, "addition")
            .displayName("Improved Lightning Spellbook");

    event.create("irons_spellbooks:enchanted_lightning_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(11)
        	.addDefaultAttribute("irons_spellbooks:lightning_spell_power", "", 0.1, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.1, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 200, "addition")
            .displayName("Enchanted Lightning Spellbook");

    event.create("irons_spellbooks:merlin_lightning_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(12)
        	.addDefaultAttribute("irons_spellbooks:lightning_spell_power", "", 0.15, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.15, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 300, "addition")
            .displayName("Merlin Lightning Spellbook");

    event.create("irons_spellbooks:ancient_lightning_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(14)
        	.addDefaultAttribute("irons_spellbooks:lightning_spell_power", "", 0.2, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.2, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 400, "addition")
            .displayName("Ancient Lightning Spellbook");

    event.create("irons_spellbooks:legendary_lightning_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(15)
        	.addDefaultAttribute("irons_spellbooks:lightning_spell_power", "", 0.3, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.3, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 600, "addition")
            .displayName("Legendary Lightning Spellbook");

    event.create("irons_spellbooks:specialized_nature_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(8)
        	.addDefaultAttribute("irons_spellbooks:nature_spell_power", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 100, "addition")
            .displayName("Specialized Nature Spellbook");

    event.create("irons_spellbooks:improved_nature_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(10)
        	.addDefaultAttribute("irons_spellbooks:nature_spell_power", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.05, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 100, "addition")
            .displayName("Improved Nature Spellbook");

    event.create("irons_spellbooks:enchanted_nature_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(11)
        	.addDefaultAttribute("irons_spellbooks:nature_spell_power", "", 0.1, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.1, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 200, "addition")
            .displayName("Enchanted Nature Spellbook");

    event.create("irons_spellbooks:merlin_nature_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(12)
        	.addDefaultAttribute("irons_spellbooks:nature_spell_power", "", 0.15, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.15, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 300, "addition")
            .displayName("Merlin Nature Spellbook");

    event.create("irons_spellbooks:ancient_nature_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(14)
        	.addDefaultAttribute("irons_spellbooks:nature_spell_power", "", 0.2, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.2, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 400, "addition")
            .displayName("Ancient Nature Spellbook");

    event.create("irons_spellbooks:legendary_nature_spell_book", "irons_spells_js:spellbook")
        	.setMaxSpellSlots(15)
        	.addDefaultAttribute("irons_spellbooks:nature_spell_power", "", 0.3, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", 0.3, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", 600, "addition")
            .displayName("Legendary Nature Spellbook");
});
