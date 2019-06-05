const User = require('../../lib/models/User');
const mongoose = require('mongoose');

describe('user model testing', () => {
  const user = new User({
    username: 'testname',
    password: 'testpassword',
    email: 'testemail',
  });

  it('creates a user with proper keys', () => {
    expect(user.toJSON()).toEqual({
      username: 'testname',
      email: 'testemail',
      projects: [],
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('will not create a user without a username', () =>{
    const badUser = new User({
      password: 'testpassword',
    });

    const errors = badUser.validateSync().errors;
    expect(errors.username.message).toEqual('Path `username` is required.');
    expect(errors.email.message).toEqual('Path `email` is required.');
  });
});
