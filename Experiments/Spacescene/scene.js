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


const glowRadiant = ctx.createRadialGradient(256, 256, 150, 256, 256, 240);
glowRadiant.addColorStop(0, "rgba(230, 255, 210, 0.35)");
glowRadiant.addColorStop(1, "rgba(230, 225, 210, 0)");
ctx.fillStyle = glowRadiant;
ctx.beginPath();
ctx.arc(256, 256, 240, 0, Math.PI * 2);
ctx.fill();
const moonGradient = ctx.createRadialGradient(210, 190, 10,256, 256, 180);
moonGradient.addColorStop(0, "#fffdfa");
moonGradient.addColorStop(0.6, "#e0dacb");
moonGradient.addColorStop(1, "#9c9485");

ctx.fillStyle = moonGradient;
ctx.beginPath();
ctx.arc(256, 256, 180, 0, Math.PI * 2);
ctx.fill()

ctx.fillStyle = "rgba(110, 100, 90, 0.15)";
ctx.beginPath();
ctx.ellipse(210, 210, 65, 45, 0.2, 0, Math.PI * 2);
ctx.fill();

ctx.beginPath();
ctx.ellipse(280, 280, 55, 35, -0.3, 0, Math.PI * 2);
ctx.fill();

ctx.beginPath();
ctx.ellipse(230, 230, 40, 25, 0.1, 0, Math.PI * 2);
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
const brightStars = [];

for (let i = 0; i < 100; i++) {
    const radius = 70;
    const theta = Math.random()*Math.PI*2;
    const phi = Math.acos((Math.random() * 2)- 1);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute([x, y, z], 3));
    const material = new THREE.PointsMaterial({
        map: starTexture, color: 0xffffff, size: 0.8 + Math.random() * 0.7, transparent: true
    });
    const star = new THREE.Points(geometry, material);
    star.userData.twinkleSpeed = 0.002 + Math.random() * 0.005;
    star.userData.twinkleOffset = Math.random() * 100;
    brightStars.push(star);
    scene.add(star)  
}







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

 
  mediumMaterial.opacity = 0.75 + Math.sin(Date.now() * 0.002 + mediumOffset)* 0.15;
  
starMaterial.transparent = true;
starMaterial.opacity = 0.9+Math.sin(Date.now() * 0.01) * 0.05;

for(const star of brightStars) {
    star.material.opacity = 
    0.6 +
    Math.sin(
        Date.now() * star.userData.twinkleSpeed + star.userData.twinkleOffset
    ) * 0.4;
}

    renderer.render(scene, camera);

stars.rotation.y += 0.0002;
mediumStars.rotation.y += 0.0005;



}

console.log(scene);
animate()