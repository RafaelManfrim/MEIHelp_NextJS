import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://0.0.0.0:8001/api'
})
