<!-- <script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { onMounted } from 'vue';

onMounted(async () => {
  // ========== 1. Setup Scene ==========
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x121212); // Spotify dark theme

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 20;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('spotify-3d-container').appendChild(renderer.domElement);

  // ========== 2. Tạo hình cầu (Spotify Icon) ==========
  const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
  const sphereMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x1DB954, // Spotify green
    emissive: 0x0A3D1F,
    specular: 0x111111,
    shininess: 30
  });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  scene.add(sphere);

  // ========== 3. Tạo 3 đường cong (sóng âm) ==========
  const createWave = (radius, color) => {
    const curve = new THREE.EllipseCurve(
      0, 0, radius, radius * 0.8, 0, Math.PI * 2, false, 0
    );
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color });
    return new THREE.Line(geometry, material);
  };

  const wave1 = createWave(6.5, 0xFFFFFF); // Lớn nhất
  const wave2 = createWave(7.5, 0xCCCCCC); // Vừa
  const wave3 = createWave(8.5, 0x999999); // Nhỏ nhất
  scene.add(wave1, wave2, wave3);

  // ========== 4. Tạo chữ "SPOTIFY" chạy quanh ==========
  let textMesh;
  const loader = new FontLoader();
  loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new TextGeometry('SPOTIFY', {
      font: font,
      size: 1,
      height: 0.2,
    });
    const textMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-3, 0, 0);
    scene.add(textMesh);
  });

  // ========== 5. Ánh sáng ==========
  const light1 = new THREE.DirectionalLight(0xFFFFFF, 1);
  light1.position.set(5, 5, 5);
  scene.add(light1);

  const light2 = new THREE.AmbientLight(0x404040);
  scene.add(light2);

  // ========== 6. Controls & Animation ==========
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = true;

  const animate = () => {
    requestAnimationFrame(animate);
    
    // Xoay hình cầu
    sphere.rotation.y += 0.005;
    
    // Xoay các đường cong ngược chiều
    wave1.rotation.y -= 0.01;
    wave2.rotation.y += 0.008;
    wave3.rotation.y -= 0.012;
    
    // Di chuyển chữ quanh hình cầu
    if (textMesh) {
      textMesh.position.x = 9 * Math.sin(Date.now() * 0.001);
      textMesh.position.z = 9 * Math.cos(Date.now() * 0.001);
      textMesh.lookAt(0, 0, 0); // Luôn hướng vào tâm
    }
    
    renderer.render(scene, camera);
  };
  animate();

  // Xử lý resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
</script>

<template>
  <div id="spotify-3d-container w-full h-[100vh]" />
</template> -->

<template>
  <div id="turntable-container" style="width: 100vw; height: 100vh"></div>
</template>

<script setup>
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { onMounted } from "vue";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

onMounted(() => {
  // 1. Khởi tạo scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000); 

  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 30, 50);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document
    .getElementById("turntable-container")
    .appendChild(renderer.domElement);

  // 2. Tạo bàn xoay DJ
  const createTurntable = () => {
    const group = new THREE.Group();

    // Bệ máy (phần dưới)
    const baseGeometry = new THREE.CylinderGeometry(15, 15, 2, 64);
    const baseMaterial = new THREE.MeshPhongMaterial({
      color: 0x222222,
      specular: 0x111111,
      shininess: 30,
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -1;
    base.receiveShadow = true;

    // Mặt bàn xoay
    const plateGeometry = new THREE.CylinderGeometry(12, 12, 0.5, 64);
    const plateMaterial = new THREE.MeshPhongMaterial({
      color: 0x444444,
      metalness: 0.7,
      roughness: 0.3,
    });
    const plate = new THREE.Mesh(plateGeometry, plateMaterial);
    plate.position.y = 0.5;
    plate.castShadow = true;

    // Thêm vạch chia tốc độ
    const marksGeometry = new THREE.TorusGeometry(11.8, 0.1, 16, 100);
    const marksMaterial = new THREE.MeshBasicMaterial({ color: 0x1db954 });
    const marks = new THREE.Mesh(marksGeometry, marksMaterial);
    marks.rotation.x = Math.PI / 2;
    marks.position.y = 0.76;

    group.add(base, plate, marks);
    return group;
  };

  const turntable = createTurntable();
  scene.add(turntable);

  // 3. Tạo đĩa vinyl Spotify
  const createVinyl = () => {
    const group = new THREE.Group();

    // Đĩa nhựa
    const vinylGeometry = new THREE.CylinderGeometry(10, 10, 0.2, 64);
    const vinylMaterial = new THREE.MeshPhongMaterial({
      color: 0x111111,
      specular: 0x222222,
    });
    const vinyl = new THREE.Mesh(vinylGeometry, vinylMaterial);
    vinyl.rotation.x = Math.PI / 2;
    vinyl.position.y = 1;
    vinyl.castShadow = true;

    // Nhãn đĩa (Spotify)
    const labelGeometry = new THREE.CylinderGeometry(3, 3, 0.21, 32);
    const textureLoader = new THREE.TextureLoader();
    const spotifyTexture = textureLoader.load(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1024px-Spotify_logo_without_text.svg.png"
    );
    const labelMaterial = new THREE.MeshPhongMaterial({
      map: spotifyTexture,
      transparent: true,
    });
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.rotation.x = Math.PI / 2;
    label.position.y = 1.1;

    // Vạch nhạc
    const grooveGeometry = new THREE.TorusGeometry(8, 0.05, 16, 100);
    const grooveMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
    for (let i = 0; i < 10; i++) {
      const groove = new THREE.Mesh(grooveGeometry, grooveMaterial);
      groove.rotation.x = Math.PI / 2;
      groove.position.y = 1.05;
      groove.position.z = Math.cos(i * 0.6) * 7;
      groove.position.x = Math.sin(i * 0.6) * 7;
      group.add(groove);
    }

    group.add(vinyl, label);
    return group;
  };

  const vinyl = createVinyl();
  scene.add(vinyl);

  // 4. Tạo cần tone arm
  const createToneArm = () => {
    const group = new THREE.Group();

    // Trụ đỡ
    const standGeometry = new THREE.CylinderGeometry(0.5, 0.3, 8, 32);
    const standMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const stand = new THREE.Mesh(standGeometry, standMaterial);
    stand.position.set(8, 4, 0);
    stand.rotation.z = Math.PI / 2;

    // Cần chính
    const armGeometry = new THREE.CylinderGeometry(0.2, 0.2, 12, 32);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0x1db954 });
    const arm = new THREE.Mesh(armGeometry, armMaterial);
    arm.position.set(4, 6, 0);
    arm.rotation.z = Math.PI / 4;

    // Đầu kim
    const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(-2, 6, 0);

    group.add(stand, arm, head);
    return group;
  };

  const toneArm = createToneArm();
  scene.add(toneArm);

  // 5. Thiết lập ánh sáng
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(10, 20, 10);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  scene.add(directionalLight);

  // 6. Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 30;
  controls.maxDistance = 100;

  // 7. Animation
  const animate = () => {
    requestAnimationFrame(animate);

    // Xoay đĩa vinyl
    vinyl.rotation.y += 0.01;

    // Lắc nhẹ tone arm
    toneArm.children[1].rotation.z =
      Math.PI / 4 + Math.sin(Date.now() * 0.001) * 0.05;

    controls.update();
    renderer.render(scene, camera);
  };
  animate();

  // Xử lý resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
</script>