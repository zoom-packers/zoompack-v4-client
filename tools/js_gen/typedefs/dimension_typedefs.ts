
export enum dimension_minecraft {
    d_overworld = "minecraft:overworld",
d_the_nether = "minecraft:the_nether",
d_the_end = "minecraft:the_end",

}



export enum dimension_theabyss {
    d_frost_world = "theabyss:frost_world",
d_spectral_world = "theabyss:spectral_world",
d_pocket_dimension = "theabyss:pocket_dimension",
d_the_abyss = "theabyss:the_abyss",

}



export enum dimension_aether {
    d_the_aether = "aether:the_aether",

}



export enum dimension_blue_skies {
    d_everdawn = "blue_skies:everdawn",
d_everbright = "blue_skies:everbright",

}



export enum dimension_callfromthedepth_ {
    d_depth = "callfromthedepth_:depth",

}



export enum dimension_undergarden {
    d_undergarden = "undergarden:undergarden",

}



export type dimension = dimension_minecraft | dimension_theabyss | dimension_aether | dimension_blue_skies | dimension_callfromthedepth_ | dimension_undergarden;

export const dimension_all = [...Object.values(dimension_minecraft),...Object.values(dimension_theabyss),...Object.values(dimension_aether),...Object.values(dimension_blue_skies),...Object.values(dimension_callfromthedepth_),...Object.values(dimension_undergarden)];

module.exports = {
    dimension_minecraft, dimension_theabyss, dimension_aether, dimension_blue_skies, dimension_callfromthedepth_, dimension_undergarden
}
