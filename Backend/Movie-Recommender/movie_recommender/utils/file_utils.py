import csv
import os
from typing import List

def append_to_csv_file(filepath: str, row: dict, fieldnames: List[str]):
    with open(filepath, 'a', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writerow(row)
        
def read_csv_file(file_path):
    # Check if the file exists and is not empty
    if not os.path.exists(file_path) or os.stat(file_path).st_size == 0:
        return []

    with open(file_path, 'r') as csvfile:
        read_csv = csv.reader(csvfile)
        return list(read_csv)