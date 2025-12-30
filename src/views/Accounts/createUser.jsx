import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import { apiRequest } from '../../api/api.js';

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
    <div className="user-container">
        <h2 className="user-title">Översikt:</h2>
        <form onSubmit={handleSubmit}>
          <h2>Skapa ny användare</h2>
          <div>
          <label>
            E-post:
            <input 
              type="text" 
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </label>
          </div>
          <div>
          <label>
            Lösenord:
            <input 
              type="text" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
          </div>
          <button type="submit">Spara</button>
        </form>
    </div>
  );
}

export default CreateUser;