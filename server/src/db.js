
const mongoose = require('mongoose');

const dbURI = 'mongodb://@ds143893.mlab.com:43893/ragepank';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  auth: {
    user: 'nyahon',
    password: 'FreudJung1212',
  },
});

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  console.log(`Mongoose default connection open to , ${dbURI}`);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose default connection error:, ${err.message}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log(`Mongoose default connection disconnected`);
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

const { Schema } = mongoose
const catSchema = new Schema({ name: String })

class Mongo {
  constructor( path = 'mongodb://localhost/db' ) {
    var mongoose = require('mongoose');
    //Set up default mongoose connection
    mongoose.connect(path);
    mongoose.Promise = global.Promise;

    //Get the default connection
    this.ose = mongoose.connection;

    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  }
    
  }
