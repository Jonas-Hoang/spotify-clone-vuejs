<script setup>
import { gsap } from "gsap";
import { onMounted } from "vue";

onMounted(() => {
  gsap.to(".green", {
    rotation: 360,
    duration: 2,
    repeat: -1,
    repeatDelay: 2,
    ease: "none",
  });

  gsap.to(".purple", {
    rotation: 360,
    duration: 2,
    repeat: -1,
    repeatDelay: 2,
    ease: "bounce.out",
  });
});
</script>
<template>
  <div class="body">
    <div class="box green text-gray-200">linear</div>
    <div class="box purple text-white">bounce</div>
  </div>
</template>


<style scoped>
.body {
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-height: 100vh;
  margin: 0;
  overflow: hidden;
}
.green {
  background-color: var(--green);
}

.purple {
  background-color: var(--purple);
}
.box {
  width: 75px;
  height: 75px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  transform-origin: center;
}
</style>