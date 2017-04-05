const assert = require('assert');
const User = require('../src/user');

describe('Readig records', () => {
  let kevin, alex, zach, stephen;

  beforeEach((done) => {
    kevin = new User({ name: 'kevin' });
    alex = new User({ name: 'alex' });
    zach = new User({ name: 'zach' });
    stephen = new User({ name: 'stephen' });
    Promise.all([kevin.save(), alex.save(), zach.save(), stephen.save()])
      .then(() => done());
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
  it('finds a user with a particular id', (done) => {
    // User.findOne => returns the first record
    // no need to toString() the kevin._id because Mongoose knows how to parse the objectID
    User.findOne({ _id: kevin._id })
      .then(user => {
        assert(user.name = 'kevin');
        done();
      });
  });

  it('can skip and limit the result set', (done) => {
    User.find({})
      .sort({ name: 1 }) // 1 => accending, -1 => descending
      .skip(1)
      .limit(2)
      .then(users => {
        assert(users[0].name === 'kevin');
        assert(users[1].name === 'stephen');
        assert(users.length === 2);
        done();
      });
  });
});
