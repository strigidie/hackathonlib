import os

from flask import Flask, request
from supabase import Client, create_client 

# Supabase key
supabase_url: str = os.environ.get("SUPABASE_URL")
supabase_key: str = os.environ.get("SUPABASE_KEY")

supabase: Client = create_client(supabase_url, supabase_key)

# Main key of application
app_key: str = os.environ.get("APP_KEY")
app: Flask = Flask(__name__)

@app.route('/api/create/profile', methods=["POST"])
def create_profile():
    data = request.get_json()

    if not data:
        return "No Data"

    if not "key" in data:
        return "No credentials"

    if data["key"] != app_key:
        return "Incorrect credentials"
    
    response = (
        supabase.table("profiles")
            .insert({
                "name": "Johh",
                "lastname": "Doe",
                "age": 24,
                "gender" : "M",
                "height" : 178,
                "weight" : 60

            }).execute()
    )

    print(data)
    return ""

@app.route('/api/upload/image', methods=["POST"])
def upload_image():
    data = request.get_json()
    print(data)
    return ""