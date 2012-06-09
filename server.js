var express = require('express')
  , app = express.createServer()
  , io = require('socket.io').listen(app)
  , port = process.env.PORT || 3000
  , util = require('util');

io.set('log level', 0);

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
});

app.post('/email', function(req, res) {
  util.log("Recieved Email from " + req.body.from);
  io.sockets.emit('post', req.body);
  res.end();
});

app.on('listening', function() {
  console.log("I am listening on " + port);
});

app.listen(port);
