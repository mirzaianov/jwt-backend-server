import { users } from '../models/users.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/tokenUtils.js';

import {
  storeRefreshToken,
  isRefreshTokenStored,
  revokeRefreshToken,
} from '../utils/tokenStore.js';

export function login(req, res) {
  const { email, password } = req.body;

  // Find user in the mock database
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const payload = { id: user.id, name: user.name, email: user.email };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  storeRefreshToken(refreshToken);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken, refreshToken });
}

export function getUser(req, res) {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ user: { id: user.id, name: user.name, email: user.email } });
}

export function refresh(req, res) {
  const oldToken = req.cookies.refreshToken;

  if (!oldToken) {
    return res.status(401).json({ message: 'Refresh token missing' });
  }

  if (!isRefreshTokenStored(oldToken)) {
    return res
      .status(403)
      .json({ message: 'Refresh token invalid or already used' });
  }

  try {
    const decoded = verifyRefreshToken(oldToken);
    revokeRefreshToken(oldToken);

    const newPayload = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
    };

    const newAccessToken = generateAccessToken(newPayload);
    const newRefreshToken = generateRefreshToken(newPayload);
    storeRefreshToken(newRefreshToken);

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
}

export function logout(req, res) {
  const token = req.cookies.refreshToken;

  if (token) {
    revokeRefreshToken(token);
  }

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  });

  return res.json({ message: 'Logged out successfully' });
}
