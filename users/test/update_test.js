const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let kevin;

  beforeEach((done) => {
    kevin = new User({ name: 'kevin' });
    kevin.save().then(() => done());
  });

  // Model instance method
  it('model instance using set() and save()', (done) => {
    // set() is when you want to do a piece of property update at different time, and save them in the end
    kevin.set('name', 'kephin');
    // kevin.set('age', 30);
    // kevin.set('gender', 'male');
    // ...
    kevin.save()
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === 'kephin');
        done();
      });
  });
});
