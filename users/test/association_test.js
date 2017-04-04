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
});
