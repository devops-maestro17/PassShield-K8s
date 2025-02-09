const API_URL = process.env.REACT_APP_API_URL;
console.log("API_URL:", API_URL)
 
export const api = {
  checkStrength: async (password) => {
    const response = await fetch(`${API_URL}/api/check-strength`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    return response.json();
  },
 
  checkPwned: async (password) => {
    const response = await fetch(`${API_URL}/api/check-pwned`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    return response.json();
  }
};