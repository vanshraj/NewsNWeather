var express = require('express');
var router = express.Router();
var controllers = require('../controllers')
//defining api

//get all resource
router.get('/:resource',function(req,res,next) {
	var resource = req.params.resource;
	var controller = controllers[resource];

  //invalid api
	if(controller==null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid resource request: '+resource
		});
		return;
	}

  //fetching resource
	controller.find(req.query, function(err, results) {
		if(err){
			res.json({
				confirmation: 'fail',
				message: 'error-> '+err
			});
			return;
		}
		res.json({
			count: results.length,
			data: results
		});
	});
});

module.exports = router;
