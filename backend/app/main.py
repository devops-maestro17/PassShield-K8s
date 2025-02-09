from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import hashlib
import requests
from .password_utils import check_password_strength
from .config import settings

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PasswordRequest(BaseModel):
    password: str

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/api/check-strength")
async def check_strength(request: PasswordRequest):
    result = check_password_strength(request.password)
    return result

@app.post("/api/check-pwned")
async def check_pwned(request: PasswordRequest):
    # Hash the password with SHA-1
    password_hash = hashlib.sha1(request.password.encode('utf-8')).hexdigest().upper()
    prefix = password_hash[:5]
    suffix = password_hash[5:]
    
    # Query the HIBP API
    try:
        response = requests.get(f"https://api.pwnedpasswords.com/range/{prefix}")
        response.raise_for_status()
        
        # Check if the password suffix exists in the response
        hashes = (line.split(':') for line in response.text.splitlines())
        for hash_suffix, count in hashes:
            if hash_suffix == suffix:
                return {
                    "pwned": True,
                    "count": int(count),
                    "message": f"This password has been found in {count} data breaches. Please change it immediately!"
                }
        
        return {
            "pwned": False,
            "count": 0,
            "message": "Good news! This password hasn't been found in any known data breaches."
        }
    
    except requests.exceptions.RequestException:
        raise HTTPException(status_code=500, detail="Error checking password against HIBP API")