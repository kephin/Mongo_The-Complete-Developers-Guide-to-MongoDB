const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = require('./post');

const userSchema = new Schema({
  name: {
    type: String,
    // built-in validator: required, min, max, min-length...
    // the 2nd argument is the message displayed when invalid
    required: [true, 'Name is required.'],
    // custom validator
    validate: {
      validator: name => name.length > 2,
      message: 'Name must be longer than 2 characters.',
    },
  },
  postCount: Number,
  posts: [postSchema],
});

const User = mongoose.model('user', userSchema);

module.exports = User;
