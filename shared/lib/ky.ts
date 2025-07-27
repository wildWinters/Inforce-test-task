import ky from 'ky';

export const kyInstance = ky.create({
  prefixUrl: 'http://localhost:3000',
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