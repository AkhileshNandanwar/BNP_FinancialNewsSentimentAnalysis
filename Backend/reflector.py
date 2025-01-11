import requests
import json

# The input data to send to the predictor server
input_data = {
    "data": {
        "ticker": "TSLA",
        "headline": "Lucid Stock Declined 28% in 2024. Is the Stock Poised to Rebound in 2025?",
        "url": "https://www.fool.com/investing/2025/01/11/lucid-stock-declined-28-in-2024-is-the-stock-poise/?source=iedfolrf0000001",
        "sentiment": "NEGATIVE",
        "confidence": 0.99,
        "recommendation": "STRONG SELL",
        "timestamp": "2025-01-11T14:10:42.304733Z"
    }  
}


# The URL of the FastAPI server
server_url = "http://29.91.3.111:5000/predict"  # Replace <PREDICTOR_IP> with the actual IP

try:
    # Send a POST request to the server
    response = requests.post(server_url, json=input_data)
    response.raise_for_status()  # Raise an error for bad HTTP responses (4xx or 5xx)

    # Parse and print the response from the server
    prediction = response.json()
    print("Prediction result:", json.dumps(prediction, indent=4))

except requests.exceptions.RequestException as e:
    print("Error sending request:", e)
