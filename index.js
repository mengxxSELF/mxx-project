var app = require('koa')()
  , logger = require('koa-logger')
  , json = require('koa-json')
  , views = require('koa-views')
  , onerror = require('koa-onerror');

var index = require('./routes/index');

// error handler
onerror(app);

console.log('111110e09e039090')

// // global middlewares
app.use(views('views', {
  // root: __dirname + '/public',
  root: __dirname + '/views',
  map: { html: 'ejs' }
}));

app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(function * (next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(require('koa-static')(__dirname + '/public'));

// routes definition
app.use(index.routes(), index.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

// module.exports = app;

// #!/usr/bin/env node

/**
 * Module dependencies.
 */

// var app = require('../index.js');
var debug = require('debug')('demo:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */


// var port = normalizePort(process.env.PORT || '6789');
var port = 9090
// app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app.callback());

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

process.on('uncaughtException', function (err) {
  console.log(err)
  console.log(err.message)
  console.log(err.stack)
  process.exit()
})

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  console.log('start a server', addr);
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
