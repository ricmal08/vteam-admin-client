import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiRequest } from '../../api/api.js';
import { Link } from 'react-router-dom';
import './bike.css';

function EditBike() { 

  const { bikeId } = useParams();
  const navigate = useNavigate();
  
  const [bike, setBike] = useState(null);
  const [zones, setZones] = useState([]);
  const [isLoadingBikes, setIsLoadingBikes] = useState(true);
  const [isLoadingZones, setIsLoadingZones] = useState(true);

  const [selectedZone, setSelectedZone] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const fetchBikeData = async () => {
      try {
        const bikeData = await apiRequest(`/api/bikes/${bikeId}`);
        setBike(bikeData);

        setSelectedZone(bikeData.startingzone || '');
        setIsBlocked(bikeData.blocked);

      } catch (err) {
        console.error("Fel vid uppdatering:", err);
      } finally {
        setIsLoadingBikes(false);
      }
    };
    fetchBikeData();
  }, [bikeId]);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const zonesData = await apiRequest('/api/zones');
        setZones(zonesData);
      } catch (err) {
        console.error("Kunde inte hämta zoner", err);
      } finally {
      setIsLoadingZones(false);
      }
    };
    fetchZones();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const resetData = {
      zoneId: selectedZone,
    };

    //console.log("resetData:", resetData);
    try {

      await apiRequest(`/api/bikes/reset/${bikeId}`, {
        method: 'POST',
        body: JSON.stringify(resetData),
      });

      navigate('/bikes'); 

    } catch (err) {

    }
  };

  

   if (isLoadingBikes || isLoadingZones) {
    return <p>Laddar data...</p>;
  }

  return (
    <div className="bikes-container">
      <h2 className="bike-title">Översikt:</h2>

        <div className="bike-details">
        <h3>Status & Information</h3>
        <p><strong>Status:</strong></p>
        <p><strong>Batteri:</strong> {bike.battery}%</p>
        <p><strong>Nuvarande Zon:</strong> {bike.startingzone}</p>
        <p>
            <strong>Position:</strong> {bike.position.latitude.toFixed(4)} (Y), {bike.position.longitude.toFixed(4)} (X) 
         </p>
        <p><strong>Total distans:</strong> {bike.distance} meter</p>
      </div>
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="zone-select">Flytta cykel till en laddzon:</label>
           <select 
            id="zone-select" 
            value={selectedZone} 
            onChange={e => setSelectedZone(e.target.value)}
          >
             <option value="">Ange zon</option>
            {zones.filter(zone => zone.typeOfZone === 'parking').map(zone => (
                <option key={zone._id} value={zone._id}>
                    {zone.name}
                </option>
            ))}
            </select>
        </div>
          <button type="submit">Spara</button>
        </form>
    </div>
  );
}


export default EditBike;