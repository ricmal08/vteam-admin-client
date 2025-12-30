import { API_URL } from '../config';

async function apiRequest(endpoint, options = {}) {
  // hämtar accesstoken från localstorage
  const token = localStorage.getItem('accessToken');


  //skapar headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  //om token finns, lägg till headern
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    //fetchanrop
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json(); 
    
      const errorMessage = errorData.message || `Nätverksfel, status: ${response.status}`;

      if (response.status === 401) {
        localStorage.removeItem('accessToken'); // Ta bort den felaktig token ur localstorage
        window.location.href = '/login'; // Tvinga omdirigering.
      }
      throw new Error(`Nätverksfel, status: ${errorMessage}`);
    }

    return response.json();

  } catch (error) {
    console.error(`API-anrop till ${endpoint} misslyckades:`, error);

    throw error;
  }
};

export { apiRequest };