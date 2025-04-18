import {Ore} from "./ore";
import {BasicDataHolder,} from "../selfWritingJson";
import {Armory} from "./armory";
import {log} from "../utils";

import {HarvestLevel} from "../ht_tweaker/harvestLevel";

import {PolymorphMaterial} from "./PolymorphMaterial";
import {IArmory} from "./IArmory";
import {ExistingOre} from "./existingOre";

export class Material extends BasicDataHolder<Material> {
    color: string = "#ffffff";
    brightnessBoost: number = 0;
    ore: Ore;
    existingOre: ExistingOre;
    level: number = 2; // 0 is Wood, 1 is Stone, 2 is Iron, 3 is Diamond, 4 is Netherite, 5 is Custom
    armory: IArmory<Armory | PolymorphMaterial>;

    async build() {
        log(this, "Building Materials");
        if (this.level >= 5) {
            const harvestLevel = new HarvestLevel(this.internalName, this.level, this.color, undefined);
            this.kubeJsContainer.harvestLevelTweaker.withLevel(harvestLevel);
        }
        if (this.ore) {
            this.ore.withBasics(this.rootPath, this.internalNamespace, this.internalName);
            this.ore.setJsContainer(this.kubeJsContainer);
            await this.ore.build(this);
        }
        if (this.existingOre) {
            this.existingOre.rootPath = this.rootPath;
            this.existingOre.setJsContainer(this.kubeJsContainer);
            await this.existingOre.build(this);
        }
        if (this.armory) {
            await this.armory.withNamespace(this.internalNamespace).withName(this.internalName).withMaterial(this).setJsContainer(this.kubeJsContainer).build();
        }
    }

    withOre(ore: Ore): Material {
        this.ore = ore;
        return this;
    }

    withExistingOre(existingOre: ExistingOre): Material {
        this.existingOre = existingOre;
        return this
    }

    withColor(color: string): Material {
        this.color = color;
        return this;
    }

    withBrightnessBoost(brightnessBoost: number): Material {
        this.brightnessBoost = brightnessBoost;
        return this;
    }

    withLevel(level: number): Material {
        this.level = level;
        return this;
    }

    withArmory(armory: IArmory<Armory | PolymorphMaterial>): Material {
        this.armory = armory;
        return this;
    }

    writeSelf() {
        if (this.ore) {
            this.ore.writeSelf();
        }
    }

    validate() {
        if (this.ore) {
            this.ore.validate();
        }
    }
}

