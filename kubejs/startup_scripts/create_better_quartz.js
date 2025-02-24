StartupEvents.registry('item', event => {

    event.create('create:silicon_remains')
        .maxStackSize(64)
        .displayName('Silicon Remains');

    event.create('create:clean_silicon_chunk')
        .maxStackSize(64)
        .displayName('Clean Silicon Chunk');

    event.create('create:dirty_silicon_chunk')
        .maxStackSize(64)
        .displayName('Dirty Silicon Chunk');

    event.create('create:pressed_silicon_chunk')
        .maxStackSize(64)
        .displayName('Pressed Silicon Chunk');

});