var express = require('express');
var router = express.Router();
var controller= require('../controller/index');



router.get('/', controller.indexPage);
router.get('/login', controller.loginForm);
router.get('/logout', controller.logout);
router.get('/register', controller.registerForm);

router.post('/login', controller.login);
router.post('/register', controller.register);

module.exports = router;