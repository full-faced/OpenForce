require('dotenv').config();
const { tokenize, untokenize } = require('../../lib/utils/token');

describe('token functionality', () => {
  it('creates a token', () =>{
    const token = tokenize({ username: 'sean', email: 'email@email.com' });
    expect(token).toEqual(expect.any(String));
  });

  it('pulls out a token', () => {
    const token = tokenize({ username: '1', email: '2' });
    const untokened = untokenize(token);
    expect(untokened).toEqual({ username: '1', email: '2' });
  });
});

