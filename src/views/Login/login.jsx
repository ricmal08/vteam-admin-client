import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../api/api.js';
import './login.css';

function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
    const data = await apiRequest('/api/auth/login/normal', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });

    localStorage.setItem('accessToken', data.accessToken);

    setToken(data.accessToken);

    navigate('/');

    } catch (error) {

        setError(error.message);
    }
  };

return (
  <div className="login-wrapper"> 
    <div className="login-container">
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
    </div>
  </div>
);
}

export default Login;