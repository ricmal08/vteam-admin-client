import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './account.css';
import { apiRequest } from '../../api/api.js';

function User() {
  const{userId} = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

    useEffect(() => {

      if(!userId) return

      const fetchUser = async () => {

      try {

        const data = await apiRequest(`/api/users/${userId}`);
        setUser(data);
          // TODO: ordna eventuellt fler kontroller
        } catch (err) {
          console.error("Ett fel inträffade vid fetch:", err);
         
        }
    };
    fetchUser();
}, [userId])

 if (!user) {
    return <div>Hittar ingen kund med angivet kundnummer.</div>;
  }
 return (

<div className="user-container">
  
    <div className="user-actions">
    </div>
      <h2 className="user-title">Info:</h2>
        <Link to={`/users/${userId}/edit`}>
        <button>Redigera användare</button>
        </Link>
        <div className="user-details">
        <p><strong>Kundnummer:</strong> {user._id}</p>
        <p><strong>Epost:</strong> {user.email}</p>        
        </div>
    </div>

);
}

export default User;