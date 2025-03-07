import {BasicDataHolder} from "../selfWritingJson";
import {addItemToCia, CiaEntry, getCiaPath} from "./util";
import fs from "fs";

export class CiaProcessor extends BasicDataHolder<CiaProcessor> {
    entries: CiaEntry[] = [];

    registerCiaEntry(entry: CiaEntry) {
        this.entries.push(entry);
    }

    registerCiaEntries(entries: CiaEntry[]) {
        this.entries = this.entries.concat(entries);
    }

    writeToFile() {
        const content = fs.readFileSync(getCiaPath(), 'utf-8');
        const data = JSON.parse(content);
        for (const entry of this.entries) {
            addItemToCia(data, entry);
        }

        fs.writeFileSync(getCiaPath(), JSON.stringify(data, null, 4), "utf-8");
    }
}
