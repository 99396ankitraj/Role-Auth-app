const TOKEN_KEY = 'auth_token'

export const saveToken = (t) => localStorage.setItem(TOKEN_KEY, t)
export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const clearToken = () => localStorage.removeItem(TOKEN_KEY)
