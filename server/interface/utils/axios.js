import axios from 'axios'

const instance = axios.create({
  baseURL: `http://117.51.155.165`,
  timeout: 30*1000,
  haeders: {}
})

export default instance