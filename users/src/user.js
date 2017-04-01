const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    // built-in validator: required, min, max, min-length...
    // the 2nd argument is the message displayed when invalid
    required: [true, 'Name is required.'],
  },
  postCount: Number,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
