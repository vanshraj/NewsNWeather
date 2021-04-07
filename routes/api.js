var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
var checkAuth = require('../middleware/checkAuth');

//get news
router.get('/news', checkAuth,(req,res,next) => {
	var controller = controllers['news'];
	controller.find(req.query, (err, results) => {
		if(err){
			return res.json({
				message: 'error-> '+err
			});
		}
		return res.json({
			count: results.length,
			data: results
		});
	});
});

//get weather
router.get('/weather', (req,res,next) => {
	var controller = controllers['weather'];
	controller.find(req.query, (err, results) => {
		if(err){
			return res.json({
				message: 'error-> '+err
			});
		}
		return res.json({
			count: results.length,
			data: results
		});
	});
});

module.exports = router;
