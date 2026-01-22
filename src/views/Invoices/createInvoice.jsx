import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../api/api.js';

function CreateInvoice() {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

const handleSubmit = async (event) => {
  event.preventDefault();

  const newInvoiceData = { 
      userId: userId,
      startTime: new Date(Date.now() - 10 * 60000).toISOString(),
      customDebit: 0, 
      startPosition: { latitude: 0, longitude: 0 },
      endPosition: { latitude: 0, longitude: 0 },
  }

  try {
    await apiRequest('/api/invoices', {
      method: 'POST',
      body: JSON.stringify(newInvoiceData),
    });

    navigate('/invoices'); 

  } catch (err) {
    console.error("Fel vid borttagning:", err);
    alert(err.message);
  }
};

return (
  <div className="form-container">
    <h2>Skapa faktura</h2>

      <form onSubmit={handleSubmit} className="form-layout">
        <div className="form-group">
          <label>
            Kundnummer:
            <input 
              type="text" 
              value={userId}
              onChange={e => setUserId(e.target.value)}
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Belopp:
            <input 
              type="number" 
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </label>
        <button type="submit" className="form-button">Spara</button>
        </div>
      </form>
  </div>
  );
}

export default CreateInvoice;