import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import './invoices.css';
import { API_URL } from "../../config.js"
import { apiRequest } from '../../api/api.js';

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);

     useEffect(() => {
      const fetchInvoices = async () => {

      try {

          const data = await apiRequest('/api/invoices');
          console.log("Mottagen data från /api/invoices:", data); 
          setInvoices(data);
            // TODO: ordna eventuellt fler kontroller
        } catch (err) {
          console.error("Ett fel inträffade vid fetch:", err);
         
        }
    };
    fetchInvoices();
}, [])

 const handleDelete = async (invoiceId) => {

      try {

        await apiRequest(`/api/invoices/${invoiceId}`, {
              method: 'DELETE',
        });

        setInvoices(currentInvoices => 
            currentInvoices.filter(invoice => invoice._id !== invoiceId)
        );

      } catch (err) {
        console.error("Fel vid borttagning:", err);
        //TODO: felhantering
        alert(err.message);
      }

  };
 return (

<div className="invoices-container">

      <h2 className="invoices-title">Fakturor</h2>
      <Link to="/invoices/create" className="invoices-create">
        + Skapa faktura
      </Link>

      {invoices.length > 0 ? (
      <table className={invoices.dataTable}>
        <thead>
          <tr>
            <th>Fakturnummer</th>
            <th>Kundnummer</th>
            <th>Datum</th>
            <th>Belopp</th>
            <th>Ta bort</th>
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
              <td>
              <button 
                  onClick={() => handleDelete(invoice._id)} >
              </button>
              </td>
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
