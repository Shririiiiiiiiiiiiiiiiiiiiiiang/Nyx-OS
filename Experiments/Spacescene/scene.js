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

const brightOffset = Math.random() * 100;

const mediumOffset = Math.random() * 100;
renderer.setClearColor(0x000000);
   


renderer.setSize(
    window.innerWidth,
    window.innerHeight,
);

document.body.appendChild(renderer.domElement);


camera.position.z = 5;

const starCount = 1000;
const positions = [];

for(let i = 0; i < starCount; i++) {
    const radius = 80;

    const theta = Math.random() * Math.PI*2;
    const phi = Math.acos(
        (Math.random() * 2) - 1
    );

    const x=
    radius*
    Math.sin(phi)*
    Math.cos(theta);
    const y=
    radius*
    Math.sin(phi)*
    Math.sin(theta);
    const z=
    radius*
    Math.cos(phi);

    positions.push(
        x, 
        y,
        z
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
    size: 0.3

});

const stars = new THREE.Points(
    starGeometry,
    starMaterial
);
scene.add(stars);

const brightPositions = [];

for (let i = 0; i < 100; i++) {
    const radius = 80;
    const theta = Math.random()*Math.PI*2;
    const phi = Math.acos((Math.random() * 2) - 1);

     const x=
    radius*
    Math.sin(phi)*
    Math.cos(theta);
    const y=
    radius*
    Math.sin(phi)*
    Math.sin(theta);
    const z=
    radius*
    Math.cos(phi);

    brightPositions.push(
        x, 
        y,
        z
    );

}
const brightGeometry = new THREE.BufferGeometry();

brightGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
        brightPositions,
        3
    )
);

const brightMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1,
    transparent: true,
    alphaTest: 0.5
});

const brightStars = 
    new THREE.Points(
        brightGeometry,
        brightMaterial
    );

    scene.add(brightStars);



const mediumPositions = [];

for(let i = 0; i < 250; i++){

    const radius = 80;

    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(
        (Math.random() * 2) - 1
    );

    const x =
        radius *
        Math.sin(phi) *
        Math.cos(theta);
    const y =
        radius *
        Math.sin(phi) *
        Math.sin(theta);
    const z =
        radius *
        Math.cos(phi);

    mediumPositions.push(
        x,
        y,
        z
    );
}

const mediumGeometry = new THREE.BufferGeometry();

mediumGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
        mediumPositions,
        3
    )
);

const mediumMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.6,
    transparent: true,
    
});

const mediumStars = 
    new THREE.Points(
        mediumGeometry,
        mediumMaterial
    );

    scene.add(mediumStars);



    
scene.background = new THREE.Color(0x071224);

function animate() {
    requestAnimationFrame(animate);

  brightMaterial.opacity = 0.65+Math.sin(Date.now() * 0.005 + brightOffset) * 0.35;
  mediumMaterial.opacity = 0.75 + Math.sin(Date.now() * 0.002 + mediumOffset)* 0.15;
  
starMaterial.transparent = true;
starMaterial.opacity = 0.9+Math.sin(Date.now() * 0.001) * 0.05;
    renderer.render(scene, camera);
}

console.log(scene);
animate()