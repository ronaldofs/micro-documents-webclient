var express = require('express'),
    httpProxy = require('http-proxy');

var server = express(),
    proxy = httpProxy.createProxy(),
    port = process.env.PORT || 3002;

var apiUrl = process.env.API_URL || 'http://localhost:3000';

server.use(express.static(__dirname + '/client'));

server.use('/api/documents*', function(req, res, next) {
  req.url = req.params[0] || '/';
  proxy.web(req, res, { target: apiUrl });
});

server.get('*', function(req, res, next) {
  res.sendFile('/client/index.html', { root: __dirname });
});

server.use(errorHandler);

function errorHandler(err, req, res, next) {
  res.status(500).json(err);
}

server.listen(port);
