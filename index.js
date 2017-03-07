var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

    
  socket.on('chat message', function(msg, person){
  	//	send to everyone except someone usee...
  	//	socket.broadcast.emit('hi');

      io.emit('chat message', msg, person );
   
    //  console.log('message : ', msg);
  });
  socket.on('disconnect', function(){
  	console.log('A User disconnected');
  });

  socket.on('new user', function(user){
    socket.broadcast.emit('userAdded', user);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});