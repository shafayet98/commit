import * as THREE from 'three';
// to control the camera with mouse we have to import orbit control module
import { OrbitControls } from 'three/examples/jsm/Addons.js';
// import all from dat.gui
import * as dat from 'dat.gui';
// import cannon
import * as CANNON from 'cannon-es';
import { buffer, func } from 'three/examples/jsm/nodes/Nodes.js';
import MouseMeshInteraction from './three_mmi';


function generateCommitColor(){
    // color HEX
    // #0B6A33 
    // #3AD353
    // #026D31
    // #27A641
    arrayOfColor = ['#0B6A33','#3AD353','#026D31','#27A641']
    indx = Math.floor(createRandomPosition(0,3));
    // console.log(arrayOfColor[indx]);
    return arrayOfColor[indx];
}

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
// Setting the canvas size
// renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setSize(1500, 500);
// smooth edges
renderer.setPixelRatio(window.devicePixelRatio);
// adding the canvas to html
document.body.appendChild(renderer.domElement);

// create the scene
const scene = new THREE.Scene()
// create the camera
// Camera = angel, aspect ratio, near and far
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(-10, 30, 30); // x,y,z = 0,2,5

// orbit control
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

// create physics world
const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -12.81, 0)
});

// add light
// const ambientLight = new THREE.AmbientLight(0x333333);
// scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF,1);
scene.add(directionalLight);
directionalLight.position.set(-30,40,0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -10;
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.right = 10;


const dLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(dLightHelper);

const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(dLightShadowHelper);

// MMI
const mmi = new MouseMeshInteraction(scene, camera);

function createAxisHelper() {
    // add the axis helper
    const axisHelper = new THREE.AxesHelper(3); // 5 is the length of the axis
    scene.add(axisHelper);
}

function createGridHelper(){
    // add a grid helper:
    const gridHelper = new THREE.GridHelper(30,10);
    scene.add(gridHelper);
} 

function createGroundMesh() {
    // adding object: ground
    const groundGeo = new THREE.BoxGeometry(20, 20, 0.5);
    const groundMat = new THREE.MeshStandardMaterial({
        color: '#031D02',
        side: THREE.DoubleSide,
        wireframe: false
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);
    return groundMesh;
}


function createGroundBody(gmesh) {
    // ground body
    const groundPhysMat = new CANNON.Material();
    const groundBody = new CANNON.Body({
        //shape: new CANNON.Plane(),
        //mass: 10
        shape: new CANNON.Box(new CANNON.Vec3(10, 10, 0.5)),
        // shape: new CANNON.Sphere(10),
        type: CANNON.Body.STATIC,
        material: groundPhysMat
    });
    world.addBody(groundBody);
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    return [groundBody, groundPhysMat];
}


function createBoxMesh(numObjects) {
    // add a box 
    boxesMesh = [];
    for (let i = 0; i <= numObjects; i++) {
        const boxGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const boxMat = new THREE.MeshStandardMaterial({
            color: generateCommitColor(),
            wireframe: false
        });
        const boxMesh = new THREE.Mesh(boxGeo, boxMat);
        boxMesh.castShadow = true;
        boxesMesh.push(boxMesh);
        scene.add(boxMesh);
    }
    console.log(boxesMesh);
    return boxesMesh;
}

function createBoxBody(numObjects) {
    // box body
    boxBodies = [];
    boxesPhyMat = [];
    for (let i = 0; i <= numObjects; i++) {
        const boxPhysMat = new CANNON.Material();
        const boxBody = new CANNON.Body({
            mass: 1,
            shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)),
            position: new CANNON.Vec3(createRandomPosition(-8, 8), createRandomPosition(1, 20), createRandomPosition(-8, 8)),
            material: boxPhysMat
        });
        // boxBody.angularVelocity.set(0,10,0);
        // boxBody.angularDamping = 0.3;
        world.addBody(boxBody);
        boxBodies.push(boxBody);
        boxesPhyMat.push(boxPhysMat);
    }
    console.log(boxBodies);
    return boxBodies, boxesPhyMat;
}


// const listener = new THREE.AudioListener();
// camera.add(listener);

// const audioLoader = new THREE.AudioLoader();

// const contactSound = new THREE.Audio(listener);

function createContact(numObjects, groundPhysMat) {
    // // contact between box and ground
    for (let i = 0; i <= numObjects; i++) {
        const groundBoxContactMat = new CANNON.ContactMaterial(groundPhysMat, boxesPhyMat[i], {
            friction: 0.2,
            restitution: 1
        })
        // world.addContactMaterial(groundBoxContactMat);
        // audioLoader.load('../audio/sound.mp3', function(){
        //     contactSound.setBuffer(buffer);
        //     contactSound.setLoop(false);
        //     contactSound.setVolume(1);
        // })

        

    }
}


// adding obj: sphare
// const sphereGeo = new THREE.SphereGeometry(1);
// const sphereMat = new THREE.MeshBasicMaterial({ 
// 	color: 0xff0000, 
// 	wireframe: true,
//  });
// const sphereMesh = new THREE.Mesh( sphereGeo, sphereMat);
// scene.add(sphereMesh);

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

function animate(gmesh, gbody, numObjects) {
    world.step(timeStep);

    gmesh.position.copy(gbody.position);
    gmesh.quaternion.copy(gbody.quaternion);

    for (let i = 0; i <= numObjects; i++) {
        boxesMesh[i].position.copy(boxBodies[i].position);
        boxesMesh[i].quaternion.copy(boxBodies[i].quaternion);
    }

    // boxMesh.position.copy(boxBody.position);
    // boxMesh.quaternion.copy(boxBody.quaternion);


    // sphereMesh.position.copy(sphereBody.position);
    // sphereMesh.quaternion.copy(sphereBody.quaternion);

    renderer.render(scene, camera);
}

function createRandomPosition(min, max) {
    return Math.random() * (max - min) + min;
}



setTimeout(function () {
    //your code to be executed after 1 second
    let numObjects = localStorage.getItem("objects");
    console.log(numObjects);
    // createAxisHelper();
    // createGridHelper();
    const gmesh = createGroundMesh();
    const [gbody, gPhyMat] = createGroundBody(gmesh);
    const bmesh = createBoxMesh(numObjects);
    const [ bbody, bPhyMat ] = createBoxBody(numObjects);
    createContact(numObjects,gPhyMat, bPhyMat);
    renderer.setAnimationLoop(() => animate(gmesh, gbody, numObjects));
}, 1000);

