import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../api/api.js';

function CreateBike() {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    //skapar objekt som matchar jsonstrukturen enl.backendserverns krav.
    const newBikeData = {
      position: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      }
    };
  //console.log(newBikeData);
    try {
        await apiRequest('/api/bikes', {
        method: 'POST',
        body: JSON.stringify(newBikeData),
      });

        navigate('/bikes'); 

    } catch (err) {
        console.error("Fel vid borttagning:", err);
        alert(err.message);
    }
};

return (
    <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="latitude">Latitude: (xx.xxx)</label>
            <input
                id="latitude"
                type="number"
                step="any"
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
                required
            />
        </div>
        <div>
            <label htmlFor="longitude">Longitude: (xx.xxx)</label>
            <input
                id="longitude"
                type="number"
                step="any"
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
                required
            />
        </div>
        <button type="submit">Spara</button>
    </form>
  );
}

export default CreateBike;