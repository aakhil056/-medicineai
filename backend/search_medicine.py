from database import medicine_collection

def search_medicine(medicine_name):
    medicine = medicine_collection.find_one({
        'medicine_name': {
            '$regex': medicine_name,
            '$options': 'i'
        }
    })
    
    if medicine:
        medicine['_id'] = str(medicine['_id'])
        return medicine
        
    return {
        'message': 'Medicine not found'
    }
