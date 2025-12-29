import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { apiRequest } from '../../api/api.js';
import './map.css';

const bikeIcon = new L.Icon({
  iconUrl: '/images/scooter.jpg',
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

  useEffect(() => {
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

  //Guard
  if (isLoadingBikes || isLoadingZones) {
    return <p>Laddar data...</p>;
  }

  return (
    //Display default marker for Stockholm
    <div className="map-container">
        <h2 className="map-title">Kartvy</h2>
      {bikesError && <p style={{ color: 'red', textAlign: 'center' }}>{bikesError}</p>}
      {zonesError && <p style={{ color: 'red', textAlign: 'center' }}>{zonesError}</p>}

    <MapContainer center={initialPosition} zoom={13} >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
     
         <Marker position={initialPosition}>
          <Popup>
            Stockholm
          </Popup>
        </Marker>
        {zones.map(zone => (
            <Polygon
            key={zone._id}
            //Switch order of coordinates to map with Geojson (from[lon, lat] till [lat, lon])
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
                <strong>Batteri:</strong> {bike.battery}% <br />
                <strong>Status:</strong> {bike.inUse ? 'Uthyrd' : 'Ledig'} <br />
                <strong>Zon:</strong> {bike.startingzone || 'Ingen (fri parkering)'}
            </Popup>
            </Marker>
        ))}
        </MapContainer>
    </div>
  );
}

export default Map;