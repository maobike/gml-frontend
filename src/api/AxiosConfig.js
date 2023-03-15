
import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 30000,
    headers: {
      'Content-type': 'application/json',
    },
});

export const axiosInstanceExtern = axios.create({
    baseURL: 'https://restcountries.com',
    timeout: 30000,
    headers: {
      'Content-type': 'application/json',
    },
});
