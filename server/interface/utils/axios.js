import axios from 'axios'

const instance = axios.create({
  baseURL: `http://${process.env.Host||'localhost'}:${process.env.port||3000}`,
  timeout: 30*1000,
  haeders: {}
})

export default instance