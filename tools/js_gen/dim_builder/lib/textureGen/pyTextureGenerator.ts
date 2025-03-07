import {BasicDataHolder} from "../selfWritingJson";
import fs from "fs";
import * as ph from "path"
import {Debug} from "../debug";
import {combine} from "./util";

export class PyTextureGenerator extends BasicDataHolder<PyTextureGenerator> {
    static enabled = false;
    workData: any[] = [];

    registerWork(work: any) {
        this.workData.push(work);
    }

    registerWorkMultiple(works: any[]) {
        for (const work of works) {
            work.path = ph.join(work.path)
        }
        this.workData = this.workData.concat(works);
    }

    async writeToFile(){
        if (PyTextureGenerator.enabled) {
            this.offloadToPython();
        } else {
            await this.continueWithJs();
        }
    }

    private offloadToPython() {
        const filePath = './tex_gen.json';
        const fileContent = JSON.stringify(this.workData);
        fs.writeFileSync(filePath, fileContent);

        const childProcess = require('child_process');
        const pythonScriptPath = './texture_processor.py';
        const isWindows = process.platform === 'win32';
        const pythonCommand = isWindows ? 'python' : 'python3';
        const command = `${pythonCommand} ${pythonScriptPath}`;
        const now = new Date();
        Debug.logAction("Starting Python Texture Generation");
        childProcess.execSync(command, {maxBuffer: Number.MAX_VALUE}, (error: any, stdout: any, stderr: any) => {
            if (error) {
                console.error(`Error executing Python script: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Python script error: ${stderr}`);
                return;
            }
            console.log(`Python script executed successfully!`);
        });
        Debug.timeAction("Python Texture Generation", new Date().getTime() - now.getTime());
    }

    private async continueWithJs() {
        Debug.logAction("Continuing with JS Texture Generation");
        let now = new Date();
        const results = await Promise.all(this.workData.map(a => combine(a.work)));
        const finalPromises = [];
        for (let i = 0; i < this.workData.length; i++) {
            const path = this.workData[i].path;
            const result = results[i];
            finalPromises.push(result.toFile(path));
        }
        Debug.timeAction("JS Texture Generation - work", new Date().getTime() - now.getTime());
        now = new Date();
        await Promise.all(finalPromises);
        Debug.timeAction("JS Texture Generation - fs", new Date().getTime() - now.getTime());
    }
}
