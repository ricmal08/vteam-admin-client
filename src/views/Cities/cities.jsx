import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './cities.css';
import { apiRequest } from '../../api/api.js';

function Cities() {
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {


    try {

      const data = await apiRequest('/api/cities');
      setCities(data);

    } catch (err) {
      console.error("Ett fel inträffade vid fetch:", err);
    
    }
  };
  fetchCities();
}, [])


return (

  <div className="view-container">
    <h2 className="cities-title">Städer</h2>
      {cities.length > 0 ? (
          <table className={cities.dataTable}>
            <thead>
              <tr>
                  <th>Namn</th>
                  <th>Antal zoner</th>
                  <th></th>
            </tr>
          </thead>
          <tbody>
              {cities.map(city => (
                  <tr key={city._id}>
                  <td>
                      <Link to={`/cities/${city._id}`}>{city.name}</Link>
                  </td>
                  <td>{city.zones ? city.zones.length : 0}</td>
                  </tr>
              ))}
              </tbody>
          </table>
          ) : (
            <p>Inga städer kunde hittas.</p>
          )}
  </div>
);
}

export default Cities;