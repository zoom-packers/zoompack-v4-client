let $CuriosEhancements$Component = Java.loadClass("net.minecraft.network.chat.Component");

function getTranslatedSpell(spellModId,spellIdOfMod){
    return $CuriosEhancements$Component.translatable(`spell.${spellModId}.${spellIdOfMod}`);
}

function getPlusSingularSpell(spellModId,spellIdOfMod){
    let spellTranslated = getTranslatedSpell(spellModId,spellIdOfMod)
    return $CuriosEhancements$Component.translatable('tooltip.irons_spellbooks.enhance_spell_level', spellTranslated);
}

ItemEvents.tooltip(event => {

    event.addAdvanced(Ingredient.all, (item, advanced, text) => {
        if(!item.nbt) return;
        if(!item.nbt.ISBEnhance) return;
        let spellId = item.nbt.ISBEnhance;

        let singular = true;

        if(spellId.includes(':')){
            // This means that the spell enhance is singular, not plural
            // This feature is not supported yet by irons yet in code, so this is placeholder at the moment
        }
        else{
            singular = false;
        }

        let alreadyPrint = false;

        for(const textP of text){
            if(textP.string.includes('When worn as ring:')){
                alreadyPrint = true;
                break;
            }
        }

        if(!alreadyPrint){
            text.add(text.of(""))
            if(item.id.includes('_ring')){
                text.add(text.of("§6When worn as ring:"));
            }
            if(item.id.includes('_necklace')){
                text.add(text.of("§6When around neck:"));
            }
            if(item.id.includes('_gloves')){
                text.add(text.of("§6When on hands:"));
            }
            if(singular){
                let modFromSpellId = spellId.split(':')[0];
                let spellIdFromSpellId = spellId.split(':')[1];

                let lines = [];

                lines.push(text.of("§e +1 level to "));
                lines.push(getTranslatedSpell(modFromSpellId,spellIdFromSpellId).bold());
                
                text.add(lines);
            }
        }
  })
})