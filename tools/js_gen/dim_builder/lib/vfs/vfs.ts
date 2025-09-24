import path from "path";
import {ensureCacheFolder, extractJarToCache, getModData, isModCached} from "../jar_util";
import {cachePath} from "../utils";
import {RegistryLoader} from "./registryLoader";

export type ResourceLocation = string;


export type FileGetter = () => string | Buffer;
