import {BasicDataHolder} from "../selfWritingJson";
import fs from "fs";
import * as ph from "path"
import {Debug} from "../debug";

export class PyTextureGenerator extends BasicDataHolder<PyTextureGenerator> {
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

    writeToFile(){
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
}
