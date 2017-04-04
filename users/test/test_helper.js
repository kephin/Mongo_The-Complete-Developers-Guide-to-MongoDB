const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// before the whole test for one time
before((done) => {
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
    // begin the test after the connection is done
    .once('open', () => done())
    .on('error', err => console.warn('Warning', err));
});

beforeEach((done) => {
  // drop accept a callback function
  // Beware: mongoose will normalize the collection name to lowercase, blogPosts => blogposts
  const { users, blogposts, comments } = mongoose.connection.collections;
  users.drop(() => {
    blogposts.drop(() => {
      comments.drop(() => done());
    });
  });
});
