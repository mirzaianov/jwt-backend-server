import { verifyAccessToken } from '../utils/tokenUtils.js';

export function authenticateAccessToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader?.split(' ')[1];

  if (!accessToken) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  try {
    const user = verifyAccessToken(accessToken);

    req.user = user;
    next();
  } catch {
    return res.status(403).json({ message: 'Invalid or expired access token' });
  }
}
