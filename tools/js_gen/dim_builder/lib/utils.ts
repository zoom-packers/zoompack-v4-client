// @ts-ignore
import fs from "fs";
// @ts-ignore
import path from "path";
import {loadTextFromMod} from "./jar_util";
import stripJsonComments from "strip-json-comments";

export function hexToMinecraftColor(hex: string): number {
    const rgb = hexToRGB(hex);
    return rgb.r * 65536 + rgb.g * 256 + rgb.b;
}

export function hexToRGB(hex: string): { r: number, g: number, b: number } {
    const hexString = hex.replace("#", "");
    return {
        r: parseInt(hexString.substring(0, 2), 16),
        g: parseInt(hexString.substring(2, 4), 16),
        b: parseInt(hexString.substring(4, 6), 16)
    }
}

export function hsvToRgb(h: number, s: number, v: number): {r: number, g: number, b: number} {
    let r, g, b;
    let i = Math.floor(h * 6);
    let f = h * 6 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            r = v, g = t, b = p;
            break;
        case 1:
            r = q, g = v, b = p;
            break;
        case 2:
            r = p, g = v, b = t;
            break;
        case 3:
            r = p, g = q, b = v;
            break;
        case 4:
            r = t, g = p, b = v;
            break;
        case 5:
            r = v, g = p, b = q;
            break;
    }
    return {r: r * 255, g: g * 255, b: b * 255};
}

export function rgbToHsv(r: number, g: number, b: number): {h: number, s: number, v: number} {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;
    const d = max - min;
    s = max === 0 ? 0 : d / max;
    if (max === min) {
        h = 0;
    } else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return {h, s, v};
}

export async function loadJsonFromPath(path: string): Promise<any> {
    if (path.startsWith("jar:")) {
        const split = path.split(":");
        const modId = split[1];
        const pathInJar = split[2];
        const data = await loadTextFromMod(modId, pathInJar);
        return JSON.parse(stripJsonComments(data));
    }
    return JSON.parse(stripJsonComments(fs.readFileSync(path, "utf8")));
}

export function removeNamespace(id: string): string {
    const split = id.split(':');
    return split[split.length - 1];
}

export function rootPath() {
    // @ts-ignore
    return navigateUpUntilTargetFolder('tools', __dirname);
}

export function cachePath() {
    const root = rootPath();
    return path.join(root, '.cache');
}

export function paxiPath() {
    const root = rootPath();
    return path.join(root, 'config', 'paxi');
}

export function paxiDatapacksPath() {
    return path.join(paxiPath(), 'datapacks');
}

export function paxiResourcepacksPath() {
    return path.join(paxiPath(), 'resourcepacks');
}

export function kubejsPath() {
    return path.join(rootPath(), 'kubejs');
}

export function kubejsAssetsPath() {
    return path.join(kubejsPath(), 'assets');
}

/**
 * @deprecated
 */
export function kubejsDataPath() {
    return path.join(kubejsPath(), 'data');
}

export function kubejsClientScriptsPath() {
    return path.join(kubejsPath(), 'client_scripts');
}

export function kubejsServerScriptsPath() {
    return path.join(kubejsPath(), 'server_scripts');
}

export function kubejsStartupScriptsPath() {
    return path.join(kubejsPath(), 'startup_scripts');
}


export function ensureFolderExists(path) {
    let folders = path.split("/");
    let currentPath = "";
    folders.forEach((folder) => {
        currentPath += folder + "/";
        if (!fs.existsSync(currentPath)) {
            fs.mkdirSync(currentPath);
        }
    });
}


export function idToDisplayName(id: string): string {
    const split = id.split(':');
    const itemId = split[split.length - 1];
    const words = itemId.split('_');
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export function navigateUpUntilTargetFolder(targetFolderName: string, currentPath: string) {
    let jarPrefix: string = "";
    if (currentPath.startsWith("jar:")) {
        const split = currentPath.split(":");
        const lastFolder = split[split.length - 1];
        currentPath = lastFolder;
        jarPrefix = split[0] + ":" + split[1] + ":";
    }
    const separator = path.sep;
    currentPath = path.join(currentPath);
    const split = currentPath.split(separator);
    for (let i = split.length - 1; i >= 0; i--) {
        const lastFolder = split[i];
        if (lastFolder === targetFolderName) {
            const result = path.join(split.slice(0, i).join(separator));
            return jarPrefix + result;
        }
    }
    throw new Error(`Could not find ${targetFolderName} in path ${currentPath}`);
}

export function log(type: Object, message: string) {
    console.log(`[${type.constructor.name}] ${message}`);
}

export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function replaceStringPropertyRecursive(obj: any, stringToReplace: string, replacement: string) {
    for (const key in obj) {
        // Check for Objects, Arrays and Strings
        if (typeof obj[key] === 'object') {
            replaceStringPropertyRecursive(obj[key], stringToReplace, replacement);
        } else if (typeof obj[key] === 'string') {
            obj[key] = obj[key].replace(stringToReplace, replacement);
        } else if (Array.isArray(obj[key])) {
            obj[key].forEach((element: any) => {
                replaceStringPropertyRecursive(element, stringToReplace, replacement);
            });
        }
    }
}

export function readScriptTemplate(fileName: string): string {
    // @ts-ignore
    return fs.readFileSync(path.join(__dirname, `../script_templates/${fileName}`), 'utf8');
}
