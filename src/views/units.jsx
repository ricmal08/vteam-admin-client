import React, { useState, useEffect } from 'react';
import { Box, Heading, VStack } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';

function Units({ apiUrl }) {

     useEffect(() => {
}, [apiUrl])
 return (

<Box p={8}>

     <Heading>Fordon</Heading>
      <p>Här kommer befintliga fordon att synas.</p>
</Box>

    );
}

export default Units;