const assert = require('assert');
const User = require('../src/user');

describe('Deleting records', () => {
  let kevin;

  beforeEach((done) => {
    kevin = new User({ name: 'kevin' });
    kevin.save().then(() => done());
  });

  // Model instance method
  it('model instance remove()', (done) => {
    kevin.remove()
      .then(() => User.findOne({ name: 'kevin' }))
      .then(user => {
        assert(user === null);
        done();
      });
  });
});
