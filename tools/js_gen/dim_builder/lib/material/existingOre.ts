import {BasicDataHolder} from "../selfWritingJson";
import {VARIANTS} from "./oreFeatureConfiguration";
import {Material} from "./material";

export class ExistingOre extends BasicDataHolder<ExistingOre> {
    miningLevel: number = 2;
    variants: VARIANTS[] = [];
    material: Material;

    constructor(modId: string, internalName: string) {
        super();
        this.withNamespace(modId);
        this.withName(internalName);
    }

    withMiningLevel(number: number) {
        this.miningLevel = number;
        return this;
    }

    withVariant(variant: VARIANTS) {
        this.variants.push(variant);
        return this;
    }

    withVariants(variants: VARIANTS[]) {
        this.variants = [...this.variants, ...variants];
        return this;
    }

    async build(material: Material) {
        this.material = material;
        this.buildHarvestLevelTweaker();
        return this;
    }

    protected buildHarvestLevelTweaker() {
        for (const variant of this.variants) {
            const blockId = this.getBlockId(variant);
            this.kubeJsContainer.harvestLevelTweaker.withBlock(blockId, this.miningLevel, "pickaxe");
        }
    }

    protected getBlockId(variant: VARIANTS) {
        let processedVariant: string = variant;
        if (variant === VARIANTS.STONE) {
            processedVariant = "";
        }
        let blockId = `${processedVariant.toLowerCase()}_${this.internalName}_ore`;
        if (variant === VARIANTS.BLOCK) {
            blockId = blockId.substring(0, blockId.length - 4);
        }
        blockId = blockId.replace("__", "_");
        // @ts-ignore
        if (blockId.startsWith("_")) {
            blockId = blockId.substring(1);
        }
        blockId = `${this.internalNamespace}:${blockId}`;
        return blockId;
    }
}
