export const CLIENT_BASE_PORT = 3000;
export const CLIENT_BASE_URL = `http://localhost:${CLIENT_BASE_PORT}`;

export const SERVER_BASE_PORT = 4000;
export const SERVER_BASE_URL = `http://localhost:${SERVER_BASE_PORT}`;

export const ACCESS_TOKEN_SECRET = 'myAccessTokenSecret';
export const ACCESS_TOKEN_EXPIRATION_TIME = 15 * 60 * 1000; // 15 minutes

export const REFRESH_TOKEN_SECRET = 'myRefreshTokenSecret';
export const REFRESH_TOKEN_EXPIRATION_TIME = 30 * 24 * 60 * 60 * 1000; // 30 days
