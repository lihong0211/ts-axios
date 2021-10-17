const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
        colors: true,
        chunks: false
    }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const router = express.Router()

router.get('/simple/get', function(req, res){
    res.json({
        msg: 'hello world'
    })
})

router.get('/simple/msg', function(req, res) {
    res.json({
        code: 0,
        msg: 'success',
        data: [{a: 'phnix'}]
    })
})

router.get('/url/test', function(req, res) {
    res.json({
        code: 0,
        msg: 'success',
        data: req.query
    })
})

router.post('/url/post', function(req, res) {
    res.json({
        code: 0,
        msg: 'ok',
        data: req.body
    })
})
// buffer测试
router.post('/url/buffer', function(req, res) {
    let msg = []
    req.on('data', chunk => {
        if (chunk) {
            msg.push(chunk)
        }
    })
    req.on('end', () => {
        let buf = Buffer.concat(msg)
        res.json(buf.toJSON())
    })
})

function registErrorRouter() {
    router.get('/error/get', function(req, res) {
        if (Math.random() > 0.5) {
            res.json({
                msg: 'hellow world'
            })
        } else {
            res.status(500)
            res.end()
        }
    })
    
    router.get('/error/timeout', function (req, res) {
        setTimeout(() => {
            res.json({
                mes: 'hellow world'
            })
        }, 3000)
    })
}



function registExtendRouter () {
    const requestArr = ['get', 'delete', 'head', 'options', 'post', 'put', 'patch']
    requestArr.forEach(item => {
        wrapRouter(item, `/extend/${item}`)
    })
}

function wrapRouter (method, url) {
    router[method](url, function(req, res) {
        res.json({
            code: 0,
            msg: 'ok',
            data: req.body
        })
    })
}
registErrorRouter()
registExtendRouter()
app.use(router)

const port = process.env.PORT || 8080

module.exports = app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
})