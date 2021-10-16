import pxios from '../../src/index'

pxios({
    method: 'get',
    url: '/simple/get',
    params: {
        a: 1,
        b: 2
    }
})

pxios({
    method: 'get',
    url: '/simple/msg'
})