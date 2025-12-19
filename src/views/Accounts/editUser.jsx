import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiRequest } from '../../api/api.js';

function EditUser() { 

  const { userId } = useParams();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await apiRequest(`/api/users/${userId}`);
        setEmail(userData.email);

      } catch (err) {
        console.error("Fel vid uppdatering:", err);

      }
    };
    fetchUserData();
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedUserData = { email };

    try {

      await apiRequest(`/api/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedUserData),
      });

      navigate('/users'); 

    } catch (err) {
      console.error("Fel vid uppdatering:", err);
    }
  };

  return (
    <div>
      <h2>Redigera användare</h2>
      <form onSubmit={handleSubmit}>
        <label>
          E-post:
          <input 
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Spara ändringar</button>
      </form>
    </div>
  );
}


export default EditUser;