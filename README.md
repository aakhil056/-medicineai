# Medicine AI Platform

A complete AI-powered NLP Medicine Recommendation Platform.

## Features
- Disease Prediction from symptoms
- Medicine Recommendation
- AI Prescription Scanner (OCR)
- Modern UI with React and Tailwind CSS
- FastAPI Backend

## Getting Started

### Backend Setup
1. Navigate to `backend/`: `cd backend`
2. Create virtual environment: `python -m venv venv`
3. Activate it: `source venv/bin/activate` (Mac/Linux) or `venv\Scripts\activate` (Windows)
4. Install dependencies: `pip install -r requirements.txt`
5. Run the server: `uvicorn app:app --reload`
*Note: Make sure to train the model first by running `python train_model.py`*

### Frontend Setup
1. Navigate to `frontend/`: `cd frontend`
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
