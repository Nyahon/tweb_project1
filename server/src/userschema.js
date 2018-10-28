const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String,
  });

module.exports.UserModel = mongoose.model('User', UserSchema);
