export const UPDATE_SESSION = 'UPDATE_SESSION';
export const DELETE_SESSION = 'DELETE_SESSION';
export const UPDATE_SESSION_USER = 'UPDATE_SESSION_USER';

export const updateSession = (session) => {
  localStorage.setItem('session', JSON.stringify(session));
  return { type: UPDATE_SESSION, session };
};

export const deleteSession = (session) => {
  localStorage.removeItem('session');
  return { type: DELETE_SESSION, session };
};

export const updateSessionUser = (user) => {
  const session = JSON.parse(localStorage.getItem('session'));
  localStorage.setItem('session', JSON.stringify(
    Object.assign({}, session, {
      user,
    }),
  ));

  return { type: UPDATE_SESSION_USER, user };
};
