const express = require('express');
const app = express();
const cors = require('cors');
const authRouter = require('../lib/routes/auth');
const postRouter = require('../lib/routes/post');
const projectRouter = require('../lib/routes/project');
const { bearerToken } = require('../lib/middleware/ensureAuth');

app.use(cors());
app.use(express.json());
app.use(bearerToken);


app.use('/posts', postRouter);
app.use('/auth', authRouter);
app.use('/projects', projectRouter);

app.use(require('../lib/middleware/error'));
module.exports = app;
