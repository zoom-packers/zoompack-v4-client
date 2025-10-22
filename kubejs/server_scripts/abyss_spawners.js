const SUMMONING_COOLDOWN = 30*20

//cooldowns {playerUUID:{blockId: timestamp}}
const cooldowns = {}

BlockEvents.rightClicked(event => {
  onRightClick(event, 'kubejs:roka_spawner', 'kubejs:roka_crystal','theabyss:the_roka');
  onRightClick(event, 'kubejs:magician_spawner', 'kubejs:magician_crystal', 'theabyss:magician');
  onRightClick(event, 'kubejs:elder_spawner', 'kubejs:elder_crystal', 'theabyss:elder');
  onRightClick(event, 'kubejs:abyssaur_spawner', 'kubejs:abyssaur_crystal', 'theabyss:abyssaur');
  onRightClick(event, 'kubejs:crystal_golem_spawner', 'kubejs:crystal_golem_crystal', 'theabyss:crystal_golem');
})


ServerEvents.recipes(event => {
  craftingRecipes(event, 'kubejs:roka_crystal','minecraft:goat_horn');
  craftingRecipes(event, 'kubejs:crystal_golem_crystal', 'minecraft:amethyst_cluster');
  craftingRecipes(event, 'kubejs:abyssaur_crystal', 'naturalist:lizard_tail');
  craftingRecipes(event, 'kubejs:elder_crystal', 'call_of_yucutan:elder_bone');
  craftingRecipes(event, 'kubejs:magician_crystal', 'irons_spellbooks:ancient_knowledge_fragment');
})

function onRightClick(event, blockId, itemId, mobId){
  const { player, hand, item, level, block } = event

  if (hand != 'MAIN_HAND') return
  if (item.id != itemId) return
  if(!block || block.id != blockId) return

  //cooldown logic
  const uuid = player.uuid.toString()

  if(!cooldowns[uuid]) cooldowns[uuid] = {}

  const now = level.time
  
  if (cooldowns[uuid][blockId] && now - cooldowns[uuid][blockId] < SUMMONING_COOLDOWN) 
  {
    const remaining = Math.ceil((SUMMONING_COOLDOWN - (now - cooldowns[uuid][blockId])) / 20)
    player.tell(`§7The crystal is recharging... §e${remaining}s §7remaining.`)
    return
  }

  cooldowns[uuid][blockId] = now

  // Summon entity directly
  const mob = level.createEntity(mobId)
  mob.setPosition(block.x + 0.5, block.y + 1, block.z + 0.5)
  mob.spawn()

  // Sound effect
  level.playSound(null, block.x, block.y, block.z, 'minecraft:entity.enderman.teleport', 'blocks', 1, 1)
  event.cancel()
}

function craftingRecipes(event, outItemId, inItemId){
  event.shaped(
    Item.of(outItemId, 1),
    [
      'ABA',
      'CBC',
      'DDD'
    ],
    {
      A: inItemId,
      B: 'minecraft:end_crystal',
      C: 'minecraft:crying_obsidian',
      D: 'theabyss:fixed_bone'
    }
  )
}
