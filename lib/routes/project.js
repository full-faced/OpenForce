const Project = require('../models/Project');
const { ensureAuth } = require('../middleware/ensureAuth');
const { Router } = require('express');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const {
      title,
      summary,
      projectUrl,
      imageUrl,
      users,
      posts } = req.body;

    Project
      .create({ title, summary, projectUrl, imageUrl, users, posts })
      .then(project => {
        res.send({ project });
      })
      .catch(next);
  })

  .get('/', (req, res, next) => {
    return Project
      .find()
      .populate('users')
      .select({
        __v: false,
      })
      .lean()
      .then(list => res.send(list))
      .catch(next);
  })
;
