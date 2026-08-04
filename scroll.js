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

sCtx.fillStyle = "rgba(60, 40, 20, 0.12)";
for(let i = 0; i < 10; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const r = 10 + Math.random() * 25;
    sCtx.beginPath();
    sCtx.arc(x, y, r, 0, Math.PI * 2);
    sCtx.fill();
}
const scrollTexture = new THREE.CanvasTexture(scrollCanvas);
const dustCanvas = document.createElement("canvas");
dustCanvas.width = 32;
dustCanvas.height = 32;
const dCtx = dustCanvas.getContext("2d");
const dustGrad = dCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
dustGrad.addColorStop(0, "rgba(255, 255, 255, 1)");
dustGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
dCtx.fillStyle = dustGrad;
dCtx.fillRect(0, 0, 32, 32);
const dustSprite = new THREE.CanvasTexture(dustCanvas);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x05040a);
scene.fog = new THREE.Fog(0x05040a, 10, 30);

const wallGeo = new THREE.PlaneGeometry(80, 40);
const WallMaterial = new THREE.MeshStandardMaterial({color: 0x1a0f08, roughness: 1});
const backWall = new THREE.Mesh(wallGeo, WallMaterial);
backWall.position.set(0, 0, -18);
backWall.receiveShadow = true;
scene.add(backWall);

const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);
camera.position.set(0, 4, 18);
camera.rotation.x = -0.2;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.getElementById("scrollLib").appendChild(renderer.domElement);

function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", handleResize);

const ambient = new THREE.AmbientLight(0xffe9c4, 0.6);
scene.add(ambient);

const spotLight = new THREE.SpotLight(0xffb055, 2.2);
spotLight.position.set(0, 10, 5);
spotLight.angle = Math.PI / 4;
spotLight.penumbra = 0.6;
spotLight.castShadow = true;
scene.add(spotLight);
spotLight.target.position.set(0, 0, 0); // added it so i can if i want in future change its direction
scene.add(spotLight.target);

const sideLight = new THREE.PointLight(0xff9922, 1.5, 20);
sideLight.position.set(-8, 3, 2)
scene.add(sideLight);

const keyLight = new THREE.DirectionalLight(0xffe9c4, 0.8);
keyLight.position.set(5, 6, 10);
scene.add(keyLight);

const dustCount = 300;
const dustGeo = new THREE.BufferGeometry();
const dustPos = new Float32Array(dustCount * 3);

for(let i = 0; i< dustCount * 3; i += 3) {
    dustPos[i] = (Math.random() - 0.5) * 12;
    dustPos[i + 1] = (Math.random() - 0.5) * 12;
    dustPos[i + 2] = (Math.random() - 0.5) * 10 + 2;
}
dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));

const dustSpeed = new Float32Array(dustCount * 3);
for(let i = 0; i < dustCount * 3; i += 3) {
dustSpeed[i] = (Math.random() - 0.5) * 0.006;
dustSpeed[i + 1] = (Math.random() - 0.35) * 0.006;
dustSpeed[i + 2] = (Math.random() - 0.5) * 0.006;
}

const dustMaterial = new THREE.PointsMaterial({
    color: 0xffcc88,
    size: 0.12,
    map: dustSprite,
    transparent: true,
    opacity: 0.6,
    depthWrite: false,
    alphaTest: 0.01
});
const dustFeild = new THREE.Points(dustGeo, dustMaterial);
scene.add(dustFeild);

const scrollRadius = 0.6;
const scrollLength = 3;
const scrollWidth = scrollLength * 1.6;

const handleGeo = new THREE.CylinderGeometry(scrollRadius * 0.35, scrollRadius * 0.35, scrollLength + 0.8, 16);
const handleMaterial = new THREE.MeshStandardMaterial({color: 0x3d2314, roughness: 0.6});
const openhandleGeo = new THREE.SphereGeometry(scrollRadius * 0.5, 16, 16);
const openhandleMaterial = new THREE.MeshStandardMaterial({color: 0x6b4423, roughness:0.4, metalness: 0.1});
const openrodGeo = new THREE.CylinderGeometry(scrollRadius * 0.3, scrollRadius * 0.3, scrollRadius * 5.4, 16);
const openrodMaterial = new THREE.MeshStandardMaterial({color: 0x3d2314, roughness: 0.6});

const bodyGeo = new THREE.CylinderGeometry(
    scrollRadius, scrollRadius, scrollLength, 24, 1, true
    );
const bodyMaterial = new THREE.MeshStandardMaterial({
    map: scrollTexture,
    roughness: 0.9,
    metalness: 0
    });


    const capGeo = new THREE.CircleGeometry(scrollRadius, 24);
    const capMaterial = new THREE.MeshStandardMaterial({
        color: 0x5a3d22,
        roughness: 1
    });

function createScroll() {
    const body = new THREE.Mesh(bodyGeo, bodyMaterial);
    body.rotation.z = Math.PI / 2;

    const innerSpindle = new THREE.Mesh(handleGeo, handleMaterial);
    innerSpindle.rotation.z = Math.PI / 2;
    const openhandleLeft = new THREE.Mesh(openhandleGeo, openhandleMaterial);
    openhandleLeft.position.x = -(scrollLength + 0.8) / 2;
    const openhandleRight = new THREE.Mesh(openhandleGeo, openhandleMaterial);
    openhandleRight.position.x = (scrollLength + 0.8) / 2;
    const openhandleleftBottom = new THREE.Mesh(openhandleGeo, openhandleMaterial);
    openhandleleftBottom.position.x = -(scrollLength + 0.8) / 2;
    const openhandlerightBottom = new THREE.Mesh(openhandleGeo, openhandleMaterial);
    openhandlerightBottom.position.x = (scrollLength + 0.8) / 2;
    const openrodLeft = new THREE.Mesh(openrodGeo, openrodMaterial);
    openrodLeft.position.x = -scrollLength / 2;
    openrodLeft.scale.y = 0;
    const openrodright = new THREE.Mesh(openrodGeo, openrodMaterial);
    openrodright.position.x = scrollLength / 2;
    openrodright.scale.y = 0;
    const capLeft = new THREE.Mesh(capGeo, capMaterial);
    capLeft.position.x = -scrollLength / 2;
    capLeft.rotation.y = -Math.PI / 2;
    const capRight = new THREE.Mesh(capGeo, capMaterial);
    capRight.position.x = scrollLength / 2;
    capRight.rotation.y = Math.PI / 2;

    body.castShadow = true;
    capLeft.castShadow = true;
    capRight.castShadow = true;

    const openscrollGeo = new THREE.PlaneGeometry(scrollWidth, scrollRadius * 5);
    const openscrollMaterial = new THREE.MeshStandardMaterial({
        map: scrollTexture, 
        roughness: 0.9,
        side: THREE.DoubleSide
    });
    const openScroll = new THREE.Mesh(openscrollGeo, openscrollMaterial);
    openScroll.position.x = 0
    openScroll.scale.x = 0;
    
    const scrollGroup = new THREE.Group();
    scrollGroup.add(innerSpindle)
    scrollGroup.add(body);
    scrollGroup.add(capLeft);
    scrollGroup.add(capRight);
    scrollGroup.add(openScroll);
    scrollGroup.add(openhandleLeft);
    scrollGroup.add(openhandleRight);
    scrollGroup.add(openhandleleftBottom);
    scrollGroup.add(openhandlerightBottom);
    scrollGroup.add(openrodLeft);
    scrollGroup.add(openrodright);
    scrollGroup.userData.body = body;
    scrollGroup.userData.capLeft = capLeft;
    scrollGroup.userData.capRight = capRight;
    scrollGroup.userData.innerSpindle = innerSpindle;
    scrollGroup.userData.openScroll = openScroll;
    scrollGroup.userData.openhandleLeft = openhandleLeft;
    scrollGroup.userData.openhandleRight = openhandleRight;
    scrollGroup.userData.openhandleleftBottom = openhandleleftBottom;
     scrollGroup.userData.openhandlerightBottom = openhandlerightBottom;
    scrollGroup.userData.openrodLeft = openrodLeft;
    scrollGroup.userData.openrodright = openrodright;
    scrollGroup.userData.isOpen = false;
    scrollGroup.userData.openprogress = 0;
    scrollGroup.userData.startPos = new THREE.Vector3();
    scrollGroup.userData.targetPos = new THREE.Vector3();
    scrollGroup.userData.startRotY = 0;
    scrollGroup.userData.startRotZ = 0;

    return scrollGroup;
}

const cols = 4;
const rows = 3;
const spacingX = 4;
const spacingY = 3;
const allScrolls = [];
let notesData = JSON.parse(localStorage.getItem("notes")) || [];

const shelfGeo = new THREE.BoxGeometry(18, 0.25, 3.5);
const shelfMaterial = new THREE.MeshStandardMaterial({color: 0x1f120a, roughness: 0.8});

for(let r = 0; r < rows; r++) {
    const shelf = new THREE.Mesh(shelfGeo, shelfMaterial);
    const yPos = (r - (rows - 1) / 2) * spacingY - 0.7;
    shelf.position.set(0, yPos, 0);
    shelf.receiveShadow = true;
    scene.add(shelf);
}

const curveAmt = 0.35;

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const scroll = createScroll();

        const colOffSet = col - (cols - 1) / 2;
        const xPos = colOffSet * spacingX;
        const yPos = (row - (rows - 1) / 2) * spacingY;
        const zCurve = colOffSet * colOffSet * curveAmt;
        scroll.position.x = xPos;
        scroll.position.y = yPos;
        scroll.position.z = zCurve;
        scroll.rotation.y = -colOffSet * 0.1;
        scroll.rotation.z += (Math.random() - 0.5) * 0.15;
        scroll.position.z += (Math.random() - 0.5) * 0.3;        
        const slotNumber = allScrolls.length;
        if(slotNumber < notesData.length) {
            scroll.userData.title = notesData[slotNumber].title;
            scroll.userData.noteContent = notesData[slotNumber].content;
        }
        else {
            scroll.userData.title = "Empty"
            scroll.userData.noteContent = "";
            scroll.userData.isEmpty = true;
        }

        scroll.userData.startPos = scroll.position.clone();
        scroll.userData.targetPos = scroll.position.clone();
        allScrolls.push(scroll);

        scene.add(scroll);
    }
}
const notesButton = document.getElementById("notes");
const closeLibButton = document.getElementById("closeLib");
const scrollLibPage = document.getElementById("scrollLib");
let libOpen = false;
notesButton.addEventListener("click", function() {
    scrollLibPage.style.display = "block";
    libOpen = true;
});
closeLibButton.addEventListener("click", function() {
    scrollLibPage.style.display = "none";
    libOpen = false;
});
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
    if(libOpen === false) {
        return;
    }
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
function handleClick() {
    raycaster.setFromCamera(mouse, camera);

    if(activeScroll !== null) {
        activeScroll.userData.isOpen = false;
        activeScroll.userData.shelfpos = activeScroll.userData.startPos.clone();
        activeScroll = null;
        return;
    }
    for(let i = 0; i < allScrolls.length; i++) {
        const scroll = allScrolls[i];
        const clicks = raycaster.intersectObject(scroll, true);
        if(clicks.length > 0) {
            scroll.userData.isOpen = true;
            scroll.userData.startPos = scroll.position.clone();
            scroll.userData.startRotY = scroll.rotation.y;
            scroll.userData.startRotZ = scroll.rotation.z;

            const camDir = new THREE.Vector3();
            camera.getWorldDirection(camDir);
            scroll.userData.targetPos = camera.position.clone().add(camDir.multiplyScalar(9));
            activeScroll = scroll;    
            break;
        }
    }
}

window.addEventListener("click", handleClick);

const openSpeed = 0.04;
let activeScroll = null;

function updateScrolls() {
    for(let i = 0; i < allScrolls.length; i++) {
        const scroll = allScrolls[i];
        
        if(scroll.userData.isOpen === true && scroll.userData.openprogress < 1) {
            scroll.userData.openprogress += openSpeed;
            if(scroll.userData.openprogress > 1) {
                scroll.userData.openprogress = 1;
            }
        }
        else if(scroll.userData.isOpen === false && scroll.userData.openprogress > 0) {
                scroll.userData.openprogress -= openSpeed;
                if(scroll.userData.openprogress < 0) {
                scroll.userData.openprogress = 0;
            }
        }
        {    
            const eased = scroll.userData.openprogress * scroll.userData.openprogress * (3 - 2 * scroll.userData.openprogress);
            scroll.position.lerpVectors(scroll.userData.startPos, scroll.userData.targetPos, eased);
            scroll.rotation.y = scroll.userData.startRotY * (1 - eased);
            scroll.rotation.z = scroll.userData.startRotZ * (1 - eased);
          
            scroll.userData.body.scale.y = 1 - eased;
            scroll.userData.openScroll.scale.x = eased;

            const scrollHalf = scrollWidth / 2;
            scroll.userData.capLeft.position.x = -scrollLength / 2 + (-scrollHalf + scrollLength / 2) * eased;
            scroll.userData.capRight.position.x = scrollLength / 2 + (scrollHalf - scrollLength / 2) * eased;
            scroll.userData.innerSpindle.scale.y = 1 - eased;
            const handleOffset = 0.4 * (1 - eased);
            scroll.userData.openhandleLeft.position.x = scroll.userData.capLeft.position.x - handleOffset;
            scroll.userData.openhandleRight.position.x = scroll.userData.capRight.position.x + handleOffset;
            scroll.userData.openrodLeft.position.x = scroll.userData.capLeft.position.x;
            scroll.userData.openrodright.position.x = scroll.userData.capRight.position.x;
            scroll.userData.openrodLeft.scale.y = eased;
            scroll.userData.openrodright.scale.y= eased;  
            const handleHeight = (scrollRadius * 5.4) / 2;
            scroll.userData.openhandleLeft.position.y = handleHeight * eased;
            scroll.userData.openhandleRight.position.y = handleHeight * eased;
            scroll.userData.openhandleleftBottom.position.x = scroll.userData.capLeft.position.x - handleOffset;
            scroll.userData.openhandleleftBottom.position.y = -handleHeight * eased;
            scroll.userData.openhandleleftBottom.scale.set(eased, eased, eased);
            scroll.userData.openhandlerightBottom.position.x = scroll.userData.capRight.position.x + handleOffset;
            scroll.userData.openhandlerightBottom.position.y = -handleHeight * eased;
            scroll.userData.openhandlerightBottom.scale.set(eased, eased, eased);
          
        }
    }
    console.log("activeScroll: ", activeScroll, "progress: ", activeScroll ? activeScroll.userData.openprogress: "na")
      if(activeScroll !== null && activeScroll.userData.openprogress === 1) {
                showScrollContent(activeScroll);
            }
            else {
                hideScrollContent();
            }
}
const scrollContentDiv = document.getElementById("scrollContent");
const scrollTitleInput = document.getElementById("scrollTitleInput");
const scrollWriting = document.getElementById("scrollWriting");
const scrollSaveBtn = document.getElementById("scrollSave");
scrollContentDiv.addEventListener("click", function(event) {
    event.stopPropagation();
});

scrollSaveBtn.addEventListener("click", function() {
    if(activeScroll === null) {
        return;
    }
    cont new
} )

function showScrollContent(scroll) {
    if (scrollContentDiv.classList.contains("visible")) {
        return;
    }
    scrollTitleInput.value = scroll.userData.isEmpty ? "" : scroll.userData.title;
    scrollWriting.value = scroll.userData.isEmpty ? "" : scroll.userData.noteContent;
    scrollContentDiv.classList.add("visible")
}
function hideScrollContent() {
    scrollContentDiv.classList.remove("visible");
}

function animate() {
    requestAnimationFrame(animate);
    spotLight.intensity = 2.2 + Math.sin(Date.now() * 0.005) * 0.15 + (Math.random() - 0.5) * 0.1;
    const positions = dustFeild.geometry.attributes.position.array;
    for(let i = 0; i < positions.length; i += 3) {
        positions[i] += dustSpeed[i];
        positions[i + 1] += dustSpeed[i + 1];
        positions[i + 2] += dustSpeed[i + 2];
        if(positions[i + 1] > 6) {
            positions[i + 1] = -6
        }
    }
    dustFeild.geometry.attributes.position.needsUpdate = true;
    checkHover();
    updateScrolls();
    renderer.render(scene, camera);

}
animate();