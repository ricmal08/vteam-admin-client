import React, { useState } from 'react';
import { apiRequest } from '../../api/api.js';

function Simulation() {
  const [message, setMessage] = useState('');

  const handleStart = async () => {
    try {
      const response = await apiRequest('/api/scripts/start', { method: 'GET' });
      setMessage(response.message);
    } catch (err) { 
      setMessage(`${err.message}`); }
  };

  const handleStop = async () => {
    try {
      const response = await apiRequest('/api/scripts/stop', { method: 'GET' });
      setMessage(response.message);
    } catch (err) { 
      setMessage(`${err.message}`); }
  };

return (
  <div className="view-container">
    <div className="form-container">
    <h2>Simulering</h2>
    
    <div className="form-layout">
    <button 
    onClick={handleStart} 
    className="form-button" 
    >
    Start
    </button>
    
    <button 
    onClick={handleStop} 
    className="form-button" 
    >
    Stopp
    </button>
    </div>

    {message && <p>{message}</p>}
    </div>
  </div>
);
}

export default Simulation;