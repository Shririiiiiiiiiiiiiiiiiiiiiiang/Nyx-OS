import * as THREE from "three";

const scrollCanvas = document.createElement("canvas");
scrollCanvas.width = 256;
scrollCanvas.height = 256;
const sCtx = scrollCanvas.getContext("2d");

const parchGrad = sCtx.createLinearGradient(0, 0, 256, 0);
parchGrad.addColorStop(0, "#8a6d4b");
parchGrad.addColorStop(0.5, "#d8c39a")
parchGrad.addColorStop(1, "#8a6d4b");
sCtx.fillStyle = parchGrad;
sCtx.fillRect(0, 0, 256, 256);

sCtx.strokeStyle = "rgba(90, 70, 40, 0.15)";
for (let i = 0; i < 20; i++) {
    const y = Math.random() * 256;
    sCtx.beginPath();
    sCtx.moveTo(0, y);
    sCtx.lineTo(256, y);
    sCtx.stroke();
}

const scrollTexture = new THREE.CanvasTexture(scrollCanvas);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x05040a);

const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);
camera.position.set(0, 4, 11);
camera.rotation.x = -0.3;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", handleResize);

const ambient = new THREE.AmbientLight(0xffe9c4, 0.6);
scene.add(ambient);

const spotLight = new THREE.AmbientLight(0xffb055, 3.5);
spotLight.position.set(0, 10, 5);
spotLight.angle = Math.PI / 3;
spotLight.penumbra = 0.8;
scene.add(spotLight);

const sideLight = new THREE.PointLight(0xff9922, 1.5, 20);
sideLight.position.set(-8, 3, 2)
scene.add(sideLight);

const keyLight = new THREE.DirectionalLight(0xffe9c4, 0.8);
keyLight.position.set(5, 6, 10);
scene.add(keyLight);

const scrollRadius = 0.6;
const scrollLength = 3;

const handleGeo = new THREE.CylinderGeometry(scrollRadius * 0.35, scrollRadius * 0.35, scrollLength + 0.8, 16);
const handleMaterial = new THREE.MeshStandardMaterial({color: 0x3d2314, roughness: 0.6});
function createScroll() {
    const bodyGeo = new THREE.CylinderGeometry(
        scrollRadius, scrollRadius, scrollLength, 24, 1, true
    );
    const bodyMaterial = new THREE.MeshStandardMaterial({
        map: scrollTexture,
        roughness: 0.9,
        metalness: 0
    });
    const body = new THREE.Mesh(bodyGeo, bodyMaterial);
    body.rotation.z = Math.PI / 2;

    const innerSpindle = new THREE.Mesh(handleGeo, handleMaterial);
    innerSpindle.rotation.z = Math.PI / 2;

    const capGeo = new THREE.CircleGeometry(scrollRadius, 24);
    const capMaterial = new THREE.MeshStandardMaterial({
        color: 0x5a3d22,
        roughness: 1
    });

    const capLeft = new THREE.Mesh(capGeo, capMaterial);
    capLeft.position.x = -scrollLength / 2;
    capLeft.rotation.y = -Math.PI / 2;
    const capRight = new THREE.Mesh(capGeo, capMaterial);
    capRight.position.x = scrollLength / 2;
    capRight.rotation.y = Math.PI / 2;

    const scrollGroup = new THREE.Group();
    scrollGroup.add(innerSpindle)
    scrollGroup.add(body);
    scrollGroup.add(capLeft);
    scrollGroup.add(capRight);

    return scrollGroup;
}

const cols = 4;
const rows = 3;
const spacingX = 4;
const spacingY = 3;
const allScrolls = [];
let scrollNumber = 1;

const shelfGeo = new THREE.BoxGeometry(18, 0.25, 3.5);
const shelfMaterial = new THREE.MeshStandardMaterial({color: 0x1f120a, roughness: 0.8});

for(let r = 0; r < rows; r++) {
    const shelf = new THREE.Mesh(shelfGeo, shelfMaterial);
    const yPos = (r - (rows - 1) / 2) * spacingY - 0.7;
    shelf.position.set(0, yPos, 0);
    scene.add(shelf);
}

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const scroll = createScroll();

        const xPos = (col - (cols - 1) / 2) * spacingX;
        const yPos = (row - (rows - 1) / 2) * spacingY;
        scroll.position.x = xPos;
        scroll.position.y = yPos;
        scroll.rotation.z += (Math.random() - 0.5) * 0.15;
        scroll.rotation.y += (Math.random() - 0.5) * 0.2;
        scroll.position.z += (Math.random() - 0.5) * 0.3;
        scroll.userData.title = "Test Scroll " + scrollNumber;
        scrollNumber = scrollNumber + 1;
        allScrolls.push(scroll);

        scene.add(scroll);
    }
}

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const scrollLabel = document.getElementById("scrollLabel");

function handleMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    scrollLabel.style.left = (event.clientX + 15) + "px";
    scrollLabel.style.top = (event.clientY + 15) + "px";

}

window.addEventListener("mousemove", handleMouseMove);
function checkHover() {
    raycaster.setFromCamera(mouse, camera);
    let foundHit = false;
    for(let i = 0; i < allScrolls.length; i++) {
        const scroll = allScrolls[i];
        const hits = raycaster.intersectObject(scroll, true);

        if(hits.length > 0) {
            scrollLabel.textContent = scroll.userData.title;
            scrollLabel.style.display = "block";
            foundHit = true;
            break;
        }
    }
    if(foundHit == false) {
        scrollLabel.style.display = "none";
    }
}

function animate() {
    requestAnimationFrame(animate);
    checkHover();
    renderer.render(scene, camera);

}
animate();