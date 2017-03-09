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
	if (req.session.user !== '') {
		return false;
	}
	else{
		return true;
	}
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

module.exports.logout=function(req, res){
	if (req.session.user) {
		req.session.user=null;
		res.redirect('/index');
	}
	else{
		res.redirect('/index');
	}
};

module.exports.indexPage=function(req, res){
	
	if (req.session.user) {
		res.render('index', {
    			user:req.session.user
    			
		});
	}
	else{
		res.redirect('/index/login');
	}
};


module.exports.registerForm=function(req, res){
	if (!req.session.user) {
		res.render('register');
	}
	else{
		res.redirect('/index');
	}
};

module.exports.loginForm=function(req, res){
	if (!req.session.user) {
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
			
				res.redirect('/index');
			// res.render('index', {
   //    			user:req.session.user
			// });
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
	if (req.body.email && req.body.name && req.body.password) {

		

 		var queryString = 'SELECT * FROM users WHERE email = ?';
 		email=req.body.email;
		conn.query(queryString,  email, function(err, rows, fields) {
    console.log("Rows are:: " + rows);
   		 if (err) {
    			res.send("Sorry our system have some errors with database");
    		}
    		
   		 else{
    		var employee = { name: req.body.name, email: req.body.email, password: req.body.password };
  			conn.query('INSERT INTO users SET ?', employee, function(err,response){
  				if (err) {
  					res.send("Duplicate entry");
  				}
  				else{
  					user={
  						name:req.body.name,
  						email:req.body.email
  					};
  					req.session.user=user;
			
					res.redirect('/index');
  				}
			});
		 }
   		});




		
		}else{
			res.send("all fields required");
		}
		//res.send("email " + req.body.email + " name : "+ req.body.name  + " password:  " + req.body.password);
	
};
