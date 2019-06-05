const express = require('express');
const app = express();
const authRouter = require('../lib/routes/auth');
// const{bearerToken} = require('')

app.use(express.json());

app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.end('Connected, no response');
});

app.use(require('../lib/middleware/error'));
module.exports = app;
