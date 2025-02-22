import React, { useState } from 'react';
import PasswordChecker from './PasswordChecker';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-red-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">Password Strength Checker</h1>
                <p className="text-center mb-6 text-xl text-gray-700">
                  Ensure your password is strong and secure. Check its strength and verify it hasn't been compromised in any known data breaches.
                  <span className="block mt-4 text-blue-600 font-semibold">Enter your password below to get started.</span>
                </p>
                <PasswordChecker />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;