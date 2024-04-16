import * as THREE from 'three';
// to control the camera with mouse we have to import orbit control module
import { OrbitControls } from 'three/examples/jsm/Addons.js';
// import all from dat.gui
import * as dat from 'dat.gui';
// import cannon
import * as CANNON from 'cannon-es';



const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
// Setting the canvas size
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setSize(1500, 500);
// adding the canvas to html
document.body.appendChild(renderer.domElement);


// create physics world

const world = new CANNON.World({
    gravity: new CANNON.Vec3(0,-9.81,0)
});
const timeStep = 1/60


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

// adding object: plane
const planeGeometry = new THREE.PlaneGeometry(30,30);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide,
    wireframe:false
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;
// plane.position.y = -10
scene.add(plane);

// create the body for the plane
const planeBody = new CANNON.Body({
    shape: new CANNON.Plane(),
    // mass: 10
    type: CANNON.Body.STATIC
});
planeBody.quaternion.setFromEuler(-Math.PI/ 2, 0, 0);
world.addBody(planeBody);


// adding job: sphare
const sphereGeometry = new THREE.SphereGeometry(0.5,50,50);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x00FF00,
    wireframe: false
});
let numbers = 30
for(let i = 0; i<=numbers;i++){
    const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
    sphere.position.set(-10 + Math.round(Math.random()*10), Math.round(Math.random()*30),0);
    sphere.rotation.x += Math.PI * Math.random();
    sphere.rotation.y += Math.PI * Math.random();
    scene.add(sphere);
}

// sphere.position.set(-10,10,0);
// sphere.castShadow = true;



// add a grid helper:
const gridHelper = new THREE.GridHelper(30,10);
scene.add(gridHelper);



function animate(time){
    world.step(timeStep);

    plane.position.copy(planeBody.position);
    plane.quaternion.copy(planeBody.quaternion);

    renderer.render(scene,camera);
}

renderer.setAnimationLoop(animate);
