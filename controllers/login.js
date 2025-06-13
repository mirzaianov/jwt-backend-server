import {
  // generateAccessToken,
  generateRefreshToken,
} from '../utils/tokenUtils.js';
import { storeRefreshToken } from '../model/tokenStore.js';
import { getUser, isUserInStore } from '../model/userStore.js';
import { REFRESH_TOKEN_EXPIRATION_TIME } from '../constants.js';

export default function login(req, res) {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ message: 'Invalid credential' });
    }

    if (!isUserInStore(credential)) {
      return res.status(404).json({ message: 'User not found' });
    }

    const currentUser = getUser(credential);

    // const accessToken = generateAccessToken(currentUser);
    const refreshToken = generateRefreshToken(currentUser);

    storeRefreshToken(refreshToken);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: REFRESH_TOKEN_EXPIRATION_TIME,
    });

    // res.status(200).json({ accessToken });
    res.status(200).json({ message: 'User logged in successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    // Generic error for unexpected issues
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
