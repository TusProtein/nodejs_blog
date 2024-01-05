import jwt from 'jsonwebtoken';
import fs from 'fs';

const generateJWT = user => {
  const privateKey = fs.readFileSync('private.pem', 'utf-8');
  return jwt.sign({ _id: user._id }, privateKey, {
    algorithm: 'RS256',
  });
};

export default generateJWT;
