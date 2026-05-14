import pytesseract
from PIL import Image
import re


def extract_prescription_data(image_path):
    image = Image.open(image_path)

    text = pytesseract.image_to_string(image)

    medicines = []

    medicine_patterns = [
        r'Paracetamol',
        r'Azithromycin',
        r'Cetrizine',
        r'Dolo',
        r'Ibuprofen'
    ]

    for med in medicine_patterns:
        if re.search(med, text, re.IGNORECASE):
            medicines.append(med)

    return {
        "raw_text": text,
        "medicines": medicines
    }
