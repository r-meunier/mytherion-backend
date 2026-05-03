/**
 * Utility to determine the API URL dynamically.
 * This allows the frontend to communicate with the backend on the same host (localhost or IP)
 * without needing to change environment variables.
 */
export const getApiUrl = () => {
  // 1. Get the default API_URL from .env
  const envUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
  
  // 2. Use dynamic logic only in development
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    const { hostname, protocol } = window.location;
    
    // 3. Check if the user has provided a manual override in .env
    // If it's a generic localhost or 127.0.0.1, allow the dynamic logic to take over
    const isDefaultDevUrl = envUrl.includes('localhost') || envUrl.includes('127.0.0.1');
    
    if (isDefaultDevUrl) {
      const isLocal = hostname === 'localhost' || hostname.match(/^(\d{1,3}\.){3}\d{1,3}$/);
      
      if (isLocal) {
        // Use the hostname from the browser, take the PORT from .env
        const portMatch = envUrl.match(/:(\d+)$/);
        if (portMatch) {
          return `${protocol}//${hostname}:${portMatch[1]}`;
        }
      }
    }
  }

  // 4. Fallback: Use exactly what is in .env
  return envUrl;
};

export const API_URL = getApiUrl();
export default API_URL;
