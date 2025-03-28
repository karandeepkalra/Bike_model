
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';

// Create loading manager
const loadingManager = new THREE.LoadingManager();
const loadingOverlay = document.createElement('div');
loadingOverlay.style.position = 'fixed';
loadingOverlay.style.top = '0';
loadingOverlay.style.left = '0';
loadingOverlay.style.width = '100%';
loadingOverlay.style.height = '100%';
loadingOverlay.style.backgroundColor = 'transparent'; // Changed to transparent
loadingOverlay.style.display = 'flex';
loadingOverlay.style.flexDirection = 'column';
loadingOverlay.style.justifyContent = 'center';
loadingOverlay.style.alignItems = 'center';
loadingOverlay.style.zIndex = '1000';
loadingOverlay.style.pointerEvents = 'none'; // Allow interaction with underlying content

const loadingText = document.createElement('div');
loadingText.style.color = '#333'; // Darker text for visibility
loadingText.style.fontSize = '2rem';
loadingText.style.textShadow = '1px 1px 2px rgba(255,255,255,0.8)'; // Add slight shadow for readability
loadingText.textContent = 'Loading...';
loadingOverlay.appendChild(loadingText);

const progressBar = document.createElement('div');
progressBar.style.width = '300px';
progressBar.style.height = '20px';
progressBar.style.backgroundColor = 'rgba(200,200,200,0.5)'; // Semi-transparent background
progressBar.style.borderRadius = '10px';
progressBar.style.overflow = 'hidden';
progressBar.style.marginTop = '20px';

const progressBarFill = document.createElement('div');
progressBarFill.style.width = '0%';
progressBarFill.style.height = '100%';
progressBarFill.style.backgroundColor = '#4CAF50';
progressBar.appendChild(progressBarFill);
loadingOverlay.appendChild(progressBar);

document.body.appendChild(loadingOverlay);

// Update loading manager events
loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
    const progressPercent = (itemsLoaded / itemsTotal) * 100;
    progressBarFill.style.width = `${progressPercent}%`;
};

loadingManager.onLoad = () => {
    setTimeout(() => {
        loadingOverlay.style.display = 'none';
    }, 500);
};

loadingManager.onError = (url) => {
    loadingText.textContent = `Error loading: ${url}`;
    progressBarFill.style.backgroundColor = 'red';
};

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

// const axesHelper = new THREE.AxesHelper(6)
// scene.add(axesHelper)
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 4);
// camera.lookAt(0,2,0)

const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(0,8,0);
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

const rgbeLoader = new RGBELoader(loadingManager);
rgbeLoader.load('./def.hdr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = new THREE.Color(0xffffff);
    scene.environment = texture;
});

const loader = new GLTFLoader(loadingManager);
let model;

loader.load('./Karandeep.glb', (gltf) => {
    model = gltf.scene;
    model.position.set(0, 0, 0);
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
controls.minPolarAngle = Math.PI / 8;
controls.maxPolarAngle = Math.PI*4/9;
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