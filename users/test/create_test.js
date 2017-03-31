const assert = require('assert');
const User = require('../src/user');

describe('Creating record', () => {
  it('saves a user', (done) => {
    const kevin = new User({ name: 'kevin' });

    kevin.save().then(() => {
      // isNew is set to true when the model instance is not yet been saved to the database
      assert(!kevin.isNew);
      done();
    });
  });
});
