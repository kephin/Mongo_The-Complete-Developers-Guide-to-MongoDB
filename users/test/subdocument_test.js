const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
  it('can add subdocuments to an existing record', (done) => {
    const kevin = new User({
      name: 'kevin',
      posts: [],
    });
    kevin.save()
      .then(() => User.findOne({ name: 'kevin' }))
      .then(user => {
        user.posts.push({ title: 'New Title' });
        // return the promise in order to chain on
        return user.save();
      })
      .then(() => User.findOne({ name: 'kevin' }))
      .then(user => {
        assert(user.posts[0].title === 'New Title');
        done();
      });
  });
});
