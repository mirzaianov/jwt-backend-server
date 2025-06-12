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
import { REFRESH_TOKEN_EXPIRATION_TIME } from '../constants.js';

export default function refresh(req, res) {
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
      maxAge: REFRESH_TOKEN_EXPIRATION_TIME,
    });

    res.json({ accessToken: newAccessToken });
  } catch {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
}
