# 🩺 Medicine AI Platform

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green.svg)
![Python](https://img.shields.io/badge/Python-3.8+-yellow.svg)

A complete, AI-powered Healthcare and Medicine Recommendation Platform. Medicine AI combines machine learning algorithms with a sleek, modern, and highly responsive user interface to provide disease predictions, medicine information, and intelligent prescription scanning.

---

## ✨ Features

- **🤖 Disease Predictor:** Enter your symptoms (e.g., headache, fever, cough) and our trained Machine Learning model will predict the most likely disease and recommend the appropriate medications and precautions.
- **💊 Comprehensive Medicine Database:** Instantly search for specific medicines, their uses, side effects, formulations, and alternatives using our robust dataset.
- **📄 AI Prescription Scanner:** Upload an image of a medical prescription and our integrated OCR (Optical Character Recognition) engine will automatically extract the prescribed medicines and instructions.
- **🎨 Modern Glassmorphism UI:** Built with Vite, React, and Tailwind CSS, the platform features a stunning dark-mode interface with smooth animations powered by Framer Motion.

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS (Custom Dark/Glassmorphism theme)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Routing:** React Router DOM

### Backend
- **API Framework:** FastAPI
- **Machine Learning:** Scikit-Learn, Pandas, NumPy
- **Computer Vision/OCR:** EasyOCR, PyTesseract, OpenCV
- **Server:** Uvicorn

---

## 🚀 Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.8 or higher)
- Tesseract OCR (Optional, for prescription scanning fallback)

### 1. Clone the Repository
```bash
git clone https://github.com/aakhil056/-medicineai.git
cd medicineai
```

### 2. Backend Setup
The backend houses the machine learning models and API endpoints.

```bash
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install all required Python dependencies
pip install -r requirements.txt

# Train the Machine Learning model before running the server!
python train_model.py

# Start the FastAPI server
uvicorn app:app --reload
```
The backend will run at `http://127.0.0.1:8000`. You can access the automatic API documentation at `http://127.0.0.1:8000/docs`.

### 3. Frontend Setup
The frontend is a Vite-powered React application. Open a new terminal window to start the frontend.

```bash
cd frontend

# Install Node modules
npm install

# Start the development server
npm run dev
```
The frontend will run at `http://localhost:5173` (or 5174 if the port is busy).

---

## 📡 API Endpoints Reference

The FastAPI backend exposes the following RESTful endpoints:

- `GET /` - Health check endpoint.
- `POST /predict` - Accepts a JSON payload containing `symptoms` and returns the predicted disease, recommended medicines, and precautions.
- `POST /scan-prescription` - Accepts an uploaded image (`multipart/form-data`) and returns the OCR extracted text from the prescription.
- `GET /medicine/{medicine_name}` - Returns detailed information, ingredients, and usage details for a specific medicine using fuzzy string matching.

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/aakhil056/-medicineai/issues).

## 📝 License
This project is licensed under the MIT License.
