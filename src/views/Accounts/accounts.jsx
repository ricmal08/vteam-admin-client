import React, { useState, useEffect } from 'react';
//import { Box, Heading, VStack } from '@chakra-ui/react';
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
          throw new Error(`Något gick fel, status: ${response.status}. Mer info: ${errorData.message}`);
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
        <ul>
          {users.map(user => (

            <li key={user._id}>{user.email}</li>
          ))}
        </ul>
      ) : (
        <p>Inga användare kunde hittas.</p>
      )}
    </div>
  );
}

export default Accounts;