const assert = require('assert');
const User = require('../src/user');

describe('Readig records', () => {
  let kevin;

  beforeEach((done) => {
    kevin = new User({ name: 'kevin' });
    kevin.save().then(() => done());
  });

  it('finds all users with name of kevin', (done) => {
    // User.find => returns an array
    User.find({ name: 'kevin' })
      .then(users => {
        // _id is an object
        assert(users[0]._id.toString() === kevin._id.toString());
        done();
      });
  });
});
