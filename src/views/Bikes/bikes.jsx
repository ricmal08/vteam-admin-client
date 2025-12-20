import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './bikes.css';
import { apiRequest } from '../../api/api.js';

function Bikes() {
  const [bikes, setBikes] = useState([]);
  const [error, setError] = useState(null);

    useEffect(() => {
      const fetchBikes = async () => {


        try {

          const data = await apiRequest('/api/bikes');

          setBikes(data);
          // TODO: ordna eventuellt fler kontroller
        } catch (err) {
          console.error("Ett fel inträffade vid fetch:", err);
         
        }
    };
    fetchBikes();
}, [])

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
 return (

<div className="bikes-container">

      <h2 className="bikes-title">Enheter</h2>
       <Link to="/bikes/create" className="bikes-create">
                + Lägg till
       </Link>
      {bikes.length > 0 ? (
            <table className={bikes.dataTable}>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Ändra</th>
                  <th>Ta bort</th>
              </tr>
            </thead>
            <tbody>
                {bikes.map(bike => (
                  <tr key={bike._id}>
                    <td>{bike._id}</td>
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