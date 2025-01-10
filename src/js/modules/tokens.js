export function saveAccessToken(token) {
  sessionStorage.setItem('accessToken', token);
  console.log(token);
}

export function getAccessToken() {
  return sessionStorage.getItem('accessToken');
}

export function saveRefreshToken(token) {
  localStorage.setItem('refreshToken', token);
}

export function getRefreshToken() {
  return localStorage.getItem('refreshToken');
}

export function hasToken() {
  const token = getAccessToken();
  return Boolean(token);
}

export function logout() {
  sessionStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}
