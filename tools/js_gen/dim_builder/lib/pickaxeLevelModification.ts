import {VanillaModification} from "./vanillaModification";

export class PickaxeLevelModification extends VanillaModification {
    itemId: string;
    level: number;

    constructor(itemId: string, level: number) {
        super();
        this.itemId = itemId;
        this.level = level;
    }

    async build() {
        this.kubeJsContainer.harvestLevelTweaker.withItem(this.itemId, this.level);
    }
}
