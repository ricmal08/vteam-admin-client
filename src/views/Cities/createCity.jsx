import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../api/api.js';

function CreateCity() {
    const [name, setName] = useState('');
    const [zones, setZones] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    //skapar objekt som matchar jsonstrukturen enl.backendserverns krav.
    const newCityData = {
      name,
    };
    console.log(newCityData);
    try {
        await apiRequest('/api/cities', {
        method: 'POST',
        body: JSON.stringify(newCityData),
      });

        navigate('/cities'); 

    } catch (err) {
        console.error("Fel vid borttagning:", err);
        alert(err.message);
    }
};

return (
    <form onSubmit={handleSubmit}>
      <h2>Lägg till Stad</h2>
         <div>
            <label htmlFor="name">Namn:</label>
            <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
            />
        </div>
        <button type="submit">Spara</button>
    </form>
  );
}

export default CreateCity