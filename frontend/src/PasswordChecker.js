import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://backend-service:8000';

const PasswordChecker = () => {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(null);

  const handleCheckPassword = async () => {
    try {
      const response = await axios.post(`${API_URL}/check_password`, { password });
      setResult(response.data);
    } catch (error) {
      console.error("Error checking password:", error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Password Strength Checker</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
      />
      <button onClick={handleCheckPassword} style={{ padding: '10px 20px' }}>
        Check Password
      </button>
      {result && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>Strength:</strong> {result.strength}</p>
          <p><strong>Breached:</strong> {result.pwned_count > 0 ? `${result.pwned_count} times` : 'No breaches found'}</p>
          <h4>Strong Password Suggestions:</h4>
          <ul>
            {result.suggestions.map((pw, idx) => (
              <li key={idx}>{pw}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PasswordChecker;