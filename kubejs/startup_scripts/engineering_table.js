StartupEvents.registry('block', event => {
    event.create('engineering_table')
      .displayName('Engineering Table')
      .soundType('wood')
      .hardness(1.0)
      .resistance(1.0)
      .requiresTool(true)
      .tagBlock('minecraft:mineable/axe')
  })