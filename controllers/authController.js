import user from '../models/user.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/tokenUtils.js';

export function login(req, res) {
  const payload = { id: user.id, name: user.name, email: user.email };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken, refreshToken });
}

export function getUser(req, res) {
  res.json({ user });
}

export function refresh(req, res) {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: 'Refresh token missing' });
  }

  try {
    const decoded = verifyRefreshToken(token);
    const newAccessToken = generateAccessToken({
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
    });
    res.json({ accessToken: newAccessToken });
  } catch {
    return res
      .status(403)
      .json({ message: 'Invalid or expired refresh token' });
  }
}
