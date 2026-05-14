import pandas as pd
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client['medicine_ai']

medicine_collection = db['medicines']
disease_collection = db['diseases']

# Clear existing data to avoid duplicates on re-run
medicine_collection.delete_many({})
disease_collection.delete_many({})

# Load CSV files
medicine_df = pd.read_csv('medicine_master.csv')
disease_df = pd.read_csv('medicine_dataset.csv')

# Convert to dictionary
medicine_data = medicine_df.to_dict(orient='records')
disease_data = disease_df.to_dict(orient='records')

# Insert into MongoDB
if medicine_data:
    medicine_collection.insert_many(medicine_data)
if disease_data:
    disease_collection.insert_many(disease_data)

print("✅ Full medical datasets imported successfully")
