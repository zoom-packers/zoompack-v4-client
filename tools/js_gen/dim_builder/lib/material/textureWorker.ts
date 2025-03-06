import { parentPort, workerData } from 'worker_threads';
import { combine } from '../textureGen/util';
import {WorkingTexture} from "../textureGen/workingTexture";
import * as ph from "path"

async function processTexture() {
    const { work, path, workingDir } = workerData.task as {work: WorkingTexture[],path: string, workingDir: string}
    const cwd = process.cwd();
    work.forEach(x => x.path = ph.join(cwd, x.path));
    const texture = await combine(work);
    await texture.toFile(path);
}

async function main() {
    await processTexture()
        .then(() => parentPort.postMessage('Done'))
        .catch(err => parentPort.postMessage({error: err.message}));
}

main();
