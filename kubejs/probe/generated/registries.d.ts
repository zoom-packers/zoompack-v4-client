/// <reference path="./globals.d.ts" />
declare namespace Registry {
    class SoundEvent extends Internal.RegistryEventJS<any> {
        create(id: string, type: "basic"): Internal.SoundEventBuilder;
        create(id: string): Internal.SoundEventBuilder;
    }
    class Fluid extends Internal.RegistryEventJS<any> {
        create(id: string, type: "basic"): Internal.FluidBuilder;
        create(id: string): Internal.FluidBuilder;
    }
    class MobEffect extends Internal.RegistryEventJS<any> {
        create(id: string, type: "basic"): Internal.BasicMobEffect$Builder;
        create(id: string): Internal.BasicMobEffect$Builder;
    }
    class Block extends Internal.RegistryEventJS<any> {
        create(id: string, type: "basic"): Internal.BasicBlockJS$Builder;
        create(id: string, type: "detector"): Internal.DetectorBlock$Builder;
        create(id: string, type: "slab"): Internal.SlabBlockBuilder;
        create(id: string, type: "stairs"): Internal.StairBlockBuilder;
        create(id: string, type: "fence"): Internal.FenceBlockBuilder;
        create(id: string, type: "wall"): Internal.WallBlockBuilder;
        create(id: string, type: "fence_gate"): Internal.FenceGateBlockBuilder;
        create(id: string, type: "pressure_plate"): Internal.PressurePlateBlockBuilder;
        create(id: string, type: "button"): Internal.ButtonBlockBuilder;
        create(id: string, type: "falling"): Internal.FallingBlockBuilder;
        create(id: string, type: "crop"): Internal.CropBlockBuilder;
        create(id: string, type: "cardinal"): Internal.HorizontalDirectionalBlockBuilder;
        create(id: string, type: "animatable"): Internal.AnimatableBlockBuilder;
        create(id: string): Internal.BasicBlockJS$Builder;
    }
    class Enchantment extends Internal.RegistryEventJS<any> {
        create(id: string, type: "basic"): Internal.EnchantmentBuilder;
        create(id: string): Internal.EnchantmentBuilder;
    }
    class EntityType extends Internal.RegistryEventJS<any> {
        create(id: string, type: "irons_spells_js:spellcasting"): Internal.SpellCastingMobJSBuilder;
        create(id: string, type: "irons_spells_js:spell_projectile"): Internal.SpellProjectileJSBuilder;
        create(id: string, type: "entityjs:nonliving"): Internal.BaseEntityJSBuilder;
        create(id: string, type: "entityjs:living"): Internal.BaseLivingEntityJSBuilder;
        create(id: string, type: "entityjs:mob"): Internal.MobEntityJSBuilder;
        create(id: string, type: "entityjs:animal"): Internal.AnimalEntityJSBuilder;
        create(id: string, type: "entityjs:watercreature"): Internal.WaterEntityJSBuilder;
        create(id: string, type: "entityjs:tamable"): Internal.TameableMobJSBuilder;
        create(id: string, type: "entityjs:arrow"): Internal.ArrowEntityJSBuilder;
        create(id: string, type: "entityjs:projectile"): Internal.ProjectileEntityJSBuilder;
        create(id: string, type: "entityjs:geckolib_projectile"): Internal.ProjectileAnimatableJSBuilder;
        create(id: string, type: "minecraft:zombie"): Internal.ZombieJSBuilder;
        create(id: string, type: "minecraft:allay"): Internal.AllayJSBuilder;
        create(id: string, type: "minecraft:axolotl"): Internal.AxolotlJSBuilder;
        create(id: string, type: "minecraft:bat"): Internal.BatJSBuilder;
        create(id: string, type: "minecraft:bee"): Internal.BeeJSBuilder;
        create(id: string, type: "minecraft:blaze"): Internal.BlazeJSBuilder;
        create(id: string, type: "minecraft:boat"): Internal.BoatJSBuilder;
        create(id: string, type: "minecraft:camel"): Internal.CamelJSBuilder;
        create(id: string, type: "minecraft:cat"): Internal.CatJSBuilder;
        create(id: string, type: "minecraft:chicken"): Internal.ChickenJSBuilder;
        create(id: string, type: "minecraft:cow"): Internal.CowJSBuilder;
        create(id: string, type: "minecraft:creeper"): Internal.CreeperJSBuilder;
        create(id: string, type: "minecraft:dolphin"): Internal.DolphinJSBuilder;
        create(id: string, type: "minecraft:donkey"): Internal.DonkeyJSBuilder;
        create(id: string, type: "minecraft:enderman"): Internal.EnderManJSBuilder;
        create(id: string, type: "minecraft:evoker"): Internal.EvokerJSBuilder;
        create(id: string, type: "minecraft:ghast"): Internal.GhastJSBuilder;
        create(id: string, type: "minecraft:goat"): Internal.GoatJSBuilder;
        create(id: string, type: "minecraft:guardian"): Internal.GuardianJSBuilder;
        create(id: string, type: "minecraft:horse"): Internal.HorseJSBuilder;
        create(id: string, type: "minecraft:illusioner"): Internal.IllusionerJSBuilder;
        create(id: string, type: "minecraft:iron_golem"): Internal.IronGolemJSBuilder;
        create(id: string, type: "minecraft:panda"): Internal.PandaJSBuilder;
        create(id: string, type: "minecraft:parrot"): Internal.ParrotJSBuilder;
        create(id: string, type: "minecraft:eye_of_ender"): Internal.EyeOfEnderJSBuilder;
        create(id: string, type: "minecraft:piglin"): Internal.PiglinJSBuilder;
        create(id: string, type: "minecraft:wither"): Internal.WitherJSBuilder;
        create(id: string, type: "minecraft:slime"): Internal.SlimeJSBuilder;
        create(id: string): Internal.SpellCastingMobJSBuilder;
    }
    class Item extends Internal.RegistryEventJS<any> {
        create(id: string, type: "shield"): Internal.ShieldItemBuilder;
        create(id: string, type: "bow"): Internal.BowItemBuilder;
        create(id: string, type: "crossbow"): Internal.CrossbowItemBuilder;
        create(id: string, type: "gloves"): Internal.GlovesItemBuilder;
        create(id: string, type: "basic"): Internal.BasicItemJS$Builder;
        create(id: string, type: "sword"): Internal.SwordItemBuilder;
        create(id: string, type: "pickaxe"): Internal.PickaxeItemBuilder;
        create(id: string, type: "axe"): Internal.AxeItemBuilder;
        create(id: string, type: "shovel"): Internal.ShovelItemBuilder;
        create(id: string, type: "shears"): Internal.ShearsItemBuilder;
        create(id: string, type: "hoe"): Internal.HoeItemBuilder;
        create(id: string, type: "helmet"): Internal.ArmorItemBuilder$Helmet;
        create(id: string, type: "chestplate"): Internal.ArmorItemBuilder$Chestplate;
        create(id: string, type: "leggings"): Internal.ArmorItemBuilder$Leggings;
        create(id: string, type: "boots"): Internal.ArmorItemBuilder$Boots;
        create(id: string, type: "music_disc"): Internal.RecordItemJS$Builder;
        create(id: string, type: "smithing_template"): Internal.SmithingTemplateItemBuilder;
        create(id: string, type: "animatable"): Internal.AnimatableItem$Builder;
        create(id: string, type: "anim_helmet"): Internal.AnimatableArmorBuilder;
        create(id: string, type: "anim_chestplate"): Internal.AnimatableArmorBuilder;
        create(id: string, type: "anim_leggings"): Internal.AnimatableArmorBuilder;
        create(id: string, type: "anim_boots"): Internal.AnimatableArmorBuilder;
        create(id: string, type: "anim_axe"): Internal.AnimatableAxeItem$Builder;
        create(id: string, type: "anim_hoe"): Internal.AnimatableHoeItem$Builder;
        create(id: string, type: "anim_pickaxe"): Internal.AnimatablePickaxeItem$Builder;
        create(id: string, type: "anim_sword"): Internal.AnimatableSwordItem$Builder;
        create(id: string, type: "anim_shield"): Internal.AnimatableShieldItem$Builder;
        create(id: string, type: "create:sequenced_assembly"): Internal.SequencedAssemblyItemBuilder;
        create(id: string, type: "create:sandpaper"): Internal.SandpaperItemBuilder;
        create(id: string, type: "irons_spells_js:spellbook"): Internal.SpellBookBuilderJS;
        create(id: string, type: "irons_spells_js:staff"): Internal.StaffItemBuilderJS;
        create(id: string, type: "irons_spells_js:magic_sword"): Internal.MagicSwordItemBuilderJS;
        create(id: string): Internal.BasicItemJS$Builder;
    }
    class Potion extends Internal.RegistryEventJS<any> {
        create(id: string, type: "basic"): Internal.PotionBuilder;
        create(id: string): Internal.PotionBuilder;
    }
    class ParticleType extends Internal.RegistryEventJS<any> {
        create(id: string, type: "basic"): Internal.ParticleTypeBuilder;
        create(id: string): Internal.ParticleTypeBuilder;
    }
    class BlockEntityType extends Internal.RegistryEventJS<any> {
    }
    class PaintingVariant extends Internal.RegistryEventJS<any> {
        create(id: string, type: "basic"): Internal.PaintingVariantBuilder;
        create(id: string): Internal.PaintingVariantBuilder;
    }
    class CustomStat extends Internal.RegistryEventJS<any> {
        create(id: string, type: "basic"): Internal.CustomStatBuilder;
        create(id: string): Internal.CustomStatBuilder;
    }
    class ChunkStatus extends Internal.RegistryEventJS<any> {
    }
    class RuleTest extends Internal.RegistryEventJS<any> {
    }
    class PosRuleTest extends Internal.RegistryEventJS<any> {
    }
    class Menu extends Internal.RegistryEventJS<any> {
    }
    class RecipeType extends Internal.RegistryEventJS<any> {
    }
    class RecipeSerializer extends Internal.RegistryEventJS<any> {
    }
    class Attribute extends Internal.RegistryEventJS<any> {
        create(id: string, type: "spell"): Internal.SpellAttributeBuilderJS;
        create(id: string, type: "irons_spells_js:spell"): Internal.SpellAttributeBuilderJS;
        create(id: string): Internal.SpellAttributeBuilderJS;
    }
    class GameEvent extends Internal.RegistryEventJS<any> {
    }
    class PositionSourceType extends Internal.RegistryEventJS<any> {
    }
    class StatType extends Internal.RegistryEventJS<any> {
    }
    class VillagerType extends Internal.RegistryEventJS<any> {
        create(id: string, type: "basic"): Internal.VillagerTypeBuilder;
        create(id: string): Internal.VillagerTypeBuilder;
    }
    class VillagerProfession extends Internal.RegistryEventJS<any> {
        create(id: string, type: "basic"): Internal.VillagerProfessionBuilder;
        create(id: string): Internal.VillagerProfessionBuilder;
    }
    class PointOfInterestType extends Internal.RegistryEventJS<any> {
        create(id: string, type: "basic"): Internal.PoiTypeBuilder;
        create(id: string): Internal.PoiTypeBuilder;
    }
    class MemoryModuleType extends Internal.RegistryEventJS<any> {
    }
    class SensorType extends Internal.RegistryEventJS<any> {
    }
    class Schedule extends Internal.RegistryEventJS<any> {
    }
    class Activity extends Internal.RegistryEventJS<any> {
    }
    class LootPoolEntryType extends Internal.RegistryEventJS<any> {
    }
    class LootFunctionType extends Internal.RegistryEventJS<any> {
    }
    class LootConditionType extends Internal.RegistryEventJS<any> {
    }
    class LootNumberProviderType extends Internal.RegistryEventJS<any> {
    }
    class LootNbtProviderType extends Internal.RegistryEventJS<any> {
    }
    class LootScoreProviderType extends Internal.RegistryEventJS<any> {
    }
    class CommandArgumentType extends Internal.RegistryEventJS<any> {
    }
    class DimensionType extends Internal.RegistryEventJS<any> {
    }
    class Dimension extends Internal.RegistryEventJS<any> {
    }
    class FloatProviderType extends Internal.RegistryEventJS<any> {
    }
    class IntProviderType extends Internal.RegistryEventJS<any> {
    }
    class HeightProviderType extends Internal.RegistryEventJS<any> {
    }
    class BlockPredicateType extends Internal.RegistryEventJS<any> {
    }
    class WorldgenNoiseSettings extends Internal.RegistryEventJS<any> {
    }
    class WorldgenConfiguredCarver extends Internal.RegistryEventJS<any> {
    }
    class WorldgenConfiguredFeature extends Internal.RegistryEventJS<any> {
    }
    class WorldgenPlacedFeature extends Internal.RegistryEventJS<any> {
    }
    class WorldgenStructure extends Internal.RegistryEventJS<any> {
    }
    class WorldgenStructureSet extends Internal.RegistryEventJS<any> {
    }
    class WorldgenProcessorList extends Internal.RegistryEventJS<any> {
    }
    class WorldgenTemplatePool extends Internal.RegistryEventJS<any> {
    }
    class WorldgenBiome extends Internal.RegistryEventJS<any> {
    }
    class WorldgenNoise extends Internal.RegistryEventJS<any> {
    }
    class WorldgenDensityFunction extends Internal.RegistryEventJS<any> {
    }
    class WorldgenWorldPreset extends Internal.RegistryEventJS<any> {
    }
    class WorldgenFlatLevelGeneratorPreset extends Internal.RegistryEventJS<any> {
    }
    class WorldgenCarver extends Internal.RegistryEventJS<any> {
    }
    class WorldgenFeature extends Internal.RegistryEventJS<any> {
    }
    class WorldgenStructurePlacement extends Internal.RegistryEventJS<any> {
    }
    class WorldgenStructurePiece extends Internal.RegistryEventJS<any> {
    }
    class WorldgenStructureType extends Internal.RegistryEventJS<any> {
    }
    class WorldgenPlacementModifierType extends Internal.RegistryEventJS<any> {
    }
    class WorldgenBlockStateProviderType extends Internal.RegistryEventJS<any> {
    }
    class WorldgenFoliagePlacerType extends Internal.RegistryEventJS<any> {
    }
    class WorldgenTrunkPlacerType extends Internal.RegistryEventJS<any> {
    }
    class WorldgenTreeDecoratorType extends Internal.RegistryEventJS<any> {
    }
    class WorldgenRootPlacerType extends Internal.RegistryEventJS<any> {
    }
    class WorldgenFeatureSizeType extends Internal.RegistryEventJS<any> {
    }
    class WorldgenBiomeSource extends Internal.RegistryEventJS<any> {
    }
    class WorldgenChunkGenerator extends Internal.RegistryEventJS<any> {
    }
    class WorldgenMaterialCondition extends Internal.RegistryEventJS<any> {
    }
    class WorldgenMaterialRule extends Internal.RegistryEventJS<any> {
    }
    class WorldgenDensityFunctionType extends Internal.RegistryEventJS<any> {
    }
    class WorldgenStructureProcessor extends Internal.RegistryEventJS<any> {
    }
    class WorldgenStructurePoolElement extends Internal.RegistryEventJS<any> {
    }
    class ChatType extends Internal.RegistryEventJS<any> {
    }
    class CatVariant extends Internal.RegistryEventJS<any> {
    }
    class FrogVariant extends Internal.RegistryEventJS<any> {
    }
    class BannerPattern extends Internal.RegistryEventJS<any> {
    }
    class Instrument extends Internal.RegistryEventJS<any> {
    }
    class TrimMaterial extends Internal.RegistryEventJS<any> {
    }
    class TrimPattern extends Internal.RegistryEventJS<any> {
    }
    class CreativeModeTab extends Internal.RegistryEventJS<any> {
        create(id: string, type: "basic"): Internal.CreativeTabBuilder;
        create(id: string): Internal.CreativeTabBuilder;
    }
    class DamageType extends Internal.RegistryEventJS<any> {
    }
    class RuleBlockEntityModifier extends Internal.RegistryEventJS<any> {
    }
    class DecoratedPotPatterns extends Internal.RegistryEventJS<any> {
    }
    class WorldgenMultiNoiseBiomeSourceParameterList extends Internal.RegistryEventJS<any> {
    }
    class Spells extends Internal.RegistryEventJS<any> {
        create(id: string, type: "basic"): Internal.CustomSpell$Builder;
        create(id: string): Internal.CustomSpell$Builder;
    }
    class Schools extends Internal.RegistryEventJS<any> {
        create(id: string, type: "basic"): Internal.SchoolTypeJSBuilder;
        create(id: string): Internal.SchoolTypeJSBuilder;
    }
    class Material extends Internal.RegistryEventJS<any> {
    }
    class WorldgenBetterxBiomeCodec extends Internal.RegistryEventJS<any> {
    }
    class AdvancementSoundOverride extends Internal.RegistryEventJS<any> {
    }
    class MoaType extends Internal.RegistryEventJS<any> {
    }
    class BientityAction extends Internal.RegistryEventJS<any> {
    }
    class BientityCondition extends Internal.RegistryEventJS<any> {
    }
    class BiomeCondition extends Internal.RegistryEventJS<any> {
    }
    class BlockAction extends Internal.RegistryEventJS<any> {
    }
    class BlockCondition extends Internal.RegistryEventJS<any> {
    }
    class ConfiguredBientityAction extends Internal.RegistryEventJS<any> {
    }
    class ConfiguredBientityCondition extends Internal.RegistryEventJS<any> {
    }
    class ConfiguredBiomeCondition extends Internal.RegistryEventJS<any> {
    }
    class ConfiguredBlockAction extends Internal.RegistryEventJS<any> {
    }
    class ConfiguredBlockCondition extends Internal.RegistryEventJS<any> {
    }
    class ConfiguredDamageCondition extends Internal.RegistryEventJS<any> {
    }
    class ConfiguredEntityAction extends Internal.RegistryEventJS<any> {
    }
    class ConfiguredEntityCondition extends Internal.RegistryEventJS<any> {
    }
    class ConfiguredFluidCondition extends Internal.RegistryEventJS<any> {
    }
    class ConfiguredItemAction extends Internal.RegistryEventJS<any> {
    }
    class ConfiguredItemCondition extends Internal.RegistryEventJS<any> {
    }
    class ConfiguredModifier extends Internal.RegistryEventJS<any> {
    }
    class ConfiguredPower extends Internal.RegistryEventJS<any> {
    }
    class DamageCondition extends Internal.RegistryEventJS<any> {
    }
    class EntityAction extends Internal.RegistryEventJS<any> {
    }
    class EntityCondition extends Internal.RegistryEventJS<any> {
    }
    class FluidCondition extends Internal.RegistryEventJS<any> {
    }
    class GlobalPowerSet extends Internal.RegistryEventJS<any> {
    }
    class ItemAction extends Internal.RegistryEventJS<any> {
    }
    class ItemCondition extends Internal.RegistryEventJS<any> {
    }
    class Modifier extends Internal.RegistryEventJS<any> {
    }
    class PowerFactory extends Internal.RegistryEventJS<any> {
    }
    class PlayerAbility extends Internal.RegistryEventJS<any> {
    }
    class Menu extends Internal.RegistryEventJS<any> {
    }
    class Accessories extends Internal.RegistryEventJS<any> {
    }
    class AccessoryType extends Internal.RegistryEventJS<any> {
    }
    class DogVariant extends Internal.RegistryEventJS<any> {
    }
    class Talents extends Internal.RegistryEventJS<any> {
    }
    class BiomeModifierSerializers extends Internal.RegistryEventJS<any> {
    }
    class DisplayContexts extends Internal.RegistryEventJS<any> {
    }
    class EntityDataSerializers extends Internal.RegistryEventJS<any> {
    }
    class FluidType extends Internal.RegistryEventJS<any> {
    }
    class GlobalLootModifierSerializers extends Internal.RegistryEventJS<any> {
    }
    class HolderSetType extends Internal.RegistryEventJS<any> {
    }
    class StructureModifierSerializers extends Internal.RegistryEventJS<any> {
    }
    class Buildings extends Internal.RegistryEventJS<any> {
    }
    class Colonyeventdesctypes extends Internal.RegistryEventJS<any> {
    }
    class Colonyeventtypes extends Internal.RegistryEventJS<any> {
    }
    class Craftingtypes extends Internal.RegistryEventJS<any> {
    }
    class Equipmenttypes extends Internal.RegistryEventJS<any> {
    }
    class Fields extends Internal.RegistryEventJS<any> {
    }
    class Guardtypes extends Internal.RegistryEventJS<any> {
    }
    class Happinessfactortypes extends Internal.RegistryEventJS<any> {
    }
    class Happinessfunction extends Internal.RegistryEventJS<any> {
    }
    class Interactionresponsehandlers extends Internal.RegistryEventJS<any> {
    }
    class Jobs extends Internal.RegistryEventJS<any> {
    }
    class Questanswerresults extends Internal.RegistryEventJS<any> {
    }
    class Questobjectives extends Internal.RegistryEventJS<any> {
    }
    class Questrewards extends Internal.RegistryEventJS<any> {
    }
    class Questtriggers extends Internal.RegistryEventJS<any> {
    }
    class Recipetypeentries extends Internal.RegistryEventJS<any> {
    }
    class Researchcosttypes extends Internal.RegistryEventJS<any> {
    }
    class Researcheffecttypes extends Internal.RegistryEventJS<any> {
    }
    class Researchrequirementtypes extends Internal.RegistryEventJS<any> {
    }
    class BadgeFactory extends Internal.RegistryEventJS<any> {
    }
    class Origins extends Internal.RegistryEventJS<any> {
    }
    class ParticleType extends Internal.RegistryEventJS<any> {
    }
    class SoftFluids extends Internal.RegistryEventJS<any> {
    }
    class BiomeModifier extends Internal.RegistryEventJS<any> {
    }
    class WorldgenBetterxSurfaceRules extends Internal.RegistryEventJS<any> {
    }
    class StructureRepaletters extends Internal.RegistryEventJS<any> {
    }
    class ModdedBiomeSlices extends Internal.RegistryEventJS<any> {
    }
    class MapMarkers extends Internal.RegistryEventJS<any> {
    }
    class WorldgenBetterxBiome extends Internal.RegistryEventJS<any> {
    }
    class StructureModifier extends Internal.RegistryEventJS<any> {
    }
}