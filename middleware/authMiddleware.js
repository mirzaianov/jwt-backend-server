import { verifyAccessToken } from '../utils/tokenUtils.js';

export default function authenticateAccessToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  try {
    const user = verifyAccessToken(token);
    req.user = user;
    next();
  } catch {
    return res.status(403).json({ message: 'Invalid or expired access token' });
  }
}
