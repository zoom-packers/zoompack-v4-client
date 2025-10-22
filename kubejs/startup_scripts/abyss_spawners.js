StartupEvents.registry('block', event =>{
  global.createSpawnerBlock(event,'roka_spawner','Roka Spawner');
  global.createSpawnerBlock(event,'elder_spawner','Elder Spawner');
  global.createSpawnerBlock(event,'magician_spawner','Magician Spawner');
  global.createSpawnerBlock(event,'abyssaur_spawner','Abyssaur Spawner');
  global.createSpawnerBlock(event,'crystal_golem_spawner','Crystal Golem Spawner');
})

StartupEvents.registry('item', event =>{
  global.createSpawnItem(event,'roka_crystal', 'Roka Crystal');
  global.createSpawnItem(event,'elder_crystal', 'Elder Crystal');
  global.createSpawnItem(event,'magician_crystal', 'Magician Crystal');
  global.createSpawnItem(event,'abyssaur_crystal', 'Abyssaur Crystal');
  global.createSpawnItem(event,'crystal_golem_crystal', 'Crystal Golem Crystal');
})

