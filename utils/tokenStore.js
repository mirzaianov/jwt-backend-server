const tokenStore = new Set();

export function storeRefreshToken(token) {
  tokenStore.add(token);

  console.log('tokenStore >> ', tokenStore);
}

export function isRefreshTokenStored(token) {
  return tokenStore.has(token);
}

export function revokeRefreshToken(token) {
  tokenStore.delete(token);

  console.log('tokenStore >> ', tokenStore);
}
