import { controls } from './init.js';

export function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
  controls.update();
}
