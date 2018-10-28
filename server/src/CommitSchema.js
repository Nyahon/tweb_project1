const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommitSchema = new Schema({
  name: String,
  message: String
});




module.exports.CommitModel = mongoose.model('Commit', CommitSchema);
