import {AnyVariant, ChromaKeyOperation} from "./ArmoryTypes";

export abstract class CustomArmoryEntry {
    variants: AnyVariant[];
    modelPaths: string[] = [];
    geoPaths: string[] = [];
    textures: { [key: string]: string[] } = {};
    additionalTextures: { path: string, resultFileName: string }[] = [];
    customChromaKeyOperations: ChromaKeyOperation[] = [];
    materialChromaKeyOperations: ChromaKeyOperation[] = [];

    protected constructor(variants: AnyVariant[]) {
        this.variants = variants;
    }

    withModelPaths(modelPaths: string[]) {
        this.modelPaths = modelPaths;
        return this;
    }

    withGeoPaths(geoPaths: string[]) {
        this.geoPaths = geoPaths;
        return this;
    }

    withTextures(textures: { [key: string]: string[] }) {
        this.textures = textures;
        return this;
    }

    withAdditionalTextures(additionalTextures: { path: string, resultFileName: string }[]) {
        this.additionalTextures = additionalTextures;
        return this;
    }

    withCustomChromaKeyOperations(customChromaKeyOperations: ChromaKeyOperation[]) {
        this.customChromaKeyOperations = customChromaKeyOperations;
        return this;
    }

    withMaterialChromaKeyOperations(materialChromaKeyOperations: ChromaKeyOperation[]) {
        this.materialChromaKeyOperations = materialChromaKeyOperations;
        return this;
    }

}
