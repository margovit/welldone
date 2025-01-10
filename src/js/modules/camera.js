import { initialCameraPosition, camera, controls } from "./init.js";

export function resetCameraPosition() {
  new TWEEN.Tween(camera.position)
    .to(
      {
        x: initialCameraPosition.x,
        y: initialCameraPosition.y,
        z: initialCameraPosition.z,
      },
      1000
    )
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start();

  resetRotation();
}

export function resetRotation() {
  const upVec = new THREE.Vector3(0, 1, 0);
  camera.up = upVec;
  controls.update();
}
