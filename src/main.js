// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass.js';



// const canvas = document.getElementById('canvas') || document.createElement('canvas');
// if (!document.getElementById('canvas')) document.body.appendChild(canvas);

// const renderer = new THREE.WebGLRenderer({canvas});
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// renderer.toneMapping = THREE.ACESFilmicToneMapping;
// renderer.toneMappingExposure = 1.2;

// const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xf0f0f0);

// const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(0, 2, 5);

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
// directionalLight.position.set(3, 10, -3);
// directionalLight.castShadow = true;

// directionalLight.shadow.mapSize.width = 2048;  // Higher resolution for smooth shadows
// directionalLight.shadow.mapSize.height = 2048;
// directionalLight.shadow.camera.near = 1;
// directionalLight.shadow.camera.far = 20;
// directionalLight.shadow.bias = -0.002;

// // Soft Shadow Blur
// directionalLight.shadow.radius = 5; // Increase for softer edges

// scene.add(directionalLight);
// const ground = new THREE.Mesh(
//     new THREE.PlaneGeometry(10, 10),
//     new THREE.ShadowMaterial({
//         opacity: 0.3,
//         transparent: true
//     })
// );
// ground.rotation.x = -Math.PI / 2;
// ground.position.y = -0.02;
// ground.receiveShadow = true;
// scene.add(ground);

// const rgbeLoader = new RGBELoader();
// rgbeLoader.load('./def.hdr', (texture) => {
//     texture.mapping = THREE.EquirectangularReflectionMapping;
//     scene.background = new THREE.Color(0xffffff);
//     scene.environment = texture;
// });


// const loader = new GLTFLoader();
// let model;
// loader.load('./Karandeep.glb', (gltf) => {
//     model = gltf.scene;
//     model.position.set(0, -0.2, 0);
    
//     model.traverse((child) => {
//         if (child.isMesh) {
//             child.castShadow = true;
//             child.receiveShadow = false;
//             if (child.material) {
//                 child.material.envMapIntensity = 1.2;
//                 child.material.metalness = 0.7;
//                 child.material.roughness = 0.6;
                
//             }
//         }
//     });
    
//     scene.add(model);
// });

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.05;
// controls.minPolarAngle = Math.PI / 4;
// controls.maxPolarAngle = Math.PI *3/4;
// controls.minAzimuthAngle = -Math.PI / 1;
// controls.maxAzimuthAngle = Math.PI / 1;
// controls.enableZoom = true;
// controls.zoomSpeed = 1.2;



// const composer = new EffectComposer(renderer);
// composer.addPass(new RenderPass(scene, camera));



// function animate() {
//     requestAnimationFrame(animate);
//     if (model) { 
//         model.rotation.y += 0.02;
//     }
//     controls.update();
//     renderer.render(scene, camera);
//     composer.render(); 
// }
// animate();

// window.addEventListener('resize', () => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// });



import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';

const canvas = document.getElementById('canvas') || document.createElement('canvas');
if (!document.getElementById('canvas')) document.body.appendChild(canvas);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.8;
renderer.outputEncoding = THREE.sRGBEncoding;


const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(3, 10, -3);
directionalLight.castShadow = true;

directionalLight.shadow.mapSize.width = 4096;
directionalLight.shadow.mapSize.height = 4096;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 30;
directionalLight.shadow.bias = -0.001;
directionalLight.shadow.radius = 4;

scene.add(directionalLight);

const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.ShadowMaterial({ opacity: 0.4, transparent: true })
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.02;
ground.receiveShadow = true;
scene.add(ground);

const rgbeLoader = new RGBELoader();
rgbeLoader.load('./def.hdr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = new THREE.Color(0xffffff);
    scene.environment = texture;
});

const loader = new GLTFLoader();
let model;
let isHovering = false;

loader.load('./Karandeep.glb', (gltf) => {
    model = gltf.scene;
    model.position.set(0, -0.2, 0);
    
    model.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) {
                child.material.envMapIntensity = 1.5;
                child.material.metalness = 0.8;
                child.material.roughness = 0.5;
            }
        }
    });
    
    scene.add(model);
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minPolarAngle = Math.PI / 4;
controls.maxPolarAngle = Math.PI * 3/4;
controls.minAzimuthAngle = -Math.PI / 1;
controls.maxAzimuthAngle = Math.PI / 1;
controls.enableZoom = true;
controls.zoomSpeed = 1.2;
controls.autoRotate = true;
controls.autoRotateSpeed = 1.0;

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    composer.render(); 
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass.js';

// // Canvas and Renderer
// const canvas = document.getElementById('canvas') || document.createElement('canvas');
// if (!document.getElementById('canvas')) document.body.appendChild(canvas);

// const renderer = new THREE.WebGLRenderer({ canvas });
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// renderer.toneMapping = THREE.ACESFilmicToneMapping;
// renderer.toneMappingExposure = 1.2;

// // Scene and Camera
// const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xf0f0f0);
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);
// const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(0, 2, 5);

// // HDR Environment Lighting
// const rgbeLoader = new RGBELoader();
// rgbeLoader.load('./def.hdr', (texture) => {
//     texture.mapping = THREE.EquirectangularReflectionMapping;
//     scene.background = new THREE.Color(0xffffff);
//     scene.environment = texture;
// });


// // const ground = new THREE.Mesh(
// //     new THREE.PlaneGeometry(10, 10),
// //     new THREE.MeshStandardMaterial({
// //         opacity: 0.3,
// //         transparent: true,
// //         color:"#777777",
// //         roughness:1,
// //         metalness:1
// //     })
// // );
// // ground.rotation.x = -Math.PI / 2;
// // ground.position.y = -0.02;
// // ground.receiveShadow = true;
// // scene.add(ground);

// // Load 3D Model
// const loader = new GLTFLoader();
// let model;
// loader.load('./Karandeep.glb', (gltf) => {
//     model = gltf.scene;
//     model.position.set(0, -0.2, 0);

//     model.traverse((child) => {
//         if (child.isMesh) {
//             child.castShadow = true;
//             child.receiveShadow = true;
//             if (child.material) {
//                 child.material.envMapIntensity = 1.2;
//                 child.material.metalness = 0.7;
//                 child.material.roughness = 0.6;
//             }
//         }
//     });

//     scene.add(model);
// });

// // Orbit Controls
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.05;
// controls.minPolarAngle = Math.PI / 4;
// controls.maxPolarAngle = Math.PI * 3 / 4;
// controls.minAzimuthAngle = -Math.PI / 1;
// controls.maxAzimuthAngle = Math.PI / 1;
// controls.enableZoom = true;
// controls.zoomSpeed = 1.2;

// // Post-processing with SAO Pass (Shadows without Lights)
// // const composer = new EffectComposer(renderer);
// // composer.addPass(new RenderPass(scene, camera));

// // const saoPass = new SAOPass(scene, camera, false, true);
// // saoPass.params.saoBias = 0.2;
// // saoPass.params.saoIntensity = 0.03;  // Controls shadow darkness
// // saoPass.params.saoScale = 30;         // Spread of shadows
// // saoPass.params.saoKernelRadius = 60; // Softness of shadows
// //saoPass.params.saoBlur = true;       // Enables blurred soft shadows
// // const saoPass = new SAOPass(this.scene, this.camera, false, true);
// // saoPass.params.saoIntensity = 0.5;
// // saoPass.params.saoScale = 10;
// // saoPass.params.saoKernelRadius = 100;
// // saoPass.params.saoMinResolution = 0.0001;

// // composer.addPass(saoPass);

// // Animation Loop
// function animate() {
//     requestAnimationFrame(animate);
//     if (model) { 
//         model.rotation.y += 0.02;
//     }
//     controls.update();
//     composer.render();
// }
// animate();

// // Handle Window Resize
// window.addEventListener('resize', () => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     composer.setSize(window.innerWidth, window.innerHeight);
// });
