// @ts-ignore
import fs from "fs";
import {ensureFolderExists, paxiDatapacksPath} from "./utils";
import {KubeJSContainer} from "./kjs/kubeJSContainer";

export interface IBasicDataHolder<T> {
    internalName: string;
    internalNamespace: string;
    kubeJsContainer: KubeJSContainer;

    withName(name: string): T;
    withNamespace(namespace: string): T;
    setJsContainer(jsRegistrar: KubeJSContainer): T;
    afterBuild?(): void;
}

export abstract class BasicDataHolder<T> implements IBasicDataHolder<T> {
    rootPath: string;
    internalName = "";
    internalNamespace = "";
    kubeJsContainer: KubeJSContainer;

    withName(name: string): T {
        this.internalName = name;
        return this as any as T;
    }

    withNamespace(namespace: string): T {
        this.internalNamespace = namespace;
        return this as any as T;
    }

    withBasics(rootPath: string, namespace: string, name: string): T {
        this.rootPath = rootPath;
        this.internalNamespace = namespace;
        this.internalName = name;
        return this as any as T;
    }

    setJsContainer(jsRegistrar: KubeJSContainer): T {
        this.kubeJsContainer = jsRegistrar;
        return this as any as T;
    }
}

export class SelfWritingJson implements IBasicDataHolder<SelfWritingJson> {
    static AUTO_FILL = "autofilled";
    internalName = "";
    internalNamespace: string;
    template: string;
    filePath: string;
    kubeJsContainer: KubeJSContainer;

    constructor(namespace: string, name: string, template: string) {
        this.internalNamespace = namespace;
        this.internalName = name;
        this.template = template;
        this.updateFilePath();
    }


    withName(name: string) {
        this.internalName = name;
        this.updateFilePath();
        return this;
    }

    withNamespace(namespace: string) {
        this.internalNamespace = namespace;
        this.updateFilePath();
        return this;
    }

    protected updateFilePath() {
        this.filePath = `${paxiDatapacksPath()}/${this.internalNamespace}/${this.template.replace("<internalNamespace>", this.internalNamespace).replace("<internalName>", this.internalName)}`;
    }

    fromTemplateJson(json: string) {
        const data = JSON.parse(json) as any;
        const name = this.internalName
        const ownKeys = Object.keys(this);
        const baseKeys = Object.keys(new SelfWritingJson("", "", ""));
        for (const ownKey of ownKeys) {
            // @ts-ignore
            if (!baseKeys.includes(ownKey)) {
                this[ownKey] = undefined;
            }
        }
        const templateKeys = Object.keys(data);
        for (const templateKey of templateKeys) {
            this[templateKey] = data[templateKey];
        }
        this.internalName = name;
        return this;
    }

    fromTemplate(template: SelfWritingJson) {
        const ownKeys = Object.keys(this);
        const baseKeys = Object.keys(new SelfWritingJson("", "", ""));
        for (const ownKey of ownKeys) {
            // @ts-ignore
            if (!baseKeys.includes(ownKey)) {
                this[ownKey] = undefined;
            }
        }
        const templateKeys = Object.keys(template);
        for (const templateKey of templateKeys) {
            this[templateKey] = template[templateKey];
        }
        return this;
    }

    setJsContainer(jsRegistrar: KubeJSContainer): SelfWritingJson {
        this.kubeJsContainer = jsRegistrar;
        return this;
    }

    validate() {
        if (this.internalName === SelfWritingJson.AUTO_FILL || this.internalName === "") {
            throw new Error("[NAME] Cannot write autofilled json, " + this.filePath);
        }
        if (this.internalNamespace === SelfWritingJson.AUTO_FILL || this.internalNamespace === "") {
            throw new Error("[NAMESPACE] Cannot write autofilled json, " + this.filePath);
        }
    }

    async writeSelf() {
        this.validate()
        const filePath = this.filePath;
        this.cleanBeforeWrite();
        const data = JSON.stringify(this, null, 4);
        ensureFolderExists(filePath.substring(0, filePath.lastIndexOf("/")));
        fs.writeFileSync(filePath, data);
    }

    cleanBeforeWrite() {
        delete this.kubeJsContainer;
        delete this.filePath;
        delete this.template;
        delete this.internalNamespace;
        delete this.internalName;
    }
}
