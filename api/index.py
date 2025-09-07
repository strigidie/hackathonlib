import os
import requests
from flask import Flask, request, jsonify
from supabase import Client, create_client

supabase_url: str = os.environ.get("SUPABASE_URL")
supabase_key: str = os.environ.get("SUPABASE_KEY")
openai_key: str = os.environ.get("OPENAI_KEY")
app_key: str = os.environ.get("APP_KEY")

if not supabase_url or not supabase_key:
    raise ValueError("Supabase URL or Key not set in environment")
if not openai_key:
    raise ValueError("OpenAI Key not set in environment")
if not app_key:
    raise ValueError("App Key not set in environment")

supabase: Client = create_client(supabase_url, supabase_key)
app: Flask = Flask(__name__)

# ------------------------------------------------------------------
@app.route('/api/create_profile', methods=["POST"])
def create_profile():
    data = request.get_json()

    if not data or data.get("key") != app_key:
        return jsonify({"error": "Incorrect key"}), 403

    required_fields = ["name", "lastname", "picture", "location", "age", "gender", "height", "weight"]
    missing = [field for field in required_fields if field not in data]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

    try:
        response = supabase.table("profiles").insert({
            "name": data["name"],
            "lastname": data["lastname"],
            "picture": data["picture"],
            "location": data["location"],
            "age": data["age"],
            "gender": data["gender"],
            "height": data["height"],
            "weight": data["weight"]
        }).execute()

        user_id = response.data[0]["id"] if response.data else None
    except Exception as e:
        return jsonify({"error": str(e)}), 500 

    return jsonify({"message": "Profile created", "user_id" : user_id}), 200

# ------------------------------------------------------------------
@app.route('/api/upload_image', methods=["POST"])
def upload_image():
    # Placeholder: handle file uploads here if needed
    return jsonify({"message": "Image uploaded"}), 200

# ------------------------------------------------------------------
@app.route('/api/get_more_suggestions', methods=["POST"])
def get_more_suggestions():
    data = request.get_json()
    if not data or data.get("key") != app_key:
        return jsonify({"error": "Incorrect key"}), 403

    user_id = data.get("user_id")
    if not user_id:
        return jsonify({"error": "Missing user_id"}), 400

    response = supabase.table("profiles").select("*").eq("id", user_id).single().execute()
    profile = response.data
    if not profile:
        return jsonify({"error": "Profile not found"}), 404

    prompt = f"""You are a health and nutrition assistant for a fitness + nutrition tracking app called Foodiet.
Based on the following person data, suggest best-fit health targets for a healthy lifestyle.
Respond ONLY with a PURE JSON object containing without any formatting:
{{
"daily_calories": number,
"protein_g": number,
"sugar_g": number,
"activity_minutes": number,
"rationale": string
}}

Person Data (JSON):
{{
"gender": "{profile['gender']}",
"age": {profile['age']},
"height": {profile['height']},
"weight": {profile['weight']}
}}"""

    try:
        url = "https://api.openai.com/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {openai_key}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": "gpt-4o-mini",
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": 150
        }

        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        result = response.json()
        suggestion = result["choices"][0]["message"]["content"]

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"message": "OpenAI was successfully requested", "result": suggestion}), 200
