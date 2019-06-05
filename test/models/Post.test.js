const Post = require('../../lib/models/Post');
const mongoose = require('mongoose');

describe('post model testing', () => {
  const post = new Post({
    user: new mongoose.Types.ObjectId,
    project: new mongoose.Types.ObjectId,
    text: 'here is some text for a post!'
  });
  
  it('validates a good Post model', () => {
    expect(post.toJSON()).toEqual({
      user: expect.any(mongoose.Types.ObjectId),
      project: expect.any(mongoose.Types.ObjectId),
      _id: expect.any(mongoose.Types.ObjectId),
      text: 'here is some text for a post!'
    });
  });

  it('has required fields', () => {
    const badpost = new Post({ });
    const errors = badpost.validateSync().errors;
    expect(errors.user.message).toEqual('Path `user` is required.');
    expect(errors.project.message).toEqual('Path `project` is required.');
    expect(errors.text.message).toEqual('Path `text` is required.');
  });
});

