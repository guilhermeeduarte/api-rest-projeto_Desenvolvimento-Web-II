var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var autorRouter = require('./routes/autorRouter');
var livroRouter = require('./routes/livroRouter');
var dvdRouter = require('./routes/dvdRouter');
var cdRouter = require('./routes/cdRouter');

var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/rest-api-projeto';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'erro de conexão:'));
db.once('open', function () {
    console.log("Conexão realizada");
});

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

function auth (req, res, next) {
    console.log(req.headers);
    var authHeader = req.headers.authorization;
    
    if (!authHeader) {
        var err = new Error('Você não está autenticado');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        next(err);
        return;
    }

    var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    
    if (user == 'admin' && pass == 'password') {
        next();
    } else {
        var err = new Error('Você não está autenticado');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        next(err);
    }
}

app.use('/', index);
app.use('/users', users);
app.use('/autores', autorRouter);

app.all('/livros*', function(req, res, next) {
    if (req.method === 'GET') {
        next();
    } else {
        auth(req, res, next);
    }
});
app.use('/livros', livroRouter);

app.all('/dvds*', function(req, res, next) {
    if (req.method === 'GET') {
        next();
    } else {
        auth(req, res, next);
    }
});
app.use('/dvds', dvdRouter);

app.all('/cds*', function(req, res, next) {
    if (req.method === 'GET') {
        next();
    } else {
        auth(req, res, next);
    }
});
app.use('/cds', cdRouter);

app.use(function(req, res, next) {
    var err = new Error('Não encontrado');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;