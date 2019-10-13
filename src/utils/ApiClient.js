import axios from 'axios'
import config from '../config.json'

export const apiClient = axios.create({
    baseURL: config.apiServer,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 10000
});
