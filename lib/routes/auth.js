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

  .post('/signin', (req, res, next) => {
    const { username, password } = req.body;
    console.log(password);
    User
      .findOne({ username })
      .then(foundUser => {
        if(!foundUser) {
          const error = new Error('Invalid Auth');
          error.status(123);
          next(error);
        }
        return Promise.all([
          Promise.resolve(foundUser),
          foundUser.compare(req.body.password)
        ]);
      })
      .then(([user, result]) => {
        console.log(result);
        if(!result) {
          const error = new Error('Invalid Auth');
          error.status = 401;
          next(error);
        } else {
          res.send({ token: user.authToken(), user: user });
        }
      });
  });
