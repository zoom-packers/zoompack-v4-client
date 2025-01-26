// Given a random string as a seed, create a deterministic UUID v5 from scratch, without using any external libraries.

export function createUuid(seed: string): string {
    const namespace = "1b671a64-40d5-491e-99b0-da01ff1f3341";
    const hash = require("crypto").createHash("sha1");
    hash.update(namespace + seed);
    const hex = hash.digest("hex");
    return [
        hex.substr(0, 8),
        hex.substr(8, 4),
        "5" + hex.substr(13, 3),
        hex.substr(16, 4),
        hex.substr(20, 12),
    ].join("-");
}
