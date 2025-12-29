import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import { apiRequest } from '../../api/api.js';

function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();//förhindrar omladdning
    setError(null);

    try {
    const data = await apiRequest('/api/auth/login/normal', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });

    localStorage.setItem('accessToken', data.accessToken);

    setToken(data.accessToken);

    navigate('/');//redirectar tillbaka till indexpage

    } catch (error) {

        setError(error.message);
    }
  };

  return (
    <div>
      <h1>Logga in</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-post:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Lösenord:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Logga in</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Login;