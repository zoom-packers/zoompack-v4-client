import os
import json
import logging

class QuestModifier:
    def __init__(self, folder):
        self.folder = folder
        self.quest_files = ['overworld', 'everbright', 'everdawn', 'aether', 'nether', 'undergarden', 'end', 'depth', 'abyss', 'frost']
        self.base_mappings = {
            "locate_structure": {"xp": None, "money": None},
            "kill": {"xp": None, "money": None},
            "obtain_item": {"xp": None, "money": None},
            "reach_level": {"xp": 10, "money": [5, 0, 0, 0, 0]},
            "place_block": {"xp": 20, "money": [10, 0, 0, 0, 0]},
            "trigger": {"xp": 200, "money": [0, 12, 0, 0, 0]},
            "travel_dimension": {"xp": 22, "money": [31, 1, 0, 0, 0]},  # base
            "break_block": {"xp": 1, "money": [1, 0, 0, 0, 0]}
        }

        # simplified: per-file only custom xp/money
        self.file_mappings = {
            "overworld.json": {
                "locate_structure": {"xp": 50, "money": [0, 1, 0, 0, 0]},
                "kill": {"xp": 5, "money": [2, 0, 0, 0, 0]},
                "obtain_item": {"xp": 50, "money": [32, 0, 0, 0, 0]},
                "place_block": {"xp": 18, "money": [20, 0, 0, 0, 0]},
            },
            "everbright.json": {
                "locate_structure": {"xp": 80, "money": [20, 1, 0, 0, 0]},
                "kill": {"xp": 10, "money": [4, 0, 0, 0, 0]},
                "obtain_item": {"xp": 100, "money": [0, 1, 0, 0, 0]},
                "place_block": {"xp": 30, "money": [0, 1, 0, 0, 0]},
            },
            "everdawn.json": {
                "locate_structure": {"xp": 100, "money": [40, 1, 0, 0, 0]},
                "kill": {"xp": 20, "money": [8, 0, 0, 0, 0]},
                "obtain_item": {"xp": 200, "money": [0, 2, 0, 0, 0]},
                "place_block": {"xp": 40, "money": [48, 1, 0, 0, 0]},
            },
            "aether.json": {
                "locate_structure": {"xp": 120, "money": [0, 2, 0, 0, 0]},
                "kill": {"xp": 40, "money": [16, 0, 0, 0, 0]},
                "obtain_item": {"xp": 400, "money": [0, 4, 0, 0, 0]},
                "place_block": {"xp": 50, "money": [0, 2, 0, 0, 0]},
            },
            "nether.json": {
                "locate_structure": {"xp": 160, "money": [0, 3, 0, 0, 0]},
                "kill": {"xp": 50, "money": [32, 0, 0, 0, 0]},
                "obtain_item": {"xp": 800, "money": [0, 8, 0, 0, 0]},
                "place_block": {"xp": 100, "money": [0, 4, 0, 0, 0]},
            },
            "undergarden.json": {
                "locate_structure": {"xp": 240, "money": [0, 4, 0, 0, 0]},
                "kill": {"xp": 55, "money": [0, 1, 0, 0, 0]},
                "obtain_item": {"xp": 1600, "money": [0, 16, 0, 0, 0]},
                "place_block": {"xp": 200, "money": [0, 8, 0, 0, 0]},
            },
            "end.json": {
                "locate_structure": {"xp": 480, "money": [0, 16, 0, 0, 0]},
                "kill": {"xp": 60, "money": [32, 1, 0, 0, 0]},
                "obtain_item": {"xp": 2000, "money": [0, 32, 0, 0, 0]},
                "place_block": {"xp": 400, "money": [0, 16, 0, 0, 0]},
            },
            "depth.json": {
                "locate_structure": {"xp": 800, "money": [0, 32, 0, 0, 0]},
                "kill": {"xp": 70, "money": [0, 2, 0, 0, 0]},
                "obtain_item": {"xp": 3000, "money": [0, 0, 1, 0, 0]},
                "place_block": {"xp": 800, "money": [0, 32, 0, 0, 0]},
            },
            "abyss.json": {
                "locate_structure": {"xp": 1200, "money": [0, 48, 0, 0, 0]},
                "kill": {"xp": 80, "money": [0, 3, 0, 0, 0]},
                "obtain_item": {"xp": 4000, "money": [0, 32, 1, 0, 0]},
                "place_block": {"xp": 1000, "money": [0, 0, 1, 0, 0]},
            },
            "frost.json": {
                "locate_structure": {"xp": 1600, "money": [0, 32, 1, 0, 0]},
                "kill": {"xp": 100, "money": [32, 4, 0, 0, 0]},
                "obtain_item": {"xp": 5000, "money": [0, 0, 2, 0, 0]},
                "place_block": {"xp": 1000, "money": [0, 0, 1, 0, 0]},
            }
        }

        logging.basicConfig(
            filename="quest_errors.log",
            level=logging.WARNING,
            format="%(asctime)s - %(levelname)s - %(message)s"
        )

    def convert_money(self, reward):
        """Normalize simple primary rewards into proper wallet denominations (base-64)."""
        if len(reward) == 5 and reward[1:5] == [0, 0, 0, 0]:
            total = reward[0]
            result = [0, 0, 0, 0, 0]
            for i in range(5):
                result[i] = total % 64
                total //= 64
            return result
        return reward

    def format_money(self, reward):
        result = reward[:]
        for i in range(len(result) - 1):
            if result[i] > 64:
                carry = result[i] // 64
                result[i] = result[i] % 64
                result[i + 1] += carry
        if result[-1] > 64:
            result[-1] = result[-1] % 64
        return result

    def get_travel_multiplier(self, index):
        """Dynamically double travel_dimension rewards per file index."""
        return 2 ** index  # overworld=1x, everbright=2x, everdawn=4x, etc.

    def process_files(self):
        if not os.path.exists(self.folder):
            print(f"Error: The folder '{self.folder}' does not exist.")
            return

        for i, name in enumerate(self.quest_files):
            filename = f"{name}.json"
            file_path = os.path.join(self.folder, filename)
            if not os.path.exists(file_path):
                logging.warning(f"File '{filename}' not found. Skipping.")
                print(f"Warning: File '{filename}' not found. Skipping.")
                continue

            try:
                with open(file_path, "r") as file:
                    data = json.load(file)

                modified = False
                multiplier = self.get_travel_multiplier(i)

                for quest_id, quest in data.items():
                    quest_type = quest.get("type")
                    count = int(quest.get("count", 1))

                    if not quest_type:
                        logging.warning(f"No 'type' in quest '{quest_id}' of file '{filename}'.")
                        continue

                    mapping = self.file_mappings.get(filename, {}).get(quest_type, self.base_mappings.get(quest_type))
                    if not mapping:
                        logging.warning(f"Unknown quest type '{quest_type}' in {filename}.")
                        continue

                    base_xp = mapping["xp"]
                    base_money = mapping["money"]

                    # Dynamic travel_dimension scaling
                    if quest_type == "travel_dimension":
                        base_xp = self.base_mappings["travel_dimension"]["xp"] * multiplier
                        base_money = [x * multiplier for x in self.base_mappings["travel_dimension"]["money"]]

                    # Base XP and money per count
                    xp = base_xp * count
                    money = [x * count for x in base_money]

                    if quest_type == "break_block":
                        money = self.base_mappings["break_block"]["money"]
                        money[0]*=quest['count']

                    # Special case: kill + match.mode == 'exact'
                    if quest_type == "kill" and isinstance(quest.get("match"), dict):
                        if quest["match"].get("mode") == "exact":
                            xp *= 100
                            # Convert list to a total, scale, then reconvert
                            total = money[0] + money[1]*64 + money[2]*4096 + money[3]*262144 + money[4]*16777216
                            total *= 100
                            money = [total, 0, 0, 0, 0]  # flatten to primary, then convert & format later

                    # Apply conversion and formatting
                    money = self.convert_money(money)
                    money = self.format_money(money)

                    quest["xp"] = xp
                    quest["reward"] = money
                    modified = True

                if modified:
                    with open(file_path, "w") as file:
                        json.dump(data, file, indent=2)

            except Exception as e:
                logging.error(f"Error processing {filename}: {e}")
                print(f"Error processing {filename}: {e}")


if __name__ == "__main__":
    modifier = QuestModifier("quests")
    modifier.process_files()
