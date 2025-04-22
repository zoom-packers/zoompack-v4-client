import os
import pprint
import pandas as pd

folder_path = "csvs"

def find_first_csv(folder):
    for file in os.listdir(folder):
        if file.lower().endswith(".csv"):
            return os.path.join(folder, file)
    return None


EMAILS = {}
CL_mail = 'Email Address'
CL_status = 'Solved'

def parse_csv(csv_path):
    df = pd.read_csv(csv_path)
    for index, row in df.iterrows():
        row_data = row.to_dict()
        try:
            if 'solved' in row_data[CL_status].lower():
                if row_data[CL_mail] not in EMAILS:
                    EMAILS[row_data[CL_mail]] = 1
                else:
                    EMAILS[row_data[CL_mail]]+=1
        except Exception:
            pass

csv_file = find_first_csv(folder_path)
if csv_file:
    parse_csv(csv_file)
    pprint.pp(EMAILS)