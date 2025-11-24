import React, { useState, useEffect } from 'react';
//import { Box, Heading, VStack } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import './accounts.css';

function Accounts({ apiUrl }) {

     useEffect(() => {
}, [apiUrl])
 return (

<div className="accounts-container">

      <h2 className="accounts-title">Användare</h2>

      <p>Här kommer befintliga konton att synas.</p>
    </div>
  );
}

export default Accounts;