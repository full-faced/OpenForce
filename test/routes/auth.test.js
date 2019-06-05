require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../lib/app');

describe('auth routes', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/openForce', {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true
    });
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  const user = { username: 'sean', password: 'pass', email: 'email' };

  it('creates a new user on signup', () => {
    return request(app)
      .post('/auth/signup')
      .send(user)
      .then(createdUser => {
        expect(createdUser.body.token).toEqual(expect.any(String));
        expect(createdUser.body.user.username).toEqual('sean');
        expect(createdUser.body.user.passwordHash).toEqual(expect.any(String));
        expect(createdUser.body.user._id).toEqual(expect.any(String));
      });
  });

  it('signs in a user', () => {
    return request(app)
      .post('/auth/signup')
      .send(user)
      .then(createdUser => {
        return request(app)
          .post('/auth/signin')
          .send({ username: 'sean', password: 'pass' })
          .then(returnedUser => {
            expect(returnedUser.body.user.passwordHash).toEqual(createdUser.body.user.passwordHash);
            expect(returnedUser.body.user.username).toEqual(createdUser.body.user.username);
            expect(returnedUser.body.token).toEqual(createdUser.body.token);
          });
      });
  });

  it('refuses to sign in an invalid user', () => {
    return request(app)
      .post('/auth/signup')
      .send(user)
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({ username: 'sean', password: 'bad' })
          .then(returnedUser => {
            expect(returnedUser.error.status).toEqual(401);
          });
      });
  });
})
;
