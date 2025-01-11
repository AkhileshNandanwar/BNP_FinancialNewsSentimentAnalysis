from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# Example ML model prediction function
def get_prediction(input_data):
    # Replace this logic with your actual ML model
    return input_data

# Define input data model
class InputData(BaseModel):
    data: dict

# Create FastAPI app
app = FastAPI()

# Add CORS middleware to allow requests from other systems
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific origins for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
def predict(input_data: InputData):
    # Call the ML model with the input data
    prediction = get_prediction(input_data.data)
    return prediction

# To run the server, save this file as `predictor.py`
# Run with: `uvicorn predictor:app --host 0.0.0.0 --port 5000 --reload`
