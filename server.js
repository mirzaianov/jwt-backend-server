import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { login, getUser, refresh } from './controllers/authController.js';
import authenticateAccessToken from './middleware/authMiddleware.js';

const app = express();
const PORT = 4000;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.post('/login', login);
app.get('/user', authenticateAccessToken, getUser);
app.post('/refresh', refresh);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
