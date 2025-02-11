export const api = {
  checkStrength: async (password) => {
    const response = await fetch("/api/check-strength", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    return response.json();
  },
 
  checkPwned: async (password) => {
    const response = await fetch(`/api/check-pwned`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    return response.json();
  }
};