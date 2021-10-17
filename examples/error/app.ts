import axios, { AxiosError } from '../../src'

axios({
    method: 'get',
    url: '/error/get',
    data: {
        a: 1,
        b: 2
    },
    headers: {
        'content-type': 'application/json',
    }
}).then(res => {
    console.log(res)
})
axios({
    method: 'get',
    url: '/error/timeout',
    responseType: 'json',
    timeout: 2000,
    data: {
        a: 1,
        b: 2
    }
}).then(res => {
    console.log(res)
}).catch((e: AxiosError) => {
    console.log(e.message)
    console.log(e.config)
    console.log(e.request)
    console.log(e.isAxiosError)
})

axios({
    method: 'get',
    url: '/error/get1',
    responseType: 'json',
    data: {
        a: 1,
        b: 2
    }
}).then(res => {
    console.log(res)
}).catch(e => {
    console.log(e)
})

setTimeout(() => { // 模拟网络错误  打开页面后点击offline
    axios({
        method: 'get',
        url: '/error/get',
        data: {
            a: 1,
            b: 2
        },
        headers: {
            'content-type': 'application/json',
        }
    }).then(res => {
        console.log(res)
    })
}, 5000)