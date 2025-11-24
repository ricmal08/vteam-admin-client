import React from 'react';
//import { Box, Heading, VStack } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Userinterface from './components/interface/userinterface.jsx';
import Accounts from './views/Accounts/accounts.jsx';
import Units from './views/Units/units.jsx';

const API_URL = "http://localhost:5173"

function App() {
  const [count, setCount] = useState(0)

  return (
     <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<Userinterface />}>

          {/*Dashboard-komponent
          <Route index element={<Dashboard />} />*/}

          <Route path="overview" element={<Accounts apiUrl={API_URL} />} />

          <Route path="units" element={<Units apiUrl={API_URL} />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
