const {WorkingTexture, combine} = require('../../utils/texture_util');

const handle = new WorkingTexture().withPath("./assets/textures/handle_sword.png")
const swordBody = new WorkingTexture().withPath("./assets/textures/sword_body.png").withTint("#FF0000")

async function main() {
    const texture = await combine([handle, swordBody]);
    texture.toFile("./assets/textures/output.png");
}

main();
