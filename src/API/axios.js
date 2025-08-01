// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.myquran.com/v2/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
