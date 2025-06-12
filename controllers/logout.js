import { revokeRefreshToken } from '../utils/tokenStore.js';

export default function logout(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      revokeRefreshToken(refreshToken);
    }

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    // Generic error for unexpected issues
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
