import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import { apiRequest } from '../../api/api.js';

function CreateInvoice() {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

const handleSubmit = async (event) => {
  event.preventDefault();

  //har hårdkodat in startTime, startPosition och endPosition för att formatet ska matcha det backendservern väntar sig.
  const newInvoiceData = { 
        userId: userId, 
        amount: parseFloat(amount),
        startTime: new Date().toISOString(),
        startPosition: { lat: 0, lon: 0 },
        endPosition: { lat: 0, lon: 0 },
  }
  //console.log(newInvoiceData);
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
    <form onSubmit={handleSubmit}>
      <h2>Skapa ny faktura</h2>
      <label>
        Kundnummer:
        <input 
          type="text" 
          value={userId}
          onChange={e => setUserId(e.target.value)}
        />
      </label>
      <label>
        Belopp:
        <input 
          type="number" 
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </label>
      <button type="submit">Spara</button>
    </form>
  );
}

export default CreateInvoice;