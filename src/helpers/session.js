export const authHeader = () => {
  const session = JSON.parse(localStorage.getItem('session'));
  if (session && session.token) {
    return `Bearer ${session.token}`;
  }
  return {};
};

export const isLoggedIn = () => {
  const session = JSON.parse(localStorage.getItem('session'));

  if (session && session.token) {
    return true;
  }
  return false;
};
