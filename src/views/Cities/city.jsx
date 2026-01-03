import React, { useState, useEffect } from 'react';
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
    <h2>{city.name}</h2>
    <h4>Totalt antal cyklar i staden: {bikes.length} st</h4>
      
    <h3>Zoner</h3>
    {zones.length > 0 ? (
      <table className="form-container">
        <thead>
          <tr>
            <th>Namn</th>
            <th>Cyklar i Zonen</th>
          </tr>
        </thead>
        <tbody>
          {zones.map(zone => {
            const bikesInZone = bikes.filter(bike => bike.startingzone === zone._id);
            
            return (
              <tr key={zone._id}>
                <td>
                  <strong>{zone.name}</strong><br />
                  <small>Typ: {zone.typeOfZone}</small>
                </td>

                <td>
                  {bikesInZone.length > 0 ? (
                    <ul>
                      {bikesInZone.map(bike => {
                        let statusText = bike.inUse ? 'Uthyrd' : 'Ledig';
                        if (bike.blocked) statusText = 'Blockerad';
                        if (bike.charging) statusText = 'Laddar';
                        return (
                          <li key={bike._id}>
                            Id: {bike._id} | Batteri: {bike.battery}% | Status: {statusText}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p>0 st</p>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    ) : (
      <p>Inga zoner hittades.</p>
    )}

    <h3>Fri parkerade cyklar</h3>
    {(() => {
        const freeparkedBikes = bikes.filter(bike => !bike.startingzone);

        if (freeparkedBikes.length === 0) {
            return <p>Inga cyklar med avvikande parkering hittades.</p>;
        }

        return (
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
                    {freeparkedBikes.map(bike => {
                        let statusText = bike.inUse ? 'Uthyrd' : 'Ledig';
                        if (bike.blocked) statusText = 'Blockerad';

                        return (
                            <tr key={bike._id}>
                                <td>{bike._id}</td>
                                <td>{statusText}</td>
                                <td>{bike.battery}%</td>
                                <td>{bike.position.latitude.toFixed(4)}(Y), {bike.position.longitude.toFixed(4)}(X)</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    })()}
  </div>
);
}

export default City;