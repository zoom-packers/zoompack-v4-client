
AdvJSEvents.advancement(event => {
    const REMOVE_LIST = [
        "irons_spellbooks:grant_patchouli",
        "sedparties:bettertogether",
        "ironfurnaces:coal"
    ];

    REMOVE_LIST.forEach(id => {
        event.remove(id);
    });

});