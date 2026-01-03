import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiRequest } from '../../api/api.js';

function EditCity() { 

  const {cityId } = useParams();
  const navigate = useNavigate();
  
  const [zones, setZones] = useState('');


  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const cityData = await apiRequest(`/api/cities/${cityId}`);
        setZones(cityData.zones);

      } catch (err) {
        console.error("Fel vid uppdatering:", err);

      }
    };
    fetchCityData();
  }, [cityId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedCityData = {
        zones,
    };

    try {

      await apiRequest(`/api/cities/${cityId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedCityData),
      });

      navigate('/cities'); 

    } catch (err) {
      console.error("Fel vid uppdatering:", err);
    }
  };

  return (
    <div>
      <h2>Redigera</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Zoner:
          <input 
            type="zones"
            value={zones}
            onChange={e => setZones(e.target.value)}
            required
          />
        </label>
        <button type="submit">Spara</button>
      </form>
    </div>
  );
}


export default EditCity;