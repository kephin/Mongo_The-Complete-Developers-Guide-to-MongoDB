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
  posts: [postSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost',
  }],
});

userSchema.virtual('postCount').get(function () {
  return this.posts.length;
});

// We can define middlewares pre or post those events: init, validate, save, remove
userSchema.pre('remove', function (next) {
  // To avoid cyclic requires
  const BlogPost = mongoose.model('blogPost');
  BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then(() => next());
});

const User = mongoose.model('user', userSchema);

module.exports = User;
