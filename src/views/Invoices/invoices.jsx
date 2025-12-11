import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import './invoices.css';
import { API_URL } from "../../config.js"

function Invoices() {
  const [invoices, setInvoices] = useState([]);

     useEffect(() => {
      const fetchInvoices = async () => {

      try {

          const response = await fetch(`${API_URL}/api/invoices`);

          if (!response.ok) {
          throw new Error(`Något gick fel, status: ${response.status}.`);
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
      <h3 className="invoices-create"><Link>Skapa faktura</Link></h3>

      {invoices.length > 0 ? (
      <table className={invoices.dataTable}>
        <thead>
          <tr>
            <th>Faktura-ID</th>
            <th>Kundnummer</th>
            <th>Datum</th>
            <th>Belopp</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(invoice => (
            <tr key={invoice._id}>
              <td><Link
                  to={`/invoices/${invoice._id}`}>
                  {invoice._id}
                </Link></td>
              <td>{invoice.userId}</td>
              <td>{new Date(invoice.date).toLocaleDateString("sv-SE")}</td>
              <td>{invoice.amount} kr</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>Inga fakturor kunde hittas.</p>
    )}
  </div>
);
}

export default Invoices;
