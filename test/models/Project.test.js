const Project = require('../../lib/models/Project');
const mongoose = require('mongoose');

describe('user model testing', () => {
  const id = new mongoose.Types.ObjectId;
  const proj = new Project({
    title: 'my sweet project',
    summary: 'is super cool but also broken, pls help!',
    projectUrl: 'www.awesome.info',
    imageUrl: 'wwww.imageurl.stuff',
    users: [id]
  });

  it('creates a project with the right stuff in it', () => {
    expect(proj.toJSON()).toEqual({
      title: 'my sweet project',
      summary: 'is super cool but also broken, pls help!',
      projectUrl: 'www.awesome.info',
      imageUrl: 'wwww.imageurl.stuff',
      users: [id],
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('requires certain inputs', () => {
    const badProject = new Project({ title: 'i only have a title!' });
    const errors = badProject.validateSync().errors;
    expect(errors.summary.message).toEqual('Path `summary` is required.');
    expect(errors.projectUrl.message).toEqual('Path `projectUrl` is required.');
    expect(errors.imageUrl.message).toEqual('Path `imageUrl` is required.');
  });
});
