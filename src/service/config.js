let baseURL = process.env.VITE_BASE_API
let baseURL_K = process.env.VITE_BASE_API_K
const TIME_OUT = 10000000

const mode = import.meta.env.MODE
if (mode === 'development') {
  baseURL = '/api'
  baseURL_K = '/kapi'
}

export { baseURL, TIME_OUT, baseURL_K }
