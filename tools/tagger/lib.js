import {kubejsDataPath, paxiDatapacksPath} from "../js_gen/utils/path_util.js";
import path from "path";
import {ensureDirSync} from "../sync_util.js";
import fs from "fs";

export function createTag(tag, tagType, items) {
    const tagSplit = tag.split(':');
    const tagNamespace = tagSplit[0];
    const tagName = tagSplit[1];
    const folder = path.join(paxiDatapacksPath(), 'origins_medieval_edits', 'data', tagNamespace, 'tags', tagType);
    ensureDirSync(folder);
    const filePath = path.join(folder, `${tagName}.json`);
    const json = JSON.stringify({
        replace: false,
        values: [...items]
    }, null, 4);
    fs.writeFileSync(filePath, json, "utf8");
}

export function getAllItems() {
    const itemDumpPath = path.join('..', 'configs', 'item_registry_dump');
    const fileContents = fs.readFileSync(itemDumpPath, "utf8");
    return fileContents.split('\r\n');
}

