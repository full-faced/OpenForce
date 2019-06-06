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
      .populate('posts')
      .select({
        __v: false
      })
      .lean()
      .then(list => res.send(list))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    return Project
      .findById(req.params.id)
      .populate('users')
      .populate('posts')
      .select({
        __v: false
      })
      .lean()
      .then(foundProject => res.send(foundProject))
      .catch(next);
  })
  .patch('/:id', ensureAuth, (req, res, next) => {
    const { newPost } = req.body;
    return Project
      .findByIdAndUpdate(req.params.id, ({ $push: { posts: newPost } }), { new: true })
      .select({ __v: false })
      .lean()
      .then(updated => res.send(updated))
      .catch(next);
  })
;
