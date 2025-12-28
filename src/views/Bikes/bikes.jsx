import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './bikes.css';
import { apiRequest } from '../../api/api.js';

function Bikes() {
  const [bikes, setBikes] = useState([]);
  const [error, setError] = useState(null);

  const fetchBikes = async () => {
    try {
      const data = await apiRequest('/api/bikes');
      setBikes(data);
    } catch (err) {
      console.error("Ett fel inträffade vid fetch:", err);
      setError("Kunde inte hämta cyklar.");
    }
  };

  useEffect(() => {
    fetchBikes();
  }, []);

const handleDelete = async (bikeId) => {

      try {

        await apiRequest(`/api/bikes/${bikeId}`, {
              method: 'DELETE',
        });

        setBikes(currentUsers => 
            currentUsers.filter(bike => bike._id !== bikeId)
        );

      } catch (err) {
        console.error("Fel vid borttagning:", err);
        alert(err.message);
      }
  };

  const handleBlock = async (bikeId) => {
    try {
        await apiRequest(`/api/bikes/${bikeId}/block`, {
            method: 'PATCH',
        });
        fetchBikes();
    } catch (err) {
        setError("Kunde inte blockera fordonet.");
        console.error("Blockering misslyckades:", err);
    }
};


const handleUnblock = async (bikeId) => {
    try {
        await apiRequest(`/api/bikes/${bikeId}/unblock`, {
            method: 'PATCH',
        });
        fetchBikes();
    } catch (err) {
        setError("Kunde inte avblockera fordonet.");
        console.error("Avblockering misslyckades:", err);
    }
};
 return (

<div className="bikes-container">

      <h2 className="bikes-title">Cyklar</h2>
       <Link to="/bikes/create" className="bikes-create">
                + Lägg till
       </Link>
      {bikes.length > 0 ? (
            <table className={bikes.dataTable}>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Status</th>
                  <th>Plats</th>
                  <th>Position</th>
                  <th>Batteri</th>
                  <th>Laddning</th>
                  <th>Blockad</th>
                  <th></th>
                  <th>Ändra</th>
                  <th>Ta bort</th>
              </tr>
            </thead>
            <tbody>
                {bikes.map(bike => (
                  <tr key={bike._id}>
                    <td>{bike._id}</td>
                    <td>{bike.inUse ? 'Uthyrd' : 'Ledig'}</td>
                    <td>{bike.startingzone ? `Zon: ${bike.startingzone}` : 'Fri parkering'}</td>
                    <td>{bike.position.latitude.toFixed(4)}(Y),{bike.position.longitude.toFixed(4)}(X)</td>
                    <td>{bike.battery}</td>
                    <td>{bike.charging ? 'Laddar': ''}</td>
                    <td>{bike.blocked ? 'Blockad': ''}</td>
                    <td> {bike.blocked 
                      ? <button onClick={() => handleUnblock(bike._id)}>Avblockera</button>
                      : <button onClick={() => handleBlock(bike._id)}>Blockera</button>
                    }
                    </td>
                    <td>
                      <Link to={`/bikes/${bike._id}`}>
                        <button></button>
                      </Link>
                    </td>
                    <td>
                    <button 
                        onClick={() => handleDelete(bike._id)} >
                    </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            ) : (
              <p>Inga cyklar kunde hittas.</p>
            )}
    </div>
  );
}

export default Bikes;