import hashlib
import httpx
import random
import string
from passlib.context import CryptContext
 
# Password hashing for strong suggestion generation
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
 
def check_password_strength(password):
    length = len(password)
    has_upper = any(c.isupper() for c in password)
    has_lower = any(c.islower() for c in password)
    has_digit = any(c.isdigit() for c in password)
    has_special = any(c in string.punctuation for c in password)
 
    strength_score = sum([has_upper, has_lower, has_digit, has_special]) + (length >= 12)
 
    if strength_score >= 5:
        return "Very Strong"
    elif strength_score >= 4:
        return "Strong"
    elif strength_score >= 3:
        return "Moderate"
    else:
        return "Weak"
 
async def check_pwned_api(password):
    sha1_password = hashlib.sha1(password.encode('utf-8')).hexdigest().upper()
    prefix, suffix = sha1_password[:5], sha1_password[5:]
 
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://api.pwnedpasswords.com/range/{prefix}")
 
        hashes = (line.split(":") for line in response.text.splitlines())
        for hash_suffix, count in hashes:
            if hash_suffix == suffix:
                return int(count)
        return 0
 
def generate_strong_passwords(n=3, length=16):
    characters = string.ascii_letters + string.digits + string.punctuation
    return [''.join(random.choice(characters) for _ in range(length)) for _ in range(n)]