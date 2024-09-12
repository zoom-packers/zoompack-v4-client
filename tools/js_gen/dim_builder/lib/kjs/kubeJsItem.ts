export class KubeJsItem {
    id: string;
    type?: string;
    displayName: string;
    durability?: number;
    tier?: string;

    constructor() {
    }

    withId(id: string) {
        this.id = id;
        return this;
    }

    withType(type: string) {
        this.type = type;
        return this;
    }

    withDisplayName(displayName: string) {
        this.displayName = displayName;
        return this;
    }

    withDurability(durability: number) {
        this.durability = durability;
        return this;
    }

    withTier(tier: string) {
        this.tier = tier;
        return this;
    }

    toString() {
        let str = `e.create("${this.id}"`;
        if (this.type) {
            str += `, "${this.type}")`;
        } else {
            str += ")";
        }
        str += `.displayName("${this.displayName}")`;
        if (this.durability) {
            str += `.maxDamage(${this.durability})`;
        }
        if (this.tier) {
            str += `.tier("${this.tier}")`;
        }
        return str;
    }
}

export class KubeJSBlock {
    id: string;
    displayName: string;
    requiresTool?: boolean;
    lootTable?: boolean;
    material?: "wood" | "stone" | "gravel" | "grass" | "sand" | "crop" | "glass"

    constructor() {
    }

    withId(id: string) {
        this.id = id;
        return this;
    }

    withDisplayName(displayName: string) {
        this.displayName = displayName;
        return this;
    }

    withRequiresTool(requiresTool: boolean) {
        this.requiresTool = requiresTool;
        return this;
    }

    withLootTable() {
        this.lootTable = true;
        return this;
    }

    withMaterial(material: "wood" | "stone" | "gravel" | "grass" | "sand" | "crop" | "glass") {
        this.material = material;
        return this;
    }

    toString() {
        let str = `e.create("${this.id}")`;
        str += `.displayName("${this.displayName}")`;
        if (this.requiresTool) {
            str += `.requiresTool()`;
        }
        if (this.lootTable) {
            str += `.noDrops()`;
        }
        if (this.material) {
            str += `.${this.material}SoundType()`;
        }
        return str;
    }
}
