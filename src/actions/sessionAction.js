export const UPDATE_SESSION = 'UPDATE_SESSION'
export const DELETE_SESSION = 'DELETE_SESSION'
export const UPDATE_USER = 'UPDATE_USER'

export const updateSession = (session) => {
  return { type: UPDATE_SESSION, session }
}

export const deleteSession = (session) => {
  return { type: DELETE_SESSION, session }
}

export const updateUser = (user) => {
  return { type: UPDATE_USER, user }
}