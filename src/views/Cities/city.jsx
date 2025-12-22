import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
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
            console.log('zondata:', zonesData)
        };
        fetchZones();
    }, [cityId]);

    useEffect(() => {
        const fetchBikes = async () => {
            const bikesData = await apiRequest(`/api/cities/${cityId}/bikes`);
            setBikes(bikesData);
            console.log('cykeldata:', bikesData)
        };
        fetchBikes();
    }, [cityId]);

 if (!city) {
    return <div>Hittar ingen stad med angivet ID.</div>;
  }
 return (
  <div className="city-container">
    <h2>{city.name}</h2>
    <p><strong>Totalt antal cyklar i staden:</strong> {bikes.length}</p>
    
    <h3>Laddstationer & Zoner</h3>
    {zones.length > 0 ? (
      <ul>
        {zones.map(zone => {
          const bikesInZone = bikes.filter(bike => bike.startingzone === zone._id);
          
          return (
            <li key={zone._id}>
              {/* Do we want zone.typeOfZone here? */}
              <strong>{zone.name}</strong> (Typ: {zone.typeOfZone}, Antal cyklar: {bikesInZone.length})
              
              {bikesInZone.length > 0 && (
                <ul>
                  {bikesInZone.map(bike => (
                    //Dispay bike info
                    <li key={bike._id}>
                      ID: {bike._id} | Batteri: {bike.battery}% | Status: {bike.inUse ? 'Uthyrd' : 'Ledig'}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    ) : (
      <p>Inga zoner hittades för denna stad.</p>
    )}

    <h3>Avvikande parkering (inte i en zon)</h3>
    {(() => {
      const freeparkedBikes = bikes.filter(bike => !bike.startingzone);
      if (freeparkedBikes.length === 0) {
        return <p>Inga cyklar med avvikande parkering hittades.</p>;
      }
      return (
        <ul>
          {freeparkedBikes.map(bike => (
            //display bikeinfo for freeparkedBikes
            <li key={bike._id}>
              ID: {bike._id} | Batteri: {bike.battery}% | Status: {bike.inUse ? 'Uthyrd' : 'Ledig'}
            </li>
          ))}
        </ul>
      );
    })()}
  </div>
);
}

export default City;