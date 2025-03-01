SEPARATOR = '[CHAT] - '
with open('logs/latest.log') as f:
    log_file = f.read()
    registry_part = log_file.split('[CHAT] List of all entries for registry minecraft:item:')[1].split(' [Render thread/INFO] [net.minecraft.client.gui.components.ChatComponent/]: [CHAT] Total: ')[0]
    
    lines = []

    for line in registry_part.split('\n'):
        if SEPARATOR in line:
            lines.append(line.split(SEPARATOR)[1])
    
    with open('generated_item_registry', 'w+') as new_file:
        for line in lines:
            new_file.write(f'{line}\n')