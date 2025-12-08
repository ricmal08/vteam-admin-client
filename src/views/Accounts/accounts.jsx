import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import './accounts.css';
import { API_URL } from "../../config.js"

function Accounts() {
  const [users, setUsers] = useState([]);

    useEffect(() => {
      const fetchUsers = async () => {


        try {

          const response = await fetch(`${API_URL}/api/users`);

          if (!response.ok) {
          throw new Error(`Något gick fel, status: ${response.status}.`);
        }

        const data = await response.json();
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