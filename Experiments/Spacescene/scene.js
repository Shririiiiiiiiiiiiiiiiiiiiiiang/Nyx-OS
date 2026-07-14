import * as THREE from 'three';

const starCanvas = document.createElement("canvas");
starCanvas.width = 64
starCanvas.height = 64
const starCtx = starCanvas.getContext("2d");
starCtx.beginPath();
starCtx.arc(32, 32, 30, 0, Math.PI * 2);
starCtx.fillStyle = "white";
starCtx.fill();
const starTexture = new THREE.CanvasTexture(starCanvas);

const moonCanvas = document.createElement("canvas");
moonCanvas.width = 512;
moonCanvas.height = 512;
const ctx = moonCanvas.getContext("2d");


ctx.beginPath();
ctx.arc(
    256, 256, 180, 0, Math.PI * 2
);
const moonGradient = ctx.createRadialGradient(
    220, 200, 20, 256, 256, 180
);
moonGradient.addColorStop(0, "#f0f0f0");
moonGradient.addColorStop(1, "#b8b8b8");
ctx.fillStyle = moonGradient;
ctx.fill();
ctx.fillStyle = "rgba(100, 100, 100, 0.25)";
ctx.beginPath();
ctx.ellipse(210, 220, 55, 35, 0.3, 0, Math.PI *2);
ctx.fill();
ctx.beginPath();
ctx.ellipse(290, 280, 45, 25, -0.4, 0, Math.PI * 2);
ctx.fill();
ctx.beginPath();
ctx.ellipse(250, 350, 30, 18, 0.2, 0, Math.PI * 2);
ctx.fill();

const moonTexture = new THREE.CanvasTexture(
    moonCanvas
);

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

window.addEventListener(
    "resize",
    () => {
        camera.aspect = window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    }
);


camera.position.z = 5;

const starCount = 1000;
const positions = [];

for(let i = 0; i < starCount; i++) {
    const radius = 70;

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
    map: starTexture,
    transparent: true,
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
    const radius = 70;
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
    map:starTexture,
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

    const radius = 70;

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
    map: starTexture,
    color: 0xffffff,
    size: 0.6,
    transparent: true
    
});

const mediumStars = 
    new THREE.Points(
        mediumGeometry,
        mediumMaterial
    );

    scene.add(mediumStars);


const moonMaterial = new THREE.SpriteMaterial({
    map: moonTexture,
    transparent: true
});
const moon = new THREE.Sprite(
    moonMaterial
);
moon.position.set( 18, 10, -20);
moon.scale.set(12, 12, 1);
scene.add(moon);




    
scene.background = new THREE.Color(0x071224);

function animate() {
    requestAnimationFrame(animate);

  brightMaterial.opacity = 0.65+Math.sin(Date.now() * 0.005 + brightOffset) * 0.35;
  mediumMaterial.opacity = 0.75 + Math.sin(Date.now() * 0.002 + mediumOffset)* 0.15;
  
starMaterial.transparent = true;
starMaterial.opacity = 0.9+Math.sin(Date.now() * 0.001) * 0.05;
    renderer.render(scene, camera);

stars.rotation.y += 0.00002;
mediumStars.rotation.y += 0.00005;
brightStars.rotation.y += 0.00009;
}

console.log(scene);
animate()