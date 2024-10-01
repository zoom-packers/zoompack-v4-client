import {AnyVariant, ChromaKeyOperation} from "./ArmoryTypes";
import fs from "fs";
import path from "path";
import {ItemTextureWrapper} from "../textureGen/itemTextureWrapper";
import {Material} from "./material";
import {ensureFolderExists, log, removeNamespace} from "../utils";
import {Config} from "../config";

export abstract class CustomArmoryEntry {
    variants: AnyVariant[];
    modelPaths: string[] = [];
    geoPaths: string[] = [];
    textures: { [key: string]: string[] } = {};
    additionalTextures: {path: string, resultFileName:string}[] = [];
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

    withAdditionalTextures(additionalTextures: {path: string, resultFileName:string}[]) {
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


export class GeckoArmorArmoryEntry extends CustomArmoryEntry{
    armorId: string;

    //#region Builder methods

    constructor(variants: AnyVariant[]) {
        super(variants);
    }

    withArmorId(armorId: string): GeckoArmorArmoryEntry {
        this.armorId = armorId;
        return this;
    }

    //#endregion

    async build(outputFolderPath: string, modId: string, material: Material) {
        if (Config.instance.skipAssets) {
            return;
        }
        log(this, `Building ${material.internalName}`);
        this.buildModels(outputFolderPath, material, modId);
        log(this, `Built models for ${material.internalName}`);
        this.buildGeos(outputFolderPath, material.internalName);
        log(this, `Built geos for ${material.internalName}`);
        await this.buildTextures(outputFolderPath, material, modId);
        log(this, `Built textures for ${material.internalName}`);
    }

    buildGeos(outputFolderPath: string, materialId: string) {
        const geoFolderPath = path.join(outputFolderPath, "geo");
        for (let geoPath of this.geoPaths) {
            const outputPath = path.join(geoFolderPath, removeNamespace(this.armorId) + ".geo.json");
            ensureFolderExists(geoFolderPath);
            fs.copyFileSync(geoPath, outputPath);
        }
    }

    buildModels(outputFolderPath: string, material: Material, modId: string) {
        const modelFolderPath = path.join(outputFolderPath, "models/item");
        for (let i = 0; i < this.modelPaths.length; i++){
            const modelPath = this.modelPaths[i];
            const variant = this.variants[i];
            const itemId = this.getId(material.internalName, variant);
            const outputPath = path.join(modelFolderPath, this.getNewFileName(modelPath, variant, itemId) + ".json");
            const fileContent = fs.readFileSync(modelPath, "utf8");
            const fileJson = JSON.parse(fileContent);
            const regex = /"([^"]*)\/([^"]*)"/g;
            const textures = fileJson.textures;
            const keys = Object.keys(textures);
            for (const key of keys) {
                textures[key] = `${modId}:item/${itemId}`;
            }
            const newContent = JSON.stringify(fileJson, null, 4);
            ensureFolderExists(modelFolderPath);
            fs.writeFileSync(outputPath, newContent);
        }
    }

    async buildTextures(outputFolderPath: string, material: Material, modId: string) {
        const textureFolderPath = path.join(outputFolderPath, "textures/item");
        for (let i = 0; i < this.variants.length; i++) {
            const variant = this.variants[i];
            const itemId = this.getId(material.internalName, variant);
            const textures = this.textures[variant.id];
            for (let texture of textures) {
                const outputPath = path.join(textureFolderPath, this.getNewFileName(texture, variant, itemId) + ".png");
                let itemTexture = new ItemTextureWrapper().fromPath(texture);
                await this.processItemTexture(itemTexture, material, textureFolderPath, outputPath);
            }
        }
        for (const additionalTexture of this.additionalTextures) {
            const outputPath = path.join(outputFolderPath, "textures/models/armor", additionalTexture.resultFileName);
            let itemTexture = new ItemTextureWrapper().fromPath(additionalTexture.path);
            await this.processItemTexture(itemTexture, material, textureFolderPath, outputPath);
        }
    }

    private async processItemTexture(itemTexture: ItemTextureWrapper, material: Material, textureFolderPath: string, outputPath: string) {
        if (outputPath.includes("{material}")) {
            outputPath = outputPath.replace("{material}", material.internalName);
        }
        for (const materialChromaKeyOperation of this.materialChromaKeyOperations) {
            itemTexture = itemTexture.withChromaKey(
                {
                    colorToReplace: materialChromaKeyOperation.colorToReplace,
                    tolerance: materialChromaKeyOperation.tolerance,
                    function: materialChromaKeyOperation.function,
                    replaceWith: material.color
                }
            );
        }
        for (const customChromaKeyOperation of this.customChromaKeyOperations) {
            itemTexture = itemTexture.withChromaKey(
                {
                    colorToReplace: customChromaKeyOperation.colorToReplace,
                    tolerance: customChromaKeyOperation.tolerance,
                    function: customChromaKeyOperation.function,
                    replaceWith: customChromaKeyOperation.replaceWith
                }
            );
        }
        const workingTexture = itemTexture.toWorkingTexture();
        const buffer = await workingTexture.sharpProcess();
        ensureFolderExists(textureFolderPath);
        fs.writeFileSync(outputPath, buffer);
    }

    private getId(materialId: string, variant: AnyVariant) {
        return `${materialId}_${variant.id}`;
    }

    private getFileSuffix(file: string, variant: AnyVariant): string {
        const idIndex = file.lastIndexOf(variant.id);
        const suffix = file.substring(idIndex + variant.id.length);
        return suffix;
    }

    private getFileAffix(file: string, variant: AnyVariant): string {
        const idIndex = file.lastIndexOf(variant.id);
        const affix = file.substring(0, idIndex);
        const lastSlash = affix.lastIndexOf("\\");
        return affix.substring(lastSlash + 1);
    }

    private getNewFileName(file: string, variant: AnyVariant, itemId: string): string {
        const affix = this.getFileAffix(file, variant);
        const suffix = this.getFileSuffix(file, variant);
        return itemId;
    }
}
