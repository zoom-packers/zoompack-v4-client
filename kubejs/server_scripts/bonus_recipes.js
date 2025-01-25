ServerEvents.recipes(event => {
    event.shaped('2x callfromthedepth_:immemorialupgradesmithingtemplate', ["ABA","CCC","ACA"], {"A":"callfromthedepth_:immemorialscrap","B":"callfromthedepth_:immemorialupgradesmithingtemplate","C":"callfromthedepth_:deepstone"});
    event.remove({ output: 'enderitemod:enderite_upgrade_smithing_template' })
    event.shaped('2x enderitemod:enderite_upgrade_smithing_template', ["ABA","CCC","ACA"], {"A":"minecraft:netherite_ingot","B":"enderitemod:enderite_upgrade_smithing_template","C":"minecraft:end_stone"});
});
