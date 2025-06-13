import { verifyRefreshToken } from '../utils/tokenUtils.js';

export function authenticateRefreshToken(req, res, next) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token missing' });
  }

  try {
    const user = verifyRefreshToken(refreshToken);

    req.user = user;
    next();
  } catch {
    return res
      .status(403)
      .json({ message: 'Invalid or expired refresh token' });
  }
}
