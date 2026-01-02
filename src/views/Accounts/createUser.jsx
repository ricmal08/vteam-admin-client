import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import { apiRequest } from '../../api/api.js';
import '../../forms/forms.css';

function CreateUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
  event.preventDefault();


  const newUserData = { 
          email,
          password,
  }

  try {
      await apiRequest('/api/users', {
      method: 'POST',
      body: JSON.stringify(newUserData),
      });

      navigate('/users'); 

  } catch (err) {
      console.error("Fel vid borttagning:", err);
      alert(err.message);
  }
};

return (
  <div className="form-container">
    <h2>Skapa ny användare</h2>

      <form onSubmit={handleSubmit} className="form-layout">

        <div className="form-group">
          <label htmlFor="email">E-post:</label>
          <input 
            id="email"
            name="email"
            type="email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Lösenord:</label>
          <input 
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="form-button">Spara</button>
      </form>
  </div>
);
}

export default CreateUser;