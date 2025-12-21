import React from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import './userinterface.css'; 

function Userinterface() {
  return (
    <div className="layout-container">
      <nav className="nav-menu">
        <h2 className="nav-title">Admin-Client</h2>
        <h3> Innehåll: </h3>
        <RouterLink className="nav-link" to="/login">Logga in</RouterLink>
        <RouterLink className="nav-link" to="/">Översikt</RouterLink>
        <RouterLink className="nav-link" to="/users">Användare</RouterLink>
        <RouterLink className="nav-link" to="/bikes">Cyklar</RouterLink>
        <RouterLink className="nav-link" to="/cities">Städer</RouterLink>
        <RouterLink className="nav-link" to="/users">Zoner</RouterLink>
        <RouterLink className="nav-link" to="/invoices">Fakturor</RouterLink>
        <RouterLink className="nav-link" to="/admins">Administratörer</RouterLink>
        <RouterLink className="nav-link" to="/admins">Dashboard</RouterLink>
      </nav>
      <main>
        <Outlet />
      </main>


        <aside className="layout-searchbar">
          <div className="layout-box">
            <h3>Sök:</h3>
            <p>Kundnummer:</p>
            <p>Kontonummer:</p>
            <p>Registreringsnummer:</p>
            <p>Fakturanummer:</p>
          </div>
        </aside>

      </div>
  
  );
}

export default Userinterface;