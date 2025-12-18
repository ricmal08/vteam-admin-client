import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import './invoice.css';
import { API_URL } from "../../config.js"
import { apiRequest } from '../../api/api.js';

function Invoice() {
  const{invoiceId} = useParams();
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState(null);

    useEffect(() => {

      if(!invoiceId) return

      const fetchInvoice = async () => {

      try {

        const data = await apiRequest(`/api/invoices/${invoiceId}`);
        setInvoice(data);
          // TODO: ordna eventuellt fler kontroller
        } catch (err) {
          console.error("Ett fel inträffade vid fetch:", err);
         
        }
    };
    fetchInvoice();
}, [invoiceId])

const handleMarkAsPaid = async () => {
    try {
       //uppdaterar datan direkt, behöver ej lagra det
        await apiRequest(`/api/invoices/${invoiceId}/paid`, {
        method: 'PATCH',
      });
      //hämta om fakturan med uppdaterade datapunkten.
      const updatedInvoice = await apiRequest(`/api/invoices/${invoiceId}`);
      setInvoice(updatedInvoice);

    } catch (err) {
      console.error("Fel vid uppdatering:", err);
      alert(err.message);
    }
  };


 if (!invoice) {
    return <div>Hittar ingen faktura med angivet fakturanummer.</div>;
  }
 return (

<div className="invoice-container">
    <div className="invoice-actions">
        {!invoice.paid && (
          <button onClick={handleMarkAsPaid}>Markera som betald</button>
        )}
        </div>

      <h2 className="invoice-title">Info:</h2>
        

        <div className="invoice-details">
        <p><strong>Status:</strong> {invoice.paid ? "Betald" : "Obetald"}</p>
        <p><strong>Fakturanummer:</strong> {invoice._id}</p>
        <p><strong>Kundnummer:</strong> {invoice.userId}</p>    
        <p><strong>Datum:</strong> {new Date(invoice.date).toLocaleString('sv-SE')}</p>
        <p><strong>Service: Genomförd färd</strong></p>
        <p> <strong>Antal: </strong> 1 st</p>
        <p><strong>À-pris:</strong> {invoice.amount} kr</p>
        <p><strong>Total:</strong> {invoice.amount} kr</p>

        <div className="company-info">
        <p><strong>Rullverket AB</strong></p>    
        <p><strong>Företagsadress:</strong> Enadressisverige 74, box 123 45, Stockholm, Sverige</p>
        <p><strong>Telefonnummer:</strong> 08-123 34 24</p>
        <p><strong>E-post:</strong> info@rullverket.se</p>
        </div>

        </div>
    </div>

);
}

export default Invoice;