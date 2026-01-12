import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import './city.css';
import { apiRequest } from '../../api/api.js';

function City() {
  const{cityId} = useParams();
  const [city, setCity] = useState(null);
  const [zones, setZones] = useState([]);
  const [bikes, setBikes] = useState([]); 
  const [error, setError] = useState([]);

  useEffect(() => {

    if(!cityId) return

    const fetchCity = async () => {

      try {

        const data = await apiRequest(`/api/cities/${cityId}`);
        setCity(data);

        } catch (err) {
          console.error("Hämtning av cyklar misslyckades:", err);

        }
    };
    fetchCity();
  }, [cityId])

  useEffect(() => {
      const fetchZones = async () => {
          const zonesData = await apiRequest(`/api/cities/${cityId}/zones`);
          setZones(zonesData);
          //console.log('zondata:', zonesData)
      };
      fetchZones();
  }, [cityId]);

  useEffect(() => {
      const fetchBikes = async () => {
          const bikesData = await apiRequest(`/api/cities/${cityId}/bikes`);
          setBikes(bikesData);
      };
      fetchBikes();
  }, [cityId]);

  if (!city) {
    return <div>Hittar ingen stad med angivet Id.</div>;
  }

return (
  <div className="view-container">
    <h1>{city.name}</h1>
      
    <h3>Zoner</h3>
    {zones.length > 0 ? (
      <table className="form-container">
        <thead>
          <tr>
            <th>Namn</th>
            <th>typ</th>
          </tr>
        </thead>
        <tbody>
            {zones.map(zone => (
              <tr key={zone._id}>
                <td>{zone.name}</td>
                <td>{zone.typeOfZone}</td>
              </tr>
            ))}
          </tbody>
      </table>
    ) : (
      <p>Inga zoner hittades.</p>
    )}

    <h3>Cyklar i {city.name} ({bikes.length} st)</h3>
    {bikes.length > 0 ? (
        <table className="data-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Status</th>
                    <th>Batteri</th>
                    <th>Position</th>
                </tr>
            </thead>
            <tbody>
                {bikes.map(bike => {
                    let statusText = bike.inUse ? 'Uthyrd' : 'Ledig';
                    if (bike.blocked) statusText = 'Blockerad';
                    if (bike.charging) statusText = 'Laddar';

                    return (
                        <tr key={bike._id}>
                            <td>{bike._id}</td>
                            <td>{statusText}</td>
                            <td>{bike.battery}%</td>
                            <td>
                                {bike.position.latitude.toFixed(4)}(Y), {bike.position.longitude.toFixed(4)}(X)
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    ) : (
        <p>Inga cyklar hittades i denna stad.</p>
    )}
  </div>
);
}

export default City;