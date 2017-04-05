const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
  let kevin, blogPost;

  beforeEach((done) => {
    kevin = new User({ name: 'kevin' });
    blogPost = new BlogPost({ title: 'Post #1', content: 'JS is great!' });

    kevin.blogPosts.push(blogPost);

    Promise.all([kevin.save(), blogPost.save()])
      .then(() => done());
  });

  it('users clean up dangling blogposts on remove', (done) => {
    kevin.remove()
      .then(() => BlogPost.count())
      .then(count => {
        assert(count === 0);
        done();
      });
  });
});
