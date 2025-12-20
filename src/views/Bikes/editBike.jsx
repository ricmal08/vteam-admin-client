import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiRequest } from '../../api/api.js';

function EditBike() { 

  const { bikeId } = useParams();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');//TO-DO: uppdatera property


  useEffect(() => {
    const fetchBikeData = async () => {
      try {
        const bikeData = await apiRequest(`/api/bikes/${bikeId}`);
        setEmail(bikeData.email);//TO-DO: uppdatera property

      } catch (err) {
        console.error("Fel vid uppdatering:", err);

      }
    };
    fetchBikeData();
  }, [bikeId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedbikeData = { email };//TO-DO: uppdatera property

    try {

      await apiRequest(`/api/users/${bikeId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedbikeData),
      });

      navigate('/bikes'); 

    } catch (err) {
      console.error("Fel vid uppdatering:", err);
    }
  };

  return (
    <div>
      <h2>Redigera</h2>
      <p><strong>ID:</strong> {bikeId}</p>
      <p>Denna sida är en platshållare. Inväntar fler datapunkter från backend.</p>
      <form onSubmit={handleSubmit}>
        <label>
          Reg#:
          <input 
            type="text"
            required
          />
        </label>
        <button type="submit">Spara</button>
      </form>
    </div>
  );
}


export default EditBike;