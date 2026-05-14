import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
import joblib

# Load dataset

df = pd.read_csv("medicine_dataset.csv")

# Create pipeline
model = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('clf', MultinomialNB())
])

# Train model
model.fit(df['symptoms'], df['disease'])

# Save model
joblib.dump(model, 'medicine_model.pkl')

print("✅ Model Trained Successfully")
