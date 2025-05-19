<template>
  <div ref="threeContainer" class="three-container">
    <div ref="cursorGlow" class="cursor-glow"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import * as THREE from "three";

const threeContainer = ref(null);
const cursorGlow = ref(null);

onMounted(() => {
  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  threeContainer.value.appendChild(renderer.domElement);

  // Light
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 5);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0x404040);
  scene.add(ambient);

  // Body parts
  const material = new THREE.MeshStandardMaterial({ color: 0xcccccc });

  // Head
  const head = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
  head.position.y = 1.5;
  scene.add(head);

  // Body
  const body = new THREE.Mesh(new THREE.BoxGeometry(1, 1.5, 0.5), material);
  body.position.y = 0;
  scene.add(body);

  // Eyes (white sphere)
  const eyeWhiteMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const eyeGeometry = new THREE.SphereGeometry(0.1, 16, 16);

  const leftEye = new THREE.Mesh(eyeGeometry, eyeWhiteMaterial);
  const rightEye = new THREE.Mesh(eyeGeometry, eyeWhiteMaterial);

  leftEye.position.set(-0.2, 1.6, 0.51);
  rightEye.position.set(0.2, 1.6, 0.51);

  scene.add(leftEye, rightEye);

  // Pupils (black sphere inside the white)
  const pupilMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
  const pupilGeometry = new THREE.SphereGeometry(0.06, 16, 16);

  const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
  const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
  const leftPupilTarget = new THREE.Vector3();
  const rightPupilTarget = new THREE.Vector3();

  leftEye.add(leftPupil);
  rightEye.add(rightPupil);

  leftPupil.position.z = 0.05;
  rightPupil.position.z = 0.05;

  // Mouse tracking
  const mouse = new THREE.Vector2();
  const target = new THREE.Vector3();
  window.addEventListener("mousemove", (event) => {
    // Update mouse and target
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distance = (head.position.z - camera.position.z) / dir.z;
    target.copy(camera.position).add(dir.multiplyScalar(distance));

    // Convert target to local space of each eye
    const leftTarget = leftEye.worldToLocal(target.clone());
    const rightTarget = rightEye.worldToLocal(target.clone());

    // Clamp pupil movement inside eye radius (for realism)
    const maxOffset = 0.03; // adjust size if necessary
    leftTarget.clamp(
      new THREE.Vector3(-maxOffset, -maxOffset, 0.05),
      new THREE.Vector3(maxOffset, maxOffset, 0.1)
    );
    rightTarget.clamp(
      new THREE.Vector3(-maxOffset, -maxOffset, 0.05),
      new THREE.Vector3(maxOffset, maxOffset, 0.1)
    );

    // Update pupil positions
    leftPupilTarget.copy(leftTarget);
    rightPupilTarget.copy(rightTarget);

    // Update cursor glow
    if (cursorGlow.value) {
      cursorGlow.value.style.left = event.clientX - 10 + "px";
      cursorGlow.value.style.top = event.clientY - 10 + "px";
    }
  });

  // Render loop
  const animate = () => {
    requestAnimationFrame(animate);

    // Di chuyển pupil mượt hơn bằng cách nội suy (lerp)
    leftPupil.position.lerp(leftPupilTarget, 0.15); // 0.15 là tốc độ (có thể chỉnh)
    rightPupil.position.lerp(rightPupilTarget, 0.15);
    
    renderer.render(scene, camera);
  };

  animate();

  // Responsive
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
</script>

<style scoped>
.three-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  cursor: none; /* Ẩn con trỏ mặc định */
  position: relative;
}

.cursor-glow {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: radial-gradient(white, #00ffff);
  pointer-events: none;
  mix-blend-mode: screen;
  box-shadow: 0 0 15px #00ffff;
  z-index: 10;
}
</style>
