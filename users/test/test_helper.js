const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users_test');
mongoose.connection
  .once('open', () => console.log('Here we go!'))
  .on('error', err => console.warn('Warning', err));

beforeEach((done) => {
  // drop accept a callback function
  mongoose.connection.collections.users.drop(() => done());
});
