// A basic in-memory store for refresh tokens (use Redis or DB in production)
const tokenStore = new Set();

export function storeRefreshToken(token) {
  tokenStore.add(token);
}

export function isRefreshTokenStored(token) {
  return tokenStore.has(token);
}

export function revokeRefreshToken(token) {
  tokenStore.delete(token);
}
