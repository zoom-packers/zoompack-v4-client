import {Dimension} from "./worldgen/dimension";
import {DimensionType} from "./worldgen/dimensionType";
import {Biome} from "./worldgen/biome";
import {Material} from "./material/material";
import {BasicDataHolder} from "./selfWritingJson";
import {KubeJSContainer} from "./kjs/kubeJSContainer";
import {PackMcMeta} from "./packMcMeta";
import {log} from "./utils";
import {StructureDefinition} from "./worldgen/structureDefinition";

import {VanillaModification} from "./vanillaModification";
import {PickaxeLevelModification} from "./pickaxeLevelModification";
import {HarvestLevel} from "./ht_tweaker/harvestLevel";

export class ExpansionPack extends BasicDataHolder<ExpansionPack> {
    kubeMcMeta: PackMcMeta = new PackMcMeta(this.rootPath, this.internalNamespace);
    paxiPackMeta: PackMcMeta = new PackMcMeta(this.rootPath, this.internalNamespace).isPaxiPackMeta();
    dimensions: Dimension[] = [];
    dimensionTypes: DimensionType[] = [];
    biomes: Biome[] = [];
    materials: Material[] = [];
    structures: StructureDefinition[] = [];
    vanillaModifications: VanillaModification[] = [];
    harvestLevels: HarvestLevel[] = [];

    content = [[this.kubeMcMeta, this.paxiPackMeta], this.dimensions, this.dimensionTypes, this.biomes, this.materials, this.structures];
    buildableContent = [this.materials, this.structures];

    async build() {
        log(this, `Building expansion pack <${this.internalName}>`);
        this.kubeJsContainer = new KubeJSContainer().withNamespace(this.internalNamespace);
        this.harvestLevels.map(level => this.kubeJsContainer.harvestLevelTweaker.withLevel(level));
        this.content.forEach(content => content.forEach(item => {
            item.withNamespace(this.internalNamespace);
            item.setJsContainer(this.kubeJsContainer)
        }));
        for (const buildableContent of this.buildableContent) {
            for (const buildable of buildableContent) {
                await buildable.build();
            }
        }
        this.content.forEach(content => content.forEach(item => {
            item.kubeJsContainer = undefined;
            if (item.afterBuild) {
                item.afterBuild()
            }
        }));
        for (const vanillaModification of this.vanillaModifications) {
            if (vanillaModification instanceof PickaxeLevelModification) {
                vanillaModification.setJsContainer(this.kubeJsContainer);
                await vanillaModification.build();
            }
        }
        log(this, `Finished building expansion pack <${this.internalName}>`);
        return this;
    }

    async writeSelf() {
        log(this, `Writing expansion pack <${this.internalName}>`);
        for (const content of this.content) {
            for (const item of content) {
                await item.writeSelf();
            }
        }
        this.kubeJsContainer.writeFiles();
        log(this, `Finished writing expansion pack <${this.internalName}>`);
    }

    withPackFormat(format: number) {
        this.kubeMcMeta.withPackFormat(format);
        return this;
    }

    withDescription(description: string) {
        this.kubeMcMeta.withDescription(description);
        return this;
    }

    withDimension(dimension: Dimension): ExpansionPack {
        this.dimensions.push(dimension);
        return this;
    }

    withDimensions(dimensions: Dimension[]): ExpansionPack {
        for (const dimension of dimensions) {
            this.withDimension(dimension);
        }
        return this;
    }

    withDimensionType(dimensionType: DimensionType): ExpansionPack {
        this.dimensionTypes.push(dimensionType);
        return this;
    }

    withDimensionTypes(dimensionTypes: DimensionType[]): ExpansionPack {
        for (const dimensionType of dimensionTypes) {
            this.withDimensionType(dimensionType);
        }
        return this;
    }

    withBiome(biome: Biome): ExpansionPack {
        this.biomes.push(biome);
        return this;
    }

    withBiomes(biomes: Biome[]): ExpansionPack {
        for (const biome of biomes) {
            this.withBiome(biome);
        }
        return this;
    }

    withMaterial(material: Material): ExpansionPack {
        this.materials.push(material);
        return this;
    }

    withMaterials(materials: Material[]): ExpansionPack {
        for (const material of materials) {
            this.withMaterial(material);
        }
        return this;
    }

    withStructure(structure: StructureDefinition): ExpansionPack {
        this.structures.push(structure);
        return this;
    }

    withStructures(structures: StructureDefinition[]): ExpansionPack {
        for (const structure of structures) {
            this.withStructure(structure);
        }
        return this;
    }

    withVanillaModification(modification: VanillaModification): ExpansionPack {
        this.vanillaModifications.push(modification);
        return this;
    }

    withVanillaModifications(modifications: VanillaModification[]): ExpansionPack {
        for (const modification of modifications) {
            this.withVanillaModification(modification);
        }
        return this;
    }

    withHarvestLevel(level: HarvestLevel): ExpansionPack {
        this.harvestLevels.push(level);
        return this;
    }

    withHarvestLevels(levels: HarvestLevel[]): ExpansionPack {
        for (const level of levels) {
            this.withHarvestLevel(level);
        }
        return this;
    }

    validate() {
        this.dimensions.forEach(dimension => dimension.validate());
        this.dimensionTypes.forEach(dimensionType => dimensionType.validate());
        this.biomes.forEach(biome => biome.validate());
        this.materials.forEach(material => material.validate());
    }
}
