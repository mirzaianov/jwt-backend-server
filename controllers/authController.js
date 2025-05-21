import user from '../models/user.js';
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
  const payload = { id: user.id, name: user.name, email: user.email };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  storeRefreshToken(refreshToken); // Store the token on login

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

    // Revoke old token and generate new ones
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
    revokeRefreshToken(token); // Remove it from the in-memory store
  }

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  });

  return res.json({ message: 'Logged out successfully' });
}
