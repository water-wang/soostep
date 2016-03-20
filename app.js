GLOBAL._ = require('underscore');
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var config = require('config');
var socket = require('./packs/shared/socket');

var app = new express();
var server = http.Server(app);

app.engine('html', require('ejs-mate'))
    .set('views', './assets/pages')
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    .use(express.static('assets'))
    .use(express.query());

// 添加服务器端路由到这里.
app.use('/', require('./packs/admin/server/routes'))
    .use('/', require('./packs/orders/server/routes'))
    .use('/', require('./wechat/routes'));

app.get('/', function (req, res) {
    console.log(req);
    res.render('h5index.html');
}).get('/pc', function (req, res) {
    console.log(req);
    res.render('index.html');
}).get('/admin', function (req, res) {
    console.log(req);
    res.render('adminindex.html');
});

// 启动socket
socket.initSocket(server);

server.listen(config.port, function () {
    console.log('Site is up on http://localhost:' + config.port);
});