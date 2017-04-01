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
});
