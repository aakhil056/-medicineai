from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import predict_disease
from prescription_scanner import extract_prescription_data
from search_medicine import search_medicine

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SymptomRequest(BaseModel):
    symptoms: str

@app.get("/")
def home():
    return {"message": "Medicine AI API Running"}

@app.post("/predict")
def predict(data: SymptomRequest):
    result = predict_disease(data.symptoms)
    return result

@app.post("/scan-prescription")
async def scan_prescription(file: UploadFile = File(...)):

    file_location = f"temp_{file.filename}"

    with open(file_location, "wb") as buffer:
        buffer.write(await file.read())

    result = extract_prescription_data(file_location)

    return result

@app.get('/medicine/{medicine_name}')
def get_medicine(medicine_name: str):
    return search_medicine(medicine_name)