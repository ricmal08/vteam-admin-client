import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './admins.css';
import { apiRequest } from '../../api/api.js';

function Admins() {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState(null);

    useEffect(() => {
      const fetchAdmins = async () => {


        try {

          const data = await apiRequest('/api/admins');
          console.log("Mottagen data för admins:", data); 
          setAdmins(data);
          // TODO: ordna eventuellt fler kontroller
        } catch (err) {
          console.error("Ett fel inträffade vid fetch:", err);
         
        }
    };
    fetchAdmins();
}, [])

const handleDelete = async (adminId) => {

      try {
        //fungerar inte då controllern vänta sig req params: email
        await apiRequest(`/api/admins/${adminId}`, {
              method: 'DELETE',
        });

        setAdmins(currentAdmins => 
            currentAdmins.filter(admin => admin.id !== adminId)
        );

      } catch (err) {
        console.error("Fel vid borttagning:", err);
        alert(err.message);
      }
  };
 return (

<div className="admins-container">

      <h2 className="admins-title">Administratörer</h2>
       <Link to="/admins/create" className="admins-create">
                + Lägg till
       </Link>
      {admins.length > 0 ? (
            <table className={admins.dataTable}>
              <thead>
                <tr>
                  <th>Behörighet</th>
                  <th>Id</th>
                  <th>E-post</th>
                  <th>Ändra</th>{/*}Kräver tillägg i admins.controller.js {*/}
                  <th>Ta bort</th>{/*}Kräver tillägg i adminds.controller.js {*/}
              </tr>
            </thead>
            <tbody>
                {admins.map(admin => (
                  <tr key={admin.id}>
                    <td>{admin.role}</td>
                    <td>{admin.id}</td>
                    <td>{admin.email}</td>
                    <td>
                     <p>placeholder</p>
                    </td>
                    <td>
                    <p>placeholder</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            ) : (
              <p>Inga admins kunde hittas.</p>
            )}
    </div>
  );
}

export default Admins;