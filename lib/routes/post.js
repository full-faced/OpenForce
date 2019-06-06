const Post = require('../models/Post');
const { ensureAuth } = require('../middleware/ensureAuth');
const { Router } = require('express');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const { user, project, text } = req.body;

    Post
      .create({ user: user, project: project, text:text })
      .then(post => res.send(post))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    return Post
      .find()
      .select({
        __v: false
      })
      .lean()
      .then(postList => res.send(postList))
      .catch(next);
  })
  .get('/:projectId', (req, res, next) => {
    return Post
      .find({ project: req.params.projectId })
      .select({
        __v: false
      })
      .lean()
      .then(relatedPosts => res.send(relatedPosts))
      .catch(next);
  });

