import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Login from './views/Login/login.jsx';
import Userinterface from './components/interface/userinterface.jsx';

import Accounts from './views/Accounts/accounts.jsx';
import User from './views/Accounts/account.jsx';
import CreateUser from './views/Accounts/createUser.jsx';
import EditUser from './views/Accounts/editUser.jsx';

import Bikes from './views/Bikes/bikes.jsx';
import CreateBike from './views/Bikes/createBike.jsx';
import EditBike from './views/Bikes/editBike.jsx';

import Admins from './views/Admins/admins.jsx';
import CreateAdmin from './views/Admins/createAdmin.jsx';

import Invoices from './views/Invoices/invoices.jsx';
import Invoice from './views/Invoices/invoice.jsx';
import CreateInvoice from './views/Invoices/createInvoice.jsx';

import Cities from './views/Cities/cities.jsx'
import CreateCity from './views/Cities/createCity.jsx';
import City from './views/Cities/city.jsx';
import EditCity from './views/Cities/editCity.jsx';





function App() {
  const [count, setCount] = useState(0)
  const [token, setToken] = useState(localStorage.getItem('accessToken'));

  return (
     <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/" element={<Userinterface />}>
          
        
          

            {/*Dashboard-komponent
            <Route index element={<Dashboard />} />*/}

            {/* Admins-endpoints */}
            <Route path="admins" element={<Admins />} />
            <Route path="admins/create" element={<CreateAdmin/>} />

            {/* Bikes-endpoints */}
            <Route path="bikes" element={<Bikes/>} />
            <Route path="bikes/create" element={<CreateBike/>} />
            <Route path="bikes/:bikeId" element={<EditBike />} />

            {/* Invoices-endpoints */}
            <Route path="invoices" element={<Invoices/>} />
            <Route path="invoices/create" element={<CreateInvoice/>} />
            <Route path="invoices/:invoiceId" element={<Invoice />} />
            
            {/* Users-endpoints */}
            <Route path="users" element={<Accounts/>} />
            <Route path="users/create" element={<CreateUser/>} />
            <Route path="users/:userId" element={<User />} />
            <Route path="users/:userId/edit" element={<EditUser />} />

            {/* Cities-endpoints */}
            <Route path="cities" element={<Cities/>} />
            <Route path="cities/create" element={<CreateCity/>} />
            <Route path="cities/:cityId" element={<City/>} />
            <Route path="cities/:cityId/edit" element={<EditCity />} />



        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
