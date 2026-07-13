import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setClearColor(0x000000);
   


renderer.setSize(
    window.innerWidth,
    window.innerHeight,
);

document.body.appendChild(renderer.domElement);


camera.position.z = 5;

const starCount = 500;
const positions = [];

for(let i = 0; i < starCount; i++) {
    positions.push(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
    );
}
const starGeometry = new THREE.BufferGeometry();

starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
        positions,
        3
    )
);
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.5
});

const stars = new THREE.Points(
    starGeometry,
    starMaterial
);
scene.add(stars);

function animate() {
    requestAnimationFrame(animate);

   stars.rotation.y += 0.0002;

    renderer.render(scene, camera);
}

console.log(scene);
animate()