export const userStore = new Set();

export function isUserInStore(credential) {
  for (const user of userStore) {
    if (user.email === credential || user.phoneNumber === credential)
      return true;
  }

  return false;
}

export function storeUser(user) {
  if (!isUserInStore(user.email) && !isUserInStore(user.phoneNumber)) {
    userStore.add(user);
  } else {
    throw new Error('User already exists');
  }

  console.log('User added. userStore >> ', userStore);
}

export function getUser(credential) {
  for (const user of userStore) {
    if (user.email === credential || user.phoneNumber === credential)
      return user;
  }

  return null;
}
