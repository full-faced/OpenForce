require('dotenv').config();
const jwt = require('jsonwebtoken');
const { tokenize, untokenize } = require('../../lib/utils/token');

describe('token functionality', () => {
  it('creates a token', () =>{
    const token = tokenize({ username: 'sean', email: 'email@email.com' });
    expect(token).toEqual(expect.any(String));
  });
});
