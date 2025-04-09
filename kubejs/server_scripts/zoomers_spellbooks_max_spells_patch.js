const tiers = {
    'specialized':8,
    'improved':10,
    'enchanted':11,
    'merlin':12,
    'ancient':14,
    'legendary':15    
}

PlayerEvents.inventoryChanged(event => {
    let item = event.getItem();
    let item_id = item.item.getId();

    if(item_id.includes('irons_spellbooks:')){
        if(item_id.includes('_spell_book')){
            let isbSpells = item.nbt.getCompound('ISB_Spells');
            if (isbSpells){
                let tier = item_id.replace('irons_spellbooks:','').split('_')[0];
                if(tiers[tier]){
                    let currentMaxSpells = isbSpells.getInt('maxSpells');
                    if(currentMaxSpells!=tiers[tier]){
                        isbSpells.putInt('maxSpells',tiers[tier]);
                        item.nbt.put('ISB_Spells', isbSpells);
                    }
                }
            }
        }   
    }
});