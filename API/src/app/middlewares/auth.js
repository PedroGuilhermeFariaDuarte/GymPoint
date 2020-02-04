import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

// Validate token JWT
export default async (req, res, next) => {
  // Gets token in header authorization
  const authHeader = req.headers.authorization;

  // Verify token authorization
  if (!authHeader) {
    res.status(401).json({ code:6,message: 'Token not present' });
  }

  // Gets token
  const [, token] = authHeader.split(' ');

  try {
    // Decoded Token
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // Set ID of admin
    req.adminID = decoded.id;

    // Call next middleware
    next();
  } catch (error) {
    // Return any error
    return res.status(401).json({ code:6,message: 'toke not valid' });
  }
};
