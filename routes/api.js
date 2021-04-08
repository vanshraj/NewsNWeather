var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
var checkAuth = require('../middleware/checkAuth');

//get news
router.get('/news', checkAuth, (req,res,next) => {
	var controller = controllers['news'];
	controller.find(req.query, (err, results) => {
		if(err){
			return res.status(401).send({
				message: 'error-> '+err
			});
		}
		return res.status(200).send(results);
	});
});

//get weather
router.get('/weather', (req,res,next) => {
	var controller = controllers['weather'];
	controller.find(req.query, (err, results) => {
		if(err){
			return res.status(400).send({
				message: 'error-> '+err
			});
		}
		return res.status(200).send(results);
	});
});

module.exports = router;
