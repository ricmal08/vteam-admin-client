import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import './invoice.css';
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
      } catch (err) {
        console.error("Ett fel inträffade vid fetch:", err);

      }
  };
  fetchInvoice();
}, [invoiceId])

const handleMarkAsPaid = async () => {
  try {
      await apiRequest(`/api/invoices/${invoiceId}/paid`, {
      method: 'PATCH',
    });
    const updatedInvoice = await apiRequest(`/api/invoices/${invoiceId}`);
    setInvoice(updatedInvoice);

  } catch (err) {
    console.error("Fel vid uppdatering:", err);
    alert(err.message);
  }
};


if (!invoice) {

  return <div>Laddar data...</div>;
}

  const basePrice = 20;
  const timeInMinutes = invoice.time || 0;
  const timePrice = timeInMinutes * 5;
  const parkingFee = invoice.customDebit || 0;
  const discount = invoice.discount || 0;

return (

  <div className="invoice-container">
    <h2>Detaljer</h2>
        <div className="invoice-actions">
            {!invoice.paid && (
              <button onClick={handleMarkAsPaid}>Markera som betald</button>
            )}
        </div>
        <div className="invoice-group">
          <table className="invoice-details" >
            <tbody>
                <tr>
                    <td><strong>Status:</strong></td>
                    <td>{invoice.paid ? "Betald" : "Obetald"}</td>
                </tr>
                <tr>
                    <td><strong>Fakturanummer:</strong></td>
                    <td>{invoice._id}</td>
                </tr>
                <tr>
                    <td><strong>Kundnummer:</strong></td>
                    <td>{invoice.userId}</td>
                </tr>
                <tr>
                    <td><strong>Datum:</strong></td>
                    <td>{new Date(invoice.date).toLocaleString('sv-SE')}</td>
                </tr>
                <tr>
                    <td>Startavgift:</td>
                    <td>{basePrice.toFixed(2)} kr</td>
                </tr>
                <tr>
                    <td>Restid ({timeInMinutes} minuter):</td>
                    <td>{timePrice.toFixed(2)} kr</td>
                </tr>
                <tr>
                    <td>Parkeringsavgift (fri parkering):</td>
                    <td>{parkingFee.toFixed(2)} kr</td>
                </tr>
                {discount > 0 && (
                <tr>
                    <td>Rabatt:</td>
                    <td>-{discount.toFixed(2)} kr</td>
                </tr>
                )}
                <tr>
                    <td><strong>Totalt att betala:</strong></td>
                    <td><strong>{invoice.amount.toFixed(2)} kr</strong></td>
                </tr>
            </tbody>
          </table>
        
        <div className="company-info">
          <h4>Rullverket AB</h4>      
          <p><strong>Företagsadress:</strong> Enadressisverige 74, box 123 45, Stockholm, Sverige</p>
          <p><strong>Telefonnummer:</strong> 08-123 34 24</p>
          <p><strong>E-post:</strong> info@rullverket.se</p>
        </div>
      </div>
  </div>
    
  );
}

export default Invoice;