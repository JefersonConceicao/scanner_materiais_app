import axios from 'axios';
 
const api = axios.create({
    baseURL: 'https://scanner.mallone.com.br'
})

export default api;