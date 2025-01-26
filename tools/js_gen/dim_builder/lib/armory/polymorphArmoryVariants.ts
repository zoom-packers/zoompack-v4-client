import {
    ArmorVariant,
    BaseVariant,
    BowVariant, ChromaCreator, ChromaKeyOperation,
    CrossbowVariant, CurioVariant, GlovesVariant,
    ShieldVariant,
    SwordVariant,
    ToolVariant
} from "../material/ArmoryTypes";
import {CiaModifier, CiaModifierBuilder, operation} from "../cia/util";
import {
    attribute_attributeslib,
    attribute_irons_spellbooks,
    attribute_minecraft, attribute_projectile_damage
} from "../../../typedefs/attribute_typedefs";
import {item_irons_spellbooks} from "../../../typedefs/item_typedefs";


export function createHealthPerLevelAttributes(piece: 'helmet' | 'chestplate' | 'leggings' | 'boots', tier: 'light' | 'medium' | 'heavy'): CiaModifier[] {
    const pieceMultiplier = piece === 'helmet' ? PolymorphArmoryVariants.ARMOR_HELMET_FRACTION :
        piece === 'chestplate' ? PolymorphArmoryVariants.ARMOR_CHESTPLATE_FRACTION :
            piece === 'leggings' ? PolymorphArmoryVariants.ARMOR_LEGGINGS_FRACTION :
                PolymorphArmoryVariants.ARMOR_BOOTS_FRACTION;

    const healthMultiplier = tier === 'light' ? 0.9 :
        tier === 'medium' ? 1 :
            1.1;

    return [
        CiaModifierBuilder.create(attribute_minecraft.a_generic_max_health, operation.ADDITION, PolymorphArmoryVariants.ARMOR_HP_FLAT_ADDITION * pieceMultiplier * healthMultiplier),
        CiaModifierBuilder.create(attribute_minecraft.a_generic_max_health, operation.MULTIPLY_BASE, PolymorphArmoryVariants.ARMOR_HP_MULTIPLIER * pieceMultiplier * healthMultiplier)
    ]
}

export class PolymorphArmoryVariants {

    public static readonly PIERCE_MULTIPLIER = 3;
    public static readonly ARMOR_HP_FLAT_ADDITION = 2;
    public static readonly ARMOR_HP_MULTIPLIER = 0.23;
    public static readonly ARMOR_HELMET_FRACTION = 0.175;
    public static readonly ARMOR_CHESTPLATE_FRACTION = 0.4;
    public static readonly ARMOR_LEGGINGS_FRACTION = 0.3;
    public static readonly ARMOR_BOOTS_FRACTION = 0.125;


    //#region SWORDS

    private static readonly CLAWS_VARIANT: SwordVariant = {
        id: "claws",
        type: "sword",
        displayName: "Claws",
        recipe: ["", "", "", "", "material", "material", "", "", ""],
        durabilityMultiplier: 1.3,
        damageMultiplier: 0.7,
        speedMultiplier: 0.5,
        reachMultiplier: -0.1,
        modelType: "claws",
        additionalAttributes: [
            {
                attribute: "attributeslib:dodge_chance",
                value: 0.1,
                operation: operation.LOWERCASE_ADDITION
            }
        ],
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.ADDITION, 0.53),
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.MULTIPLY_BASE, 0.1125 * PolymorphArmoryVariants.PIERCE_MULTIPLIER)
        ]
    };

    private static readonly DAGGER_VARIANT: SwordVariant = {
        id: "dagger",
        type: "sword",
        displayName: "Dagger",
        recipe: ["", "", "", "", "material", "", "#forge:rods/wooden", "", ""],
        durabilityMultiplier: 1.5,
        damageMultiplier: 0.7,
        speedMultiplier: 0.5,
        reachMultiplier: -0.2,
        modelType: "normal",
        additionalAttributes: [
            {
                attribute: "attributeslib:dodge_chance",
                value: 0.1,
                operation: operation.LOWERCASE_ADDITION
            }
        ],
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.ADDITION, 0.44),
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.MULTIPLY_BASE, 0.105 * PolymorphArmoryVariants.PIERCE_MULTIPLIER)
        ]
    }
    private static readonly SHORTSWORD_VARIANT: SwordVariant = {
        id: "shortsword",
        type: "sword",
        displayName: "Shortsword",
        recipe: ["", "", "", "", "material", "", "", "#forge:rods/wooden", ""],
        durabilityMultiplier: 1.2,
        damageMultiplier: 0.8,
        speedMultiplier: 0.2,
        reachMultiplier: -0.1,
        modelType: "normal",
        additionalAttributes: [
            CiaModifierBuilder.create(attribute_attributeslib.a_dodge_chance, operation.ADDITION, 0.075)
        ],
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.ADDITION, 0.48),
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.MULTIPLY_BASE, 0.11 * PolymorphArmoryVariants.PIERCE_MULTIPLIER)
        ]
    }
    private static readonly LONGSWORD_VARIANT: SwordVariant = {
        id: "heavysword",
        type: "sword",
        displayName: "Heavysword",
        recipe: ["", "material", "material", "", "material", "", "#forge:rods/wooden", "", ""],
        durabilityMultiplier: 0.8,
        damageMultiplier: 1.2,
        speedMultiplier: 0,
        reachMultiplier: 0.3,
        modelType: "long",
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.ADDITION, 0.55),
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.MULTIPLY_BASE, 0.12 * PolymorphArmoryVariants.PIERCE_MULTIPLIER)
        ]
    }
    private static readonly CUTLASS_VARIANT: SwordVariant = {
        id: "cutlass",
        type: "sword",
        displayName: "Cutlass",
        recipe: ["", "material", "", "material", "", "", "#forge:rods/wooden", "", ""],
        durabilityMultiplier: 1.2,
        damageMultiplier: 1.1,
        speedMultiplier: -0.1,
        reachMultiplier: 0,
        modelType: "normal",
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.ADDITION, 0.55),
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.MULTIPLY_BASE, 0.12 * PolymorphArmoryVariants.PIERCE_MULTIPLIER)
        ]
    }
    private static readonly MACE_VARIANT: SwordVariant = {
        id: "mace",
        type: "sword",
        displayName: "Mace",
        recipe: ["", "material", "material", "", "#forge:rods/wooden", "material", "#forge:rods/wooden", "", ""],
        durabilityMultiplier: 1.2,
        damageMultiplier: 1.15,
        speedMultiplier: -0.15,
        reachMultiplier: 0,
        modelType: "normal",
        additionalAttributes: [
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_shred, operation.ADDITION, 0.05),
        ],
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_shred, operation.ADDITION, 0.01),
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_shred, operation.MULTIPLY_BASE, 0.02)
        ]
    }
    private static readonly HEAVY_MACE_VARIANT: SwordVariant = {
        id: "heavymace",
        type: "sword",
        displayName: "Heavy Mace",
        recipe: ["", "material", "material", "", "material", "material", "", "#forge:rods/wooden", ""],
        durabilityMultiplier: 0.8,
        damageMultiplier: 1.3,
        speedMultiplier: -0.3,
        reachMultiplier: 0.3,
        modelType: "long",
        additionalAttributes: [
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_shred, operation.ADDITION, 0.075)
        ],
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_shred, operation.ADDITION, 0.01),
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_shred, operation.MULTIPLY_BASE, 0.02)
        ]
    }
    private static readonly WARHAMMER_VARIANT: SwordVariant = {
        id: "warhammer",
        type: "sword",
        displayName: "Warhammer",
        recipe: ["material", "material", "material", "", "#forge:rods/wooden", "material", "#forge:rods/wooden", "", ""],
        durabilityMultiplier: 0.7,
        damageMultiplier: 1.5,
        speedMultiplier: -0.35,
        reachMultiplier: 0.3,
        modelType: "long",
        additionalAttributes: [
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_shred, operation.ADDITION, 0.1)
        ],
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_shred, operation.ADDITION, 0.01),
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_shred, operation.MULTIPLY_BASE, 0.02)
        ]
    }
    private static readonly BATTLEAXE_VARIANT: SwordVariant = {
        id: "battleaxe",
        type: "sword",
        displayName: "Battleaxe",
        recipe: ["material", "material", "material", "material", "#forge:rods/wooden", "material", "", "#forge:rods/wooden", ""],
        durabilityMultiplier: 0.8,
        damageMultiplier: 1.35,
        speedMultiplier: -0.25,
        reachMultiplier: 0.3,
        modelType: "long",
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_shred, operation.ADDITION, 0.005),
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_shred, operation.MULTIPLY_BASE, 0.02),
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.ADDITION, 0.45),
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.MULTIPLY_BASE, 0.1 * PolymorphArmoryVariants.PIERCE_MULTIPLIER)
        ]
    }
    private static readonly SPEAR_VARIANT: SwordVariant = {
        id: "spear",
        type: "sword",
        displayName: "Spear",
        recipe: ["", "", "material", "", "#forge:rods/wooden", "", "#forge:rods/wooden", "", ""],
        durabilityMultiplier: 1.2,
        damageMultiplier: 0.9,
        speedMultiplier: -0.15,
        reachMultiplier: 0.7,
        modelType: "spear",
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.ADDITION, 0.5),
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.MULTIPLY_BASE, 0.2 * PolymorphArmoryVariants.PIERCE_MULTIPLIER)
        ]
    }
    private static readonly HALBERD_VARIANT: SwordVariant = {
        id: "halberd",
        type: "sword",
        displayName: "Halberd",
        recipe: ["", "", "material", "", "#forge:rods/wooden", "material", "#forge:rods/wooden", "", ""],
        durabilityMultiplier: 0.85,
        damageMultiplier: 1.15,
        speedMultiplier: -0.3,
        reachMultiplier: 0.7,
        modelType: "spear",
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.ADDITION, 0.5),
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.MULTIPLY_BASE, 0.18 * PolymorphArmoryVariants.PIERCE_MULTIPLIER)
        ]
    }

    private static readonly SCYTHE_VARIANT: SwordVariant = {
        id: "scythe",
        type: "sword",
        displayName: "Scythe",
        recipe: ["material","material","","#forge:rods/wooden","material","","#forge:rods/wooden","",""],
        durabilityMultiplier: 0.8,
        damageMultiplier: 1.3,
        speedMultiplier: -0.4,
        reachMultiplier: 0.7,
        modelType: "long",
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.ADDITION, 0.6),
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.MULTIPLY_BASE, 0.15 * PolymorphArmoryVariants.PIERCE_MULTIPLIER)
        ]
    }

    private static readonly KATANA_VARIANT: SwordVariant = {
        id: "katana",
        type: "sword",
        displayName: "Katana",
        recipe: ["material", "material", "", "material", "", "", "#forge:rods/wooden", "", ""],
        durabilityMultiplier: 1.2,
        damageMultiplier: 0.9,
        speedMultiplier: 0.1,
        reachMultiplier: 0.3,
        modelType: "katana",
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.ADDITION, 0.55),
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.MULTIPLY_BASE, 0.12 * PolymorphArmoryVariants.PIERCE_MULTIPLIER)
        ]
    }

    private static readonly MUSASHI_VARIANT: SwordVariant = {
        id: "musashi",
        type: "sword",
        displayName: "Musashi",
        recipe: ["", "material", "material", "", "", "material", "", "", "#forge:rods/wooden"],
        durabilityMultiplier: 0.9,
        damageMultiplier: 0.8,
        speedMultiplier: 0.15,
        reachMultiplier: 0,
        modelType: "musashi",
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.ADDITION, 0.6),
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.MULTIPLY_BASE, 0.08 * PolymorphArmoryVariants.PIERCE_MULTIPLIER)
        ]
    }

    //#region STAFFS
    private static readonly arcaneStaffAttributes: CiaModifier[] = [
        {
            attribute: attribute_irons_spellbooks.a_cast_time_reduction,
            operation: operation.MULTIPLY_BASE,
            value: 0.05
        },
        {
            attribute: attribute_irons_spellbooks.a_cooldown_reduction,
            operation: operation.MULTIPLY_BASE,
            value: 0.02
        },
        {
            attribute: attribute_irons_spellbooks.a_spell_power,
            operation: operation.MULTIPLY_BASE,
            value: 0.1
        }
    ];

    private static readonly woodwindStaffAttributes: CiaModifier[] = [
        {
            attribute: attribute_irons_spellbooks.a_mana_regen,
            operation: operation.MULTIPLY_BASE,
            value: 0.25
        },
        {
            attribute: attribute_irons_spellbooks.a_spell_power,
            operation: operation.MULTIPLY_BASE,
            value: 0.1
        }
    ];

    private static readonly fireStaffAttributes: CiaModifier[] = [
        {
            attribute: attribute_irons_spellbooks.a_cast_time_reduction,
            operation: operation.MULTIPLY_BASE,
            value: 0.1
        },
        {
            attribute: attribute_irons_spellbooks.a_spell_power,
            operation: operation.MULTIPLY_BASE,
            value: 0.05
        },
        {
            attribute: attribute_irons_spellbooks.a_fire_spell_power,
            operation: operation.MULTIPLY_BASE,
            value: 0.15
        }
    ];

    private static readonly iceStaffAttributes: CiaModifier[] = [
        {
            attribute: attribute_minecraft.a_generic_armor_toughness,
            operation: operation.MULTIPLY_BASE,
            value: 0.05
        },
        {
            attribute: attribute_irons_spellbooks.a_spell_power,
            operation: operation.MULTIPLY_BASE,
            value: 0.05
        },
        {
            attribute: attribute_irons_spellbooks.a_ice_spell_power,
            operation: operation.MULTIPLY_BASE,
            value: 0.15
        }
    ];

    private static readonly lightningStaffAttributes: CiaModifier[] = [
        {
            attribute: attribute_minecraft.a_generic_movement_speed,
            operation: operation.MULTIPLY_BASE,
            value: 0.02
        },
        {
            attribute: attribute_irons_spellbooks.a_spell_power,
            operation: operation.MULTIPLY_BASE,
            value: 0.05
        },
        {
            attribute: attribute_irons_spellbooks.a_lightning_spell_power,
            operation: operation.MULTIPLY_BASE,
            value: 0.15
        }
    ];

    private static readonly natureStaffAttributes: CiaModifier[] = [
        {
            attribute: attribute_irons_spellbooks.a_mana_regen,
            operation: operation.MULTIPLY_BASE,
            value: 0.1
        },
        {
            attribute: attribute_irons_spellbooks.a_spell_power,
            operation: operation.MULTIPLY_BASE,
            value: 0.05
        },
        {
            attribute: attribute_irons_spellbooks.a_nature_spell_power,
            operation: operation.MULTIPLY_BASE,
            value: 0.15
        }
    ];

    private static readonly holyStaffAttributes: CiaModifier[] = [
        {
            attribute: attribute_irons_spellbooks.a_spell_resist,
            operation: operation.MULTIPLY_BASE,
            value: 0.1
        },
        {
            attribute: attribute_irons_spellbooks.a_spell_power,
            operation: operation.MULTIPLY_BASE,
            value: 0.05
        },
        {
            attribute: attribute_irons_spellbooks.a_holy_spell_power,
            operation: operation.MULTIPLY_BASE,
            value: 0.15
        }
    ];

    private static readonly bloodStaffAttributes: CiaModifier[] = [
        {
            attribute: attribute_attributeslib.a_life_steal,
            operation: operation.MULTIPLY_BASE,
            value: 0.02
        },
        {
            attribute: attribute_irons_spellbooks.a_spell_power,
            operation: operation.MULTIPLY_BASE,
            value: 0.05
        },
        {
            attribute: attribute_irons_spellbooks.a_blood_spell_power,
            operation: operation.MULTIPLY_BASE,
            value: 0.15
        }
    ];

    private static readonly evocationStaffAttributes: CiaModifier[] = [
        {
            attribute: attribute_irons_spellbooks.a_summon_damage,
            operation: operation.MULTIPLY_BASE,
            value: 0.1
        },
        {
            attribute: attribute_irons_spellbooks.a_spell_power,
            operation: operation.MULTIPLY_BASE,
            value: 0.05
        },
        {
            attribute: attribute_irons_spellbooks.a_evocation_spell_power,
            operation: operation.MULTIPLY_BASE,
            value: 0.15
        }
    ];

    private static readonly enderStaffAttributes: CiaModifier[] = [
        {
            attribute: attribute_irons_spellbooks.a_max_mana,
            operation: operation.MULTIPLY_BASE,
            value: 0.2
        },
        {
            attribute: attribute_irons_spellbooks.a_spell_power,
            operation: operation.MULTIPLY_BASE,
            value: 0.1
        },
        {
            attribute: attribute_irons_spellbooks.a_ender_spell_power,
            operation: operation.MULTIPLY_BASE,
            value: 0.2
        }
    ];

    private static readonly ARCANE_STAFF: SwordVariant = {
        id: "arcane_staff",
        type: "sword",
        displayName: "Arcane Staff",
        recipe: ["", "minecraft:amethyst_shard", "#minecraft:planks", "", "#minecraft:planks", "material", "#minecraft:planks", "material", ""],
        durabilityMultiplier: 1,
        damageMultiplier: 0.5,
        speedMultiplier: 0,
        reachMultiplier: 0,
        modelType: "arcane_staff",
        additionalAttributesPerLevel: PolymorphArmoryVariants.arcaneStaffAttributes,
    }

    private static readonly WOODWIND_STAFF: SwordVariant = {
        id: "woodwind_staff",
        type: "sword",
        displayName: "Wood Wind Staff",
        recipe: ["", "#minecraft:logs", "#minecraft:planks", "", "#minecraft:planks", "material", "#minecraft:planks", "material", ""],
        durabilityMultiplier: 1,
        damageMultiplier: 0.5,
        speedMultiplier: 0,
        reachMultiplier: 0,
        modelType: "woodwind_staff",
        additionalAttributesPerLevel: PolymorphArmoryVariants.woodwindStaffAttributes,
    }

    private static readonly FIRE_STAFF: SwordVariant = {
        id: "fire_staff",
        type: "sword",
        displayName: "Fire Staff",
        recipe: ["", "minecraft:blaze_powder", "#minecraft:planks", "", "#minecraft:planks", "material", "#minecraft:planks", "material", ""],
        durabilityMultiplier: 1,
        damageMultiplier: 0.5,
        speedMultiplier: 0,
        reachMultiplier: 0,
        modelType: "fire_staff",
        additionalAttributesPerLevel: PolymorphArmoryVariants.fireStaffAttributes,
    }

    private static readonly ICE_STAFF: SwordVariant = {
        id: "ice_staff",
        type: "sword",
        displayName: "Ice Staff",
        recipe: ["", "minecraft:packed_ice", "#minecraft:planks", "", "#minecraft:planks", "material", "#minecraft:planks", "material", ""],
        durabilityMultiplier: 1,
        damageMultiplier: 0.5,
        speedMultiplier: 0,
        reachMultiplier: 0,
        modelType: "ice_staff",
        additionalAttributesPerLevel: PolymorphArmoryVariants.iceStaffAttributes,
    }

    private static readonly LIGHTNING_STAFF: SwordVariant = {
        id: "lightning_staff",
        type: "sword",
        displayName: "Lightning Staff",
        recipe: ["", "irons_spellbooks:lightning_bottle", "#minecraft:planks", "", "#minecraft:planks", "material", "#minecraft:planks", "material", ""],
        durabilityMultiplier: 1,
        damageMultiplier: 0.5,
        speedMultiplier: 0,
        reachMultiplier: 0,
        modelType: "lightning_staff",
        additionalAttributesPerLevel: PolymorphArmoryVariants.lightningStaffAttributes,
    }

    private static readonly NATURE_STAFF: SwordVariant = {
        id: "nature_staff",
        type: "sword",
        displayName: "Nature Staff",
        recipe: ["", "minecraft:poisonous_potato", "#minecraft:planks", "", "#minecraft:planks", "material", "#minecraft:planks", "material", ""],
        durabilityMultiplier: 1,
        damageMultiplier: 0.5,
        speedMultiplier: 0,
        reachMultiplier: 0,
        modelType: "nature_staff",
        additionalAttributesPerLevel: PolymorphArmoryVariants.natureStaffAttributes,
    }

    private static readonly HOLY_STAFF: SwordVariant = {
        id: "holy_staff",
        type: "sword",
        displayName: "Holy Staff",
        recipe: ["", "irons_spellbooks:divine_pearl", "#minecraft:planks", "", "#minecraft:planks", "material", "#minecraft:planks", "material", ""],
        durabilityMultiplier: 1,
        damageMultiplier: 0.5,
        speedMultiplier: 0,
        reachMultiplier: 0,
        modelType: "holy_staff",
        additionalAttributesPerLevel: PolymorphArmoryVariants.holyStaffAttributes,
    }

    private static readonly BLOOD_STAFF: SwordVariant = {
        id: "blood_staff",
        type: "sword",
        displayName: "Blood Staff",
        recipe: ["", "irons_spellbooks:blood_vial", "#minecraft:planks", "", "#minecraft:planks", "material", "#minecraft:planks", "material", ""],
        durabilityMultiplier: 1,
        damageMultiplier: 0.5,
        speedMultiplier: 0,
        reachMultiplier: 0,
        modelType: "blood_staff",
        additionalAttributesPerLevel: PolymorphArmoryVariants.bloodStaffAttributes,
    }

    private static readonly EVOCATION_STAFF: SwordVariant = {
        id: "evocation_staff",
        type: "sword",
        displayName: "Evocation Staff",
        recipe: ["", "minecraft:emerald", "#minecraft:planks", "", "#minecraft:planks", "material", "#minecraft:planks", "material", ""],
        durabilityMultiplier: 1,
        damageMultiplier: 0.5,
        speedMultiplier: 0,
        reachMultiplier: 0,
        modelType: "evocation_staff",
        additionalAttributesPerLevel: PolymorphArmoryVariants.evocationStaffAttributes,
    }

    private static readonly ENDER_STAFF: SwordVariant = {
        id: "ender_staff",
        type: "sword",
        displayName: "Ender Staff",
        recipe: ["", "minecraft:ender_pearl", "#minecraft:planks", "", "#minecraft:planks", "material", "#minecraft:planks", "material", ""],
        durabilityMultiplier: 1,
        damageMultiplier: 0.5,
        speedMultiplier: 0,
        reachMultiplier: 0,
        modelType: "ender_staff",
        additionalAttributesPerLevel: PolymorphArmoryVariants.enderStaffAttributes,
    }

    //#endregion

    public static readonly SWORDS: SwordVariant[] = [
        PolymorphArmoryVariants.CLAWS_VARIANT,
        PolymorphArmoryVariants.DAGGER_VARIANT,
        PolymorphArmoryVariants.SHORTSWORD_VARIANT,
        PolymorphArmoryVariants.LONGSWORD_VARIANT,
        PolymorphArmoryVariants.CUTLASS_VARIANT,
        PolymorphArmoryVariants.MACE_VARIANT,
        PolymorphArmoryVariants.HEAVY_MACE_VARIANT,
        PolymorphArmoryVariants.WARHAMMER_VARIANT,
        PolymorphArmoryVariants.BATTLEAXE_VARIANT,
        PolymorphArmoryVariants.SPEAR_VARIANT,
        PolymorphArmoryVariants.HALBERD_VARIANT,
        PolymorphArmoryVariants.SCYTHE_VARIANT,
        PolymorphArmoryVariants.KATANA_VARIANT,
        PolymorphArmoryVariants.MUSASHI_VARIANT,
        PolymorphArmoryVariants.ARCANE_STAFF,
        PolymorphArmoryVariants.WOODWIND_STAFF,
        PolymorphArmoryVariants.FIRE_STAFF,
        PolymorphArmoryVariants.ICE_STAFF,
        PolymorphArmoryVariants.LIGHTNING_STAFF,
        PolymorphArmoryVariants.NATURE_STAFF,
        PolymorphArmoryVariants.HOLY_STAFF,
        PolymorphArmoryVariants.BLOOD_STAFF,
        PolymorphArmoryVariants.EVOCATION_STAFF,
        PolymorphArmoryVariants.ENDER_STAFF
    ];
    //#endregion

    //#region SHIELDS
    private static readonly BUCKLER_VARIANT: ShieldVariant = {
        id: "buckler",
        type: "shield",
        displayName: "Buckler",
        recipe: ["", "#minecraft:planks", "", "#minecraft:planks", "material", "#minecraft:planks", "", "#minecraft:planks", ""],
        durabilityMultiplier: 0.9,
        armorMultiplier: 0.3,
        speedMultiplier: 0,
        modelType: "buckler_shield",
        additionalAttributes: [],
        pmmoSkill: "combat"
    }
    private static readonly HEATER_VARIANT: ShieldVariant = {
        id: "heater",
        type: "shield",
        displayName: "Heater Shield",
        recipe: ["#minecraft:planks", "material", "#minecraft:planks", "#minecraft:planks", "material", "#minecraft:planks", "", "#minecraft:planks", ""],
        durabilityMultiplier: 1.2,
        armorMultiplier: 0.4,
        speedMultiplier: -0.1,
        modelType: "heater_shield",
        additionalAttributes: []
    }
    private static readonly TOWER_VARIANT: ShieldVariant = {
        id: "tower",
        type: "shield",
        displayName: "Tower Shield",
        recipe: ["#minecraft:planks", "material", "#minecraft:planks", "#minecraft:planks", "material", "#minecraft:planks", "#minecraft:planks", "material", "#minecraft:planks"],
        durabilityMultiplier: 1.5,
        armorMultiplier: 0.5,
        speedMultiplier: -0.2,
        modelType: "tower_shield",
        additionalAttributes: []
    }

    public static readonly SHIELDS: ShieldVariant[] = [
        PolymorphArmoryVariants.BUCKLER_VARIANT,
        PolymorphArmoryVariants.HEATER_VARIANT,
        PolymorphArmoryVariants.TOWER_VARIANT
    ];
    //#endregion

    //#region BOWS
    private static readonly SHORTBOW_VARIANT: BowVariant = {
        id: "shortbow",
        type: "bow",
        displayName: "Shortbow",
        recipe: ["", "material", "#c:string", "material", "", "#c:string", "", "material", "#c:string"],
        durabilityMultiplier: 1.2,
        damageMultiplier: 0.8,
        speedMultiplier: 0.2,
        modelType: "shortbow",
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.ADDITION, 0.55),
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.MULTIPLY_BASE, 0.12 * PolymorphArmoryVariants.PIERCE_MULTIPLIER)
        ]
    }
    private static readonly BOW_VARIANT: BowVariant = {
        id: "bow",
        type: "bow",
        displayName: "Bow",
        recipe: ["", "material", "#c:string", "material", "#c:string", "", "material", "#c:string", ""],
        durabilityMultiplier: 1,
        damageMultiplier: 1,
        speedMultiplier: 0,
        modelType: "bow",
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.ADDITION, 0.55),
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.MULTIPLY_BASE, 0.12 * PolymorphArmoryVariants.PIERCE_MULTIPLIER)
        ]
    }
    private static readonly LONGBOW_VARIANT: BowVariant = {
        id: "longbow",
        type: "bow",
        displayName: "Longbow",
        recipe: ["", "material", "#c:string", "", "material", "#c:string", "material", "#c:string", ""],
        durabilityMultiplier: 0.8,
        damageMultiplier: 1.2,
        speedMultiplier: -0.3,
        modelType: "longbow",
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.ADDITION, 0.55),
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.MULTIPLY_BASE, 0.12 * PolymorphArmoryVariants.PIERCE_MULTIPLIER)
        ]
    }

    public static readonly BOWS: BowVariant[] = [
        PolymorphArmoryVariants.SHORTBOW_VARIANT,
        PolymorphArmoryVariants.BOW_VARIANT,
        PolymorphArmoryVariants.LONGBOW_VARIANT
    ];
    //#endregion

    //#region Crossbows
    private static readonly CROSSBOW_VARIANT: CrossbowVariant = {
        id: "crossbow",
        type: "crossbow",
        displayName: "Crossbow",
        recipe: ["material", "material", "material", "#c:string", "minecraft:tripwire_hook", "#c:string", "", "#forge:rods/wooden", ""],
        durabilityMultiplier: 0.75,
        damageMultiplier: 1.5,
        speedMultiplier: -0.2,
        modelType: "crossbow",
        additionalAttributes: [
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_shred, operation.ADDITION, 0.075)
        ],
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_shred, operation.ADDITION, 0.01),
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_shred, operation.MULTIPLY_BASE, 0.02)
        ]
    }
    private static readonly ARBALEST_VARIANT: CrossbowVariant = {
        id: "arbalest",
        type: "crossbow",
        displayName: "Arbalest",
        recipe: ["material", "material", "material", "#c:string", "minecraft:tripwire_hook", "#c:string", "material", "#forge:rods/wooden", ""],
        durabilityMultiplier: 1.2,
        damageMultiplier: 0.4,
        speedMultiplier: -0.2,
        modelType: "crossbow",
        additionalAttributes: [
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_shred, operation.ADDITION, 0.075)
        ],
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_shred, operation.ADDITION, 0.01),
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_shred, operation.MULTIPLY_BASE, 0.02)
        ]
    }

    public static readonly CROSSBOWS: CrossbowVariant[] = [
        PolymorphArmoryVariants.CROSSBOW_VARIANT,
        // PolymorphArmoryVariants.ARBALEST_VARIANT
    ];
    //#endregion

    //#region TOOLS
    private static readonly PICKAXE_VARIANT: ToolVariant = {
        id: "pickaxe",
        type: "tool",
        toolType: "pickaxe",
        displayName: "Pickaxe",
        recipe: ["material", "material", "material", "", "#forge:rods/wooden", "", "", "#forge:rods/wooden", ""],
        durabilityMultiplier: 1,
        speedMultiplier: 1,
        damageMultiplier: 0,
        modelType: "normal",
        additionalAttributes: []
    }
    private static readonly AXE_VARIANT: ToolVariant = {
        id: "axe",
        type: "tool",
        toolType: "axe",
        displayName: "Axe",
        recipe: ["material", "material", "", "material", "#forge:rods/wooden", "", "", "#forge:rods/wooden", ""],
        durabilityMultiplier: 1,
        speedMultiplier: 1,
        damageMultiplier: 1,
        modelType: "normal",
        additionalAttributes: []
    }
    private static readonly SHOVEL_VARIANT: ToolVariant = {
        id: "shovel",
        type: "tool",
        toolType: "shovel",
        displayName: "Shovel",
        recipe: ["material", "", "material", "", "#forge:rods/wooden", "", "", "#forge:rods/wooden", ""],
        durabilityMultiplier: 1,
        speedMultiplier: 1,
        damageMultiplier: 0,
        modelType: "normal",
        additionalAttributes: []
    }
    private static readonly HOE_VARIANT: ToolVariant = {
        id: "hoe",
        type: "tool",
        toolType: "hoe",
        displayName: "Hoe",
        recipe: ["material", "material", "", "", "#forge:rods/wooden", "", "", "#forge:rods/wooden", ""],
        durabilityMultiplier: 1,
        speedMultiplier: 1,
        damageMultiplier: 0,
        modelType: "normal",
        additionalAttributes: []
    }

    public static readonly TOOLS: ToolVariant[] = [
        PolymorphArmoryVariants.PICKAXE_VARIANT,
        PolymorphArmoryVariants.AXE_VARIANT,
        PolymorphArmoryVariants.SHOVEL_VARIANT,
        PolymorphArmoryVariants.HOE_VARIANT
    ];
    //#endregion

    //#region ARMOR
    private static readonly HELMET_VARIANT: ArmorVariant = {
        id: "helmet",
        type: "armor",
        slot: "head",
        displayName: "Helmet",
        recipe: ["material", "material", "material", "material", "", "material", "", "", ""],
        durabilityMultiplier: 1,
        armorMultiplier: 1,
        toughnessMultiplier: 1,
        knockbackResistanceMultiplier: 1,
        modelType: "normal",
        additionalAttributes: [],
        additionalAttributesPerLevel: [
            ...createHealthPerLevelAttributes("helmet", "medium")
        ]
    }
    private static readonly CHESTPLATE_VARIANT: ArmorVariant = {
        id: "chestplate",
        type: "armor",
        slot: "chest",
        displayName: "Chestplate",
        recipe: ["material", "", "material", "material", "material", "material", "material", "material", "material"],
        durabilityMultiplier: 1,
        armorMultiplier: 1,
        toughnessMultiplier: 1,
        knockbackResistanceMultiplier: 1,
        modelType: "normal",
        additionalAttributes: [],
        additionalAttributesPerLevel: [
            ...createHealthPerLevelAttributes("chestplate", "medium")
        ]
    }
    private static readonly LEGGINGS_VARIANT: ArmorVariant = {
        id: "leggings",
        type: "armor",
        slot: "legs",
        displayName: "Leggings",
        recipe: ["material", "material", "material", "material", "", "material", "material", "", "material"],
        durabilityMultiplier: 1,
        armorMultiplier: 1,
        toughnessMultiplier: 1,
        knockbackResistanceMultiplier: 1,
        modelType: "normal",
        additionalAttributes: [],
        additionalAttributesPerLevel: [
            ...createHealthPerLevelAttributes("leggings", "medium")
        ]
    }
    private static readonly BOOTS_VARIANT: ArmorVariant = {
        id: "boots",
        type: "armor",
        slot: "feet",
        displayName: "Boots",
        recipe: ["material", "", "material", "material", "", "material", "", "", ""],
        durabilityMultiplier: 1,
        armorMultiplier: 1,
        toughnessMultiplier: 1,
        knockbackResistanceMultiplier: 1,
        modelType: "normal",
        additionalAttributes: [],
        additionalAttributesPerLevel: [
            ...createHealthPerLevelAttributes("boots", "medium")
        ]
    }

    // public static readonly GLOVES_VARIANT: GlovesVariant = {
    //     id: "gloves",
    //     type: "armor",
    //     durabilityMultiplier: 1,
    //     modelType: "normal",
    //     displayName: "Gloves",
    //     recipe: ["", "", "", "material", "", "material", "", "", ""],
    //     damagePerLevel: 0.25,
    //     pmmoSkill: "combat",
    // }

    public static readonly ARMORS: ArmorVariant[] = [
        PolymorphArmoryVariants.HELMET_VARIANT,
        PolymorphArmoryVariants.CHESTPLATE_VARIANT,
        PolymorphArmoryVariants.LEGGINGS_VARIANT,
        PolymorphArmoryVariants.BOOTS_VARIANT
    ];

    public static readonly GLOVES: GlovesVariant[] = [
    ];
    //#endregion

    //#region CURIOS

    private static createRingChroma(baseColor: string, accentColor: string): ChromaKeyOperation[] {
        return [
            ChromaCreator.create("#a72331", accentColor, 0.15, "linear"),
            ChromaCreator.create("#009400", baseColor, 0.15, "linear"),
        ]
    }

    private static createNecklaceChroma(baseColor: string, accentColor: string): ChromaKeyOperation[] {
        return [
            ChromaCreator.create("#af0000", accentColor, 0.15, "linear"),
            ChromaCreator.create("#009400", baseColor, 0.15, "linear"),
        ]
    }

    private static readonly MANA_RING_VARIANT: CurioVariant = {
        id: "mana_ring",
        type: "curio",
        slot: "ring",
        displayName: "Mana Ring",
        recipe: ["", "material", "", "material", item_irons_spellbooks.i_arcane_rune, "material", "", "material", ""],
        durabilityMultiplier: 1,
        modelType: "normal",
        pmmoSkill: "magic",
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_irons_spellbooks.a_max_mana, operation.ADDITION, 5),
            CiaModifierBuilder.create(attribute_irons_spellbooks.a_max_mana, operation.MULTIPLY_BASE, 0.01),
            CiaModifierBuilder.create(attribute_irons_spellbooks.a_mana_regen, operation.ADDITION, 0.015),
        ],
        textureGenDetails: {
            textureName: "ring_1.png",
            chromaKeyOperations: PolymorphArmoryVariants.createRingChroma("#000000", "#21a9bf")
        }
    }

    private static readonly DEXTERITY_RING_VARIANT: CurioVariant = {
        id: "dexterity_ring",
        type: "curio",
        slot: "ring",
        displayName: "Dexterity Ring",
        recipe: ["", "material", "", "material", item_irons_spellbooks.i_lightning_rune, "material", "", "material", ""],
        durabilityMultiplier: 1,
        modelType: "normal",
        pmmoSkill: "archery",
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_projectile_damage.a_generic, operation.ADDITION, 1),
            CiaModifierBuilder.create(attribute_projectile_damage.a_generic, operation.MULTIPLY_BASE, 0.01),
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.ADDITION, 1),
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.MULTIPLY_BASE, 0.01),
        ],
        textureGenDetails: {
            textureName: "ring_1.png",
            chromaKeyOperations: PolymorphArmoryVariants.createRingChroma("#000000", "#50bf21")
        }
    }

    private static readonly SHARPSHOOTER_RING_VARIANT: CurioVariant = {
        id: "sharpshooter_ring",
        type: "curio",
        slot: "ring",
        displayName: "Sharpshooter Ring",
        recipe: ["", "material", "", "material", item_irons_spellbooks.i_blood_rune, "material", "", "material", ""],
        durabilityMultiplier: 1,
        modelType: "normal",
        pmmoSkill: "archery",
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_attributeslib.a_arrow_velocity, operation.ADDITION, 0.01),
            CiaModifierBuilder.create(attribute_attributeslib.a_draw_speed, operation.ADDITION, 0.005),
        ],
        textureGenDetails: {
            textureName: "ring_1.png",
            chromaKeyOperations: PolymorphArmoryVariants.createRingChroma("#000000", "#7f1212")
        }
    }

    private static readonly BERSERKER_RING_VARIANT: CurioVariant = {
        id: "berserker_ring",
        type: "curio",
        slot: "ring",
        displayName: "Berserker Ring",
        recipe: ["", "material", "", "material", item_irons_spellbooks.i_fire_rune, "material", "", "material", ""],
        durabilityMultiplier: 1,
        modelType: "normal",
        pmmoSkill: "combat",
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_minecraft.a_generic_attack_damage, operation.ADDITION, 1),
            CiaModifierBuilder.create(attribute_minecraft.a_generic_attack_damage, operation.MULTIPLY_BASE, 0.01),
        ],
        textureGenDetails: {
            textureName: "ring_1.png",
            chromaKeyOperations: PolymorphArmoryVariants.createRingChroma("#000000", "#bf6521")
        }
    }

    private static readonly FORTIFIED_RING_VARIANT: CurioVariant = {
        id: "fortified_ring",
        type: "curio",
        slot: "ring",
        displayName: "Fortified Ring",
        recipe: ["", "material", "", "material", item_irons_spellbooks.i_protection_rune, "material", "", "material", ""],
        durabilityMultiplier: 1,
        modelType: "normal",
        pmmoSkill: "endurance",
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_minecraft.a_generic_armor, operation.ADDITION, 1),
            CiaModifierBuilder.create(attribute_minecraft.a_generic_armor, operation.MULTIPLY_BASE, 0.01),
            CiaModifierBuilder.create(attribute_minecraft.a_generic_armor_toughness, operation.ADDITION, 1),
            CiaModifierBuilder.create(attribute_minecraft.a_generic_armor_toughness, operation.MULTIPLY_BASE, 0.01),
            CiaModifierBuilder.create(attribute_minecraft.a_generic_knockback_resistance, operation.ADDITION, 1),
            CiaModifierBuilder.create(attribute_minecraft.a_generic_knockback_resistance, operation.MULTIPLY_BASE, 0.01),
            CiaModifierBuilder.create(attribute_minecraft.a_generic_max_health, operation.ADDITION, 1),
            CiaModifierBuilder.create(attribute_minecraft.a_generic_max_health, operation.MULTIPLY_BASE, 0.01),
        ],
        textureGenDetails: {
            textureName: "ring_1.png",
            chromaKeyOperations: PolymorphArmoryVariants.createRingChroma("#000000", "#bf2121")
        }
    }

    private static readonly INFUSED_RING_VARIANT: CurioVariant = {
        id: "infused_ring",
        type: "curio",
        slot: "ring",
        displayName: "Infused Ring",
        recipe: ["", "material", "", "material", item_irons_spellbooks.i_cooldown_rune, "material", "", "material", ""],
        durabilityMultiplier: 1,
        modelType: "normal",
        pmmoSkill: "magic",
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_irons_spellbooks.a_spell_power, operation.ADDITION, 0.01),
            CiaModifierBuilder.create(attribute_irons_spellbooks.a_spell_power, operation.MULTIPLY_BASE, 0.01),
            CiaModifierBuilder.create(attribute_irons_spellbooks.a_cast_time_reduction, operation.ADDITION, 0.01),
            CiaModifierBuilder.create(attribute_irons_spellbooks.a_cooldown_reduction, operation.ADDITION, 0.01),
        ],
        textureGenDetails: {
            textureName: "ring_1.png",
            chromaKeyOperations: PolymorphArmoryVariants.createRingChroma("#000000", "#a8c9ce")
        }
    }

    public static readonly RINGS: CurioVariant[] = [
        PolymorphArmoryVariants.MANA_RING_VARIANT,
        PolymorphArmoryVariants.DEXTERITY_RING_VARIANT,
        PolymorphArmoryVariants.SHARPSHOOTER_RING_VARIANT,
        PolymorphArmoryVariants.BERSERKER_RING_VARIANT,
        PolymorphArmoryVariants.FORTIFIED_RING_VARIANT,
        PolymorphArmoryVariants.INFUSED_RING_VARIANT
    ];

    private static readonly MANA_NECKLACE_VARIANT: CurioVariant = {
        id: "mana_necklace",
        type: "curio",
        slot: "necklace",
        displayName: "Mana Necklace",
        recipe: ["material", "", "material", "material", "", "material", "", item_irons_spellbooks.i_arcane_rune, ""],
        durabilityMultiplier: 1,
        modelType: "normal",
        pmmoSkill: "magic",
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_irons_spellbooks.a_max_mana, operation.ADDITION, 7.5),
            CiaModifierBuilder.create(attribute_irons_spellbooks.a_max_mana, operation.MULTIPLY_BASE, 0.01),
            CiaModifierBuilder.create(attribute_irons_spellbooks.a_mana_regen, operation.ADDITION, 0.015),
        ],
        textureGenDetails: {
            textureName: "necklace_1.png",
            chromaKeyOperations: PolymorphArmoryVariants.createNecklaceChroma("#000000", "#21a9bf")
        }
    }

    private static readonly DEXTERITY_NECKLACE_VARIANT: CurioVariant = {
        id: "dexterity_necklace",
        type: "curio",
        slot: "necklace",
        displayName: "Dexterity Necklace",
        recipe: ["material", "", "material", "material", "", "material", "", item_irons_spellbooks.i_lightning_rune, ""],
        durabilityMultiplier: 1,
        modelType: "normal",
        pmmoSkill: "archery",
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_projectile_damage.a_generic, operation.ADDITION, 1.5),
            CiaModifierBuilder.create(attribute_projectile_damage.a_generic, operation.MULTIPLY_BASE, 0.01),
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.ADDITION, 1.5),
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.MULTIPLY_BASE, 0.01),
        ],
        textureGenDetails: {
            textureName: "necklace_1.png",
            chromaKeyOperations: PolymorphArmoryVariants.createNecklaceChroma("#000000", "#50bf21")
        }
    }


    private static readonly SHARPSHOOTER_NECKLACE_VARIANT: CurioVariant = {
        id: "sharpshooter_necklace",
        type: "curio",
        slot: "necklace",
        displayName: "Sharpshooter Necklace",
        recipe: ["material", "", "material", "material", "minecraft:bow", "material", "", item_irons_spellbooks.i_blood_rune, ""],
        durabilityMultiplier: 1,
        modelType: "normal",
        pmmoSkill: "archery",
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_attributeslib.a_arrow_velocity, operation.ADDITION, 0.01),
            CiaModifierBuilder.create(attribute_attributeslib.a_draw_speed, operation.ADDITION, 0.03),
        ],
        textureGenDetails: {
            textureName: "necklace_1.png",
            chromaKeyOperations: PolymorphArmoryVariants.createNecklaceChroma("#000000", "#7f1212")
        }
    }

    private static readonly BERSERKER_NECKLACE_VARIANT: CurioVariant = {
        id: "berserker_necklace",
        type: "curio",
        slot: "necklace",
        displayName: "Berserker Necklace",
        recipe: ["material", "", "material", "material", "", "material", "", item_irons_spellbooks.i_fire_rune, ""],
        durabilityMultiplier: 1,
        modelType: "normal",
        pmmoSkill: "combat",
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_minecraft.a_generic_attack_damage, operation.ADDITION, 1.5),
            CiaModifierBuilder.create(attribute_minecraft.a_generic_attack_damage, operation.MULTIPLY_BASE, 0.01),
        ],
        textureGenDetails: {
            textureName: "necklace_1.png",
            chromaKeyOperations: PolymorphArmoryVariants.createNecklaceChroma("#000000", "#bf6521")
        }
    }

    private static readonly FORTIFIED_NECKLACE_VARIANT: CurioVariant = {
        id: "fortified_necklace",
        type: "curio",
        slot: "necklace",
        displayName: "Fortified Necklace",
        recipe: ["material", "", "material", "material", "", "material", "", item_irons_spellbooks.i_protection_rune, ""],
        durabilityMultiplier: 1,
        modelType: "normal",
        pmmoSkill: "endurance",
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_minecraft.a_generic_armor, operation.ADDITION, 1.5),
            CiaModifierBuilder.create(attribute_minecraft.a_generic_armor, operation.MULTIPLY_BASE, 0.01),
            CiaModifierBuilder.create(attribute_minecraft.a_generic_armor_toughness, operation.ADDITION, 1.5),
            CiaModifierBuilder.create(attribute_minecraft.a_generic_armor_toughness, operation.MULTIPLY_BASE, 0.01),
            CiaModifierBuilder.create(attribute_minecraft.a_generic_knockback_resistance, operation.ADDITION, 1.5),
            CiaModifierBuilder.create(attribute_minecraft.a_generic_knockback_resistance, operation.MULTIPLY_BASE, 0.01),
            CiaModifierBuilder.create(attribute_minecraft.a_generic_max_health, operation.ADDITION, 1.5),
            CiaModifierBuilder.create(attribute_minecraft.a_generic_max_health, operation.MULTIPLY_BASE, 0.01),
        ],
        textureGenDetails: {
            textureName: "necklace_1.png",
            chromaKeyOperations: PolymorphArmoryVariants.createNecklaceChroma("#000000", "#bf2121")
        }
    }

    private static readonly INFUSED_NECKLACE_VARIANT: CurioVariant = {
        id: "infused_necklace",
        type: "curio",
        slot: "necklace",
        displayName: "Infused Necklace",
        recipe: ["material", "", "material", "material", "", "material", "", item_irons_spellbooks.i_cooldown_rune, ""],
        durabilityMultiplier: 1,
        modelType: "normal",
        pmmoSkill: "magic",
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_irons_spellbooks.a_spell_power, operation.ADDITION, 0.015),
            CiaModifierBuilder.create(attribute_irons_spellbooks.a_spell_power, operation.MULTIPLY_BASE, 0.01),
            CiaModifierBuilder.create(attribute_irons_spellbooks.a_cast_time_reduction, operation.ADDITION, 0.015),
            CiaModifierBuilder.create(attribute_irons_spellbooks.a_cooldown_reduction, operation.ADDITION, 0.015),
        ],
        textureGenDetails: {
            textureName: "necklace_1.png",
            chromaKeyOperations: PolymorphArmoryVariants.createNecklaceChroma("#000000", "#a8c9ce")
        }
    }

    public static readonly NECKLACES: CurioVariant[] = [
        PolymorphArmoryVariants.MANA_NECKLACE_VARIANT,
        PolymorphArmoryVariants.DEXTERITY_NECKLACE_VARIANT,
        PolymorphArmoryVariants.SHARPSHOOTER_NECKLACE_VARIANT,
        PolymorphArmoryVariants.BERSERKER_NECKLACE_VARIANT,
        PolymorphArmoryVariants.FORTIFIED_NECKLACE_VARIANT,
        PolymorphArmoryVariants.INFUSED_NECKLACE_VARIANT
    ];

    private static readonly MANA_GLOVES_VARIANT: CurioVariant = {
        id: "mana_gloves",
        type: "curio",
        slot: "hands",
        displayName: "Gloves",
        recipe: ["", "", "", "material", item_irons_spellbooks.i_arcane_rune, "material", "", "", ""],
        durabilityMultiplier: 1,
        modelType: "normal",
        pmmoSkill: "magic",
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_irons_spellbooks.a_max_mana, operation.ADDITION, 7.5),
            CiaModifierBuilder.create(attribute_irons_spellbooks.a_max_mana, operation.MULTIPLY_BASE, 0.01),
            CiaModifierBuilder.create(attribute_irons_spellbooks.a_mana_regen, operation.ADDITION, 0.015),
        ],
        textureGenDetails: {
            textureName: "mana_gloves.png",
            chromaKeyOperations: [
                ChromaCreator.create("#B3B3B3", "#000000", 0.1, "linear"),
            ]
        }
    }

    private static readonly DEXTERITY_GLOVES_VARIANT: CurioVariant = {
        id: "dexterity_gloves",
        type: "curio",
        slot: "hands",
        displayName: "Gloves",
        recipe: ["", "", "", "material", item_irons_spellbooks.i_lightning_rune, "material", "", "", ""],
        durabilityMultiplier: 1,
        modelType: "normal",
        pmmoSkill: "archery",
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_projectile_damage.a_generic, operation.ADDITION, 1.5),
            CiaModifierBuilder.create(attribute_projectile_damage.a_generic, operation.MULTIPLY_BASE, 0.01),
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.ADDITION, 1.5),
            CiaModifierBuilder.create(attribute_attributeslib.a_armor_pierce, operation.MULTIPLY_BASE, 0.01),
        ],
        textureGenDetails: {
            textureName: "dexterity_gloves.png",
            chromaKeyOperations: [
                ChromaCreator.create("#B3B3B3", "#000000", 0.05, "linear"),
            ]
        }
    }

    private static readonly SHARPSHOOTER_GLOVES_VARIANT: CurioVariant = {
        id: "sharpshooter_gloves",
        type: "curio",
        slot: "hands",
        displayName: "Gloves",
        recipe: ["", "", "", "material", item_irons_spellbooks.i_blood_rune, "material", "", "", ""],
        durabilityMultiplier: 1,
        modelType: "normal",
        pmmoSkill: "archery",
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_attributeslib.a_arrow_velocity, operation.ADDITION, 0.01),
            CiaModifierBuilder.create(attribute_attributeslib.a_draw_speed, operation.ADDITION, 0.015),
        ],
        textureGenDetails: {
            textureName: "sharpshooter_gloves.png",
            chromaKeyOperations: [
                ChromaCreator.create("#B3B3B3", "#000000", 0.1, "linear"),
            ]
        }
    }

    private static readonly BERSERKER_GLOVES_VARIANT: CurioVariant = {
        id: "berserker_gloves",
        type: "curio",
        slot: "hands",
        displayName: "Gloves",
        recipe: ["", "", "", "material", item_irons_spellbooks.i_fire_rune, "material", "", "", ""],
        durabilityMultiplier: 1,
        modelType: "normal",
        pmmoSkill: "combat",
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_minecraft.a_generic_attack_damage, operation.ADDITION, 1.5),
            CiaModifierBuilder.create(attribute_minecraft.a_generic_attack_damage, operation.MULTIPLY_BASE, 0.01),
        ],
        textureGenDetails: {
            textureName: "berserker_gloves.png",
            chromaKeyOperations: [
                ChromaCreator.create("#E3F3F3", "#000000", 0.1, "linear"),
                ChromaCreator.create("#DBA213", "#db3113", 0.1, "linear"),
            ]
        }
    }

    private static readonly FORTIFIED_GLOVES_VARIANT: CurioVariant = {
        id: "fortified_gloves",
        type: "curio",
        slot: "hands",
        displayName: "Gloves",
        recipe: ["", "", "", "material", item_irons_spellbooks.i_protection_rune, "material", "", "", ""],
        durabilityMultiplier: 1,
        modelType: "normal",
        pmmoSkill: "endurance",
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_minecraft.a_generic_armor, operation.ADDITION, 1.5),
            CiaModifierBuilder.create(attribute_minecraft.a_generic_armor, operation.MULTIPLY_BASE, 0.01),
            CiaModifierBuilder.create(attribute_minecraft.a_generic_armor_toughness, operation.ADDITION, 1.5),
            CiaModifierBuilder.create(attribute_minecraft.a_generic_armor_toughness, operation.MULTIPLY_BASE, 0.01),
            CiaModifierBuilder.create(attribute_minecraft.a_generic_knockback_resistance, operation.ADDITION, 1.5),
            CiaModifierBuilder.create(attribute_minecraft.a_generic_knockback_resistance, operation.MULTIPLY_BASE, 0.01),
            CiaModifierBuilder.create(attribute_minecraft.a_generic_max_health, operation.ADDITION, 1.5),
            CiaModifierBuilder.create(attribute_minecraft.a_generic_max_health, operation.MULTIPLY_BASE, 0.01),
        ],
        textureGenDetails: {
            textureName: "fortified_gloves.png",
            chromaKeyOperations: [
                ChromaCreator.create("#E3F3F3", "#000000", 0.1, "linear"),
            ]
        }
    }

    private static readonly INFUSED_GLOVES_VARIANT: CurioVariant = {
        id: "infused_gloves",
        type: "curio",
        slot: "hands",
        displayName: "Gloves",
        recipe: ["", "", "", "material", item_irons_spellbooks.i_cooldown_rune, "material", "", "", ""],
        durabilityMultiplier: 1,
        modelType: "normal",
        pmmoSkill: "magic",
        additionalAttributesPerLevel: [
            CiaModifierBuilder.create(attribute_irons_spellbooks.a_spell_power, operation.ADDITION, 0.015),
            CiaModifierBuilder.create(attribute_irons_spellbooks.a_spell_power, operation.MULTIPLY_BASE, 0.01),
            CiaModifierBuilder.create(attribute_irons_spellbooks.a_cast_time_reduction, operation.ADDITION, 0.015),
            CiaModifierBuilder.create(attribute_irons_spellbooks.a_cooldown_reduction, operation.ADDITION, 0.015),
        ],
        textureGenDetails: {
            textureName: "infused_gloves.png",
            chromaKeyOperations: [
                ChromaCreator.create("#B3B3B3", "#000000", 0.1, "linear"),
            ]
        }
    }


    public static readonly CURIO_GLOVES: CurioVariant[] = [
        PolymorphArmoryVariants.MANA_GLOVES_VARIANT,
        PolymorphArmoryVariants.DEXTERITY_GLOVES_VARIANT,
        PolymorphArmoryVariants.SHARPSHOOTER_GLOVES_VARIANT,
        PolymorphArmoryVariants.BERSERKER_GLOVES_VARIANT,
        PolymorphArmoryVariants.FORTIFIED_GLOVES_VARIANT,
        PolymorphArmoryVariants.INFUSED_GLOVES_VARIANT
    ];

    public static readonly CURIOS: CurioVariant[] = [
        ...PolymorphArmoryVariants.RINGS,
        ...PolymorphArmoryVariants.NECKLACES,
        ...PolymorphArmoryVariants.CURIO_GLOVES
    ];

    //#endregion

    public static readonly ARCHERY: (BowVariant | CrossbowVariant)[] = [
        ...PolymorphArmoryVariants.BOWS,
        ...PolymorphArmoryVariants.CROSSBOWS
    ];

    public static readonly ALL: BaseVariant[] = [
        ...PolymorphArmoryVariants.SWORDS,
        ...PolymorphArmoryVariants.SHIELDS,
        ...PolymorphArmoryVariants.ARCHERY,
        ...PolymorphArmoryVariants.TOOLS,
        ...PolymorphArmoryVariants.ARMORS,
        ...PolymorphArmoryVariants.CURIOS,
        ...PolymorphArmoryVariants.GLOVES
    ];
}
