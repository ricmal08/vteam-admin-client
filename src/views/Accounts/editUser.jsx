import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiRequest } from '../../api/api.js';
import '../../forms/forms.css';
function EditUser() { 

  const { userId } = useParams();
  const navigate = useNavigate();
  
  const [updateUserData, setUpdateUserData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    city: '',
    street: '',
    zipCode: '',
  });


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await apiRequest(`/api/users/${userId}`);

        setUpdateUserData({
            email: userData.email || '',
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            city: userData.city || '',
            street: userData.street || '',
            zipCode: userData.zipCode || '',
        });

      } catch (err) {
        console.error("Fel vid uppdatering:", err);

      }
    };
    fetchUserData();
  }, [userId]);

    const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateUserData(currentState => ({
        ...currentState,
        [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      await apiRequest(`/api/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(updateUserData),
      });

      navigate('/users'); 

    } catch (err) {
      console.error("Fel vid uppdatering:", err);
    }
  };

return (
    <div className="form-container">
      <h2>Redigera</h2>
      <form onSubmit={handleSubmit} className="form-layout">

        <div className="form-group">
          <label htmlFor="email">E-post:</label>
          <input
            id="email"
            name="email"
            type="email" 
            value={updateUserData.email} 
            onChange={handleChange} 
          required
          />
        </div>

        <div className="form-group">
          <label htmlFor="firstName">Förnamn:</label>
          <input 
            id="firstName" 
            name="firstName" 
            type="text" 
            value={updateUserData.firstName} 
            onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Efternamn:</label>
          <input 
            id="lastName" 
            name="lastName" 
            type="text" 
            value={updateUserData.lastName} 
            onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="street">Gatuadress:</label>
          <input 
            id="street" 
            name="street" 
            type="text" 
            value={updateUserData.street} 
            onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="zipCode">Postnummer:</label>
          <input 
            id="zipCode" 
            name="zipCode" 
            type="text" 
            value={updateUserData.zipCode} 
            onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="city">Stad:</label>
          <input 
            id="city" 
            name="city" 
            type="text" 
            value={updateUserData.city} 
            onChange={handleChange} />
        </div>

        <button type="submit" className="form-button">Spara</button>
      </form>
    </div>
  );
}


export default EditUser;