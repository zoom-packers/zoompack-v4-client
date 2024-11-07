import {KubeJsRegistrar, KubeJsTagger} from "./kubeJsRegistrar";
import {KubeJsRecipes} from "./kubeJsRecipes";
import {BasicDataHolder} from "../selfWritingJson";

import {HarvestLevelTweaker} from "../ht_tweaker/harvestLevelTweaker";
import {KubeJsLoot} from "./kubeJsLoot";
import {KubeJsArmory} from "./kubeJsArmory";

export class KubeJSContainer extends BasicDataHolder<KubeJSContainer> {
    registrar: KubeJsRegistrar;
    recipes: KubeJsRecipes;
    tagger: KubeJsTagger;
    loot: KubeJsLoot;
    armory: KubeJsArmory;
    harvestLevelTweaker: HarvestLevelTweaker;

    constructor() {
        super();
        this.registrar = new KubeJsRegistrar();
        this.recipes = new KubeJsRecipes();
        this.tagger = new KubeJsTagger();
        this.loot = new KubeJsLoot();
        this.armory = new KubeJsArmory();
        this.harvestLevelTweaker = new HarvestLevelTweaker();
    }

    writeFiles() {
        this.registrar.writeToFile();
        this.recipes.writeToFile();
        this.tagger.writeToFile();
        this.loot.writeToFile();
        this.armory.writeToFile();
        this.harvestLevelTweaker.writeToFile();
    }

    withNamespace(namespace: string): KubeJSContainer {
        this.registrar.withNamespace(namespace);
        this.recipes.withNamespace(namespace);
        this.tagger.withNamespace(namespace);
        this.loot.withNamespace(namespace);
        this.armory.withNamespace(namespace);
        this.harvestLevelTweaker.withNamespace(namespace);
        return super.withNamespace(namespace);
    }
}
