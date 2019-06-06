require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../lib/app');

describe('project routes tests', () => {
  const projectInfo = {
    title: 'title',
    summary: 'summary',
    projectUrl: 'projectUrl',
    imageUrl: 'image',
    posts: []
  };

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

  it.only('creates a post with user/project', () => {
    return request(app)
      .post('/auth/signup')
      .send({ username: 'test', password: 'testp', email: 'teste' })
      .then(createdUser => {
        return request(app)
          .post('/projects/')
          .send({ ...projectInfo, user: createdUser.body.user._id })
          .set('Authorization', `Bearer ${createdUser.body.token}`)
          .then(createdProject => {
            return request(app)
              .post('/posts/')
              .send({ user: createdUser.body.user._id, project: createdProject.body.project._id, text: 'holy shit' })
              .set('Authorization', `Bearer ${createdUser.body.token}`)
              .then(createdPost => {
                expect(createdPost.body.user).toEqual(createdUser.body.user._id);
                expect(createdPost.body.project).toEqual(createdProject.body.project._id);
              });
          });
      });
  });
});
