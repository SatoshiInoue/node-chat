var express = require('express'),
	http = require('http'),
	io = require('socket.io');
var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(__dirname + '/public'));
});

app.get("/", function(req, res){
    res.send("It works!");
});
 
var server = http.createServer(app);

io = io.listen(server);

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'Welcome to the chat', systemMsg: true});
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});

server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});