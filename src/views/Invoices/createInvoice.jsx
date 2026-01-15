import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../api/api.js';

function CreateInvoice() {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const usersData = await apiRequest('/api/users');
            setUsers(usersData);
        } catch (err) {
            setError("Fel vid hämtning av användare.");
        }
    };
    fetchUsers();
  }, []);

  const handleCreateTestInvoice = async () => {
    setIsLoading(true);
    setError(null);

    if (users.length === 0) {
        setError("Användare saknas.");
        setIsLoading(false);
        return;
    }

    const testInvoiceData = { 
      userId: users[0]._id,
      startTime: new Date(Date.now() - 15 * 60000).toISOString(),
      customDebit: 0,
      startPosition: { latitude: 0, longitude: 0 },
      endPosition: { latitude: 0, longitude: 0 },
    };

    try {
      await apiRequest('/api/invoices', {
        method: 'POST',
        body: JSON.stringify(testInvoiceData),
      });
      navigate('/invoices'); 
    } catch (err) {
      setError("Kunde inte skapa faktura.");
      console.error("Fel vid skapande av faktura:", err);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div>
        <h2>Skapa Testfaktura</h2>
        <p>Klicka på knappen för att skapa en ny, slumpmässig testfaktura för den första användaren i systemet.</p>
        <button onClick={handleCreateTestInvoice} disabled={isLoading}>
        </button>
    </div>
  );
}

export default CreateInvoice;