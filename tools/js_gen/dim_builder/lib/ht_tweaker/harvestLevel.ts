export class HarvestLevel {
    id: string;
    level: number;
    color: string;
    icons: string[] | undefined;
    nameOverride: string | undefined;
    blocks: HarvestableBlock[] | undefined;
    items: string[] | undefined;

    constructor(id: string, level: number, color: string, icons: string[] | undefined, nameOverride: string | undefined = undefined) {
        this.id = id;
        this.level = level;
        this.color = color;
        this.icons = icons;
        this.nameOverride = nameOverride;
        this.blocks = [];
        this.items = [];
    }

    withBlocks(blocks: HarvestableBlock[]) {
        this.blocks = [...this.blocks, ...blocks];
        return this;
    }

    withBlock(block: HarvestableBlock) {
        this.blocks.push(block);
        return this;
    }

    withItems(items: string[]) {
        this.items = [...this.items, ...items];
        return this;
    }

    withItem(item: string) {
        this.items.push(item);
        return this;
    }

    merge(level: HarvestLevel) {
        this.withBlocks(level.blocks ?? []);
        this.withItems(level.items ?? []);
        return this;
    }
}

export class HarvestableBlock {
    id: string;
    tool: string;

    constructor(id: string, tool: string) {
        this.id = id;
        this.tool = tool;
    }
}
