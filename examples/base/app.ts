import pxios from '../../src/index'

// pxios({
//     method: 'get',
//     url: '/url/test',
//     params: {
//         foo: ['bar', 'baga']
//     }
// })

// pxios({
//     method: 'get',
//     url: '/url/test',
//     params: {
//         foo: {
//             bar: 'baga'
//         }
//     }
// })

// const date = new Date()

// pxios({
//     method: 'get',
//     url: '/url/test',
//     params: {
//         date
//     }
// })

// pxios({
//     method: 'get',
//     url: '/url/test',
//     params: {
//         foo: '@:$, '
//     }
// })

// pxios({
//     method: 'get',
//     url: '/url/test',
//     params: {
//         foo: '@:$,',
//         bar: null
//     }
// })

// pxios({
//     method: 'get',
//     url: '/url/test#hash',
//     params: {
//         foo: 'bar,'
//     }
// })

// pxios({
//     method: 'get',
//     url: "/url/test?bar='ssss'",
//     params: {
//         foo: 'yes'
//     }
// })

// // 检测transformData效果的请求
// pxios({
//     method: 'post',
//     url: '/url/post',
//     data: {
//         a: 1,
//         b: 2
//     }
// })

// const arr = new Int32Array([21, 31])
// pxios({
//     method: 'post',
//     url: '/url/buffer',
//     data: arr
// })
// // 添加了headers配置
// pxios({
//     method: 'post',
//     url: '/url/post',
//     headers: {
//         'content-type': 'application/json',
//         'Accept': 'application/json, text/plain, */*'
//     },
//     data: {
//         a: 1,
//         b: 2
//     }
// })

// const paramsString = 'q=URLUtils.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)
// // 传入了URLSearchParams时  浏览器会自动设置合适的content-type： application/x-www-form-urlencoded
// pxios({
//     method: 'post',
//     url: '/url/post',
//     data: searchParams
// })

// // 验证Promise化
pxios({
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
pxios({
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