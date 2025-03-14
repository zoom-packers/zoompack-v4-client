import {BasicDataHolder} from "../selfWritingJson";
import {HarvestableBlock, HarvestLevel} from "./harvestLevel";
import {ensureFolderExists, kubejsAssetsPath, log, paxiDatapacksPath} from "../utils";
import {
    addItemHarvestLevelOverride, createDatapackForToolType, createFGDatapackForLevel,
    createHLDatapackForLevel, createMCDatapackForLevel,
    createNewLevel,
    loadItemHarvestLevelOverrides,
    saveItemHarvestLevelOverrides
} from "./util";
import fs from "fs";

export class HarvestLevelTweaker extends BasicDataHolder<HarvestLevelTweaker> {
    static minecraftLevels = [
        new HarvestLevel("wood", 0, "#a3a3a3", undefined, "Wooden"),
        new HarvestLevel("stone", 1, "#a3a3a3", undefined, "Stone"),
        new HarvestLevel("iron", 2, "#a3a3a3", undefined, "Iron"),
        new HarvestLevel("diamond", 3, "#a3a3a3", undefined, "Diamond"),
        new HarvestLevel("netherite", 4, "#a3a3a3", undefined, "Netherite")
    ]
    levels: HarvestLevel[] = [...HarvestLevelTweaker.minecraftLevels];

    withLevel(level: HarvestLevel) {
        if (level.level === 4) {
            // Override Netherite Level
            this.levels[4].nameOverride = level.nameOverride;
            this.levels[4].color = level.color;
            this.levels[4].icons = level.icons;
        }
        if (this.levels.find(l => l.id === level.id || l.level === level.level)) {
            log(this, `Level with id ${level.id} already exists, merging...`);
            this.levels.find(l => l.id === level.id)?.merge(level);
            return this;
        }
        this.levels.push(level);
        return this;
    }

    withItem(itemId: string, levelId: string | number) {
        if (typeof levelId === "string") {
            this.levels.find(l => l.id === levelId)?.withItem(itemId);
            return this;
        } else {
            this.levels.find(l => l.level === levelId)?.withItem(itemId);
            return this;
        }
        return this;
    }

    withBlock(blockId: string, level: string | number, tool: string) {
        if (typeof level === "string") {
            this.levels.find(l => l.id === level)?.withBlock(new HarvestableBlock(blockId, tool));
            return this;
        } else {
            this.levels.find(l => l.level === level)?.withBlock(new HarvestableBlock(blockId, tool));
            return this;
        }
        return this;
    }

    writeToFile() {
        const datapacksPath = paxiDatapacksPath();
        const overrides = loadItemHarvestLevelOverrides();
        for (const level of this.levels) {
            // @ts-ignore
            if (!HarvestLevelTweaker.minecraftLevels.includes(level)) {
                createNewLevel(level.id, level.level, level.color, level.icons);
            }
            this.createDatapack(level, datapacksPath);
            for (const item of level.items) {
                // @ts-ignore
                if (HarvestLevelTweaker.minecraftLevels.includes(level)) {
                    addItemHarvestLevelOverride(overrides, item, `minecraft:${level.id}`);
                } else {
                    addItemHarvestLevelOverride(overrides, item, level.id);
                }
            }
        }
        saveItemHarvestLevelOverrides(overrides);

        // @ts-ignore
        const allBlocks = this.levels.map(l => l.blocks).flat();
        const allTypes = ["pickaxe", "axe", "shovel", "hoe"];
        allTypes.forEach(type => {
            const blockIds = allBlocks.filter(b => b.tool === type).map(b => b.id);
            createDatapackForToolType(`${datapacksPath}/${this.internalNamespace}`, type, blockIds);
        });

        this.createLangFile();
    }

    private createLangFile() {
        const assetsPath = kubejsAssetsPath();
        const folderPath = `${assetsPath}/${this.internalNamespace}/lang`;
        ensureFolderExists(folderPath);
        const langPath = `${folderPath}/en_us.json`;
        const lang = {};
        for (const level of this.levels) {
            if (level.level >= 5) {
                lang[`text.hltweaker.level.${level.id}`] = level.nameOverride ?? level.id;
            } else {
                lang[`text.hltweaker.level.minecraft.${level.id}`] = level.nameOverride ?? level.id;
            }
        }
        const langFile = fs.existsSync(langPath) ? JSON.parse(fs.readFileSync(langPath, "utf-8")) : {};
        fs.writeFileSync(langPath, JSON.stringify({...langFile, ...lang}, null, 4));
    }

    private createDatapack(level: HarvestLevel, datapacksPath) {
        // Custom levels are provided by Harvest Level Tweaker
        // Stone, Iron & Diamond levels are provided by Minecraft
        // Wooden/Gold & Netherite levels are provided by Forge
        // It is what it is

        if (level.blocks.length === 0) {
            log(this, `Level ${level.id} has no blocks, skipping datapack creation`);
            return;
        }

        if (level.level >= 5) {
            createHLDatapackForLevel(`${datapacksPath}/${this.internalNamespace}`, level.id, level.blocks.map(b => b.id));
        }
        // @ts-ignore
        else if ([1, 2, 3].includes(level.level)) {
            createMCDatapackForLevel(`${datapacksPath}/${this.internalNamespace}`, level.id, level.blocks.map(b => b.id));
        } else {
            createFGDatapackForLevel(`${datapacksPath}/${this.internalNamespace}`, level.id, level.blocks.map(b => b.id));
        }
    }
}
