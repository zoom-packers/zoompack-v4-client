
function printDialogueOverlay(player, speaker, text, renderType, renderTarget) {
    // Max X Offset (This is where the dialogue will be after the fade-in animation)
    const MaxX = 5;
    // Min X Offset (This is where the dialogue will fade-in from and fade-out to)
    const MinX = -100;
    // Display time (in seconds)
    const DisplayDuration = 5;
    // The overall Y Offset
    const YOffset = 85;

    // Everything handling animation data
    const animation = player.getPersistentData().get("DialogueAnimation");
    const currentX = animation[1];
    const currentTick = animation[0];
    const lastCharLimit = animation[2];
    const displayTime = animation[3];

    let displayText = text;

    if (currentX < MaxX && displayTime == 0) {
        // Do Fade in Animation
        if (currentTick >= 1) {
            player.persistentData.put('DialogueAnimation', [0, currentX + 15, lastCharLimit, displayTime]);
        } else {
            player.persistentData.put('DialogueAnimation', [currentTick + 1, currentX, lastCharLimit, displayTime]);
        }
        displayText = '';
        speaker = '';
    } else {
        //
        // ANIMATION COMPLETE >> WRITE DIALOGUE TEXT
        //
        if (lastCharLimit < text.length) {
            // Start Writing Text
            if (currentTick >= 1) {
                player.persistentData.put('DialogueAnimation', [0, MaxX, lastCharLimit + 2, displayTime]);
            } else {
                player.persistentData.put('DialogueAnimation', [currentTick + 1, MaxX, lastCharLimit, displayTime]);
            }
            displayText = text.substring(0, lastCharLimit);
        } else {
            //
            // DIALOGUE TEXT COMPLETE >> SHOW FOR 5 SECONDS
            //
            if (displayTime < DisplayDuration) {
                // Every 1 second
                if (currentTick >= 20) {
                    player.persistentData.put('DialogueAnimation', [0, MaxX, lastCharLimit, displayTime + 1]);
                } else {
                    player.persistentData.put('DialogueAnimation', [currentTick + 1, MaxX, lastCharLimit, displayTime]);
                }
            } else {
                //
                // WAIT IS OVER >> ANIMATE OUT
                //
                if (currentX > MinX) {
                    if (currentTick >= 1) {
                        player.persistentData.put('DialogueAnimation', [0, currentX - 10, lastCharLimit, displayTime]);
                    } else {
                        player.persistentData.put('DialogueAnimation', [currentTick + 1, currentX, lastCharLimit, displayTime]);
                    }
                } else {
                    // CLOSE THE MENU
                    player.persistentData.remove('DialogueAnimation');
                    player.persistentData.remove('DialogueSpeaker');
                    return;
                }
            }
        }
    }

    const rootX = currentX;
    const rootY = YOffset;

    let speakerData = {
            type: 'item',
            item: 'minecraft:player_head', 
            x: rootX + 32,
            y: rootY + 32,
            w: 64,
            h: 64,
            alignX: 'left',
            alignY: 'top',
            draw: 'ingame'
    }

    if(renderType=='item' && renderTarget){
        speakerData = {
                type: 'item',
                item: renderTarget, 
                x: rootX + 32,
                y: rootY + 32,
                w: 58,
                h: 58,
                alignX: 'left',
                alignY: 'top',
                draw: 'ingame'
        }
    }
    
    if(renderType=='atlas_texture' && renderTarget){
        speakerData = {
                type: 'atlas_texture',
                texture: renderTarget, 
                x: rootX + 4,
                y: rootY + 4,
                w: 56,
                h: 56,
                alignX: 'left',
                alignY: 'top',
                draw: 'ingame'
        }
    }
    
    if(renderType=='rectangle' && renderTarget){
        speakerData = {
                type: 'rectangle',
                texture: renderTarget,
                x: rootX + 4,
                y: rootY + 4,
                w: 56,
                h: 56,
                alignX: 'left',
                alignY: 'top',
                draw: 'ingame'
        }
    }

    player.paint({ '*': { remove: true } });
    player.paint({
        radioBG: {
            type: 'rectangle',
            x: rootX,
            y: rootY,
            w: 64,
            h: 64,
            color: '#FFFFFF',
            texture: 'kubejs:textures/gui/dialogue_overlay.png',
            alignX: 'left',
            alignY: 'top',
            draw: 'ingame'
        },
        speaker: speakerData,
        radioDialogue: {
            type: 'rectangle',
            x: rootX + 66,
            y: rootY,
            w: 140,
            h: 64,
            color: '#FFFFFF',
            texture: 'kubejs:textures/gui/dialogue_overlay_dialoguebox.png',
            alignX: 'left',
            alignY: 'top',
            draw: 'ingame'
        },
        dialogueSpeaker: {
            type: 'text',
            text: speaker,
            scale: 0.8,
            x: rootX + 71,
            y: rootY + 5,
            alignX: 'left',
            alignY: 'top',
            draw: 'ingame'
        },
        // 28 chars
        dialogueText: {
            type: 'text',
            textLines: splitStringToLines(displayText, 34),
            scale: 0.8,
            x: rootX + 71,
            y: rootY + 25,
            alignX: 'left',
            alignY: 'top',
            draw: 'ingame'
        }
    });
}

function splitStringToLines(inputString, maxLineLength) {
    let result = [];
    let words = inputString.split(' ');
    let currentLine = '';

    for (let word of words) {
        if ((currentLine + word).length <= maxLineLength) {
            currentLine += (currentLine ? ' ' : '') + word;
        } else {
            result.push(currentLine);
            currentLine = word;
        }
    }
    if (currentLine) {
        result.push(currentLine);
    }
    return result;
}