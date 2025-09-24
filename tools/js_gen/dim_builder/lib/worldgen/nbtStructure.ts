import {SelfWritingJson} from "../selfWritingJson";
import nbt from "prismarine-nbt";
import {ensureFolderExists} from "../utils";
import {
    editNbtEntities,
    editNbtPalette,
    exportNbtEntities, exportNbtLootTables,
    exportNbtPalette,
    readNbtFile, readNbtFromBuffer,
    writeNbtFile
} from "../nbt/util";
import {ResourceLocation} from "../types";
import {STRUCTURE_NBT_REGISTRY} from "../vfs/vfs";

export type ReplaceBlockCommand = { oldBlock: string, newBlock: string };
export type ReplaceEntityCommand = { oldEntity: string, newEntity: string };
export type ReplaceLootTableCommand = { oldLootTable: string, newLootTable: string };


export class NbtStructure extends SelfWritingJson {
    static outputPath = "data/<internalNamespace>/structures/<internalName>.nbt";
    resourceLocation: string;
    data: nbt.NBT;
    type: nbt.NBTFormat;
    replaceBlockCommands: ReplaceBlockCommand[] = [];
    replaceEntityCommands: ReplaceEntityCommand[] = [];
    replaceLootTableCommands: ReplaceLootTableCommand[] = [];

    constructor(name: string = "", namespace: string = "") {
        super(namespace, name, NbtStructure.outputPath);
    }

    async build() {
        if (!this.resourceLocation) {
            throw new Error("No Resource Location Set")
        }
        if (!this.data || !this.type) {
            const fileGetter = await STRUCTURE_NBT_REGISTRY.get(this.resourceLocation);
            const data = await readNbtFromBuffer(fileGetter() as Buffer);
            this.data = data.parsed;
            this.type = data.type;
        }
        for (const command of this.replaceBlockCommands) {
            await editNbtPalette(this.data, command.oldBlock, command.newBlock);
        }
        for (const command of this.replaceEntityCommands) {
            await editNbtEntities(this.data, command.oldEntity, command.newEntity);
        }
    }

    // override fromTemplate(template: SelfWritingJson): this {
    //     throw new Error("NBT StructureDefinition does not support fromTemplate, as it's not a json file")
    // }
    //
    // override fromTemplateJson(json: string): this {
    //     throw new Error("NBT StructureDefinition does not support fromTemplateJson, as it's not a json file")
    // }
    //
    // fromTemplateNbt(path: string) {
    //     this.templatePath = path;
    //     return this;
    // }

    withResourceLocation(resourceLocation: ResourceLocation) {
        this.resourceLocation = resourceLocation;
        return this;
    }

    replaceBlock(command: ReplaceBlockCommand) {
        this.replaceBlockCommands.push(command);
        return this;
    }

    replaceEntity(command: ReplaceEntityCommand) {
        this.replaceEntityCommands.push(command);
        return this;
    }

    replaceLootTable(command: ReplaceLootTableCommand) {
        this.replaceLootTableCommands.push(command);
        return this;
    }

    exportPalette() {
        return exportNbtPalette(this.data);
    }

    exportEntities() {
        return exportNbtEntities(this.data);
    }

    exportLootTables() {
        return exportNbtLootTables(this.data);
    }

    override validate() {
        super.validate();
        if (!this.data) {
            throw new Error(`[${this.constructor.name}]No data set, you need to make sure you're calling fromTemplateNbt() and build()`)
        }
        if (!this.type) {
            throw new Error(`[${this.constructor.name}]No type set, you need to make sure you're calling fromTemplateNbt() and build()`)
        }
    }

    override async writeSelf() {
        this.validate()
        const filePath = this.filePath;
        this.cleanBeforeWrite();
        ensureFolderExists(filePath.substring(0, filePath.lastIndexOf("/")));
        await writeNbtFile(filePath, this.data, this.type);
    }
}
