var mysql=require('mysql');
var conn=mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'chatapp'
});

conn.connect(function(err){
	if (err) {
		console.log(err);
		return;
	}
	console.log('Connection established');
});

var apiOptions={
    server:"http://localhost:3000"
};
// if (process.env.NODE_ENV === 'production') {
//     apiOptions.server="https://gentle-dusk-39267.herokuapp.com/";
// }

var isLoggedin=function(){

};

var findUser=function(req, res, callback){

console.log("request has :: "+ req.body.email);


 var queryString = 'SELECT * FROM users WHERE email = ?';
 email=req.body.email;
conn.query(queryString,  email, function(err, rows, fields) {
    
    if (err) {console.log("error: "+ err);}
    else if (rows=='') {
    	
	 	res.send('empty');
    }
    else{
	 	res.send("name is " +  rows[0].name);
	 }
   });
	
};

var doLogIn=function(req, res, callback){
	findUser(req, res, function(err, user){
		if(err){

		}
		else if (req.body.email==user.email && req.body.password==user.password){

		}
		else{
			res.sendfile('/login.html');
		}
	});
};

module.exports.indexPage=function(req, res){
	if (true) {
		res.sendfile('index.html');
	}
	else{
		res.sendfile('login.html');
	}
};


module.exports.loginForm=function(req, res){
	if (true) {
		res.sendfile('login.html');
	}
	else{
		res.redirect('/index');
	}
};

module.exports.login=function(req, res){

	doLogIn(req, res, function(req, res, responseData){
        var session=responseData;
         res.redirect('/');
     });
};

module.exports.register=function(req, res){
	if (!isLoggedIn) {
		res.sendfile('register.html')
	}
	else{
		res.redirect('/');
	}
}
