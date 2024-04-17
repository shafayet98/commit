import * as THREE from 'three';
// to control the camera with mouse we have to import orbit control module
import { OrbitControls } from 'three/examples/jsm/Addons.js';
// import all from dat.gui
import * as dat from 'dat.gui';
// import cannon
import * as CANNON from 'cannon-es';

// number of objects
numObjects = 30;

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
// Setting the canvas size
renderer.setSize(window.innerWidth, window.innerHeight);
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

// adding object: ground
const groundGeo = new THREE.PlaneGeometry(30, 30);
const groundMat = new THREE.MeshBasicMaterial({ 
	color: 0xffffff,
	side: THREE.DoubleSide,
	wireframe: true 
 });
const groundMesh = new THREE.Mesh(groundGeo, groundMat);
scene.add(groundMesh);

// add a box 
boxesMesh = [];
for (let i = 0; i<=numObjects;i++){
    const boxGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const boxMat = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: false
    });
    const boxMesh = new THREE.Mesh(boxGeo, boxMat);
    boxesMesh.push(boxMesh);
    scene.add(boxMesh);
}
console.log(boxesMesh);


// adding job: sphare
// const sphereGeo = new THREE.SphereGeometry(1);
// const sphereMat = new THREE.MeshBasicMaterial({ 
// 	color: 0xff0000, 
// 	wireframe: true,
//  });
// const sphereMesh = new THREE.Mesh( sphereGeo, sphereMat);
// scene.add(sphereMesh);

// create physics world
const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -12.81, 0)
});

// ground body
const groundPhysMat = new CANNON.Material();
const groundBody = new CANNON.Body({
    //shape: new CANNON.Plane(),
    //mass: 10
    shape: new CANNON.Box(new CANNON.Vec3(15, 15, 0.1)),
    // shape: new CANNON.Sphere(10),
    type: CANNON.Body.STATIC,
    material: groundPhysMat
});
world.addBody(groundBody);
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);

// box body
boxBodies = [];
boxesPhyMat = [];
for (let i = 0; i<=numObjects; i++){
    const boxPhysMat = new CANNON.Material();
    const boxBody = new CANNON.Body({
        mass: 1,
        shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)),
        position: new CANNON.Vec3(-Math.random() * 15, Math.random() * 10, Math.random() * 10),
        material: boxPhysMat
    });
    // boxBody.angularVelocity.set(0,10,0);
    // boxBody.angularDamping = 0.3;
    world.addBody(boxBody);
    boxBodies.push(boxBody);
    boxesPhyMat.push(boxPhysMat);
}
console.log(boxBodies);


// contact between box and ground
for(let i = 0; i<= numObjects; i++){
    const groundBoxContactMat = new CANNON.ContactMaterial(groundPhysMat,boxesPhyMat[i],{
        friction:0.2,
        restitution: 1
    })
    world.addContactMaterial(groundBoxContactMat);
}


// sphere
// const spherePhysMat = new CANNON.Material();
// const sphereBody = new CANNON.Body({
//     mass: 1,
//     shape: new CANNON.Sphere(1),
//     position: new CANNON.Vec3(0, 40, 0),
//     material: spherePhysMat
// });
// world.addBody(sphereBody);
// sphereBody.linearDamping = 0.6;
// // contact between sphere and ground
// const groundSphereContactMat = new CANNON.ContactMaterial(
//     groundPhysMat,
//     spherePhysMat,
//     {restitution: 1}
// );
// world.addContactMaterial(groundSphereContactMat);

const timeStep = 1 / 60;

function animate(time){
    world.step(timeStep);

    groundMesh.position.copy(groundBody.position);
    groundMesh.quaternion.copy(groundBody.quaternion);

    for(let i = 0 ; i<=numObjects; i++){
        boxesMesh[i].position.copy(boxBodies[i].position);
        boxesMesh[i].quaternion.copy(boxBodies[i].quaternion);
    }

    // boxMesh.position.copy(boxBody.position);
    // boxMesh.quaternion.copy(boxBody.quaternion);

    
    // sphereMesh.position.copy(sphereBody.position);
    // sphereMesh.quaternion.copy(sphereBody.quaternion);

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
