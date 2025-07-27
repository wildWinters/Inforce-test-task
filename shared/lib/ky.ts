import ky from 'ky';
const URL  = "http://localhost:4000";

export const kyInstance = ky.create({
  prefixUrl: URL,
  timeout: 10000,                     
  retry: {
    limit: 2,                        
    methods: ['get', 'put', 'post', 'delete'],
    statusCodes: [408, 500, 502, 503, 504],
  },
  headers: {
    'Content-Type': 'application/json',
  },
});