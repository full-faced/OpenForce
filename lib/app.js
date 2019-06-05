const express = require('express');
const app = express();
// const{bearerToken} = require('')

app.use(express.json())

app.get('/', (req, res) => {
  res.end('Connected, no response')
})

module.exports = app;