import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';  // Optional: for any global styles you might want to add.
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);