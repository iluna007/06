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

// Axis helper
/* const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper); */

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

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  // Material
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
  textGeometry.center();
  textGeometry.computeBoundingBox();
  console.log(textGeometry.boundingBox);

  const text = new THREE.Mesh(textGeometry, material);
  scene.add(text);

  // Donuts
  const donutGeometry = new THREE.TorusGeometry(0.5, 0.1, 12, 48);

  for (let i = 0; i < 50; i++) {
    const donut = new THREE.Mesh(donutGeometry, material);
    donut.position.x = (Math.random() - 0.5) * 20;
    donut.position.y = (Math.random() - 0.5) * 20;
    donut.position.z = (Math.random() - 0.5) * 20;
    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;
    const scale = Math.random() * 0.01;
    donut.scale.set(scale, scale, scale);

    scene.add(donut);
  }
  // Tetrahedron
  const tetrahedronGeometry = new THREE.TetrahedronGeometry(0.5);
  for (let i = 0; i < 50; i++) {
    const tetrahedron = new THREE.Mesh(tetrahedronGeometry, material);
    tetrahedron.position.x = (Math.random() - 0.5) * 17;
    tetrahedron.position.y = (Math.random() - 0.5) * 17;
    tetrahedron.position.z = (Math.random() - 0.5) * 17;
    tetrahedron.rotation.x = Math.random() * Math.PI;
    tetrahedron.rotation.y = Math.random() * Math.PI;
    const scale = Math.random();
    tetrahedron.scale.set(scale, scale, scale);

    scene.add(tetrahedron);
  }
  // Icosahedron
  const icosahedronGeometry = new THREE.IcosahedronGeometry(0.5);
  for (let i = 0; i < 50; i++) {
    const icosahedron = new THREE.Mesh(icosahedronGeometry, material);
    icosahedron.position.x = (Math.random() - 0.5) * 15;
    icosahedron.position.y = (Math.random() - 0.5) * 15;
    icosahedron.position.z = (Math.random() - 0.5) * 15;
    icosahedron.rotation.x = Math.random() * Math.PI;
    icosahedron.rotation.y = Math.random() * Math.PI;
    const scale = Math.random();
    icosahedron.scale.set(scale, scale, scale);

    scene.add(icosahedron);
  }
  // Octahedron
  const octahedronGeometry = new THREE.OctahedronGeometry(0.025);
  for (let i = 0; i < 50; i++) {
    const octahedron = new THREE.Mesh(octahedronGeometry, material);
    octahedron.position.x = (Math.random() - 0.5) * 13;
    octahedron.position.y = (Math.random() - 0.5) * 13;
    octahedron.position.z = (Math.random() - 0.5) * 13;
    octahedron.rotation.x = Math.random() * Math.PI;
    octahedron.rotation.y = Math.random() * Math.PI;
    const scale = Math.random();
    octahedron.scale.set(scale, scale, scale);

    scene.add(octahedron);
  }
  // Spehere
  const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
  for (let i = 0; i < 50; i++) {
    const sphere = new THREE.Mesh(sphereGeometry, material);
    sphere.position.x = (Math.random() - 0.5) * 10;
    sphere.position.y = (Math.random() - 0.5) * 10;
    sphere.position.z = (Math.random() - 0.5) * 10;
    sphere.rotation.x = Math.random() * Math.PI;
    sphere.rotation.y = Math.random() * Math.PI;
    const scale = Math.random();
    sphere.scale.set(scale, scale, scale);

    scene.add(sphere);
  }
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
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

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

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
