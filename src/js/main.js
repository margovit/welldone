import './modules/modal.js';
import { init, targets } from './modules/init.js';
import { animate } from './modules/animate.js';
import { transform } from './modules/transform.js';
import { resetCameraPosition } from './modules/camera.js';
import { getMolecules } from './modules/api.js';
let lastState = 'table';

const buttonConfigs = [
  { id: 'home', target: targets.table },
  { id: 'table', target: targets.table },
  { id: 'sphere', target: targets.sphere },
  { id: 'helix', target: targets.helix },
  { id: 'grid', target: targets.grid },
];

buttonConfigs.forEach(({ id, target }) => {
  const button = document.getElementById(id);
  console.log(id, button);
  if (id === 'home') {
    button.addEventListener('click', () => {
      resetCameraPosition();
      setTimeout(() => {
        transform(target, 2000);
      }, 1000);

      lastState = 'table';
    });
  } else {
    button.addEventListener('click', () => {
      resetCameraPosition();
      if (lastState !== id) {
        transform(target, 2000);
        lastState = id;
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const location = window.location;
  const path = location.pathname;
  if (path === '/admin') {
    window.location.pathname = window.location.pathname.replace(
      '/admin',
      '/admin.html',
    );
    return;
  }

  getMolecules().then(data => {
    init(data, 2000);
    animate();
  });
});
