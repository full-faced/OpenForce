const User = require('../models/User');
const { ensureAuth } = require('../middleware/ensureAuth');
const { Router } = require('express');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const {
      username,
      password,
      email
    } = req.body;

    User
      .create({ username, password, email })
      .then(user => {
        const token = user.authToken();
        res.send({ user, token });
      })
      .catch(next);
  })
;
