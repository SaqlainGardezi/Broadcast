
//var person = prompt("Please enter your name");
  var person=document.getElementById("name").innerHTML;
if (person !== '' && person.length>1 && person !==null) {
  var socket = io();
  var users=[];
  socket.emit('new user', person);

  $('form').submit(function(){

    socket.emit('chat message',  $('#m').val(), person);
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg, sender){
    if (person ==sender ) {

    var message="My msg is : "+ msg ;
    $('#messages').append($('<li>').text(message));
    }
    else{

    var message=sender+ " Says >> "+ msg ;
    $('#messages').append($('<li>').text(message));
    }
  });
  socket.on('userAdded', function(usersActive){
    console.log("Welcome new user : "+ usersActive );
    socket.emit('updateConnected', userActive);
  });
    socket.on('displayActive', function(userList){	
    $('#active').append($('<li>').text(userList));
    });

}
else{

    var message="Your session expired log in to continue" ;
    $('#messages').append($('<li>').text(message));
}
  