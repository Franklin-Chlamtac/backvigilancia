import jwt from 'jsonwebtoken';

if (!process.env.SECRET) throw new Error('Invalid app secret');

function decode(token) {
  return jwt.verify(token, process.env.SECRET);
}

function encode(payload) {
  return jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' });
}

export { decode, encode };
