// Dynamic API Base URL detection:
// In production (when hosted on techla.lk), it automatically connects to techlabackend.techla.lk
// When running locally (localhost:3000), it connects to localhost:5000
const isProd = typeof window !== 'undefined' && !window.location.hostname.includes('localhost');
export const API_BASE_URL = isProd
  ? 'https://techlabackend.techla.lk/api'
  : 'http://localhost:5000/api';
