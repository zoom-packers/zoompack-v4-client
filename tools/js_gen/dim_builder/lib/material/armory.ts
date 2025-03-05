import {BasicDataHolder} from "../selfWritingJson";
import {Material} from "./material";
import {capitalizeFirstLetter, ensureFolderExists, idToDisplayName, kubejsAssetsPath, log} from "../utils";
// @ts-ignore
import fs from "fs";
import {
    addItemToCia,
    CiaEntry, CiaModifier,
    createCiaGenericArmor,
    createCiaMainHand,
    createCiaOffhand,
    getCiaPath,
    operation
} from "../cia/util";
import {modifySingleItem, modifySingleItemWithSkill} from "../pmmo/util";
import {combine} from "../textureGen/util";
import {WorkingTexture} from "../textureGen/workingTexture";
import {IArmory} from "./IArmory";
import {PolymorphArmoryVariants} from "../armory/polymorphArmoryVariants";
import {ArmorVariant, BaseVariant, ChromaKeyOperation, CurioVariant, GlovesVariant, ToolVariant} from "./ArmoryTypes";
import {GeckoArmorArmoryEntry, SimpleArmorArmoryEntry} from "./geckoArmorArmoryEntry";
import path from "path";
import {Config} from "../config";
import {CustomArmoryEntry} from "./customArmoryEntry";
import {SimpleItemArmoryEntry} from "./simpleItemArmoryEntry";

export const GENERAL_DURABILITY_MULTIPLIER = 1.331945;
export const PER_TIER_MULTIPLIER = 0.125;

export class Armory extends BasicDataHolder<Armory> implements IArmory<Armory>{
    gear: string[] = [];
    durability: number = 250; // Iron has 250, diamond has 1561, netherite has 2031
    gearUsesSmithingTemplate: boolean = false;
    smithingTemplateId: string = "";
    smithingFromTier: string = "iron";
    pmmoLevel: number = 10;
    baseDamage: number = 6; // Iron has 6, diamond has 7, netherite has 8
    baseArmor: number = 15; // Iron has 15, diamond has 20, netherite has 20
    baseArmorToughness: number = 0; // diamond has 2.0, netherite 3.0
    baseArmorKnockbackResistance: number = 0; // diamond has 0.0, netherite 0.1
    harvestSpeed: number = 6; // Wood has 2, stone has 4, iron has 6, diamond has 8, netherite has 9
    chromaKeyOperations: ChromaKeyOperation[] = [];
    material: Material;
    craftingMaterialInternal: string;
    customArmoryEntries: CustomArmoryEntry[] = [];

    async build() {
        if (!this.material) {
            throw new Error("Material is not set");
        }
        const material = this.material;
        log(this, `Building Armory Pack for <${capitalizeFirstLetter(material.internalName)}>`);
        this.material = material;
        this.registerTier();
        log(this, `Registered tier for <${capitalizeFirstLetter(material.internalName)}>`);
        this.registerItems();
        log(this, `Registered items for <${capitalizeFirstLetter(material.internalName)}>`);
        this.createTags();
        log(this, `Created tags for <${capitalizeFirstLetter(material.internalName)}>`);
        this.createCiaEntries();
        log(this, `Created CIA entries for <${capitalizeFirstLetter(material.internalName)}>`);
        this.createRecipes();
        log(this, `Created recipes for <${capitalizeFirstLetter(material.internalName)}>`);
        this.setPMMOLevels();
        log(this, `Set PMMO levels for <${capitalizeFirstLetter(material.internalName)}>`);
        this.createModelAssets();
        log(this, `Created model assets for <${capitalizeFirstLetter(material.internalName)}>`);
        await this.createTextureAssets();
        log(this, `Created texture assets for <${capitalizeFirstLetter(material.internalName)}>`);

        log(this, `Building Custom Armory Entries for <${capitalizeFirstLetter(material.internalName)}>`);
        for (const entry of this.customArmoryEntries) {
            if (entry instanceof GeckoArmorArmoryEntry) {
                await entry.build(path.join(kubejsAssetsPath(), this.internalNamespace), this.internalNamespace, material);
            } else if (entry instanceof SimpleItemArmoryEntry) {
                await entry.build(path.join(kubejsAssetsPath(), this.internalNamespace), this.internalNamespace, material);
            }
        }
        log(this, `Built Armory Pack for <${capitalizeFirstLetter(material.internalName)}>`);
    }

    //#region Main Methods

    registerTier() {
        const material = this.material;
        const modId = this.internalNamespace;
        const materialIdPart = material.internalName;
        const id = `${modId}:${materialIdPart}`;
        const slotProtections = [
            this.baseArmor * PolymorphArmoryVariants.ARMORS.find(x => x.id === "boots").armorMultiplier * 2 / 15,
            this.baseArmor * PolymorphArmoryVariants.ARMORS.find(x => x.id === "leggings").armorMultiplier * 5 / 15,
            this.baseArmor * PolymorphArmoryVariants.ARMORS.find(x => x.id === "chestplate").armorMultiplier * 6 / 15,
            this.baseArmor * PolymorphArmoryVariants.ARMORS.find(x => x.id === "helmet").armorMultiplier * 2 / 15,
        ]
        PolymorphArmoryVariants.TOOLS.forEach(toolType => {
            if (this.shouldSkip(toolType)) {
                return;
            }
            const itemId = `${modId}:${materialIdPart}_${toolType.id}`;
            this.kubeJsContainer.harvestLevelTweaker.withItem(itemId, this.material.level);
        });
        this.kubeJsContainer.registrar.registerToolTier(id, this.durability, this.harvestSpeed, this.baseDamage - 4, this.material.level, 9, this.craftingMaterial);
        this.kubeJsContainer.registrar.registerArmorTier(id, this.harvestLevel, this.durability / 15, slotProtections, 9, this.craftingMaterial, this.baseArmorToughness, this.baseArmorKnockbackResistance);

        for (const customArmoryEntry of this.customArmoryEntries) {
            if (customArmoryEntry instanceof GeckoArmorArmoryEntry) {
                // @ts-ignore
                const helmet = customArmoryEntry.variants.find(x => x.slot === "head") as ArmorVariant;
                // @ts-ignore
                const chestplate = customArmoryEntry.variants.find(x => x.slot === "chest") as ArmorVariant;
                // @ts-ignore
                const leggings = customArmoryEntry.variants.find(x => x.slot === "legs") as ArmorVariant;
                // @ts-ignore
                const boots = customArmoryEntry.variants.find(x => x.slot === "feet") as ArmorVariant;
                const slotProtections = [
                    this.baseArmor * boots.armorMultiplier * 2 / 15,
                    this.baseArmor * leggings.armorMultiplier * 5 / 15,
                    this.baseArmor * chestplate.armorMultiplier * 6 / 15,
                    this.baseArmor * helmet.armorMultiplier * 2 / 15,
                ];
                this.kubeJsContainer.registrar.registerArmorTier(`${modId}:${materialIdPart}_${customArmoryEntry.armorId}`, this.harvestLevel, this.durability / 15, slotProtections, 9, this.craftingMaterial, this.baseArmorToughness, this.baseArmorKnockbackResistance);
            }
        }
    }

    registerItems() {
        const material = this.material;
        const modId = this.internalNamespace;
        const materialIdPart = material.internalName;
        const tieredTypes = [...PolymorphArmoryVariants.TOOLS, ...PolymorphArmoryVariants.ARMORS];
        for (const type of PolymorphArmoryVariants.ALL) {
            if (this.shouldSkip(type)) {
                continue;
            }
            const id = `${modId}:${materialIdPart}_${type.id}`;
            const displayName = idToDisplayName(id);
            const durability = this.durability * type.durabilityMultiplier;
            let itemType = this.getTypeName(type);
            if (itemType === "staff") {
                itemType = "irons_spells_js:staff";
            }
            // @ts-ignore
            if (tieredTypes.includes(type)) {
                this.kubeJsContainer.registrar.registerTieredItem(id, itemType, displayName, `${modId}:${material.internalName}`);
            } else if (PolymorphArmoryVariants.CURIOS.includes(<CurioVariant>type)) {
                let attributes: CiaModifier[] = [];
                if (type.additionalAttributes) {
                    attributes = [...attributes, ...type.additionalAttributes];
                }
                if (type.additionalAttributesPerLevel) {
                    let leveledAttributes = this.multiplyAdditionalAttributesPerLevel(type.additionalAttributesPerLevel);
                    attributes = [...attributes, ...leveledAttributes];
                }
                this.kubeJsContainer.registrar.registerCurioVariant(id, displayName, attributes);
            } else if (PolymorphArmoryVariants.GLOVES.includes(<GlovesVariant>type)) {
                this.kubeJsContainer.registrar.registerGlovesItem(id, this.harvestLevel * 0.25, this.durability * type.durabilityMultiplier, this.craftingMaterial);
            } else {
                this.kubeJsContainer.registrar.registerArmoryItem(id, itemType, displayName, durability,`${modId}:${material.internalName}`);
            }
        }

        for (const customArmoryEntry of this.customArmoryEntries) {
            if (customArmoryEntry instanceof SimpleArmorArmoryEntry) {
                for (const variant of customArmoryEntry.variants) {
                    var id = `${modId}:${materialIdPart}_${variant.id}`;
                    var displayName = variant.displayName;
                    var itemType = this.getTypeName(variant);
                    this.kubeJsContainer.registrar.registerTieredItem(id, itemType, displayName, `${modId}:${material.internalName}_${customArmoryEntry.armorId}`);
                }
            } else if (customArmoryEntry instanceof GeckoArmorArmoryEntry) {
                // @ts-ignore
                const helmet = customArmoryEntry.variants.find(x => x.slot === "head") as ArmorVariant;
                // @ts-ignore
                const chestplate = customArmoryEntry.variants.find(x => x.slot === "chest") as ArmorVariant;
                // @ts-ignore
                const leggings = customArmoryEntry.variants.find(x => x.slot === "legs") as ArmorVariant;
                // @ts-ignore
                const boots = customArmoryEntry.variants.find(x => x.slot === "feet") as ArmorVariant;
                this.kubeJsContainer.registrar.registerGeckoArmor(modId,
                    `${material.internalName}_${customArmoryEntry.armorId}`,
                    `${modId}:${material.internalName}_${customArmoryEntry.armorId}`,
                    `${idToDisplayName(material.internalName)} ${helmet.displayName}`,
                    `${idToDisplayName(material.internalName)} ${chestplate.displayName}`,
                    `${idToDisplayName(material.internalName)} ${leggings.displayName}`,
                    `${idToDisplayName(material.internalName)} ${boots.displayName}`,
                    "",
                    `${modId}:geo/${customArmoryEntry.armorId}.geo.json`,
                    `${modId}:textures/models/armor/${material.internalName}_${customArmoryEntry.armorId}_armor.png`);
            } else if (customArmoryEntry instanceof SimpleItemArmoryEntry) {
                this.kubeJsContainer.registrar.registerArmoryItem(`${modId}:${materialIdPart}_${customArmoryEntry.itemId}`, customArmoryEntry.variants[0].type, customArmoryEntry.variants[0].displayName, customArmoryEntry.variants[0].durabilityMultiplier * this.durability, `${modId}:${material.internalName}`);
            }
        }
    }

    createTags() {
        for (const ring of PolymorphArmoryVariants.RINGS) {
            if (this.shouldSkip(ring)) {
                continue;
            }
            const id = `${this.internalNamespace}:${this.material.internalName}_${ring.id}`;
            this.kubeJsContainer.tagger.tagItem(id, "curios:ring");
        }
        for (const necklace of PolymorphArmoryVariants.NECKLACES) {
            if (this.shouldSkip(necklace)) {
                continue;
            }
            const id = `${this.internalNamespace}:${this.material.internalName}_${necklace.id}`;
            this.kubeJsContainer.tagger.tagItem(id, "curios:necklace");
        }
        for (const glove of PolymorphArmoryVariants.GLOVES) {
            if (this.shouldSkip(glove)) {
                continue;
            }
            const id = `${this.internalNamespace}:${this.material.internalName}_${glove.id}`;
            this.kubeJsContainer.tagger.tagItem(id, "aether:accessories_gloves");
        }
        for (const necklace of PolymorphArmoryVariants.CURIO_GLOVES) {
            if (this.shouldSkip(necklace)) {
                continue;
            }
            const id = `${this.internalNamespace}:${this.material.internalName}_${necklace.id}`;
            this.kubeJsContainer.tagger.tagItem(id, "aether:accessories_gloves");
        }
        for (const item of PolymorphArmoryVariants.ALL) {
            if (this.shouldSkip(item)) {
                continue;
            }
            if (!!item.tags) {
                const id = `${this.internalNamespace}:${this.material.internalName}_${item.id}`;
                for (const tag of item.tags) {
                    this.kubeJsContainer.tagger.tagItem(id, tag);
                }
            }
        }
        this.kubeJsContainer.tagger.tagItem(this.craftingMaterial, this.craftingMaterial);
    }

    createCiaEntries() {
        const cia = JSON.parse(fs.readFileSync(getCiaPath(), "utf8"));

        const materialIdPart = this.material.internalName;
        const allVariants = [...PolymorphArmoryVariants.ALL, ...this.customArmoryEntries.map(x => x.variants).flat()];
        for (const mergedType of allVariants) {
            const mergedAttributes = [];
            if (mergedType.additionalAttributes) {
                mergedAttributes.push(...mergedType.additionalAttributes);
            }
            if (mergedType.additionalAttributesPerLevel) {
                const multipliedAttributes = this.multiplyAdditionalAttributesPerLevel(mergedType.additionalAttributesPerLevel);
                mergedAttributes.push(...multipliedAttributes);
            }
            const id = `${this.internalNamespace}:${materialIdPart}_${mergedType.id}`;
            let entry: CiaEntry;
            // @ts-ignore
            if (mergedType.type === "sword") {
                entry = this.createCiaWeapon(id, this.material, mergedType);
                entry.overrides_main_hand = [...entry.overrides_main_hand, ...mergedAttributes]
                // @ts-ignore
            } else if (mergedType.type === "shield") {
                entry = this.createCiaShield(id, this.material, mergedType);
                entry.overrides_off_hand = [...entry.overrides_off_hand, ...mergedAttributes]
                // @ts-ignore
            } else if (mergedType.type === "armor") {
                entry = this.createCiaArmor(id, this.material, mergedType);
                // @ts-ignore
                switch (mergedType.slot) {
                    case "head":
                        entry.overrides_head = [...entry.overrides_head, ...mergedAttributes]
                        break;
                    case "chest":
                        entry.overrides_chest = [...entry.overrides_chest, ...mergedAttributes]
                        break;
                    case "legs":
                        entry.overrides_legs = [...entry.overrides_legs, ...mergedAttributes]
                        break;
                    case "feet":
                        entry.overrides_feet = [...entry.overrides_feet, ...mergedAttributes]
                        break;
                }
                // @ts-ignore
            } else if (mergedType.type === "tool") {
                entry = this.createCiaTool(id, this.material, mergedType);
                entry.overrides_main_hand = [...entry.overrides_main_hand, ...mergedAttributes]
            } else if (mergedType.type === "bow" || mergedType.type === "crossbow") {
                entry = this.createCiaProjectileWeapon(id, this.material, mergedType);
                entry.overrides_main_hand = [...entry.overrides_main_hand, ...mergedAttributes]
            }
            if (entry !== undefined) {
                addItemToCia(cia, entry);
            }
        }
        fs.writeFileSync(getCiaPath(), JSON.stringify(cia, null, 4), "utf8");
    }

    createRecipes() {
        const material = this.material;
        const materialIdPart = material.internalName;
        const allVariants = [...PolymorphArmoryVariants.ALL, ...this.customArmoryEntries.map(x => x.variants).flat()];
        for (const type of allVariants) {
            if (this.shouldSkip(type)) {
                continue;
            }
            const id = `${this.internalNamespace}:${materialIdPart}_${type.id}`;
            if (this.gearUsesSmithingTemplate) {
                const baseItemId = `${this.internalNamespace}:${this.smithingFromTier}_${type.id}`;
                const enhanceItemId = this.craftingMaterial;
                if (!!this.smithingTemplateId) {
                    this.kubeJsContainer.recipes.smithingFullRecipe(id, baseItemId, enhanceItemId, this.smithingTemplateId);
                } else {
                    this.kubeJsContainer.recipes.smithingRecipe(id, baseItemId, enhanceItemId);
                }
            }
            else {
                const recipe = type.recipe.map(item => {
                    if (item === "material") {
                        return this.craftingMaterial;
                    } else {
                        return item;
                    }
                });
                this.kubeJsContainer.recipes.craftingRecipe(id, recipe);
            }
        }
    }

    setPMMOLevels() {
        const allVariants = [...PolymorphArmoryVariants.ALL, ...this.customArmoryEntries.map(x => x.variants).flat()];
        for (const type of allVariants) {
            if (this.shouldSkip(type)) {
                continue;
            }
            const materialIdPart = this.material.internalName;
            const id = `${materialIdPart}_${type.id}`;
            if (type.pmmoSkill !== undefined) {
                modifySingleItemWithSkill(this.internalNamespace, id, this.getTypeName(type), this.pmmoLevel, type.pmmoSkill);
            } else {
                modifySingleItem(this.internalNamespace, id, this.getTypeName(type), this.pmmoLevel);
            }
        }
    }

    createModelAssets() {
        if (Config.instance.skipAssets) {
            return;
        }
        const inputAssetsDir = `./mc/assets`;
        const inputModelsDir = `${inputAssetsDir}/_custom/models`;
        const outputAssetsDir = `${kubejsAssetsPath()}/${this.internalNamespace}`;
        const outputTexturesDir = `${outputAssetsDir}/textures/item`;
        const outputModelsDir = `${outputAssetsDir}/models/item`;
        ensureFolderExists(outputTexturesDir);
        ensureFolderExists(outputModelsDir);

        const bucklerModel = JSON.parse(fs.readFileSync(`${inputModelsDir}/buckler_shield.json`, 'utf8'));
        const heaterModel = JSON.parse(fs.readFileSync(`${inputModelsDir}/heater_shield.json`, 'utf8'));
        const towerModel = JSON.parse(fs.readFileSync(`${inputModelsDir}/tower_shield.json`, 'utf8'));
        const bucklerBlockingModel = JSON.parse(fs.readFileSync(`${inputModelsDir}/buckler_shield_blocking.json`, 'utf8'));
        const heaterBlockingModel = JSON.parse(fs.readFileSync(`${inputModelsDir}/heater_shield_blocking.json`, 'utf8'));
        const towerBlockingModel = JSON.parse(fs.readFileSync(`${inputModelsDir}/tower_shield_blocking.json`, 'utf8'));
        const bowModel = JSON.parse(fs.readFileSync(`${inputModelsDir}/bow.json`, 'utf8'));
        const shortbowModel = JSON.parse(fs.readFileSync(`${inputModelsDir}/shortbow.json`, 'utf8'));
        const longbowModel = JSON.parse(fs.readFileSync(`${inputModelsDir}/longbow.json`, 'utf8'));
        const crossbowModel = JSON.parse(fs.readFileSync(`${inputModelsDir}/crossbow.json`, 'utf8'));


        const material = this.material;
        const materialIdPart = material.internalName;
        const simpleModelTypes = [...PolymorphArmoryVariants.SWORDS, ...PolymorphArmoryVariants.TOOLS, ...PolymorphArmoryVariants.ARMORS, ...PolymorphArmoryVariants.CURIOS, ...PolymorphArmoryVariants.GLOVES];
        // TODO Expand Armory to generate Armors & Tools
        for (const type of simpleModelTypes) {
            if (this.shouldSkip(type)) {
                continue;
            }
            const id = `${materialIdPart}_${type.id}`;
            const item = {
                textures: {}
            } as any;
            item.parent = `${this.internalNamespace}:item/` + type.modelType;
            if (type.id === "claws" || type.id.includes("staff") || type.id.includes("katana") || type.id.includes("musashi")) {
                item.textures["0"] = `${this.internalNamespace}:item/${id}`;
            } else {
                item.textures.layer0 = `${this.internalNamespace}:item/${id}`;
            }
            fs.writeFileSync(`${outputModelsDir}/${id}.json`, JSON.stringify(item, null, 4), "utf8");

        }

        for (const type of PolymorphArmoryVariants.SHIELDS) {
            if (this.shouldSkip(type)) {
                continue;
            }
            const id = `${materialIdPart}_${type.id}`;
            let model;
            let blockingModel;
            switch (type.modelType) {
                case "buckler_shield":
                    model = bucklerModel;
                    blockingModel = bucklerBlockingModel;
                    break;
                case "heater_shield":
                    model = heaterModel;
                    blockingModel = heaterBlockingModel;
                    break;
                case "tower_shield":
                    model = towerModel;
                    blockingModel = towerBlockingModel;
                    break;
            }
            model.textures["0"] = `${this.internalNamespace}:item/${id}`;
            model.overrides[0].model = `${this.internalNamespace}:item/${id}_blocking`;
            blockingModel.parent = `${this.internalNamespace}:item/${id}`;
            fs.writeFileSync(`${outputModelsDir}/${id}.json`, JSON.stringify(model, null, 4), "utf8");
            fs.writeFileSync(`${outputModelsDir}/${id}_blocking.json`, JSON.stringify(blockingModel, null, 4), "utf8");
        }

        for (const type of PolymorphArmoryVariants.ARCHERY) {
            if (this.shouldSkip(type)) {
                continue;
            }
            const id = `${materialIdPart}_${type.id}`;
            // @ts-ignore
            let model;
            switch (type.modelType) {
                case "bow":
                    model = bowModel;
                    break;
                case "shortbow":
                    model = shortbowModel;
                    break;
                case "longbow":
                    model = longbowModel;
                    break;
                case "crossbow":
                    model = crossbowModel;
                    break;
            }
            model.textures.layer0 = `${this.internalNamespace}:item/${id}`;
            model.overrides[0].model = `${this.internalNamespace}:item/${id}_drawing_0`;
            model.overrides[1].model = `${this.internalNamespace}:item/${id}_drawing_1`;
            model.overrides[2].model = `${this.internalNamespace}:item/${id}_drawing_2`;

            for (let i = 1; i < 4; i++) {
                const subModel = {
                    parent: `${this.internalNamespace}:item/${id}`,
                    textures: {
                        layer0: `${this.internalNamespace}:item/${id}_drawing_${i - 1}`
                    }
                }
                fs.writeFileSync(`${outputModelsDir}/${id}_drawing_${i - 1}.json`, JSON.stringify(subModel, null, 4), "utf8");
            }

            // Crossbow extra states
            // @ts-ignore
            if (PolymorphArmoryVariants.CROSSBOWS.includes(type)) {
                model.overrides[3].model = `${this.internalNamespace}:item/${id}_locked`;
                model.overrides[4].model = `${this.internalNamespace}:item/${id}_firework`;
                const extraStates = ["locked", "firework"];
                for (const extraState of extraStates) {
                    const extraModel = {
                        parent: `${this.internalNamespace}:item/${id}`,
                        textures: {
                            layer0: `${this.internalNamespace}:item/${id}_${extraState}`
                        }
                    }
                    fs.writeFileSync(`${outputModelsDir}/${id}_${extraState}.json`, JSON.stringify(extraModel, null, 4), "utf8");
                }
            }

            fs.writeFileSync(`${outputModelsDir}/${id}.json`, JSON.stringify(model, null, 4), "utf8");
        }

        const itemModelsToCopy = [
            `${inputModelsDir}/normal.json`,
            `${inputModelsDir}/slightly_larger.json`,
            `${inputModelsDir}/long.json`,
            `${inputModelsDir}/spear.json`,
            `${inputModelsDir}/twinblade.json`,
            `${inputModelsDir}/warglaive.json`,
            `${inputModelsDir}/katana.json`,
            `${inputModelsDir}/musashi.json`,
            `${inputModelsDir}/arcane_staff.json`,
            `${inputModelsDir}/blood_staff.json`,
            `${inputModelsDir}/ender_staff.json`,
            `${inputModelsDir}/evocation_staff.json`,
            `${inputModelsDir}/fire_staff.json`,
            `${inputModelsDir}/holy_staff.json`,
            `${inputModelsDir}/ice_staff.json`,
            `${inputModelsDir}/lightning_staff.json`,
            `${inputModelsDir}/nature_staff.json`,
            `${inputModelsDir}/woodwind_staff.json`,
        ]

        for (const modelPath of itemModelsToCopy) {
            fs.copyFileSync(modelPath, `${outputModelsDir}/${modelPath.split("/").pop()}`);
        }
    }

    async createTextureAssets() {
        if (Config.instance.skipAssets) {
            return;
        }
        const inputAssetsDir = `./mc/assets`;
        const inputTexturesDir = `${inputAssetsDir}/_custom/textures`;
        const inputTexturesPaths = fs.readdirSync(inputTexturesDir).filter(path => path.endsWith(".png"));
        const outputAssetsDir = `${kubejsAssetsPath()}/${this.internalNamespace}`;
        const outputTexturesDir = `${outputAssetsDir}/textures/item`;
        ensureFolderExists(outputTexturesDir);
        // SWORDS & SHIELDS
        const material = this.material;
        const types = [...PolymorphArmoryVariants.SWORDS, ...PolymorphArmoryVariants.SHIELDS, ...PolymorphArmoryVariants.TOOLS, ...PolymorphArmoryVariants.ARMORS, ...PolymorphArmoryVariants.CURIOS, ...PolymorphArmoryVariants.GLOVES];
        for (const type of types) {
            if (this.shouldSkip(type)) {
                continue;
            }
            if (type.textureGenDetails === undefined) {
                let assets = inputTexturesPaths.filter(path => path.startsWith(type.id));
                if (assets.length === 0) {
                    continue;
                }
                assets = assets.map(asset => `${inputTexturesDir}/${asset}`);
                const materialColor = material.color;
                const workingAssets = [];
                for (const asset of assets) {
                    if (asset.endsWith("no_tint.png")) {
                        workingAssets.push(new WorkingTexture().withPath(asset));
                    } else {
                        const tex = new WorkingTexture().withPath(asset).withTint(materialColor);
                        if (material.brightnessBoost !== 0) {
                            tex.withBrightness(material.brightnessBoost);
                        }
                        workingAssets.push(tex);
                    }
                }
                const id = `${material.internalName}_${type.id}`;
                const texture = await combine(workingAssets);
                await texture.toFile(`${outputTexturesDir}/${id}.png`);
            } else {
                let assets = [`${inputTexturesDir}/${type.textureGenDetails.textureName}`];
                const workingAssets = [];
                const chromaKeyOperationsCopy = [];
                for (const chromaKeyOperation of type.textureGenDetails.chromaKeyOperations) {
                    const newChromaKeyOperation = {...chromaKeyOperation};
                    if (newChromaKeyOperation.replaceWith === "#000000") {
                        newChromaKeyOperation.replaceWith = material.color;
                        if (material.brightnessBoost !== 0) {
                            newChromaKeyOperation.brightness = material.brightnessBoost;
                        }
                    }
                    chromaKeyOperationsCopy.push(newChromaKeyOperation);
                }
                workingAssets.push(new WorkingTexture().withPath(assets[0]).withChromaKeys(chromaKeyOperationsCopy));
                const id = `${material.internalName}_${type.id}`;
                const texture = await combine(workingAssets);
                await texture.toFile(`${outputTexturesDir}/${id}.png`);
            }
        }

        // BOWS
        for (const type of PolymorphArmoryVariants.ARCHERY) {
            if (this.shouldSkip(type)) {
                continue;
            }
            for (let i = 0; i < 4; i++) {
                const index = i + 1;
                const basePath = `${inputTexturesDir}/${type.id}_base_${index}.png`;
                const arrowPath = `${inputTexturesDir}/${type.id}_arrow_${index}.png`;
                const stringPath = `${inputTexturesDir}/${type.id}_string_${index}.png`;
                const materialColor = material.color;
                const workingAssets = [
                    new WorkingTexture().withPath(basePath).withTint(materialColor),
                    new WorkingTexture().withPath(arrowPath),
                    new WorkingTexture().withPath(stringPath),
                ];
                let id = `${material.internalName}_${type.id}`;
                // @ts-ignore
                if ([1, 2, 3].includes(i)) {
                    id = `${material.internalName}_${type.id}_drawing_${i - 1}`;
                }
                const texture = await combine(workingAssets);
                texture.toFile(`${outputTexturesDir}/${id}.png`);

            }
        }

        // CROSSBOWS Extra
        for (const type of PolymorphArmoryVariants.CROSSBOWS) {
            if (this.shouldSkip(type)) {
                continue;
            }
            const extraStates = ["locked", "firework"]
            for (const extraState of extraStates) {
                const basePath = `${inputTexturesDir}/${type.id}_${extraState}_base.png`;
                const stringPath = `${inputTexturesDir}/${type.id}_${extraState}_string.png`;
                const arrowPath = `${inputTexturesDir}/${type.id}_${extraState}_arrow.png`;
                const materialColor = material.color;
                const workingAssets = [
                    new WorkingTexture().withPath(basePath).withTint(materialColor),
                    new WorkingTexture().withPath(stringPath),
                    new WorkingTexture().withPath(arrowPath),
                ];
                const id = `${material.internalName}_${type.id}_${extraState}`;
                const texture = await combine(workingAssets);
                texture.toFile(`${outputTexturesDir}/${id}.png`);

            }
        }

        const armorLayer1 = `${inputAssetsDir}/textures/models/armor/iron_layer_1.png`;
        const armorLayer2 = `${inputAssetsDir}/textures/models/armor/iron_layer_2.png`;

        const armorLayer1Texture = new WorkingTexture().withPath(armorLayer1).withTint(material.color);
        const armorLayer2Texture = new WorkingTexture().withPath(armorLayer2).withTint(material.color);

        const combinedArmorLayer1Texture = await combine([armorLayer1Texture]);
        const combinedArmorLayer2Texture = await combine([armorLayer2Texture]);

        ensureFolderExists(`${outputAssetsDir}/textures/models/armor`);
        combinedArmorLayer1Texture.toFile(`${outputAssetsDir}/textures/models/armor/${material.internalName}_layer_1.png`);
        combinedArmorLayer2Texture.toFile(`${outputAssetsDir}/textures/models/armor/${material.internalName}_layer_2.png`);
    }

    //#endregion

    //#region Builder Methods

    get id() {
        return this.internalName;
    }

    get displayName() {
        return idToDisplayName(this.internalName);
    }

    get craftingMaterial() {
        if (this.craftingMaterialInternal) {
            return this.craftingMaterialInternal;
        }
        return this.material.ore.getSmeltedMaterialId();
    }

    get color() {
        return this.material.color;
    }

    get harvestLevel() {
        if (this.material === undefined) {
            throw new Error("Material is not set");
        }
        if (this.material.level === undefined) {
            throw new Error("Material level is not set");
        }
        return this.material.level;
    }


    withId(id: string): Armory {
        this.internalName = id;
        return this;
    }

    withDisplayName(name: string): Armory {
        return this;
    }

    withColor(color: string): Armory {
        return this;
    }

    withChromaKey(chromaKey:ChromaKeyOperation): Armory {
        this.chromaKeyOperations.push(chromaKey);
        return this;
    }

    withChromaKeys(chromaKeyOperations: ChromaKeyOperation[]): Armory {
        this.chromaKeyOperations = [...this.chromaKeyOperations, ...chromaKeyOperations];
        return this;
    }

    withHarvestLevel(harvestLevel: number): Armory {
        return this;
    }

    withCraftingMaterial(craftingMaterial: string): Armory {
        this.craftingMaterialInternal = craftingMaterial;
        return this;
    }

    withMaterial(material: Material): Armory {
        this.material = material;
        return this;
    }

    withDurability(durability: number): Armory {
        this.durability = durability;
        return this;
    }

    full() : Armory {
        this.gear = [...PolymorphArmoryVariants.ALL.map(x => x.id)];
        return this;
    }

    empty() : Armory {
        this.gear = [];
        this.customArmoryEntries = [];
        return this;
    }

    withToolSet(gear: string[] = ["pickaxe", "shovel", "axe", "hoe", "sword"]) : Armory {
        this.gear = [...this.gear, ...gear];
        return this;
    }

    withArmorSet(gear: string[] = ["helmet", "chestplate", "leggings", "boots"]) : Armory {
        this.gear = [...this.gear, ...gear];
        return this;
    }

    withWeaponSet(gear: string[] = PolymorphArmoryVariants.SWORDS.map(x => x.id)) : Armory {
        this.gear = [...this.gear, ...gear];
        return this;
    }

    withShieldSet(gear: string[] = PolymorphArmoryVariants.SHIELDS.map(x => x.id)) : Armory {
        this.gear = [...this.gear, ...gear];
        return this;
    }

    withArcherySet(gear: string[] = PolymorphArmoryVariants.ARCHERY.map(x => x.id)) : Armory {
        this.gear = [...this.gear, ...gear];
        return this;
    }

    withoutGearType(type: string): Armory {
        this.gear = this.gear.filter(x => x !== type);
        return this;
    }

    withoutGearTypes(types: string[]): Armory {
        this.gear = this.gear.filter(x => !types.includes(x));
        return this;
    }

    withSmithing(fromTier: string, templateId: string | undefined): Armory {
        this.gearUsesSmithingTemplate = true;
        this.smithingFromTier = fromTier;
        this.smithingTemplateId = templateId ?? undefined;
        return this;
    }

    withPmmoLevel(level: number): Armory {
        this.pmmoLevel = level;
        return this;
    }

    withBaseDamage(damage: number): Armory {
        this.baseDamage = damage;
        return this;
    }

    withBaseArmor(armor: number): Armory {
        this.baseArmor = armor;
        return this;
    }

    withToolSpeed(speed: number): Armory {
        this.harvestSpeed = speed;
        return this;
    }

    withArmorToughness(toughness: number): Armory {
        this.baseArmorToughness = toughness;
        return this;
    }

    withKnockbackResistance(resistance: number): Armory {
        this.baseArmorKnockbackResistance = resistance;
        return this;
    }

    withCustomArmoryEntry(entry: CustomArmoryEntry): Armory {
        this.customArmoryEntries.push(entry);
        const variants = entry.variants;
        for (const variant of variants) {
            this.gear.push(variant.id);
        }
        return this;
    }

    withCustomArmoryEntries(entries: CustomArmoryEntry[]): Armory {
        this.customArmoryEntries = [...this.customArmoryEntries, ...entries];
        for (const entry of entries) {
            const variants = entry.variants;
            for (const variant of variants) {
                this.gear.push(variant.id);
            }
        }
        return this;
    }

    //#endregion

    //#region Helper Methods

    shouldSkip(type: BaseVariant){
        // @ts-ignore
        return !this.gear.includes(type.id);
    }

    private getTypeName(type: BaseVariant) {
        if (type.id.includes("helmet")) {
            return "helmet";
        } else if (type.id.includes("chestplate")) {
            return "chestplate";
        } else if (type.id.includes("leggings")) {
            return "leggings";
        } else if (type.id.includes("boots")) {
            return "boots";
        } else if (type.id.includes("staff")) {
            return "staff";
        }
        switch (type.type) {
            case "sword":
                return "sword";
            case "shield":
                return "shield";
            case "bow":
                return "bow";
            case "crossbow":
                return "crossbow";
            case "tool":
                const toolType = type as ToolVariant;
                return toolType.toolType;
            case "armor":
                const armorType = type as ArmorVariant;
                return armorType.id;
            case "curio":
                return "curio";
        }
        return type.id;
    }

    private createCiaWeapon(itemId, material, weaponType) {
        return createCiaMainHand(itemId, [
            {
                attribute: "minecraft:generic.attack_damage",
                operation: operation.ADDITION,
                value: (this.baseDamage > 0 ? this.baseDamage * weaponType.damageMultiplier : this.baseDamage / weaponType.damageMultiplier) - 6
            },
            {
                attribute: "forge:entity_reach",
                operation: operation.MULTIPLY_BASE,
                value: weaponType.reachMultiplier
            },
            {
                attribute: "minecraft:generic.attack_speed",
                operation: operation.ADDITION,
                value: weaponType.speedAddition
            },
        ])
    }
    private createCiaUnarmedWeapon(itemId, material, weaponType) {
        return createCiaMainHand(itemId, [
            {
                attribute: "zoompack_overrides_forge:unarmed_damage",
                operation: operation.ADDITION,
                value: (this.baseDamage > 0 ? this.baseDamage * weaponType.damageMultiplier : this.baseDamage / weaponType.damageMultiplier)
            },
            {
                attribute: "forge:entity_reach",
                operation: operation.MULTIPLY_BASE,
                value: weaponType.reachMultiplier
            },
            {
                attribute: "minecraft:generic.attack_speed",
                operation: operation.MULTIPLY_BASE,
                value: weaponType.speedMultiplier
            },
        ])
    }
    private createCiaProjectileWeapon(itemId, material, weaponType) {
        return createCiaMainHand(itemId, [
            {
                attribute: "projectile_damage:generic",
                operation: operation.ADDITION,
                value: (this.baseDamage > 0 ? this.baseDamage * weaponType.damageMultiplier : this.baseDamage / weaponType.damageMultiplier)
            },
            {
                attribute: "attributeslib:draw_speed",
                operation: operation.MULTIPLY_BASE,
                value: weaponType.speedMultiplier
            },
        ])
    }
    private createCiaShield(itemId, material, shieldType) {
        return createCiaOffhand(itemId, [
            {
                attribute: "minecraft:generic.armor",
                operation: operation.ADDITION,
                value: this.baseArmor * shieldType.armorMultiplier,
            },
            {
                attribute: "minecraft:generic.movement_speed",
                operation: operation.MULTIPLY_BASE,
                value: shieldType.speedMultiplier,
            },
        ])
    }
    private createCiaArmor(itemId, material, armorType) {
        return createCiaGenericArmor(itemId, [
            {
                attribute: "minecraft:generic.armor",
                operation: operation.ADDITION,
                value: this.baseArmor * armorType.armorMultiplier,
            },
        ], armorType.name);
    }
    private createCiaTool(itemId, material, toolType) {
        if (toolType.name === "sword") {
            return createCiaMainHand(itemId, []);
        } else {
            return createCiaMainHand(itemId, [
                {
                    attribute: "minecraft:generic.attack_damage",
                    operation: operation.ADDITION,
                    value: -(this.baseDamage > 0 ? this.baseDamage * toolType.damageMultiplier : this.baseDamage / toolType.damageMultiplier) + 6
                },
            ])
        }
    }
    private multiplyAdditionalAttributesPerLevel(attributes: CiaModifier[]): CiaModifier[] {
        if (attributes === undefined) {
            return [];
        }
        return attributes.map(attribute => {
            return {
                ...attribute,
                value: attribute.value * this.harvestLevel
            }
        });
    }

    //#endregion
}
