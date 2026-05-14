from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client['medicine_ai']

users_collection = db['users']
predictions_collection = db['predictions']
medicine_collection = db['medicines']
disease_collection = db['diseases']
prescription_collection = db['prescriptions']
doctors_collection = db['doctors']
history_collection = db['history']
