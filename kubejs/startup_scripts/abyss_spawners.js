StartupEvents.registry('block', event =>{
  global.createSpawnerBlock(event,'theabyss:roka_spawner','Roka Altar');
  global.createSpawnerBlock(event,'theabyss:elder_spawner','Elder Altar');
  global.createSpawnerBlock(event,'theabyss:magician_spawner','Magician Altar');
  global.createSpawnerBlock(event,'theabyss:abyssaur_spawner','Abyssaur Altar');
  global.createSpawnerBlock(event,'theabyss:crystal_golem_spawner','Crystal Golem Altar');
})

StartupEvents.registry('item', event =>{
  global.createSpawnItem(event,'theabyss:roka_crystal', 'Roka Crystal');
  global.createSpawnItem(event,'theabyss:elder_crystal', 'Elder Crystal');
  global.createSpawnItem(event,'theabyss:magician_crystal', 'Magician Crystal');
  global.createSpawnItem(event,'theabyss:abyssaur_crystal', 'Abyssaur Crystal');
  global.createSpawnItem(event,'theabyss:crystal_golem_crystal', 'Crystal Golem`s Crystal');
})

