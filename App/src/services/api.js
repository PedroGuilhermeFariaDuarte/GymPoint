import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:7864',
});

export default api;
