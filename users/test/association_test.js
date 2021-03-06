const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('Association', () => {
  let kevin, blogPost, comment;

  beforeEach((done) => {
    kevin = new User({ name: 'kevin' });
    blogPost = new BlogPost({ title: 'Post #1', content: 'JS is great!' });
    comment = new Comment({ content: 'Totally agree with you.' });

    kevin.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = kevin;

    // Using Promise.all to execute the then() after all save() finish
    Promise.all([kevin.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  it('saves a relation between a user and a blogpost', (done) => {
    User.findOne({ name: 'kevin' })
      .populate('blogPosts')
      .then(user => {
        assert(user.blogPosts[0].content === 'JS is great!');
        done();
      });
  });
  it('saves a full relation graph', (done) => {
    User.findOne({ name: 'kevin' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          // model: 'comment',
          populate: {
            path: 'user',
            // model: 'user',
          },
        },
      })
      .then(user => {
        assert(user.name === 'kevin');
        assert(user.blogPosts[0].content === 'JS is great!');
        assert(user.blogPosts[0].comments[0].content === 'Totally agree with you.');
        assert(user.blogPosts[0].comments[0].user.name === 'kevin');
        done();
      });
  });
});
