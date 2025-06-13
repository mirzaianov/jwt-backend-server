import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import signup from './controllers/signup.js';
import login from './controllers/login.js';
import user from './controllers/user.js';
import refresh from './controllers/refresh.js';
import logout from './controllers/logout.js';
import { authenticateRefreshToken } from './middleware/authenticateRefreshToken.js';
import { authenticateAccessToken } from './middleware/authenticateAccessToken.js';
import {
  CLIENT_BASE_URL,
  SERVER_BASE_PORT,
  SERVER_BASE_URL,
} from './constants.js';

const app = express();

app.use(cors({ origin: CLIENT_BASE_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.post('/signup', signup);
app.post('/login', login);
app.post('/logout', authenticateRefreshToken, logout);
app.get('/user', authenticateAccessToken, user);
app.post('/refresh', refresh);

app.listen(SERVER_BASE_PORT, () => {
  console.log(`Server running at ${SERVER_BASE_URL}`);
});
