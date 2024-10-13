lines = []

with open('registrar.js', 'r') as f:
    lines = f.readlines()

with open('registrar.js', 'w+') as f:
    for line in lines:
        if 'zoomers_armory' in line and '_staff"' in line:
            f.write(line.replace(""", "sword").displayName""", """, "irons_spells_js:staff").displayName"""))
        else:
            f.write(line)
