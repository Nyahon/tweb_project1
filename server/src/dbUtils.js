const CommitSchema = require('./CommitSchema.js');
const userSchema = require('./UserSchema.js');

function addCommit(name, message) {

    //there is no name to qualify what is done here. 
    //This is _the_ worst hack of my life thus far.
    messageString = JSON.stringify(message)
    var commit = new CommitSchema.CommitModel()
    commit.name = name;
    commit.message = messageString;
 
    commit.save(function(err){
      console.log(err);
    });
  }

  function addUser(name) {
    var commit = new UserSchema.UserModel()
    commit.name = name;
 
    commit.save(function(err){
      console.log(err);
    });
  }

function getUser(name) {
    return userSchema.UserModel.find({ name }).exec();
  }

  function getCommit(name) {
    return CommitSchema.CommitModel.find({ name }).exec();
  }

  module.exports = {
    getUser,
    getCommit,
    addUser,
    addCommit
  };
