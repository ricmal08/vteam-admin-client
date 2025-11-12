import React, { useState, useEffect } from 'react';
//import { Box, Heading, VStack } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';

import './units.css';

function Units({ apiUrl }) {

     useEffect(() => {
}, [apiUrl])
 return (

<div className="units-container">

      <h2 className="units-title">Fordon</h2>

      <p>Här kommer befintliga Fordon att synas.</p>
    </div>
  );
}

export default Units;