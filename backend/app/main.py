from fastapi import FastAPI, HTTPException
from os import getenv
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from app.utils import check_password_strength, check_pwned_api, generate_strong_passwords
import logging
 
app = FastAPI()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
ALLOWED_ORIGINS = getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
 
class PasswordRequest(BaseModel):
    password: str = Field(..., min_length=8, max_length=100)
     
@app.post("/check_password")
async def check_password(data: PasswordRequest):
    logger.info("Received password check request")
    password_strength = check_password_strength(data.password)
    pwned_count = await check_pwned_api(data.password)
    suggestions = generate_strong_passwords()
 
    return {
        "strength": password_strength,
        "pwned_count": pwned_count,
        "suggestions": suggestions
    }

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)