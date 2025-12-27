import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
          console.error("Ett fel inträffade vid fetch:", err);
         
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
  <div className="city-container">
    <h2 className="city-title">{city.name}</h2>
    <p><strong>Totalt antal cyklar i staden:</strong> {bikes.length}</p>
    
    <h3>Zoner</h3>
    {zones.length > 0 ? (
      <ul>
        {zones.map(zone => {
          const bikesInZone = bikes.filter(bike => bike.startingzone === zone._id);
          
          return (
            <li key={zone._id}>
              <strong>{zone.name}</strong> (Zon: {zone.typeOfZone}, Antal cyklar: {bikesInZone.length})
              
              {bikesInZone.length > 0 && (
                <ul>
                  {bikesInZone.map(bike => {
                    let statusText = bike.inUse ? 'Upptagen' : 'Ledig';
                    if (bike.blocked) statusText = 'Blockad';
                    if (bike.charging) statusText = 'Laddar';

                    const mapsLink = `https://www.google.com/maps?q=${bike.position.latitude},${bike.position.longitude}`;
                    return (
                      <li key={bike._id}>
                        Id: {bike._id} | Batteri: {bike.battery}% | Status: {statusText} |
                        Position: {bike.position.latitude.toFixed(4)}(Y), {bike.position.longitude.toFixed(4)}(X)  |

                        {/*adding rel"noopener noreferrer" to guard against refferer page being swapped for intrusion*/}
                        <a href={mapsLink} target="_blank" rel="noopener noreferrer">
                          Visa position
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    ) : (
      <p>Inga zoner hittades för denna stad.</p>
    )}

    <h3>Avvikande parkering (utanför accepterad zon)</h3>
    {(() => {
      const freeparkedBikes = bikes.filter(bike => !bike.startingzone);
      if (freeparkedBikes.length === 0) {
        return <p>Inga cyklar med avvikande parkering hittades.</p>;
      }
      return (
        <ul>
          {freeparkedBikes.map(bike => {
            let statusText = bike.inUse ? 'Upptagen' : 'Ledig';
            if (bike.blocked) statusText = 'Blockad';

             const mapsLink = `https://www.google.com/maps?q=${bike.position.latitude},${bike.position.longitude}`;

            return (
              <li key={bike._id}>
                Id: {bike._id} | Batteri: {bike.battery}% | Status: {statusText} |
                Position: {bike.position.latitude.toFixed(4)}(Y), {bike.position.longitude.toFixed(4)}(X) |
                 <a href={mapsLink} target="_blank" rel="noopener noreferrer">
                  Hitta
                </a>
              </li>
            );
          })}
        </ul>
      );
    })()}
  </div>
);
}

export default City;