import jwt from 'jsonwebtoken';

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '14h'});
}

const verifyAccessToken = (accessToken) => {
  return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
}

export { generateAccessToken, verifyAccessToken };