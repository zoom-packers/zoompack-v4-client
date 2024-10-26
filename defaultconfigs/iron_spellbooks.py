# pip install toml
# This script converts the iron spells toml into a dictionary for kjs to use an prevent players from using spells
# that also prevents players from casting spells with lvl bigger than limitation from config

import toml
import json

MAGIC_KJS_SCRIPT_PATH = '../kubejs/server_scripts/magic_patch.js'

def get_toml_file_content_as_dict(toml_file_path):
    data = ""
    with open(toml_file_path, 'r') as f:
        data = toml.load(f)
    return data

def dict_to_json_string(data):
    return json.dumps(data, indent=None, separators=(',', ':'))

def set_first_line(file_path, text):
    try:
        with open(file_path, 'r') as file:
            lines = file.readlines()
        
        lines[0] = text + '\n'
        
        with open(file_path, 'w') as file:
            file.writelines(lines)
    
    except Exception as e:
        print(f"Error: {e}")

iron_spells_toml_dict = get_toml_file_content_as_dict('irons_spellbooks-server.toml')
iron_spells_json = dict_to_json_string(iron_spells_toml_dict)
set_first_line(MAGIC_KJS_SCRIPT_PATH, f"""const CONFIG_DATA = {iron_spells_json}""")