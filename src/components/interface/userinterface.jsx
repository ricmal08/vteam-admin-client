import React from 'react';
import { Link as RouterLink, Outlet, useNavigate } from 'react-router-dom';
import './userinterface.css'; 

function Userinterface(currentUser) {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

return (
  <div className="layout-container">
    <nav className="nav-menu">
      <h2 className="nav-title">Adminwebb</h2>
          <button onClick={handleLogout} className="logout-button">Logga ut</button>
      <h4> Meny </h4>

    {!currentUser && (
    <RouterLink className="nav-link" to="/login">Logga in</RouterLink>
    )}

    {currentUser && (
      <>
      <RouterLink className="nav-link" to="/map">Karta</RouterLink>
      <RouterLink className="nav-link" to="/users">Användare</RouterLink>
      <RouterLink className="nav-link" to="/bikes">Cyklar</RouterLink>
      <RouterLink className="nav-link" to="/cities">Städer</RouterLink>
      <RouterLink className="nav-link" to="/invoices">Fakturor</RouterLink>
      <RouterLink className="nav-link" to="/admins">Admins</RouterLink>
      <RouterLink className="nav-link" to="/simulation">Simulering</RouterLink>
      </>
      )}
    </nav>
    <main className="content-container">
      <Outlet />
    </main>


  </div>
  );
}

export default Userinterface;