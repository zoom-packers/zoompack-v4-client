import {ensureFolderExists, kubejsServerScriptsPath, kubejsStartupScriptsPath} from "../utils";
import fs from "fs";
import {REGISTRATION_TEMPLATE} from "./kubeJsRegistrar";
import {BasicDataHolder} from "../selfWritingJson";
import {PolymorphMaterial} from "../material/PolymorphMaterial";
import {KubeJsGlobalArmory} from "./kubeJsGlobalArmory";

export class KubeJsArmory extends BasicDataHolder<KubeJsArmory>{
    public static readonly TAG_REGISTRATION_TEMPLATE = `
ServerEvents.tags("item" , e => {
{content}
});
`
    private materials: PolymorphMaterial[] = [];

    addMaterial(material: PolymorphMaterial) {
        this.materials.push(material);
    }

    getMaterialRegistrationString(material: PolymorphMaterial) {
        let content = `e.create("${KubeJsGlobalArmory.MOD_ID}:${material.id}").displayName("${material.displayName}").craftingMaterial("${material.craftingMaterial}")`;
        if (material.durability) {
            content += `.durabilityMultiplier(${material.durability})`;
        }
        if (material.harvestLevel) {
            content += `.harvestLevel(${material.harvestLevel})`;
        }
        if (material.harvestSpeed) {
            content += `.harvestSpeed(${material.harvestSpeed})`;
        }
        if (material.baseDamage) {
            content += `.baseDamage(${material.baseDamage})`;
        }
        if (material.baseArmor) {
            content += `.baseArmor(${material.baseArmor})`;
        }
        if (material.baseArmorToughness) {
            content += `.baseArmorToughness(${material.baseArmorToughness})`;
        }
        if (material.baseArmorKnockbackResistance) {
            content += `.baseArmorKnockbackResistance(${material.baseArmorKnockbackResistance})`;
        }
        content += ";";
        return content;
    }

    getMaterialTaggingString(material: PolymorphMaterial) {
        return `e.add("${KubeJsGlobalArmory.MOD_ID}:material", "${material.craftingMaterial}");`;
    }

    writeToFile() {
        this.writeStartupScript();
        this.writeServerScript();
    }

    private writeServerScript() {
        const kjsServerScriptsPath = kubejsServerScriptsPath();
        const folderPath = `${kjsServerScriptsPath}/${this.internalNamespace}`;
        ensureFolderExists(folderPath);
        const serverScriptPath = `${folderPath}/armory.js`;
        const serverScriptContent =
            KubeJsArmory.TAG_REGISTRATION_TEMPLATE.replace("{content}",
                this.materials.map(material => this.getMaterialTaggingString(material)).join("\n"))
        fs.writeFileSync(serverScriptPath, serverScriptContent);
    }

    private writeStartupScript() {
        const kjsStartupScriptsPath = kubejsStartupScriptsPath();
        const folderPath = `${kjsStartupScriptsPath}/${this.internalNamespace}`;
        ensureFolderExists(folderPath);
        const startupScriptPath = `${folderPath}/armory.js`;
        const startupScriptContent =
            REGISTRATION_TEMPLATE.replace("{type}", `"armoryjs:material"`)
                .replace("{content}", this.materials.map(material => this.getMaterialRegistrationString(material)).join("\n"));
        fs.writeFileSync(startupScriptPath, startupScriptContent);
    }

}
