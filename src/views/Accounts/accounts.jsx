import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import './accounts.css';
import { API_URL } from "../../config.js"
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
 return (

<div className="accounts-container">

      <h2 className="accounts-title">Användare</h2>

      {users.length > 0 ? (
      <table className={users.dataTable}>
        <thead>
          <tr>
            <th>E-post</th>
            <th></th>
            <th>Lösenord</th>
            <th></th>
            <th>Ta bort</th>
            <th>Ändra</th>
        </tr>
      </thead>
      <tbody>
          {users.map(user => (
            <tr key={user.email}>
              <td>{user.email}</td>
              <td></td>
              <td>{user.password}</td>
              <td></td>
              <td></td>
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