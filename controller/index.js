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
    
    if (err) {
    	callback("Sorry our system have some errors", null);
    }
    else if (rows=='') {
    	
	 	callback("Email Not Found", null);
    }
    else{
    	callback(null, rows[0]);
	 }
   });
	
};



module.exports.indexPage=function(req, res){
	if (false) {
		res.render('index');
	}
	else{
		res.redirect('/index/login');
	}
};


module.exports.loginForm=function(req, res){
	if (true) {
		res.render('login');
	}
	else{
		res.redirect('/index');
	}
};

module.exports.login=function(req, res){

	findUser(req, res, function(err, user){
		if(err){
			res.send(err);
		}
		else if (req.body.email !== user.email || req.body.password !== user.password) {
			res.send('email password combination failed');
		}
		else if (req.body.email==user.email && req.body.password==user.password){
			req.session.user=user;
			res.render('index', {
      			user:req.session.user
			});
			// res.sendfile('./views/index.html', {
   //    		  person:req.session.user.name
   // 			 });
  
		}
		else{
			res.send('Sorry we have some errors');
		}
	});
};

module.exports.register=function(req, res){
	if (!isLoggedIn) {
		res.sendfile('./views/register.html');
	}
	else{
		res.redirect('/index');
	}
}
