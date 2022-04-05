import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const animCanvas = document.getElementById("anim");
const graphDiv = document.getElementById("graph");

window.addEventListener('load', (event) => {
  console.log('page is fully loaded');
  setInterval(main, 300);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('skyblue');
  const fov = 35; // AKA Field of View
  const aspect = animCanvas.clientWidth / animCanvas.clientHeight;
  const near = 0.1; // the near clipping plane
  const far = 100; // the far clipping plane
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 10);
  const geometry = new THREE.BoxBufferGeometry(2, 2, 2);
  const material = new THREE.MeshBasicMaterial();
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.append(renderer.domElement);
  
  const controls = new OrbitControls( camera, renderer.domElement );  
});

var labels = [
	'January',
    'February',
    'March',
    'April',
    'May',
    'June',
];

var data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };
  
const plugin = {
  id: 'custom_canvas_background_color',
  beforeDraw: (chart) => {
    const ctx = chart.canvas.getContext('2d');
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
};
  
var config = {
    type: 'line',
    data: data,
    options: {},
	plugins: [plugin]
};
  
var currentChart = new Chart(
    document.getElementById('chart'),
    config
); 

function main() {
	cube.rotation.x -= 0.02;
	cube.rotation.y -= 0.02;
	renderer.render(scene, camera);
} 

function back() {
	animCanvas.style.display = "block";
	graphDiv.style.display = "none";
}

function showGraph() {
	animCanvas.style.display = "none";
	graphDiv.style.display = "block";
}

function clickhandler(data) {
	showGraph();
} 