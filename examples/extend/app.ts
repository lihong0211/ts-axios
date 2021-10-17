import axios from '../../src/index'

axios({
    method: 'get',
    url: '/extend/get',
    params: {
        a: 1,
        b: 2
    },
    headers: {
      'content-type': 'application/json'
    },
    responseType: 'json',
})

axios('/extend/get', {
  params: {
    test: 1
  },
})

axios.get('/extend/get', {
  params: {
    a: 1,
    b: 2
  },
  headers: {
    'content-type': 'application/json'
  },
  responseType: 'json'
})
axios.delete('/extend/delete')
axios.head('/extend/head')
axios.options('/extend/options')

axios.post('/extend/post', { test: 1 })
axios.put('/extend/put', { test: 1 })
axios.patch('/extend/patch', { test: 1 })