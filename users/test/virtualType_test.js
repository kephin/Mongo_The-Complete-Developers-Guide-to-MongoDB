const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
  it('postCount returns number of posts', (done) => {
    const kevin = new User({
      name: 'kevin',
      posts: [{ title: 'Post #1' }, { title: 'Post #2' }],
    });
    kevin.save()
      .then(() => User.findOne({ name: 'kevin' }))
      .then(user => {
        assert(user.postCount === 2);
        done();
      });
  });
});
