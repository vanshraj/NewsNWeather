var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

module.exports = {
  signup : (req, callback) => {
    bcrypt.hash(req.body.password,10, (err,hash) => {
      if(err){
        callback('Hashing of password failed', null);
      }
      const user = new User({
        email:req.body.email,
        password:hash,
        name:req.body.name
      });
      user.save()
      .then(data => {
  			callback(null, data);
      })
      .catch(err => {
    			callback('Invalid Email', null);
      });
    });
  },

  login: (req, callback) => {
    User.find({email: req.body.email})
    .exec()
    .then(users => {
        if(users.length<1){
    			callback('Auth failed', null);
        }
        bcrypt.compare(req.body.password, users[0].password, (err, isMatch) => {
          if(err||!isMatch){
              callback('Auth failed', null);
          }
          const token = jwt.sign(
            { email: users[0].email },
            process.env.JWT_KEY,
            { expiresIn:"1h" }
          );
    			callback(null, token);
        });
    })
    .catch(err => {
      callback('Auth failed', null);
    });
  }
}
