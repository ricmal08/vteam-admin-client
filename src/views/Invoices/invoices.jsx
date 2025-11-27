import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import './invoices.css';
import { API_URL } from "../../config.js"

function Invoices({ apiUrl }) {

     useEffect(() => {
}, [apiUrl])
 return (

<div className="invoices-container">

      <h2 className="invoices-title">Fakturor</h2>

      <p>Här kommer befintliga fakturor att synas.</p>
    </div>
  );
}

export default Invoices;