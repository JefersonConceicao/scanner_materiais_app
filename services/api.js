import axios from 'axios';
 
const api = axios.create({
    baseURL: 'http://scanner.mallone.com.br'
})

export default api;