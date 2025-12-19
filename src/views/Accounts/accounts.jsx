import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './accounts.css';
import { apiRequest } from '../../api/api.js';

function Accounts() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

    useEffect(() => {
      const fetchUsers = async () => {


        try {

          const data = await apiRequest('/api/users');

          setUsers(data);
          // TODO: ordna eventuellt fler kontroller
        } catch (err) {
          console.error("Ett fel inträffade vid fetch:", err);
         
        }
    };
    fetchUsers();
}, [])

const handleDelete = async (userId) => {

      try {

        await apiRequest(`/api/users/${userId}`, {
              method: 'DELETE',
        });

        setUsers(currentUsers => 
            currentUsers.filter(user => user._id !== userId)
        );

      } catch (err) {
        console.error("Fel vid borttagning:", err);
        //TODO: felhantering
        alert(err.message);
      }
  };
 return (

<div className="accounts-container">

      <h2 className="accounts-title">Användare</h2>
        <Link to="/users/create" className="users-create">
          + Lägg till
        </Link>

      {users.length > 0 ? (
      <table className={users.dataTable}>
        <thead>
          <tr>
            <th>E-post</th>
            <th>Ändra</th>
            <th>Ta bort</th>
        </tr>
      </thead>
      <tbody>
          {users.map(user => (
            <tr key={user.email}>
              <td>{user.email}</td>
              <td>
                <Link to={`/users/${user._id}`}>
                  <button></button>
                </Link>
              </td>
              <td>
              <button 
                  onClick={() => handleDelete(user._id)} >
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      ) : (
        <p>Inga användare kunde hittas.</p>
      )}
    </div>
  );
}

export default Accounts;