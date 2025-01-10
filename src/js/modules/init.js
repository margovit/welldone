import { resetCameraPosition, resetRotation } from './camera.js';
import { generateTargets } from './generateTargets.js';
import { transform } from './transform.js';
import { onWindowResize } from './eventHandlers.js';
import { hasToken } from './tokens.js';
import { userLogOut } from './api.js';

export let camera, scene, renderer, controls;
export let objects = [];
export let targets = { table: [], sphere: [], helix: [], grid: [], random: [] };
export let initialCameraPosition = new THREE.Vector3();

export function render() {
  renderer.render(scene, camera);
}

export function init(data = [], firstDelay = 2000) {
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    5000,
  );
  camera.position.z = 1800;
  initialCameraPosition.copy(camera.position);

  scene = new THREE.Scene();

  data.forEach((item, i) => {
    const {
      name,
      title,
      massa,
      index,
      index2,
      description,
      description2,
      tags,
    } = item;

    const element = document.createElement('div');
    const hasDescription = Boolean(description2);
    element.className = `element js-element ${tags.join(' ')}`;

    if (hasDescription) {
      element.classList.add('desc');
    }

    element.dataset.id = i;
    element.dataset.name = name;
    // element.style.backgroundColor = `rgba(0,127,127,${
    //   Math.random() * 0.5 + 0.25
    // })`;

    element.innerHTML = createElementHTML(i, name, title, massa);

    const object = new THREE.CSS3DObject(element);
    object.position.x = Math.random() * 4000 - 2000;
    object.position.y = Math.random() * 4000 - 2000;
    object.position.z = Math.random() * 4000 - 2000;
    scene.add(object);

    objects.push(object);
  });

  generateTargets(data);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = 0;
  document.getElementById('container').appendChild(renderer.domElement);

  controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.rotateSpeed = 0.5;
  controls.addEventListener('change', render);

  window.addEventListener('resize', onWindowResize);

  transform(targets.table, firstDelay);
}

function createElementHTML(id, name, title, massa) {
  return `
    <div class="number">${id + 1}</div>
    <div class="name">${name}</div>
    <div class="details">${title}<br>${massa}</div>
  `;
}

function renderLogOutBtn() {
  if (!hasToken()) {
    return;
  }

  const markup = `
    <button type="button" class="button btn-logout js-logout">Log Out</button>
  `;

  document.body.insertAdjacentHTML('afterbegin', markup);
  document.body
    .querySelector('.js-logout')
    .addEventListener('click', userLogOut);
}

renderLogOutBtn();
