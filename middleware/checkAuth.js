const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  var token = req.headers.authorization ? req.headers.authorization.split(" ")[1]:null;
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if(err){
        return res.status(401).send({"message":"Auth failed"});
      }
      req.jwtData = decoded;
      next();
  });
};
