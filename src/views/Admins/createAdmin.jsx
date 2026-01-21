import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../api/api.js';


function CreateAdmin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    const newAdminData = {
    email,
    password,
    role
    };
    //console.log(newAdminData);
    try {
        await apiRequest('/api/admins', {
        method: 'POST',
        body: JSON.stringify(newAdminData),
    });

        navigate('/admins'); 

    } catch (err) {
        console.error("Fel vid borttagning:", err);
        alert(err.message);
    }
};

return (
    <div className="form-container">
        <h2>Skapa administratör</h2>

            <form onSubmit={handleSubmit} className="form-layout">
            
                <div className="form-group">
                    <label htmlFor="email">E-post:
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="role">Roll:
                        <input
                            id="role"
                            type="text"
                            value={role}
                            onChange={e => setRole(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Lösenord:
                        <input
                            id="password"
                            type="text"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            erquired
                        />
                    </label>
                </div>
                <button type="submit" className="form-button">Spara</button>
        </form>
    </div>
);
}

export default CreateAdmin