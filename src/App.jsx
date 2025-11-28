import React from 'react';
//import { Box, Heading, VStack } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import { API_URL } from './config.js';
import './App.css'

import Userinterface from './components/interface/userinterface.jsx';
import Accounts from './views/Accounts/accounts.jsx';
import Units from './views/Units/units.jsx';
//import Invoices from
//import Admins from './views/Admins/admins.jsx';
import Invoices from './views/Invoices/invoices.jsx'

//const API_URL = "http://localhost:5173"
//const API_URL = "http://localhost:3000"

function App() {
  const [count, setCount] = useState(0)

  return (
     <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<Userinterface />}>

          {/*Dashboard-komponent
          <Route index element={<Dashboard />} />*/}

          {/*<Route path="admins" element={<Admins  />} />*/}

          <Route path="units" element={<Units/>} />
          {/*<Route path="invoices" element={<Invoices apiUrl={API_URL} />} />*/}
          <Route path="overview" element={<Accounts/>} />

          <Route path="units" element={<Units  />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
