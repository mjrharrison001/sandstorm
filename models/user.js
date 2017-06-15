var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var mongooseUV  = require('mongoose-unique-validator');

var schema = new Schema({
  userName: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  tokenAddress: {type: String, required: false},
  aliasName: {type: String, required: false},
  aliasDescripton: {type: String, required: false},
  keys: [{type: String, required: false}]
});

schema.plugin(mongooseUV);

module.exports = mongoose.model('User', schema);
