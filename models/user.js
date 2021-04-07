var mongoose = require('mongoose');

// User Schema
var UserSchema = mongoose.Schema({
	password: { type: String, required:true },
	email: { type: String, index:true, unique:true,
  match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
 },
	name: { type: String, required:true }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
