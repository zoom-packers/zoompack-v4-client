import {KubeJsRegistrar, KubeJsTagger} from "./kubeJsRegistrar";
import {KubeJsRecipes} from "./kubeJsRecipes";
import {BasicDataHolder} from "../selfWritingJson";

import {HarvestLevelTweaker} from "../ht_tweaker/harvestLevelTweaker";
import {KubeJsLoot} from "./kubeJsLoot";
import {KubeJsArmory} from "./kubeJsArmory";
import {PyTextureGenerator} from "../textureGen/pyTextureGenerator";
import {CiaProcessor} from "../cia/CiaProcessor";

export class KubeJSContainer extends BasicDataHolder<KubeJSContainer> {
    registrar: KubeJsRegistrar;
    recipes: KubeJsRecipes;
    tagger: KubeJsTagger;
    loot: KubeJsLoot;
    armory: KubeJsArmory;
    harvestLevelTweaker: HarvestLevelTweaker;
    textureGenerator: PyTextureGenerator;
    ciaProcessor: CiaProcessor;

    constructor() {
        super();
        this.registrar = new KubeJsRegistrar();
        this.recipes = new KubeJsRecipes();
        this.tagger = new KubeJsTagger();
        this.loot = new KubeJsLoot();
        this.armory = new KubeJsArmory();
        this.harvestLevelTweaker = new HarvestLevelTweaker();
        this.textureGenerator = new PyTextureGenerator();
        this.ciaProcessor = new CiaProcessor();
    }

    async writeFiles() {
        this.registrar.writeToFile();
        this.recipes.writeToFile();
        this.tagger.writeToFile();
        this.loot.writeToFile();
        this.armory.writeToFile();
        this.harvestLevelTweaker.writeToFile();
        await this.textureGenerator.writeToFile();
        this.ciaProcessor.writeToFile();
    }

    withNamespace(namespace: string): KubeJSContainer {
        this.registrar.withNamespace(namespace);
        this.recipes.withNamespace(namespace);
        this.tagger.withNamespace(namespace);
        this.loot.withNamespace(namespace);
        this.armory.withNamespace(namespace);
        this.harvestLevelTweaker.withNamespace(namespace);
        this.textureGenerator.withNamespace(namespace);
        this.ciaProcessor.withNamespace(namespace);
        return super.withNamespace(namespace);
    }
}
