ServerEvents.recipes(event => {
    event.shapeless(
        Item.of('createaddition:electrum_nugget', 2),
        [
          'create:zinc_nugget',
          'minecraft:gold_nugget'
        ]
      )
})