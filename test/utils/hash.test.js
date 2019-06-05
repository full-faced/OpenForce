const { hash, compare } = require('../../lib/utils/hash');
const User = require('../../lib/models/User');

describe('hash tests', () => {
  const password = 'napplesAreGreat';
  const user = new User({
    password: password,
  });

  it('hashes a password', () => {
    return hash(password)
      .then(hashed => {
        expect(hashed).toEqual(expect.any(String));
        expect(hashed).not.toEqual(password);
      });
  });

  it('can compare passwords', () => {
    return hash(password)
      .then(created => {
        return compare(password, created);
      })
      .then(compareResult => {
        expect(compareResult).toBeTruthy();
      });
  });

  it('makes a password hash', () => {
    expect(user._tempPassword).toEqual('napplesAreGreat');
  });

  it('compares a good pass', () => {
    User.create({
      password: password,
      username: 'sn',
      email: '1@email.com'
    })
      .then(createdUser => {
        return createdUser.compare('napplesAreGreat');
      })
      .then(returnOfcompare => {
        expect(returnOfcompare).toBeTruthy();
      });
  });

  it('compares a bad pass', () => {
    User.create({
      password: password,
      username: 'slln',
      email: '1@email.com'
    })
      .then(createdUser => {
        return createdUser.compare('napplesAreat');
      })
      .then(returnOfcompare => {
        expect(returnOfcompare).toBeFalsy();
      });
  });

  it('finds by token', () => {
    User.create({
      username: 'wook',
      password: 'blh',
      email: 'due'
    })
      .then(createdUser => {
        return createdUser.authToken();
      })
      .then(token => {
        return User.findByToken(token);
      })
      .then(results => {
        expect(results).toEqual({
          username: 'wookie',
          email: 'dudude',
          _id: expect.any(String),
          projects: []
        });
      });
  });
});
