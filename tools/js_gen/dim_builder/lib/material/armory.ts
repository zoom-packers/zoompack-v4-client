import {BasicDataHolder} from "../selfWritingJson";
import {Material} from "./material";
import {capitalizeFirstLetter, ensureFolderExists, idToDisplayName, kubejsAssetsPath, log, rootPath} from "../utils";
// @ts-ignore
import fs from "fs";
import {
    addItemToCia,
    CiaEntry,
    createCiaGenericArmor,
    createCiaMainHand,
    createCiaOffhand,
    getCiaPath,
    operation
} from "../cia/util";
import {modifySingleItem} from "../pmmo/util";
import {combine} from "../textureGen/util";
import {WorkingTexture} from "../textureGen/workingTexture";
import {IArmory} from "./IArmory";
import {PolymorphArmoryVariants} from "../armory/polymorphArmoryVariants";
import {ArmorVariant, BaseVariant, ChromaKeyOperation, SwordVariant, ToolVariant} from "./ArmoryTypes";

export class Armory extends BasicDataHolder<Armory> implements IArmory<Armory>{
    gear: string[] = [];
    durability: number = 250; // Iron has 250, diamond has 1561, netherite has 2031
    gearUsesSmithingTemplate: boolean = false;
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
        return this.material.level;
    }

    shouldSkip(type: BaseVariant){
        // @ts-ignore
        return !this.gear.includes(type.id);
    }

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
    }

    registerTier() {
        const material = this.material;
        const modId = this.internalNamespace;
        const materialIdPart = material.internalName;
        const id = `${modId}:${materialIdPart}`;
        const slotProtections = [
            this.baseArmor * PolymorphArmoryVariants.ARMORS.find(x => x.id === "boots").armorMultiplier,
            this.baseArmor * PolymorphArmoryVariants.ARMORS.find(x => x.id === "leggings").armorMultiplier,
            this.baseArmor * PolymorphArmoryVariants.ARMORS.find(x => x.id === "chestplate").armorMultiplier,
            this.baseArmor * PolymorphArmoryVariants.ARMORS.find(x => x.id === "helmet").armorMultiplier,
        ]
        PolymorphArmoryVariants.TOOLS.forEach(toolType => {
            if (this.shouldSkip(toolType)) {
                return;
            }
            const itemId = `${modId}:${materialIdPart}_${toolType.id}`;
            this.kubeJsContainer.harvestLevelTweaker.withItem(itemId, this.material.level);
        });
        this.kubeJsContainer.registrar.registerToolTier(id, this.durability, this.harvestSpeed, this.baseDamage - 4, this.material.level, 9, this.craftingMaterial);
        this.kubeJsContainer.registrar.registerArmorTier(id, this.durability / 15, slotProtections, 9, this.craftingMaterial, this.baseArmorToughness, this.baseArmorKnockbackResistance);
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
            // @ts-ignore
            if (tieredTypes.includes(type)) {
                this.kubeJsContainer.registrar.registerTieredItem(id, this.getTypeName(type), displayName, `${modId}:${material.internalName}`);
            } else {
                this.kubeJsContainer.registrar.registerArmoryItem(id, this.getTypeName(type), displayName, durability);
            }
        }
    }

    createCiaEntries() {
        var ciaPath = getCiaPath();
        const cia = JSON.parse(fs.readFileSync(getCiaPath(), "utf8"));

        const materialIdPart = this.material.internalName;
        for (const mergedType of PolymorphArmoryVariants.ALL) {
            const id = `${this.internalNamespace}:${materialIdPart}_${mergedType.id}`;
            let entry: CiaEntry;
            // @ts-ignore
            if (PolymorphArmoryVariants.SWORDS.includes(mergedType)) {
                if (mergedType.id === "claws") {
                    entry = this.createCiaWeapon(id, this.material, mergedType);
                    // entry = this.createCiaUnarmedWeapon(id, this.material, mergedType);
                } else {
                    entry = this.createCiaWeapon(id, this.material, mergedType);
                }
                // @ts-ignore
            } else if (PolymorphArmoryVariants.SHIELDS.includes(mergedType)) {
                entry = this.createCiaShield(id, this.material, mergedType);
                // @ts-ignore
            } else if (PolymorphArmoryVariants.ARMORS.includes(mergedType)) {
                entry = this.createCiaArmor(id, this.material, mergedType);
                // @ts-ignore
            } else if (PolymorphArmoryVariants.TOOLS.includes(mergedType)) {
                entry = this.createCiaTool(id, this.material, mergedType);
            } else {
                entry = this.createCiaProjectileWeapon(id, this.material, mergedType);
            }
            addItemToCia(cia, entry);
        }
        fs.writeFileSync(getCiaPath(), JSON.stringify(cia, null, 4), "utf8");
    }

    createRecipes() {
        const material = this.material;
        const materialIdPart = material.internalName;
        for (const type of PolymorphArmoryVariants.ALL) {
            if (this.shouldSkip(type)) {
                continue;
            }
            const id = `${this.internalNamespace}:${materialIdPart}_${type.id}`;
            if (this.gearUsesSmithingTemplate) {
                const baseItemId = this.smithingFromTier + "_" + type.id;
                const enhanceItemId = this.material.ore.getSmeltedMaterialId()
                this.kubeJsContainer.recipes.smithingRecipe(id, baseItemId, enhanceItemId);
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
        for (const type of PolymorphArmoryVariants.ALL) {
            if (this.shouldSkip(type)) {
                continue;
            }
            const materialIdPart = this.material.internalName;
            const id = `${materialIdPart}_${type.id}`;
            modifySingleItem(this.internalNamespace, id, this.getTypeName(type), this.pmmoLevel);
        }
    }

    createModelAssets() {
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
        const simpleModelTypes = [...PolymorphArmoryVariants.SWORDS, ...PolymorphArmoryVariants.TOOLS, ...PolymorphArmoryVariants.ARMORS]
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
            if (type.id === "claws") {
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
            `${inputModelsDir}/long.json`,
            `${inputModelsDir}/spear.json`,
            `${inputModelsDir}/claws.json`,
        ]

        for (const modelPath of itemModelsToCopy) {
            fs.copyFileSync(modelPath, `${outputModelsDir}/${modelPath.split("/").pop()}`);
        }
    }

    async createTextureAssets() {
        const inputAssetsDir = `./mc/assets`;
        const inputTexturesDir = `${inputAssetsDir}/_custom/textures`;
        const inputTexturesPaths = fs.readdirSync(inputTexturesDir).filter(path => path.endsWith(".png"));
        const outputAssetsDir = `${kubejsAssetsPath()}/${this.internalNamespace}`;
        const outputTexturesDir = `${outputAssetsDir}/textures/item`;
        ensureFolderExists(outputTexturesDir);
        // SWORDS & SHIELDS
        const material = this.material;
        const types = [...PolymorphArmoryVariants.SWORDS, ...PolymorphArmoryVariants.SHIELDS, ...PolymorphArmoryVariants.TOOLS, ...PolymorphArmoryVariants.ARMORS];
        for (const type of types) {
            if (this.shouldSkip(type)) {
                continue;
            }
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
                    workingAssets.push(new WorkingTexture().withPath(asset).withTint(materialColor));
                }
            }
            const id = `${material.internalName}_${type.id}`;
            const texture = await combine(workingAssets);
            texture.toFile(`${outputTexturesDir}/${id}.png`);
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

    withChromaKey(colorToReplace: string, tolerance: number, functionType: "linear" | "square" | "cubic", replaceWith: string): Armory {
        this.chromaKeyOperations.push({colorToReplace, tolerance, function: functionType, replaceWith});
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

    withSmithing(fromTier: string): Armory {
        this.gearUsesSmithingTemplate = true;
        this.smithingFromTier = fromTier;
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

    private getTypeName(type: BaseVariant) {
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
            default:
                return type.id;
        }
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
                value: weaponType.reachFlatAddition
            },
            {
                attribute: "minecraft:generic.attack_speed",
                operation: operation.MULTIPLY_BASE,
                value: weaponType.speedFlatAddition
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
                value: weaponType.reachFlatAddition
            },
            {
                attribute: "minecraft:generic.attack_speed",
                operation: operation.MULTIPLY_BASE,
                value: weaponType.speedFlatAddition
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
}
