export const API_URL = process.env.NODE_ENV === "test" 
  ? 'http://mocked-api-url' 
  : import.meta.env.VITE_API_URL;

export const WEBSOCKET_URL = process.env.NODE_ENV === "test" 
? 'ws://mocked-api-url/cable' 
: import.meta.env.VITE_WEBSOCKET_URL;