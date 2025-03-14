import {AnyVariant} from "./ArmoryTypes";
import fs from "fs";
import path from "path";
import {ItemTextureWrapper} from "../textureGen/itemTextureWrapper";
import {Material} from "./material";
import {ensureFolderExists, log, removeNamespace} from "../utils";
import {Config} from "../config";
import {CustomArmoryEntry} from "./customArmoryEntry";
import {KubeJSContainer} from "../kjs/kubeJSContainer";
import {Debug} from "../debug";


export class GeckoArmorArmoryEntry extends CustomArmoryEntry {
    armorId: string;
    builtInAssets: boolean;
    modelId: string;
    textureId:string;
    rootItemsTexturePath: string;
    container: KubeJSContainer;

    static builtGeos: string[] = [];
    static builtAnims: string[] = [];

    //#region Builder methods

    constructor(variants: AnyVariant[], builtInAssets: boolean = false) {
        super(variants);
        this.builtInAssets = builtInAssets;
    }

    withArmorId(armorId: string): GeckoArmorArmoryEntry {
        this.armorId = armorId;
        return this;
    }

    withModelId(modelId: string): GeckoArmorArmoryEntry {
        this.modelId = modelId;
        return this;
    }

    withTextureId(textureId: string): GeckoArmorArmoryEntry {
        this.textureId = textureId;
        return this;
    }

    withRootItemsTexturePath(rootItemsTexturePath: string): GeckoArmorArmoryEntry {
        this.rootItemsTexturePath = rootItemsTexturePath;
        return this;
    }

    //#endregion

    async build(outputFolderPath: string, modId: string, material: Material, container: KubeJSContainer) {
        this.container = container;
        if (Config.instance.skipAssets) {
            return;
        }
        log(this, `Building ${material.internalName}`);
        let now = new Date();
        this.buildModels(outputFolderPath, material, modId);
        Debug.timeAction("geckoArmoryEntry_buildModels", new Date().getTime() - now.getTime());
        now = new Date();
        log(this, `Built models for ${material.internalName}`);
        this.buildGeos(outputFolderPath, material.internalName);
        Debug.timeAction("geckoArmoryEntry_buildGeos", new Date().getTime() - now.getTime());
        now = new Date();
        this.buildAnims(outputFolderPath, material.internalName);
        Debug.timeAction("geckoArmoryEntry_buildAnims", new Date().getTime() - now.getTime());
        log(this, `Built animations for ${material.internalName}`);
        now = new Date();
        log(this, `Built geos for ${material.internalName}`);
        await this.buildTextures(outputFolderPath, material, modId);
        Debug.timeAction("geckoArmoryEntry_buildTextures", new Date().getTime() - now.getTime());
        log(this, `Built textures for ${material.internalName}`);
    }

    buildGeos(outputFolderPath: string, materialId: string) {
        const geoFolderPath = path.join(outputFolderPath, "geo");
        for (let geoPath of this.geoPaths) {
            const outputPath = path.join(geoFolderPath, removeNamespace(this.armorId) + ".geo.json");
            if (GeckoArmorArmoryEntry.builtGeos.includes(outputPath)) {
                continue;
            }
            ensureFolderExists(geoFolderPath);
            fs.copyFileSync(geoPath, outputPath);
            GeckoArmorArmoryEntry.builtGeos.push(outputPath);
        }
    }

    buildAnims(outputFolderPath: string, materialId: string) {
        const animFolderPath = path.join(outputFolderPath, "animations");
        for (let animationPath of this.animationPaths) {
            const outputPath = path.join(animFolderPath, removeNamespace(this.armorId) + ".animation.json");
            if (GeckoArmorArmoryEntry.builtAnims.includes(outputPath)) {
                continue;
            }
            ensureFolderExists(animFolderPath);
            fs.copyFileSync(animationPath, outputPath);
            GeckoArmorArmoryEntry.builtAnims.push(outputPath);
        }
    }

    buildModels(outputFolderPath: string, material: Material, modId: string) {
        if (this.builtInAssets) {
            const modelFolderPath = path.join(outputFolderPath, "models/item");
            for (let i = 0; i < this.modelPaths.length; i++) {
                const modelPath = this.modelPaths[i];
                if (!fs.existsSync(modelPath)) {
                    console.warn(this, `Model path ${modelPath} does not exist. Skipping.`);
                    continue;
                }
                const variant = this.variants[i];
                const itemId = this.getId(material.internalName, variant);
                const outputPath = path.join(modelFolderPath, this.getNewFileName(modelPath, variant, itemId) + ".json");
                const fileContent = fs.readFileSync(modelPath, "utf8");
                ensureFolderExists(modelFolderPath);
                fs.writeFileSync(outputPath, fileContent);
            }
        } else {
            const modelFolderPath = path.join(outputFolderPath, "models/item");
            for (let i = 0; i < this.modelPaths.length; i++) {
                const modelPath = this.modelPaths[i];
                const variant = this.variants[i];
                const itemId = this.getId(material.internalName, variant);
                const outputPath = path.join(modelFolderPath, this.getNewFileName(modelPath, variant, itemId) + ".json");
                const fileContent = fs.readFileSync(modelPath, "utf8");
                const fileJson = JSON.parse(fileContent);
                const textures = fileJson.textures;
                const keys = Object.keys(textures);
                for (const key of keys) {
                    if (textures[key].endsWith("_overlay")) {
                        textures[key] = `${modId}:item/${itemId}_overlay`;
                    } else {
                        textures[key] = `${modId}:item/${itemId}`;
                    }
                }
                const newContent = JSON.stringify(fileJson, null, 4);
                ensureFolderExists(modelFolderPath);
                fs.writeFileSync(outputPath, newContent);
            }
        }
    }

    async buildTextures(outputFolderPath: string, material: Material, modId: string) {
        const textureFolderPath = path.join(outputFolderPath, "textures/item");
        for (let i = 0; i < this.variants.length; i++) {
            const variant = this.variants[i];
            const itemId = this.getId(material.internalName, variant);
            const textures = this.textures[variant.id];
            if (!textures) { return ;}
            for (let texture of textures) {
                const outputPath = path.join(textureFolderPath, this.getNewFileName(texture, variant, itemId) + ".png");
                let itemTexture = new ItemTextureWrapper().fromPath(texture);
                await this.processItemTexture(itemTexture, material, textureFolderPath, outputPath);
            }
        }
        if (!this.additionalTextures) { return ;}
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
                    replaceWith: material.color,
                    brightness: material.brightnessBoost !== 0 ? material.brightnessBoost : undefined
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
        // const buffer = await workingTexture.sharpProcess();
        ensureFolderExists(textureFolderPath);
        // fs.writeFileSync(outputPath, buffer);
        const task = {
            work: [workingTexture],
            path: outputPath,
        }
        this.container.textureGenerator.registerWork(task);
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

export class SimpleArmorArmoryEntry extends GeckoArmorArmoryEntry {
    override buildGeos(outputFolderPath: string, materialId: string) {
        // NOOP
    }
}
