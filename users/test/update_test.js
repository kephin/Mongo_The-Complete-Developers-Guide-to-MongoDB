const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let kevin;

  beforeEach((done) => {
    kevin = new User({ name: 'kevin' });
    kevin.save().then(() => done());
  });

  const assertName = (done) => {
    User.find({})
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === 'kephin');
        done();
      });
  };

  // Model instance method
  it('model instance using set() and save()', (done) => {
    // set() is when you want to do a piece of property update at different time, and save them in the end
    kevin.set('name', 'kephin');
    // kevin.set('age', 30);
    // kevin.set('gender', 'male');
    // ...
    kevin.save()
      .then(() => assertName(done));
  });
  it('model instance update()', (done) => {
    // update() is when you want to do in one go, save it all, call it done
    kevin.update({
        name: 'kephin',
        // age: 30,
        // ...
      })
      .then(() => assertName(done));
  });

  // Model class method
  it('class method update()', (done) => {
    User.update({ name: 'kevin' }, { name: 'kephin' })
      .then(() => assertName(done));
  });
  it('class method findOneAndUpdate()', (done) => {
    User.findOneAndUpdate({ name: 'kevin' }, { name: 'kephin' })
      .then(() => assertName(done));
  });
  it('class method findByIdAndUpdate()', (done) => {
    User.findByIdAndUpdate(kevin._id, { name: 'kephin' })
      .then(() => assertName(done));
  });
});
