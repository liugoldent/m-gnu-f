import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ROUTE,
  timeout: 5000
})

export default axiosInstance



