import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import './city.css';
import { apiRequest } from '../../api/api.js';

function City() {
  const{cityId} = useParams();
  const [city, setCity] = useState(null);
  const [zones, setZones] = useState(null);
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
        };
        fetchZones();
    }, [cityId]);

 if (!city) {
    return <div>Hittar ingen stad med angivet ID.</div>;
  }
 return (

  <div>
        <h2>{city.name}</h2>
        
        <h3>Laddstationer/Zoner</h3>
        {zones.length > 0 ? (
            <ul>
                {zones.map(zone => {
                    //filter på cyklar som tillhör specifikt zone._id
                    const bikesInZone = bikes.filter(bike => bike.currentZone === zone._id);
                    console.log('bikesInZone', bikesInZone)

                    return (
                        <li key={zone._id}>
                            <strong>{zone.name}</strong> (Antal cyklar: {bikesInZone.length})
                            {/* visar upp vilka cyklar som tillhör specifikt zone._id */}
                            <ul>
                                {bikesInZone.map(bike => <li key={bike._id}>Cykel ID: {bike._id}</li>)}
                            </ul>
                        </li>
                    );
                })}
            </ul>
        ) : (
            <p>Inga zoner hittades för denna stad.</p>
        )}
    </div>
  );
}

export default City;