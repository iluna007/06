import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import typefaceFont from "three/examples/fonts/helvetiker_regular.typeface.json";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("textures/matcaps/9.png");
matcapTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Fonts
 */
const fontLoader = new FontLoader();

const meshes = []; // Array to hold all the created meshes

// Control Variables
const geometryControls = {
  rotationSpeed: 0.0015,
  numberOfMeshes: 50,
  distanceMultiplier: 40
};

// Function to create meshes
const createMeshes = () => {
  // Clear previous meshes except the text
  for (let i = 0; i < meshes.length; i++) {
    if (
      meshes[i].type !== "Mesh" ||
      !(
        meshes[i] instanceof THREE.Mesh &&
        meshes[i].geometry instanceof TextGeometry
      )
    ) {
      scene.remove(meshes[i]);
      meshes.splice(i, 1);
      i--; // Adjust index after removal
    }
  }

  // Material
  const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

  // Create Donuts
  const donutGeometry = new THREE.TorusGeometry(0.5, 0.1, 12, 48);
  for (let i = 0; i < geometryControls.numberOfMeshes; i++) {
    const donut = new THREE.Mesh(donutGeometry, material);
    donut.position.x =
      (Math.random() - 0.5) * geometryControls.distanceMultiplier;
    donut.position.y =
      (Math.random() - 0.5) * geometryControls.distanceMultiplier;
    donut.position.z =
      (Math.random() - 0.5) * geometryControls.distanceMultiplier;
    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;
    const scale = Math.random() * 0.01;
    donut.scale.set(scale, scale, scale);

    scene.add(donut);
    meshes.push(donut); // Store the donut mesh
  }

  // Create Tetrahedrons
  const tetrahedronGeometry = new THREE.TetrahedronGeometry(0.5);
  for (let i = 0; i < geometryControls.numberOfMeshes; i++) {
    const tetrahedron = new THREE.Mesh(tetrahedronGeometry, material);
    tetrahedron.position.x =
      (Math.random() - 0.5) * geometryControls.distanceMultiplier;
    tetrahedron.position.y =
      (Math.random() - 0.5) * geometryControls.distanceMultiplier;
    tetrahedron.position.z =
      (Math.random() - 0.5) * geometryControls.distanceMultiplier;
    tetrahedron.rotation.x = Math.random() * Math.PI;
    tetrahedron.rotation.y = Math.random() * Math.PI;
    const scale = Math.random();
    tetrahedron.scale.set(scale, scale, scale);

    scene.add(tetrahedron);
    meshes.push(tetrahedron); // Store the tetrahedron mesh
  }

  // Create Icosahedrons
  const icosahedronGeometry = new THREE.IcosahedronGeometry(0.5);
  for (let i = 0; i < geometryControls.numberOfMeshes; i++) {
    const icosahedron = new THREE.Mesh(icosahedronGeometry, material);
    icosahedron.position.x =
      (Math.random() - 0.5) * geometryControls.distanceMultiplier;
    icosahedron.position.y =
      (Math.random() - 0.5) * geometryControls.distanceMultiplier;
    icosahedron.position.z =
      (Math.random() - 0.5) * geometryControls.distanceMultiplier;
    icosahedron.rotation.x = Math.random() * Math.PI;
    icosahedron.rotation.y = Math.random() * Math.PI;
    const scale = Math.random();
    icosahedron.scale.set(scale, scale, scale);

    scene.add(icosahedron);
    meshes.push(icosahedron); // Store the icosahedron mesh
  }

  // Create Octahedrons
  const octahedronGeometry = new THREE.OctahedronGeometry(0.025);
  for (let i = 0; i < geometryControls.numberOfMeshes; i++) {
    const octahedron = new THREE.Mesh(octahedronGeometry, material);
    octahedron.position.x =
      (Math.random() - 0.5) * geometryControls.distanceMultiplier;
    octahedron.position.y =
      (Math.random() - 0.5) * geometryControls.distanceMultiplier;
    octahedron.position.z =
      (Math.random() - 0.5) * geometryControls.distanceMultiplier;
    octahedron.rotation.x = Math.random() * Math.PI;
    octahedron.rotation.y = Math.random() * Math.PI;
    const scale = Math.random();
    octahedron.scale.set(scale, scale, scale);

    scene.add(octahedron);
    meshes.push(octahedron); // Store the octahedron mesh
  }

  // Create Spheres
  const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
  for (let i = 0; i < geometryControls.numberOfMeshes; i++) {
    const sphere = new THREE.Mesh(sphereGeometry, material);
    sphere.position.x =
      (Math.random() - 0.5) * geometryControls.distanceMultiplier;
    sphere.position.y =
      (Math.random() - 0.5) * geometryControls.distanceMultiplier;
    sphere.position.z =
      (Math.random() - 0.5) * geometryControls.distanceMultiplier;
    sphere.rotation.x = Math.random() * Math.PI;
    sphere.rotation.y = Math.random() * Math.PI;
    const scale = Math.random();
    sphere.scale.set(scale, scale, scale);

    scene.add(sphere);
    meshes.push(sphere); // Store the sphere mesh
  }
};

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  // Material for the text
  const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

  // Text
  const textGeometry = new TextGeometry("Hi! welcome to my portfolio", {
    font: font,
    size: 0.5,
    depth: 0.05,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5
  });
  textGeometry.center(); // Center the text geometry

  const text = new THREE.Mesh(textGeometry, material);
  scene.add(text);
  meshes.push(text); // Store the text mesh

  // Create initial meshes
  createMeshes();

  // GUI Controls
  gui
    .add(geometryControls, "rotationSpeed", 0.0001, 0.01, 0.0001)
    .name("Rotation Speed");
  gui
    .add(geometryControls, "numberOfMeshes", 1, 100, 1)
    .name("Number of Meshes")
    .onChange(createMeshes);
  gui
    .add(geometryControls, "distanceMultiplier", 1, 100, 1)
    .name("Distance Multiplier")
    .onChange(createMeshes);
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 2, 5); // Adjust camera position for better visibility
scene.add(camera);

// Controls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update rotations based on the speed control
  meshes.forEach((mesh) => {
    if (
      mesh.geometry instanceof THREE.IcosahedronGeometry ||
      mesh.geometry instanceof THREE.OctahedronGeometry ||
      mesh.geometry instanceof THREE.TetrahedronGeometry ||
      mesh.geometry instanceof THREE.TorusGeometry
    ) {
      mesh.rotation.x += geometryControls.rotationSpeed; // Control rotation speed
      mesh.rotation.y += geometryControls.rotationSpeed; // Control rotation speed
    }
  });

  // Update controls
  orbitControls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
