// Central API configuration
// In local development, VITE_API_URL can be omitted or empty, and requests
// will route to /api/... which Vite proxy forwards to http://localhost:5000.
// In production on Vercel, set VITE_API_URL in Vercel project settings to your backend URL
// (e.g., https://your-backend.onrender.com).

const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export default API_BASE_URL;
