var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//const os=require('os');  
var path = require('path');


var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');


app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var index = require('./routes/index');


app.use('/index', index);



// app.get('/', function(req, res){
//   res.sendfile('index.html');
// });

var users=[];
var thisUser=[];

io.on('connection', function(socket){
  console.log('a user connected');


  socket.on('chat message', function(msg, person){
    //  send to everyone except someone usee...
    //  socket.broadcast.emit('hi');

      io.emit('chat message', msg, person );
   
    //  console.log('message : ', msg);
  });
  socket.on('disconnect', function(){
    console.log('A User disconnected with name :: ' + thisUser);
    console.log("delete user with id== "+ thisUser[socket.id]);
    for(var i=0; i<users.length; i++){
      if(users[i] == thisUser[socket.id]){
        console.log("before splice :: " + users);
        users.splice(i,1);
        console.log("after splice :: " + users);
        io.sockets.emit('userDisconnected', users);
      }
      else{
        console.log("deleting session");
      }
    }
    // for(var i=0; i< users.length; i++){
    //   if (thisUser == users[i]) {
    //     users.splice(i,1);
    //     console.log("after splice :: " + users);
    //     io.sockets.emit('userDisconnected', users);
    //   }
    // }
  });

 

  socket.on('new user', function(user){
     console.log("     ");
    console.log("     ");
    console.log("     ");
    //console.log("os.networkInterfaces(): \n",os.networkInterfaces());  
    console.log("     ");
    console.log("     ");
    console.log("     ");
        thisUser[socket.id]=user;

        console.log("socket id is :: "+ socket.id);
        users.push(user);
    //updateClients(users);
      console.log(users);
//      io.sockets.send('userAdded', users);
console.log("length is :: " +users.length);
      io.sockets.emit('userAdded', users);

    
  });

   function updateClients(users) {
        io.sockets.emit('update', users);
    }

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});