import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../api/api.js';
import './admin.css';

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
    <div className="admin-container">
        <h2 className="admin-title">Översikt:</h2>
        <form onSubmit={handleSubmit}>
            <h2>Skapa ny administratör</h2>
                <div>
                    <label htmlFor="email">E-post:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="role">Roll:</label>
                    <input
                        id="role"
                        type="text"
                        value={role}
                        onChange={e => setRole(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Lösenord:</label>
                    <input
                        id="password"
                        type="text"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Spara</button>
        </form>
    </div>
);
}

export default CreateAdmin