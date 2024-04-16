import * as THREE from 'three';
// to control the camera with mouse we have to import orbit control module
import { OrbitControls } from 'three/examples/jsm/Addons.js';
// import all from dat.gui
import * as dat from 'dat.gui';

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
// Setting the canvas size
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setSize(1500, 500);
// adding the canvas to html
document.body.appendChild(renderer.domElement);

// create the scene
const scene = new THREE.Scene()
// create the camera
// Camera = angel, aspect ratio, near and far
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);
camera.position.set(-10,30,30); // x,y,z = 0,2,5

// orbit control
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

// add the axis helper
const axisHelper = new THREE.AxesHelper(3); // 5 is the length of the axis
scene.add(axisHelper);

// add a grid helper:
const gridHelper = new THREE.GridHelper(30,10);
scene.add(gridHelper);

function animate(time){
    
    renderer.render(scene,camera);
}

renderer.setAnimationLoop(animate);