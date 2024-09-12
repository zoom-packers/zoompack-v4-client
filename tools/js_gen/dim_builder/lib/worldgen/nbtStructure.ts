import {SelfWritingJson} from "../selfWritingJson";
import nbt from "prismarine-nbt";
import {ensureFolderExists} from "../utils";
import {
    editNbtEntities,
    editNbtPalette,
    exportNbtEntities,
    exportNbtPalette,
    readNbtFile,
    writeNbtFile
} from "../nbt/util";

export type ReplaceBlockCommand = { oldBlock: string, newBlock: string };
export type ReplaceEntityCommand = { oldEntity: string, newEntity: string };


export class NbtStructure extends SelfWritingJson {
    static outputPath = "data/<internalNamespace>/structures/<internalName>.nbt";
    templatePath: string;
    data: nbt.NBT;
    type: nbt.NBTFormat;
    replaceBlockCommands: ReplaceBlockCommand[] = [];
    replaceEntityCommands: ReplaceEntityCommand[] = [];

    constructor(name: string = "", namespace: string = "") {
        super(namespace, name, NbtStructure.outputPath);
    }

    async build() {
        if (!this.templatePath) {
            throw new Error("No template path set")
        }
        if (!this.data || !this.type) {
            const data = await readNbtFile(this.templatePath);
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

    override fromTemplate(template: SelfWritingJson): this {
        throw new Error("NBT StructureDefinition does not support fromTemplate, as it's not a json file")
    }

    override fromTemplateJson(json: string): this {
        throw new Error("NBT StructureDefinition does not support fromTemplateJson, as it's not a json file")
    }

    fromTemplateNbt(path: string) {
        this.templatePath = path;
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

    exportPalette() {
        return exportNbtPalette(this.data);
    }

    exportEntities() {
        return exportNbtEntities(this.data);
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
