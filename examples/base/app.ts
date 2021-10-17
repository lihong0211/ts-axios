import axios from '../../src/index'

axios({
    method: 'get',
    url: '/url/test',
    params: {
        foo: ['bar', 'baga']
    }
})

axios({
    method: 'get',
    url: '/url/test',
    params: {
        foo: {
            bar: 'baga'
        }
    }
})

const date = new Date()

axios({
    method: 'get',
    url: '/url/test',
    params: {
        date
    }
})

axios({
    method: 'get',
    url: '/url/test',
    params: {
        foo: '@:$, '
    }
})

axios({
    method: 'get',
    url: '/url/test',
    params: {
        foo: '@:$,',
        bar: null
    }
})

axios({
    method: 'get',
    url: '/url/test#hash',
    params: {
        foo: 'bar,'
    }
})

axios({
    method: 'get',
    url: "/url/test?bar='ssss'",
    params: {
        foo: 'yes'
    }
})

// 检测transformData效果的请求
axios({
    method: 'post',
    url: '/url/post',
    data: {
        a: 1,
        b: 2
    }
})

const arr = new Int32Array([21, 31])
axios({
    method: 'post',
    url: '/url/buffer',
    data: arr
})
// 添加了headers配置
axios({
    method: 'post',
    url: '/url/post',
    headers: {
        'content-type': 'application/json',
        'Accept': 'application/json, text/plain, */*'
    },
    data: {
        a: 1,
        b: 2
    }
})

const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)
// 传入了URLSearchParams时  浏览器会自动设置合适的content-type： application/x-www-form-urlencoded
axios({
    method: 'post',
    url: '/url/post',
    data: searchParams
})

// // 验证Promise化
axios({
    method: 'post',
    url: '/url/post',
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
// 设置了responseType
axios({
    method: 'post',
    url: '/url/post',
    responseType: 'json',
    data: {
        a: 1,
        b: 2
    }
}).then(res => {
    console.log(res)
})