var express = require('express');
var router = express.Router();
var controller= require('../controller/index');



router.get('/', controller.indexPage);
router.get('/login', controller.loginForm);

router.post('/login', controller.login);
router.post('/register', controller.register);

module.exports = router;