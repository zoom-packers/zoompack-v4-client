const SUMMONING_COOLDOWN = 30*20

// cooldowns {playerUUID:{blockId: timestamp}}
const cooldowns = {}

// block behaviour
BlockEvents.rightClicked(event => {
  onRightClick(event, 'theabyss:roka_spawner', 'theabyss:roka_crystal','theabyss:the_roka');
  onRightClick(event, 'theabyss:magician_spawner', 'theabyss:magician_crystal', 'theabyss:magician');
  onRightClick(event, 'theabyss:elder_spawner', 'theabyss:elder_crystal', 'theabyss:elder');
  onRightClick(event, 'theabyss:abyssaur_spawner', 'theabyss:abyssaur_crystal', 'theabyss:abyssaur');
  onRightClick(event, 'theabyss:crystal_golem_spawner', 'theabyss:crystal_golem_crystal', 'theabyss:crystal_golem');
})

// item recipes
ServerEvents.recipes(event => {
  abyssCrystalCraftingRecipes(event, 'theabyss:roka_crystal','minecraft:goat_horn');
  abyssCrystalCraftingRecipes(event, 'theabyss:crystal_golem_crystal', 'minecraft:amethyst_cluster');
  abyssCrystalCraftingRecipes(event, 'theabyss:abyssaur_crystal', 'naturalist:lizard_tail');
  abyssCrystalCraftingRecipes(event, 'theabyss:elder_crystal', 'call_of_yucutan:elder_bone');
  abyssCrystalCraftingRecipes(event, 'theabyss:magician_crystal', 'irons_spellbooks:ancient_knowledge_fragment');
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
  event.server.runCommandSilent(`execute in ${event.getEntity().level.dimension.toString()} run summon ${mobId} ${block.x+0.5} ${block.y+1} ${block.z+0.5}`);

  // Sound effect
  level.playSound(null, block.x, block.y, block.z, 'minecraft:block.end_portal.spawn', 'blocks', 1, 1)
  event.cancel()
}

function abyssCrystalCraftingRecipes(event, outItemId, inItemId){
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
