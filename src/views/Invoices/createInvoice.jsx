import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

function CreateInvoice() {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

const handleSubmit = async (event) => {
  event.preventDefault();
  const newInvoiceData = { userId, amount };

  try {
    const response = await fetch(`${API_URL}/api/invoices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newInvoiceData),
    });

  } catch (err) {}
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