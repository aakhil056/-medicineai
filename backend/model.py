import joblib
import pandas as pd
import difflib

model = joblib.load('medicine_model.pkl')
medicine_df = pd.read_csv('medicine_master.csv')
disease_df = pd.read_csv('medicine_dataset.csv')


def get_medicine_info(medicine_name):
    matches = difflib.get_close_matches(
        medicine_name,
        medicine_df['medicine_name'],
        n=1,
        cutoff=0.4
    )
    if matches:
        row = medicine_df[
            medicine_df['medicine_name'] == matches[0]
        ].iloc[0]
        return {
            'medicine_name': str(row['medicine_name']),
            'usage': str(row['usage']),
            'side_effects': str(row['side_effects']),
            'dosage': str(row['dosage']),
            'price': int(row['price']),
            'generic_name': str(row['generic_name'])
        }
    return None


def predict_disease(symptoms):
    critical_keywords = [
        'heart attack',
        'stroke',
        'breathing problem',
        'chest pain'
    ]
    
    if any(word in symptoms.lower() for word in critical_keywords):
        return {
            'emergency': True,
            'message': 'Seek immediate medical attention!'
        }

    disease = model.predict([symptoms])[0]
    
    disease_row = disease_df[
        disease_df['disease'] == disease
    ].iloc[0]
    
    medicine_info = get_medicine_info(
        disease_row['medicine']
    )
    
    return {
        'disease': str(disease),
        'specialist': str(disease_row['specialist']),
        'severity': str(disease_row['severity']),
        'medicine': medicine_info
    }
