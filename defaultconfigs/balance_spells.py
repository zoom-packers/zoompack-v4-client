file_path = 'irons_spellbooks-server.toml'

lines = []

with open(file_path, 'r') as f:
    lines = f.readlines()

new_lines = []

for line in lines:
    # Write here logic for changes
    # Example to reduce cooldown by 25%
    # if 'CooldownInSeconds' in line:
    #     time_str = line.split('= ')[1].split('\n')[0]
    #     time_float = float(time_str)

    #     new_time_float = round(time_float*0.75,1)
    #     new_time_str = str(new_time_float)

    #     new_lines.append(line.replace(f'= {time_str}',f'= {new_time_str}'))
    # else:
    #     new_lines.append(line)

    # Exmple to reduce spell power multiplier by 30%
    if 'SpellPowerMultiplier' in line:
        spell_m_str = line.split('= ')[1].split('\n')[0]
        spell_m_float = float(spell_m_str)

        new_spell_m_float = round(spell_m_float*0.7,4)
        new_spell_m_str = str(new_spell_m_float)
        new_lines.append(line.replace(f'= {spell_m_str}',f'= {new_spell_m_str}'))
    else:
        new_lines.append(line)

with open(file_path, 'w+') as f:
    f.write(''.join(new_lines))