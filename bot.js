/* ADD THIS AT BOTTOM OF SCRIPT */

/* =========================
   TYPING EFFECT
========================= */

function showTyping(){

  const messages = document.getElementById("messages");

  const typing = document.createElement("div");
  typing.className = "message bot typing";
  typing.id = "typing";

  typing.innerText = "AI is typing...";

  messages.appendChild(typing);

  messages.scrollTop = messages.scrollHeight;
}

function removeTyping(){

  const typing = document.getElementById("typing");

  if(typing){
    typing.remove();
  }
}

/* UPDATE sendMessage() */

function sendMessage(){

  const input = document.getElementById("input");
  const text = input.value.trim();

  if(text === "") return;

  addMessage(text, "user");

  input.value = "";

  showTyping();

  setTimeout(() => {

    removeTyping();

    const reply = getAIResponse(text);

    addMessage(reply, "bot");

  }, 1500);
}

/* =========================
   THREE.JS 3D BACKGROUND
========================= */

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas:document.getElementById("bgCanvas"),
  alpha:true
});

renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z = 5;

/* particles */

const particlesGeometry = new THREE.BufferGeometry();

const particlesCount = 1500;

const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++){

  posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(posArray, 3)
);

const particlesMaterial = new THREE.PointsMaterial({
  size:0.02,
  color:0x00ffff
});

const particlesMesh = new THREE.Points(
  particlesGeometry,
  particlesMaterial
);

scene.add(particlesMesh);

/* animation */

function animate(){

  requestAnimationFrame(animate);

  particlesMesh.rotation.y += 0.001;
  particlesMesh.rotation.x += 0.0005;

  renderer.render(scene, camera);
}

animate();

/* resize */

window.addEventListener("resize", () => {

  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.aspect =
    window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
});
