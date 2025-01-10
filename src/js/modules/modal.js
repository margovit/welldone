import { getMoleculesByName, updateMolecule } from './api';
import showdown from 'showdown';
import { hasToken } from './tokens.js';

const converter = new showdown.Converter();
const refs = {
  container: document.querySelector('.js-container'),
};
let instance;

refs.container.addEventListener('click', async e => {
  const elem = e.target.closest('.js-element');
  if (!elem) return;
  const name = elem.dataset.name;
  const promiseInfo = getMoleculesByName(name);
  const isAdmin = hasToken();

  openLoadingModal(promiseInfo);
  if (isAdmin) {
    openAdminModal(promiseInfo);
  } else {
    openUserModal(promiseInfo);
  }
});

async function openUserModal(promise) {
  const data = await promise;
  const markup = userModalTemplate(data);
  instance = basicLightbox.create(markup);
  instance.show();
}
async function openAdminModal(promise) {
  const data = await promise;
  const markup = adminModalTemplate(data);
  instance = basicLightbox.create(markup, {
    onShow: () => {
      window.addEventListener('submit', onFormSubmit);
    },
    onClose: () => {
      window.removeEventListener('submit', onFormSubmit);
    },
  });
  instance.show();
}
function openLoadingModal(promise) {
  const instance = basicLightbox.create(`
  <div class="modal">
  <h1 style="color:white;">LOADING</h1>
<div>`);
  instance.show();

  promise.then(() => {
    instance.close();
  });
}

function userModalTemplate(data) {
  console.log(data);
  return `<div class="modal">
  <div class="info">
  <div><h1><span>${data.name}</span> - ${data.title}</h1><p>${
    data.index
  }</p></div>
  <div class="content">${converter.makeHtml(data.description)}</div>
  <div class="content">${converter.makeHtml(data.description2)}</div>
  </div></div>`;
}
function adminModalTemplate(data) {
  console.log(data);
  return `<div class="modal">
  <form class="info js-form">
    <input name="name" class="form-control" type="text" readonly value="${data.name}">
    <textarea name="description" class="form-control" type="text" placeholder="Description">${data.description}</textarea>
    <textarea name="description2" class="form-control" type="text" placeholder="Description">${data.description2}</textarea>
    <button class="form-btn">Update Info</button>
  </form>
<div>`;
}

function onFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  updateMolecule(data);
  instance.close();
  e.target.reset();
  updateElementClass(data);
}

function updateElementClass(data) {
  const elem = document.querySelector(`.js-element[data-name="${data.name}"]`);

  const hasDesc = Boolean(data.description2);

  if (hasDesc) {
    elem.classList.add('desc');
  } else {
    elem.classList.remove('desc');
  }
}
