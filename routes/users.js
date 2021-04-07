var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

//Sign up
router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password,10, (err,hash) => {
    if(err){
			res.json({
				message: 'Hashing of password failed'
			});
			return;
    }
    const user = new User({
      email:req.body.email,
      password:hash,
      name:req.body.name
    });
    user.save()
    .then(data => {
      return res.json({
        message:'New user created',
        data:data
      });
    })
    .catch(err => {
  			return res.json({
  				message: 'Invalid Email'
  			});
    });
  });
});

//login
router.post('/login',(req, res, next) => {
  User.find({email: req.body.email})
  .exec()
  .then(users => {
      if(users.length<1){
        return res.json({"message":'Auth failed'});
      }
      bcrypt.compare(req.body.password, users[0].password, (err, isMatch) => {
        if(err||!isMatch){
            return res.json({"message":'Auth failed'});
        }
        const token = jwt.sign(
          { email: users[0].email },
          process.env.JWT_KEY,
          { expiresIn:"1h" }
        );
        return res.json({
          "token":token,
          "message":'Auth Success'
        });
      });
  })
  .catch(err => {
    return res.json({"message":'Auth failed'});
  })
});

//logout route
router.get('/logout', (req,res) => {
});


module.exports = router;
