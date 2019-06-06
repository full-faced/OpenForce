const Post = require('../models/Post');
const ensureAuth = require('../middleware/ensureAuth');
const { Router } = require('express');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const { user, project, text } = req.body;

    Post
      .create({ user: user, project: project, text:text })
      .then(post => res.send(post))
      .catch(next);
  });
