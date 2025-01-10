import axios from 'axios';
import { getAccessToken, logout, saveAccessToken } from './tokens';
axios.defaults.baseURL =
  'https://ch1fa83ktl.execute-api.us-east-2.amazonaws.com/dev';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export async function getMolecules() {
  const endPoint = '/molecules';
  const res = await axios.get(endPoint);
  return res.data;
}
export async function getMoleculesByName(name) {
  const endPoint = `/molecules/${name}`;
  const res = await axios.get(endPoint);
  return res.data;
}

export async function updateMolecule({ name, ...data }) {
  const token = getAccessToken();
  setAuthHeader(token);
  const endPoint = `/molecules/${name}`;
  try {
    const res = await axios.put(endPoint, data);
    return res.data;
  } catch {
    console.log('ERROR');
    return {};
  }
}

export async function logIn(credentials) {
  try {
    const endPoint = '/auth/login';
    const res = await axios.post(endPoint, credentials);
    setAuthHeader(res.data.data.accessToken);
    saveAccessToken(res.data.data.accessToken);
    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error('Error Auth!');
  }
}

export async function userLogOut() {
  setAuthHeader('');
  clearAuthHeader();
  logout();
  document.body.querySelector('.js-logout').remove();
}
