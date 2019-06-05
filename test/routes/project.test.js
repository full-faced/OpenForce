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

  it('posts a new project', () => {
    return request(app)
      .post('/auth/signup')
      .send({ username: 'cara', password: 'word', email: 'here' })
      .then(createdUser => {
        return request(app)
          .post('/projects/')
          .send({ ...projectInfo, users: [createdUser.body.user._id] })
          .set('Authorization', `Bearer ${createdUser.body.token}`)
          .then(createdProject => {
            expect(createdProject.body.project.users[0]).toEqual(createdUser.body.user._id);
            expect(createdProject.body.project.title).toEqual(projectInfo.title);
          });
      });
  });
});
