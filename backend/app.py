print("APP FILE IS RUNNING")
from flask import Flask, request, jsonify
from transformers import DistilBertTokenizerFast, DistilBertForSequenceClassification
from flask_cors import CORS
import torch
import pickle

app = Flask(__name__)
CORS(app)

# ----------------------------
# Load Model and Tokenizer
# ----------------------------
model_name = "Dheeraj130905/service-desk-ticket-classifier"
model = DistilBertForSequenceClassification.from_pretrained(model_name)
tokenizer = DistilBertTokenizerFast.from_pretrained(model_name)

# ----------------------------
# Load Label Encoder
# ----------------------------
with open("Department_Encoder.pkl", "rb") as f:
    dept_encoder = pickle.load(f)

model.eval()

# ----------------------------
# Prediction Function
# ----------------------------
def predict_department(text):
    inputs = tokenizer(
        text,
        truncation=True,
        padding=True,
        max_length=96,
        return_tensors="pt"
    )

    with torch.no_grad():
        outputs = model(**inputs)

    predicted_class = torch.argmax(outputs.logits, dim=1).item()

    return dept_encoder.inverse_transform([predicted_class])[0]

# ----------------------------
# API Route
# ----------------------------
@app.route("/predict", methods=["POST"])
def predict():
    print("Predict endpoint hit")
    data = request.get_json()

    if "text" not in data:
        return jsonify({"error": "No text provided"}), 400

    prediction = predict_department(data["text"])

    return jsonify({"department": prediction})

@app.route("/")
def home():
    return "Service Desk Model is Running"

# ----------------------------
# Local Testing + Run Server
# ----------------------------
if __name__ == "__main__":
    print("Loaded classes:", dept_encoder.classes_)

    test_text = "I need refund for my payment"
    print("Test Prediction:", predict_department(test_text))

    app.run(debug=True)