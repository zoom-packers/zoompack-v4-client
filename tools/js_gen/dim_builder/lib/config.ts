export class Config {
    private static _instance: Config;
    public static get instance(): Config {
        if (!this._instance) {
            this._instance = new Config();
        }
        return this._instance;
    }

    skipAssets: boolean = false;
}
