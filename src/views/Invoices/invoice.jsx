import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import './invoice.css';
import { API_URL } from "../../config.js"

function Invoice() {
  const{invoiceId} = useParams();
  const [invoice, setInvoice] = useState(null);

     useEffect(() => {

      if(!invoiceId) return
      const fetchInvoice = async () => {

      try {
          console.log(invoiceId)
          const response = await fetch(`${API_URL}/api/invoices/${invoiceId}`);

          if (!response.ok) {
          throw new Error(`Något gick fel, status: ${response.status}.`);
        }

        const data = await response.json();
        setInvoice(data);
          // TODO: ordna eventuellt fler kontroller
        } catch (err) {
          console.error("Ett fel inträffade vid fetch:", err);
         
        }
    };
    fetchInvoice();
}, [invoiceId])

 if (!invoice) {
    return <div>Hittade ingen faktura med det angivna ID:t.</div>;
  }
 return (

<div className="invoice-container">

      <h2 className="invoice-title">Info:</h2>
        <div className="invoice-actions">
        <button>Ändra</button>
        <button>Markera som betald</button>
        <button>Ta bort</button>
        </div>

        <div className="invoice-details">
        <p><strong>Status:</strong> {invoice.paid ? "Betald" : "Obetald"}</p>
        <p><strong>Fakturanummer:</strong> {invoice._id}</p>
        <p><strong>Kund-ID:</strong> {invoice.userId}</p>    
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