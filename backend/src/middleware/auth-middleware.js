import { prismaClient } from "../app/database.js";
import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader) return res.status(401).json({errors: 'Unauthorized'}).end();

  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({errors: 'Unauthorized'}).end();

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err){
      res.clearCookie('token');
      return res.status(403).json({errors: 'Forbidden'}).end()
    }

    req.user = user;
    next();
  });

}