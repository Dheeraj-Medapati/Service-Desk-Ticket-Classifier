# Service Desk Ticket Classifier

An NLP-powered ticket classification system that automatically routes customer support tickets to the appropriate department using a fine-tuned DistilBERT model.

## Features

* Automatic ticket classification
* DistilBERT-based NLP model
* Flask REST API backend
* Interactive frontend using HTML, CSS, and JavaScript
* Real-time prediction results

## Tech Stack

* Frontend: HTML, CSS, JavaScript
* Backend: Flask, Flask-CORS
* Machine Learning: DistilBERT, PyTorch, Hugging Face Transformers, Scikit-Learn

## Supported Departments

* Technical
* Billing
* Sales
* HR
* Returns
* General

## Project Flow

User Input → Frontend → Flask API → DistilBERT Model → Department Prediction → Frontend Display

## How to Run

### Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend

Open `frontend/index.html` using Live Server.

## Note

Model files are not included in this repository due to size limitations.
