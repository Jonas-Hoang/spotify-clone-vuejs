<script setup>
import { ref, watchEffect } from "vue";
import { VueLenis, useLenis } from "lenis/vue";
import gsap from "gsap";

const lenisRef = ref();
const boxCount = 64;
let mm = gsap.matchMedia();

gsap.to(".box", {
  keyframes: {
    y: [0, 80, -10, 30, 0],
    ease: "none", // <- ease across the entire set of keyframes (defaults to the one defined in the tween, or "none" if one isn't defined there)
    easeEach: "power2.inOut", // <- ease between each keyframe (defaults to "power1.inOut")
  },
  rotate: 180,
  ease: "elastic", // <- the "normal" part of the tween. In this case, it affects "rotate" because it's outside the keyframes
  duration: 5,
  stagger: 0.2,
});

watchEffect((onInvalidate) => {
  function update(time) {
    lenisRef.value?.lenis?.raf(time * 1000);
  }
  gsap.ticker.add(update);

  onInvalidate(() => {
    gsap.ticker.remove(update);
  });
});
</script>

<template>
  <section class="liked">
    <VueLenis ref="lenisRef" :autoRaf="false">
      <div class="body">
        <div v-for="n in boxCount" :key="n" class="box gradient-green">
          <span class="absolute inset-0 flex items-center justify-center text-black font-bold">
            {{ n }}
          </span>
        </div>
      </div>
    </VueLenis>
  </section>

</template>

<style lang="scss" scoped>
.liked ::v-deep(.lenis) {
  line-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.box {
  margin: 1rem;
  width: 75px;
  height: 75px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #0ae448;
  font-weight: 600;
  color: #000;
  line-height: 1.2;
  will-change: transform;
}
.gradient-green {
  background: linear-gradient(114.41deg, #0ae448 20.74%, #abff84 65.5%),
    url(https://assets.codepen.io/16327/noise-e82662fe.png);
  background-blend-mode: color-dodge;
}
</style>