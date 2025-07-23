import { initInstance } from '@ftdata/http';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://api-fulltrack4.ftdata.com.br';
const instance = initInstance({
  baseUrl: import.meta.env.VITE_API_URL || BASE_URL,
});

export default instance;
