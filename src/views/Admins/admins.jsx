import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './admins.css';
import { apiRequest } from '../../api/api.js';

function Admins() {
  const [admins, setAdmins] = useState([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [error, setError] = useState(null);

    useEffect(() => {
      const fetchAdmins = async () => {


        try {

          const data = await apiRequest('/api/admins');
          if (data && data.length > 0 && data[0].role !== undefined) {
          setIsSuperAdmin(true);
        } else {
          setIsSuperAdmin(false);
        }
          setAdmins(data);
        } catch (err) {
          console.error("Ett fel inträffade vid fetch:", err);
         
        }
    };
    fetchAdmins();
}, [])

const handleDelete = async (adminEmail) => {

      try {
        await apiRequest(`/api/admins/${adminEmail}`, {
              method: 'DELETE',
        });

        setAdmins(currentAdmins => 
            currentAdmins.filter(admin => admin.email !== adminEmail)
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
                  {isSuperAdmin && <th>Behörighet</th>}
                  <th>Id</th>
                  <th>E-post</th>
                  <th>Ta bort</th>
              </tr>
            </thead>
            <tbody>
                {admins.map(admin => (
                  <tr key={admin.id}>
                    {isSuperAdmin && <td>{admin.role}</td>}
                    <td>{admin.id}</td>
                    <td>{admin.email}</td>
                     <td>
                      <button onClick={() => handleDelete(admin.email)}>
                        Ta bort
                      </button>
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