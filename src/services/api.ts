import axios from 'axios'

export const api = axios.create({
  baseURL: "https://to-do-api-2a54.onrender.com"
})