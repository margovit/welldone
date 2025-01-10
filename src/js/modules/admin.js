import { logIn, userLogOut } from '../modules/api.js';
import { hasToken } from './tokens.js';

const refs = {
  form: document.querySelector('.js-form'),
  body: document.body,
};

refs.form.addEventListener('submit', async e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  e.target.reset();
  await logIn(data);
  window.location.pathname = '/';
});
