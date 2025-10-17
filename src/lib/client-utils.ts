export function getTokenFromLocalStorage(cookieName: string) {
  return localStorage.getItem(cookieName);
}

export function setTokenToLocalStorage(cookieName: string, token: string) {
  localStorage.setItem(cookieName, token);
}

export function removeTokenFromLocalStorage(cookieName: string) {
  localStorage.removeItem(cookieName);
}
