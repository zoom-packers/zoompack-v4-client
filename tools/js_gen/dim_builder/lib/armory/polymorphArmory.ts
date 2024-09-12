import {PolymorphArmoryVariants} from "./polymorphArmoryVariants";
import {KubeJsGlobalArmory} from "../kjs/kubeJsGlobalArmory";

export class PolymorphArmory {
    private static _instance: PolymorphArmory;
    public static get INSTANCE(): PolymorphArmory {
        if (this._instance == null) {
            this._instance = new PolymorphArmory();
        }
        return this._instance;
    }

    public writeArmory() {
        PolymorphArmoryVariants.SWORDS.forEach(sword => { KubeJsGlobalArmory.INSTANCE.addSword(sword); });
        PolymorphArmoryVariants.SHIELDS.forEach(shield => { KubeJsGlobalArmory.INSTANCE.addShield(shield); });
        PolymorphArmoryVariants.ARMORS.forEach(armor => { KubeJsGlobalArmory.INSTANCE.addArmor(armor); });
        PolymorphArmoryVariants.BOWS.forEach(bow => { KubeJsGlobalArmory.INSTANCE.addBow(bow); });
        PolymorphArmoryVariants.CROSSBOWS.forEach(crossbow => { KubeJsGlobalArmory.INSTANCE.addCrossbow(crossbow); });
        PolymorphArmoryVariants.TOOLS.forEach(tool => { KubeJsGlobalArmory.INSTANCE.addTool(tool); });

        KubeJsGlobalArmory.INSTANCE.writeToFile();
    }

}

