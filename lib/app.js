const express = require('express');
const app = express();
const authRouter = require('../lib/routes/auth');
const projectRouter = require('../lib/routes/project');
const { bearerToken } = require('../lib/middleware/ensureAuth');

app.use(express.json());
app.use(bearerToken);

app.use('/projects', projectRouter);
app.use('/auth', authRouter);

app.use(require('../lib/middleware/error'));
module.exports = app;
