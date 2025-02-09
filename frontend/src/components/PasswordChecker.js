import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { api } from '../services/api';

const PasswordChecker = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(null);
  const [pwnedInfo, setPwnedInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkPassword = async () => {
    setLoading(true);
    try {
      // Check strength
      const strengthData = await api.checkStrength(password);
      setStrength(strengthData);
 
      // Check if pwned
      const pwnedData = await api.checkPwned(password);
      setPwnedInfo(pwnedData);
    } catch (error) {
      console.error('Error checking password:', error);
    }
    setLoading(false);
  };

  const getStrengthColor = () => {
    if (!strength) return 'bg-gray-200';
    switch (strength.strength) {
      case 'strong': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      default: return 'bg-red-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your password"
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2.5 text-gray-500"
        >
          {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
        </button>
      </div>

      <button
        onClick={checkPassword}
        disabled={!password || loading}
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? 'Checking...' : 'Check Password'}
      </button>

      {strength && (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Strength:</span>
              <span className="capitalize">{strength.strength}</span>
            </div>
            <div className={`h-2 rounded-full ${getStrengthColor()}`}></div>
          </div>
          <ul className="list-disc pl-5 space-y-1">
            {strength.feedback.map((feedback, index) => (
              <li key={index} className="text-sm text-gray-600">{feedback}</li>
            ))}
          </ul>
        </div>
      )}

      {pwnedInfo && (
        <div className={`p-4 rounded-lg ${pwnedInfo.pwned ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {pwnedInfo.message}
        </div>
      )}
    </div>
  );
};

export default PasswordChecker;