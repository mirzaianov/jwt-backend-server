import {
  generateAccessToken,
  verifyRefreshToken,
} from '../utils/tokenUtils.js';
import { isRefreshTokenStored } from '../model/tokenStore.js';
import { REFRESH_TOKEN_EXPIRATION_TIME } from '../constants.js';

export default function refresh(req, res) {
  const refreshToken = req.cookies.refreshToken;

  // Check if the refresh token is present
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token missing' });
  }

  // Check if the refresh token is stored
  if (!isRefreshTokenStored(refreshToken)) {
    return res
      .status(403)
      .json({ message: 'Refresh token invalid or already used' });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);

    const newPayload = {
      firstName: decoded.firstName,
      lastName: decoded.firstName,
      email: decoded.firstName,
      phoneNumber: decoded.firstName,
    };

    const newAccessToken = generateAccessToken(newPayload);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: REFRESH_TOKEN_EXPIRATION_TIME,
    });

    res.json({ accessToken: newAccessToken });
  } catch {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
}
