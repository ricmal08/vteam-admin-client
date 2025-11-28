import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import './invoices.css';
import { API_URL } from "../../config.js"

function Invoices() {
  const [invoices, setInvoices] = useState([]);

     useEffect(() => {
      const fetchInvoices = async () => {

    try {

          const response = await fetch(`${API_URL}/api/invoices`);

          if (!response.ok) {
          throw new Error(`Något gick fel, status: ${response.status}. Mer info: ${errorData.message}`);
        }

        const data = await response.json();
        setInvoices(data);
          // TODO: ordna eventuellt fler kontroller
        } catch (err) {
          console.error("Ett fel inträffade vid fetch:", err);
         
        }
    };
    fetchInvoices();
}, [])
 return (

<div className="invoices-container">

      <h2 className="invoices-title">Fakturor</h2>

      {invoices.length > 0 ? (
        <ul>
          {invoices.map(invoice => (

            <li key={invoice._id}>{invoice.email}</li>
          ))}
        </ul>
      ) : (
        <p>Inga fakturor kunde hittas.</p>
      )}
    </div>
  );
}

export default Invoices;
