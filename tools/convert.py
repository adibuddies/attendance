# We wil use this file to convert our data.xlsx (refer specimen sheet) into data.json used by upload.js to sync with Firestore.
# Basically we have entered a whole bunch of employees with different Branches (offices) in an Excel sheet, now we need Firestore Database to have it. Use upload.js > but it only accepts json files. Convert here!


import pandas as pd
import json

# Path to your Excel file
file_name = data.xlsx

# Force identifiers to strings to keep leading zeros (like '0001')
df = pd.read_excel(file_name, dtype={'BIN': str, 'PIN': str, 'BID': str})

df.columns = df.columns.str.strip()

grouped = df.groupby(['BIN', 'BID', 'officeName'])

json_output = []

for (bin_val, bid_val, office_val), group in grouped:
    branch_data = {
        "bin": str(bin_val),
        "bid": str(bid_val),
        "branchName": office_val,
        "employees": []
    }
    
    for _, row in group.iterrows():
        branch_data["employees"].append({
            "name": row['employeeName'],
            "role": row['designation'],
            "grade": row['payGrade'],
            "pin": str(row['PIN'])
        })
    json_output.append(branch_data)

with open(r"C:\your_path\output_data.json", 'w', encoding='utf-8') as f:
    json.dump(json_output, f, indent=4)

print(f"✔ Successfully converted {len(df)} employees. JSON is ready.")
