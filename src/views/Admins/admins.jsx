import React, { useState, useEffect } from 'react';
//import { Box, Heading, VStack } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import './admins.css';
import { API_URL } from "../../config.js"

function Admins() {
  const [admins, setAdmins] = useState([]);

    useEffect(() => {
      const fetchAdmins = async () => {
        try {

          const response = await fetch(`${API_URL}/api/admins`);

          if (!response.ok) {
          throw new Error(`Något gick fel, status: ${response.status}`);
        }

        const data = await response.json();
        setAdmins(data);
          // TODO: ordna eventuellt fler kontroller
        } catch (e) {
          // TODO: ordna felhantering
      }
    };
    fetchAdmins();
}, [])
 return (

<div className="admins-container">

      <h2 className="admins-title">Administratörer</h2>

      {/*{admins.length > 0 ? (
        <ul>
          {admins.map(admins => (

            <li key={admins._id}>{admins.username}</li>
          ))}
        </ul>
      ) : (
        <p>Inga administratörer kunde hittas.</p>
      )}*/}
    </div>
  );
}

export default Admins;