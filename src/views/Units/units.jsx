import React, { useState, useEffect } from 'react';
//import { Box, Heading, VStack } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from "../../config.js"

import './units.css';

function Units() {

  const [units, setUnits] = useState([]);
    useEffect(() => {
          const fetchUnits= async () => {


            try {

              const response = await fetch(`${API_URL}/api/bikes`);

              if (!response.ok) {
              throw new Error(`Något gick fel, status: ${response.status}. Mer info: ${errorData.message}`);
            }

            const data = await response.json();
            setUnits(data);
              // TODO: ordna eventuellt fler kontroller
            } catch (err) {
              console.error("Ett fel inträffade vid fetch:", err);

            }
        };
        fetchUnits();
    }, [])
    return (

<div className="units-container">

      <h2 className="units-title">Fordon</h2>

      <p>Här kommer befintliga Fordon att synas.</p>
    </div>
  );
}

export default Units;