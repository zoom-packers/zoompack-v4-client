const fs = require('fs')
// CONSTS
let entity_template = `
"{mod_name}:{entity_name}": {
    "minecraft:generic.max_health": {max_health},
    "minecraft:generic.attack_damage": {attack_damage},
    "minecraft:generic.armor": {armor},
}
`
let dimension_template = `
{
  "vein_blacklist": [],
  "travel_req": {},
  "mob_modifier": {
  {entity_properties}
  },
  "override": false,
  "isTagFor": [],
  "bonus": {}
}
`

// MAIN
// generate("blue_skies", "*", 2, "+", 4, "+", 4)
// generate("aether", "*", 4, "+", 10, "+", 10)
// generate_per_dim("minecraft", "the_nether", "*", 5, "+", 12, "+", 12)
// generate("undergarden", "*", 10, "*", 5, "+", 15)
// generate_per_dim("minecraft", "the_end", "*", 15, "+", 30, "+", 18)
// generate("deeperdarker", "*", 20, "*", 10, "+", 20)
// generate("theabyss", "*", 30, "*", 15, "+", 30)


//FUNCTIONS
function generate(mod_name, health_modifier_mode, health_modifier_value, damage_modifier_mode, damage_modifier_value, armor_modifier_mode, armor_modifier_value) {

    let generated_datapack_path = "../../config/paxi/datapacks/generated_pack/data/" + mod_name + "/pmmo"
    let dimensions_folder_path = generated_datapack_path + "/dimensions"

    let dimension_names = []

    let dimension_files = fs.readdirSync(dimensions_folder_path)
    for (let i = 0; i < dimension_files.length; i++) {
        let dimension_file = dimension_files[i]
        let dimension_name = dimension_file.split(".")[0]
        dimension_names.push(dimension_name)
    }

    for (let i = 0; i < dimension_names.length; i++) {
        let dimension_name = dimension_names[i]
        generate_per_dim(mod_name, dimension_name, health_modifier_mode, health_modifier_value, damage_modifier_mode, damage_modifier_value, armor_modifier_mode, armor_modifier_value);
    }
}

function generate_per_dim(mod_name, dimension_name, health_modifier_mode, health_modifier_value, damage_modifier_mode, damage_modifier_value, armor_modifier_mode, armor_modifier_value) {
    if (health_modifier_mode === '*' && health_modifier_value < 2) {
        console.error("Health modifier value must be greater than 2 when using * mode")
        return;
    }
    if (damage_modifier_mode === '*' && damage_modifier_value < 2) {
        console.error("Damage modifier value must be greater than 2 when using * mode")
        return;
    }
    if (armor_modifier_mode === '*' && armor_modifier_value < 2) {
        console.error("Armor modifier value must be greater than 2 when using * mode")
        return;
    }


    let generated_datapack_path = "../../config/paxi/datapacks/generated_pack/data/" + mod_name + "/pmmo"
    let dimensions_folder_path = generated_datapack_path + "/dimensions"
    let entities_folder_path = generated_datapack_path + "/entities"

    let entity_files = fs.readdirSync(entities_folder_path)

    let entity_properties = []
    for (const entityFile of entity_files) {
        let entityName = entityFile.split(".")[0]
        let maxHealth = health_modifier_mode === "+" ? health_modifier_value : health_modifier_value * 10000 / 2;
        let attackDamage = damage_modifier_mode === "+" ? damage_modifier_value : damage_modifier_value * 10000 / 2;
        let armor = armor_modifier_mode === "+" ? armor_modifier_value : armor_modifier_value * 10000 / 2;
        let entityProperties = entity_template.replace("{mod_name}", mod_name).replace("{entity_name}", entityName).replace("{max_health}", maxHealth).replace("{attack_damage}", attackDamage).replace("{armor}", armor)
        entity_properties.push(entityProperties)
    }
    let entity_properties_string = entity_properties.join(",\n");


    let fileName = dimension_name;
    let dimensionProperties = dimension_template.replace("{entity_properties}", entity_properties_string)
    let output_path = dimensions_folder_path + "/" + fileName

    fs.writeFileSync(output_path + ".json", dimensionProperties)
}
