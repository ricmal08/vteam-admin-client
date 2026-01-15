import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
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

    <div className="form-container">
      <h2>Översikt:</h2>
          <Link to={`/users/${userId}/edit`} className="button-link">
              Redigera
          </Link>
          <div className="form-group">
          <p><strong>Kundnummer:</strong> {user._id}</p>
          <p><strong>Förnamn:</strong> {user.firstName}</p>
          <p><strong>Efternamn:</strong> {user.lastName}</p>    
          <p><strong>Stad:</strong> {user.city}</p>    
          <p><strong>Adress:</strong> {user.street}</p>    
          <p><strong>Postnummer:</strong> {user.zipCode}</p>
          <p><strong>E-post:</strong> {user.email}</p>       
          </div>
    </div>

);
}

export default User;