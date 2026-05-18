const AUTH_KEY = 'buburuza_authed'

export function useAuth() {
  const isAuthed = localStorage.getItem(AUTH_KEY) === 'true'

  function login(username: string, password: string): boolean {
    if (username === 'bubu' && password === 'bubulover') {
      localStorage.setItem(AUTH_KEY, 'true')
      return true
    }
    return false
  }

  function logout() {
    localStorage.removeItem(AUTH_KEY)
  }

  return { isAuthed, login, logout }
}
