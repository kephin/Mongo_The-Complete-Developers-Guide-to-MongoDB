const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
  it('requires a user name', () => {
    const user = new User({ name: undefined });
    // validateSync() returns a object as the validation result
    const validateResult = user.validateSync();
    const { message } = validateResult.errors.name;
    assert(message === 'Name is required.');
  });
  it('requires a user\'s name longer than 2 characters', () => {
    const user = new User({ name: 'Al' });
    const validateResult = user.validateSync();
    const { message } = validateResult.errors.name;
    assert(message === 'Name must be longer than 2 characters.');
  });
});
