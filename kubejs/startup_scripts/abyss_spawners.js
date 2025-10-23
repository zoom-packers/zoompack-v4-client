StartupEvents.registry('block', event =>{
  global.createSpawnerBlock(event,'theabyss:roka_spawner','Roka Spawner');
  global.createSpawnerBlock(event,'theabyss:elder_spawner','Elder Spawner');
  global.createSpawnerBlock(event,'theabyss:magician_spawner','Magician Spawner');
  global.createSpawnerBlock(event,'theabyss:abyssaur_spawner','Abyssaur Spawner');
  global.createSpawnerBlock(event,'theabyss:crystal_golem_spawner','Crystal Golem Spawner');
})

StartupEvents.registry('item', event =>{
  global.createSpawnItem(event,'theabyss:roka_crystal', 'Roka Crystal');
  global.createSpawnItem(event,'theabyss:elder_crystal', 'Elder Crystal');
  global.createSpawnItem(event,'theabyss:magician_crystal', 'Magician Crystal');
  global.createSpawnItem(event,'theabyss:abyssaur_crystal', 'Abyssaur Crystal');
  global.createSpawnItem(event,'theabyss:crystal_golem_crystal', 'Crystal Golem Crystal');
})

