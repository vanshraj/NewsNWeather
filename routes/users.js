var express = require('express');
var router = express.Router();
var controller = require('../controllers')['user'];

//Sign up
router.post('/signup', (req, res, next) => {
  controller.signup(req, (err, data) => {
		if(err){
			return res.json({
				message: 'error-> '+err
			});
		}
    return res.json({
      message:'New user created'
    });
	});
});

//login
router.post('/login',(req, res, next) => {
  controller.login(req, (err, token) => {
		if(err){
			return res.json({
				message: 'error-> '+err
			});
		}
    return res.json({
      "token":token,
      "message":'Auth Success'
    });
	});
});

//logout route
router.post('/logout', (req,res) => {
  return res.json({
    "message":'Logged Out'
  });
});


module.exports = router;
