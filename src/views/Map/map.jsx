import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { apiRequest } from '../../api/api.js';
import './map.css';

const bikeIcon = new L.Icon({
  iconUrl: '/images/scooter2.png',
  iconSize: [40, 40],
});


const zoneOptions = {
  parking: { color: 'blue', fillOpacity: 0.2 },
  charging: { color: 'green', fillOpacity: 0.2 },
  'no-parking': { color: 'red', fillOpacity: 0.2 },
  default: { color: 'grey', fillOpacity: 0.2 }
};

function Map() {

  const initialPosition = [59.3293, 18.0686]; 

  const [bikes, setBikes] = useState([]);
  const [zones, setZones] = useState([]);
  const [isLoadingBikes, setIsLoadingBikes] = useState(true);
  const [isLoadingZones, setIsLoadingZones] = useState(true);

  const [bikesError, setBikesError] = useState(null);
  const [zonesError, setZonesError] = useState(null);

  const bikeFetchIntervalRef = useRef(null); 

  const fetchBikes = async () => {
    try {
      const bikesData = await apiRequest('/api/bikes');
      setBikes(bikesData);
    } catch (err) {
      setBikesError("Kunde inte hämta cykeldata.");
      console.error("Fel vid hämtning av cyklar för kartan:", err);
    } finally {
      setIsLoadingBikes(false);
    }
  };

  useEffect(() => {
    fetchBikes();
  }, []); 
  
  useEffect(() => {
    const fetchZones = async () => {
      try {
        const zonesData = await apiRequest('/api/zones');
        setZones(zonesData);
      } catch (err) {
        setZonesError("Kunde inte hämta zondata.");
        console.error("Fel vid hämtning av zoner för kartan:", err);
      } finally {
        setIsLoadingZones(false);
      }
    };
    fetchZones();
  }, []);

  const startLiveStream = () => {

    if (bikeFetchIntervalRef.current) return; 
    
    bikeFetchIntervalRef.current = setInterval(fetchBikes, 5000);
  };

  const stopLiveStream = () => {

    clearInterval(bikeFetchIntervalRef.current);
    bikeFetchIntervalRef.current = null;
  };

  useEffect(() => {

    return () => {
      if (bikeFetchIntervalRef.current) {
        clearInterval(bikeFetchIntervalRef.current);
      }
    };
  }, []);


  if (isLoadingBikes || isLoadingZones) {
    return <p>Laddar data.</p>;
  }

return (

  <div className="map-container">
    <h2 className="map-title">Karta</h2>

      <div className="form-container">
        <div className="form-group">
          <button onClick={startLiveStream} className="form-button">Starta live-sändning</button>
        </div>
        <div className="form-group">
          <button onClick={stopLiveStream}className="form-button">Stoppa live-sändning</button>
        </div>
      </div>

      <MapContainer center={initialPosition} zoom={13} >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />


        {zones.map(zone => (
            <Polygon
            key={zone._id}
            positions={zone.area.coordinates[0].map(coord => [coord[1], coord[0]])}

            pathOptions={zoneOptions[zone.typeOfZone] || zoneOptions.default}
            >
            <Popup>
                <strong>Zon:</strong> {zone.name} <br/>
                <strong>Typ:</strong> {zone.typeOfZone}
            </Popup>
            </Polygon>
        ))}

        {bikes.map(bike => (
            <Marker 
            key={bike._id} 
            position={[bike.position.latitude, bike.position.longitude]}
            icon={bikeIcon}
            >
            <Popup>
                <strong>Id:</strong> {bike._id} <br />
                <strong>Batteri:</strong> {Math.round(bike.battery)}% <br />
                <strong>Status:</strong> {bike.inUse ? 'Uthyrd' : 'Ledig'} <br />
                <strong>Laddar:</strong> {bike.charging ? 'Laddning pågår': ''} <br />
                <strong>Blockerad:</strong> {bike.blocked ? 'Ur service': ''} <br />
            </Popup>
            </Marker>
        ))}
      </MapContainer>
  </div>
);
}

export default Map;