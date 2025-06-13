import { REFRESH_TOKEN_EXPIRATION_TIME } from '../constants.js';
import { storeRefreshToken } from '../model/tokenStore.js';
import {
  // generateAccessToken,
  generateRefreshToken,
} from '../utils/tokenUtils.js';
import { storeUser } from '../model/userStore.js';

export default function signup(req, res) {
  try {
    const { firstName, lastName, email, phoneNumber } = req.body;

    // Basic validation: Check for presence of required fields
    if (!firstName || !lastName || !email || !phoneNumber) {
      return res.status(400).json({
        message:
          'Missing required fields. Please provide firstName, lastName, email, and phoneNumber.',
      });
    }

    const newUser = {
      firstName,
      lastName,
      email,
      phoneNumber,
    };

    try {
      // Add the new user to the temporary store
      storeUser(newUser);
      // Create tokens
      // const accessToken = generateAccessToken(newUser);
      const refreshToken = generateRefreshToken(newUser);

      storeRefreshToken(refreshToken);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: REFRESH_TOKEN_EXPIRATION_TIME,
      });

      // res.status(201).json({ accessToken });
      res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
      console.error('Error storing user:', error);
      res.status(409).json({ message: 'User already exists' });
    }
  } catch (error) {
    console.error('Error during signup:', error);
    // Generic error for unexpected issues
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
