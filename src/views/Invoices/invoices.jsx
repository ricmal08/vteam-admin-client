import React, { useState, useEffect } from 'react';
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
      <table className={invoices.dataTable}>
        <thead>
          <tr>
            <th>Faktura-ID</th>
            <th></th>
            <th>Datum</th>
            <th>Belopp</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(invoice => (
            <tr key={invoice.userId}>
              <td></td>
              <td></td>
              {/*<td></td>*/}
              {/*<td></td>*/}
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
