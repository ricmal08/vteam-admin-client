import React, { useState, useEffect } from 'react';
import { Box, Heading, VStack } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';

function Accounts({ apiUrl }) {

     useEffect(() => {
}, [apiUrl])
 return (

<Box p={8}>

     <Heading>Användare</Heading>
      <p>Här kommer befintliga konton att synas.</p>
</Box>

    );
}

export default Accounts;