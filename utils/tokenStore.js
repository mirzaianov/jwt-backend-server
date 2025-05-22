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
