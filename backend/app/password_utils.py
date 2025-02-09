import re

def check_password_strength(password: str) -> dict:
    score = 0
    feedback = []
    
    # Length check
    if len(password) >= 12:
        score += 2
    elif len(password) >= 8:
        score += 1
    else:
        feedback.append("Password should be at least 8 characters long")
    
    # Check for uppercase letters
    if re.search(r'[A-Z]', password):
        score += 1
    else:
        feedback.append("Include at least one uppercase letter")
    
    # Check for lowercase letters
    if re.search(r'[a-z]', password):
        score += 1
    else:
        feedback.append("Include at least one lowercase letter")
    
    # Check for numbers
    if re.search(r'\d', password):
        score += 1
    else:
        feedback.append("Include at least one number")
    
    # Check for special characters
    if re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        score += 1
    else:
        feedback.append("Include at least one special character")
    
    # Calculate strength level
    strength = "weak"
    if score >= 5:
        strength = "strong"
    elif score >= 3:
        strength = "moderate"
    
    return {
        "strength": strength,
        "score": score,
        "feedback": feedback if feedback else ["Password meets all criteria"]
    }