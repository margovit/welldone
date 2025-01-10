import { targets, objects } from './init.js';

export function generateTargets(table = []) {
  console.log(table);

  table.forEach(() => {
    const object = new THREE.Object3D();
    object.position.x = Math.random() * 4000 - 2000;
    object.position.y = Math.random() * 4000 - 2000;
    object.position.z = Math.random() * 4000 - 2000;
    targets.random.push(object);
  });

  table.forEach(item => {
    const object = new THREE.Object3D();
    object.position.x = item.x * 160 - 1540;
    object.position.y = -(item.y * 200) + 1100;
    targets.table.push(object);
  });

  const vector = new THREE.Vector3();
  objects.forEach((_, i, l) => {
    const phi = Math.acos(-1 + (2 * i) / l.length);
    const theta = Math.sqrt(l.length * Math.PI) * phi;

    const object = new THREE.Object3D();
    object.position.x = 1000 * Math.cos(theta) * Math.sin(phi);
    object.position.y = 1000 * Math.sin(theta) * Math.sin(phi);
    object.position.z = 1000 * Math.cos(phi);

    vector.copy(object.position).multiplyScalar(2);
    object.lookAt(vector);

    targets.sphere.push(object);
  });

  objects.forEach((_, i) => {
    const phi = i * 0.175 + Math.PI;

    const object = new THREE.Object3D();
    object.position.x = 1100 * Math.sin(phi);
    object.position.y = -(i * 8) + 450;
    object.position.z = 1100 * Math.cos(phi);

    const vector = new THREE.Vector3();
    vector.copy(object.position);
    vector.x *= 2;
    vector.z *= 2;
    object.lookAt(vector);

    targets.helix.push(object);
  });

  objects.forEach((_, i) => {
    const object = new THREE.Object3D();
    object.position.x = (i % 5) * 400 - 800;
    object.position.y = -(Math.floor(i / 5) % 5) * 400 + 800;
    object.position.z = Math.floor(i / 25) * 1000 - 2000;
    targets.grid.push(object);
  });
}
