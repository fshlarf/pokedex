import axios from 'axios'

const apiMoc = 'https://pokeapi.co/api/v2/pokemon'

const url = process.env.NODE_ENV === 'production' ? apiMoc : apiMoc

const http = {

  request (method, path, params) {
    return axios({
      method,
      url: url + path,
      data: params,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
  },

  post (url, params) {
    return this.request('POST', url, params)
  },

  get (url, params) {
    return this.request('GET', url, params)
  },

  put (url, params) {
    return this.request('PUT', url, params)
  },

  delete (url, params) {
    return this.request('DELETE', url, params)
  }

}

export default http
