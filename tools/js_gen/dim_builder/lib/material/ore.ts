import {OreFeatureConfiguration, VARIANTS, VARIANTS_BASE_TEXTURE_MAP} from "./oreFeatureConfiguration";
import {OreFeaturePlacement} from "./oreFeaturePlacement";
import {ensureFolderExists, idToDisplayName, kubejsAssetsPath, removeNamespace} from "../utils";
import {combine} from "../textureGen/util";
import {Material} from "./material";
import {ItemTextureWrapper} from "../textureGen/itemTextureWrapper";
import {WorkingTexture} from "../textureGen/workingTexture";
import {ExistingOre} from "./existingOre";

export class Ore extends ExistingOre {
    config: OreFeatureConfiguration;
    placements: OreFeaturePlacement[] = [];
    isSmeltable: boolean = true;
    isGem: boolean = false;
    turnsIntoIngot: boolean = true;
    variants: VARIANTS[] = [];
    overlayTexture = new ItemTextureWrapper().fromPath("./mc/assets/_custom/textures/iron_ore_overlay.png").withTint(true);
    rawMaterialTexture = new ItemTextureWrapper().fromAssets("item/raw_iron").withTint(true);
    gemMaterialTexture = new ItemTextureWrapper().fromAssets("item/textures/diamond").withTint(true);
    ingotMaterialTexture = new ItemTextureWrapper().fromAssets("item/iron_ingot").withTint(true);

    constructor() {
        super("", "");
    }

    async build(material: Material) {
        super.build(material);
        this.buildKubeJS();
        this.buildDatapack();
        await this.buildAssets();
        return this;
    }

    private buildKubeJS() {
        this.registerBlocks();
        this.registerItems();
    }

    private registerItems() {
        const rawMaterialId = this.getRawMaterialId();
        this.kubeJsContainer.registrar.registerItem(rawMaterialId, idToDisplayName(rawMaterialId));
        if (this.isSmeltable) {
            const smeltedMaterialId = this.getSmeltedMaterialId();
            this.kubeJsContainer.registrar.registerItem(smeltedMaterialId, idToDisplayName(smeltedMaterialId));
            this.kubeJsContainer.recipes.smeltingRecipe(smeltedMaterialId, rawMaterialId);
        }
    }

    private registerBlocks() {
        this.variants.forEach(v => {
            const blockId = this.getBlockId(v);
            this.kubeJsContainer.registrar.registerOreBlock(blockId, idToDisplayName(blockId));
        })
    }

    private async buildAssets() {
        const rootPath = kubejsAssetsPath();
        for (const variant of this.variants) {
            const baseTexture = new WorkingTexture().withPath(VARIANTS_BASE_TEXTURE_MAP[variant]);
            const overlayTexture = this.overlayTexture.withTintColor(this.material.color).toWorkingTexture();
            const combined = await combine([baseTexture, overlayTexture]);
            const folderPath = `${rootPath}/${this.internalNamespace}/textures/block`;
            ensureFolderExists(folderPath);
            const blockId = removeNamespace(this.getBlockId(variant));
            await combined.toFile(`${folderPath}/${blockId}.png`);
        }

        // Raw material texture
        const rawMaterialTexture = this.rawMaterialTexture.withTintColor(this.material.color).toWorkingTexture();
        const combined = await combine([rawMaterialTexture]);
        const rawMaterialId = removeNamespace(this.getRawMaterialId());
        const folderPath = `${rootPath}/${this.internalNamespace}/textures/item`;
        ensureFolderExists(folderPath);
        await combined.toFile(`${folderPath}/${rawMaterialId}.png`);

        // Smelted material texture
        if (this.isSmeltable) {
            var texturePath = this.isGem ? this.gemMaterialTexture : this.ingotMaterialTexture;
            const smeltedMaterialTexture = texturePath.withTintColor(this.material.color).toWorkingTexture();
            const combined = await combine([smeltedMaterialTexture]);
            const smeltedMaterialId = removeNamespace(this.getSmeltedMaterialId());
            await combined.toFile(`${folderPath}/${smeltedMaterialId}.png`);
        }
    }

    private buildDatapack() {
        this.config.withName(this.internalName).withNamespace(this.internalNamespace);
        this.config.config.targets.forEach(target => {
            switch (target.state.Name) {
                case VARIANTS.STONE:
                    target.state.Name = `${this.internalNamespace}:${this.internalName}_ore`;
                    break;
                case VARIANTS.DEEPSLATE:
                    target.state.Name = `${this.internalNamespace}:deepslate_${this.internalName}_ore`;
                    break;
            }
        })
        this.placements.forEach(p => {
            p.withName(this.internalName).withNamespace(this.internalNamespace).withFeature(`${this.internalNamespace}:${this.internalName}`);
        });
        this.variants.forEach(v => {
            const blockId = this.getBlockId(v);
            const rawMaterialId = this.getRawMaterialId();
            this.kubeJsContainer.loot.withOreLoot(blockId, rawMaterialId);
        });
    }

    getRawMaterialId() {
        if (this.isGem) {
            return `${this.internalNamespace}:${this.internalName}_gem`;
        }
        if (this.isSmeltable) {
            return `${this.internalNamespace}:raw_${this.internalName}_ore`;
        }
        return `${this.internalName}`;
    }

    getSmeltedMaterialId() {
        if (this.isGem) {
            return `${this.internalNamespace}:${this.internalName}_gem`;
        }
        if (this.isSmeltable) {
            return `${this.internalNamespace}:${this.internalName}_ingot`;
        }
        return `${this.internalName}`;
    }

    withConfig(config: OreFeatureConfiguration) {
        this.config = config;
        return this;
    }

    withPlacement(placement: OreFeaturePlacement) {
        this.placements.push(placement);
        return this;
    }

    withPlacements(placements: OreFeaturePlacement[]) {
        this.placements = placements;
        return this;
    }

    smeltable() {
        this.isSmeltable = true;
        return this;
    }

    gem() {
        this.isGem = true;
        return this;
    }

    noIngot() {
        this.turnsIntoIngot = false;
        return this;
    }

    withOverlayTexture(overlayTexture: ItemTextureWrapper) {
        this.overlayTexture = overlayTexture;
        return this;
    }

    withRawMaterialTexture(rawMaterialTexture: ItemTextureWrapper) {
        this.rawMaterialTexture = rawMaterialTexture;
        return this;
    }

    withGemMaterialTexture(gemMaterialTexture: ItemTextureWrapper) {
        this.gemMaterialTexture = gemMaterialTexture;
        return this;
    }

    withIngotMaterialTexture(ingotMaterialTexture: ItemTextureWrapper) {
        this.ingotMaterialTexture = ingotMaterialTexture;
        return this;
    }


    writeSelf() {
        this.config.writeSelf();
        this.placements.forEach(p => p.writeSelf());
    }

    validate() {
        if (!this.config) {
            throw new Error("Ore must have a configuration");
        }
        if (!this.placements.length) {
            throw new Error("Ore must have at least one placement");
        }
        this.config.validate();
        this.placements.forEach(p => p.validate());
    }

    withMiningLevel(number: number) {
        this.miningLevel = number;
        return this;
    }
}
