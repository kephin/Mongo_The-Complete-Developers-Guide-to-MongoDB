const assert = require('assert');
const User = require('../src/user');

describe('Readig records', () => {
  let kevin;

  beforeEach((done) => {
    kevin = new User({ name: 'kevin' });
    kevin.save().then(() => done());
  });
});
