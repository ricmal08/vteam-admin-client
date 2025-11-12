import React from 'react';
//import { Box, Heading, VStack, Link } from '@chakra-ui/react';
import { Link as RouterLink, Outlet } from 'react-router-dom';

function Userinterface() {
  return (
    <div className="layout-container">
      <nav className="nav-menu">
        <h2 className="nav-title">Admin-Client</h2>
        <h3> Innehåll: </h3>
        <RouterLink className="nav-link" to="/">Översikt</RouterLink>
        <RouterLink className="nav-link" to="/overview">Användare</RouterLink>
        
        <RouterLink className="nav-link" to="/units">Fordon</RouterLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Userinterface;