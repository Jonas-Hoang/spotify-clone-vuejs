<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

// import htmlToImage from "html-to-image";

gsap.registerPlugin(Draggable, InertiaPlugin);

// Reactive data
const gradients = [
  "--gradient-macha",
  "--gradient-orange-crush",
  "--gradient-lipstick",
  "--gradient-purple-haze",
  "--gradient-skyfall",
  "--gradient-emerald-city",
  "--gradient-summer-fair",
];

const circleColors = [
  "--color-shockingly-green",
  "--color-surface-white",
  "--color-pink",
  "--color-shockingly-pink",
  "--color-orangey",
  "--color-lilac",
  "--color-lt-green",
  "--color-blue",
];

const letterColors = [
  "--grey-dark",
  "--light",
  "--green",
  "--green-dark",
  "--green-light",
  "--blue",
  "--purple",
  "--red",
  "--orange",
];

// Refs
const poster = ref(null);
const logo = ref(null);
const circle = ref(null);
const sticker = ref(null);
const smooothContainer = ref(null);
const smoooth = ref(null);
const controls = ref(null);
const pauseBtn = ref(null);
const rerollBtn = ref(null);

const isPaused = ref(false);
const posterW = ref(null);
const posterH = ref(null);

// GSAP animation instance
let spin = null;
let draggable = null;

// Utility functions
const getCSSVarValue = (varName) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
};

const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// Main functions
const randomizeVisuals = () => {
  // Background
  if (poster.value) {
    const gradientValue = getComputedStyle(poster.value)
      .getPropertyValue(getRandomItem(gradients))
      .trim();
    poster.value.style.background = gradientValue;
  }

  // Circle
  if (circle.value) {
    circle.value.style.backgroundColor = getCSSVarValue(
      getRandomItem(circleColors)
    );
  }

  // Sticker
  if (sticker.value) {
    const excluded = [5, 9, 24, 27]; // Các số flair bị loại trừ
    const validFlairs = Array.from({ length: 35 }, (_, i) => i + 1).filter(
      (i) => !excluded.includes(i)
    );

    const flairNumber = getRandomItem(validFlairs);

    // Áp dụng trực tiếp background-image thay vì class
    sticker.value.style.backgroundImage = `url(https://assets.codepen.io/16327/flair-${flairNumber}.png)`;
    sticker.value.style.backgroundSize = "contain";
    sticker.value.style.backgroundRepeat = "no-repeat";
    sticker.value.style.backgroundPosition = "center center";
  }

  // Letters
  if (smoooth.value) {
    smoooth.value.style.color = getCSSVarValue(getRandomItem(letterColors));
  }
};

const resetPoster = () => {
  controls.value.style.removeProperty("display");
  smooothContainer.value.style.removeProperty("display");

  gsap.set([logo.value, poster.value, sticker.value, circle.value], {
    clearProps: "width,height,maxWidth,maxHeight",
  });

  gsap.set(logo.value, { clearProps: "top,bottom" });
};

// const takeScreenshot = () => {
//   if (!controls.value) return;

//   togglePause();

//   const posterRect = poster.value.getBoundingClientRect();
//   posterW.value = `${posterRect.width}px`;
//   posterH.value = `${posterRect.height}px`;

//   controls.value.style.display = "none";
//   smooothContainer.value.style.display = "none";

//   Object.assign(logo.value.style, {
//     width: "300px",
//     maxWidth: "none",
//     top: "auto",
//     bottom: "7%",
//   });

//   Object.assign(poster.value.style, {
//     width: "1290px",
//     height: "2796px",
//   });

//   Object.assign(sticker.value.style, {
//     width: "484px",
//     height: "484px",
//     maxWidth: "none",
//     maxHeight: "none",
//   });

//   Object.assign(circle.value.style, {
//     width: "968px",
//     height: "968px",
//     maxWidth: "none",
//     maxHeight: "none",
//   });

//   window.requestAnimationFrame(() => {
//     htmlToImage
//       .toPng(poster.value)
//       .then((dataUrl) => {
//         const link = document.createElement("a");
//         link.download = "gsap-smoooth-poster_randomizer.png";
//         link.href = dataUrl;
//         link.click();
//         resetPoster();
//         togglePause();
//       })
//       .catch((error) => {
//         console.error("Screenshot failed:", error);
//         resetPoster();
//         togglePause();
//       });
//   });
// };

const togglePause = () => {
  if (isPaused.value) {
    spin.resume();
    pauseBtn.value.classList.remove("paused");
  } else {
    spin.pause();
    pauseBtn.value.classList.add("paused");
  }
  isPaused.value = !isPaused.value;
};

// Animation setup
const setupAnimation = () => {
  const initialRotationOffset = -36.25;
  const letterPos = [0, 15.25, 30.25, 42.25, 54.25, 64.25, 73.5];
  const shapes = gsap.utils.toArray(".letter");
  const proxy = document.createElement("div");
  const progressWrap = gsap.utils.wrap(0, 1);
  const wrapRotation = gsap.utils.wrap(-90, 90);

  let screenRange = gsap.utils.mapRange(0, 2000, 500, 4500);
  let dragDistancePerRotation = screenRange(window.innerWidth);
  let startProgress;

  const adjustRadius = () => {
    const radius = Math.min(
      window.innerWidth * 0.5,
      650,
      window.innerHeight * 0.43
    );

    gsap.set(shapes, {
      xPercent: -50,
      yPercent: -50,
      x: 0,
      y: 0,
      transformOrigin: `50% 50% ${-radius}px`,
    });
  };

  const updateRotation = function () {
    const p = startProgress + (this.startX - this.x) / dragDistancePerRotation;
    spin.progress(progressWrap(p));
  };

  // Create spin animation
  spin = gsap.fromTo(
    shapes,
    {
      rotationY: (i) => letterPos[i] + initialRotationOffset,
    },
    {
      rotationY: `-=${360}`,
      modifiers: {
        rotationY: (value) => wrapRotation(parseFloat(value)) + "deg",
      },
      duration: 10,
      ease: "none",
      repeat: -1,
    }
  );

  // Create draggable
  draggable = Draggable.create(proxy, {
    trigger: smoooth.value,
    type: "x",
    inertia: true,
    allowNativeTouchScrolling: true,
    onPress() {
      gsap.killTweensOf(spin);
      spin.timeScale(0);
      startProgress = spin.progress();
    },
    onDrag: updateRotation,
    onThrowUpdate: updateRotation,
    onRelease() {
      if (!this.tween || !this.tween.isActive()) {
        gsap.to(spin, { timeScale: 1, duration: 1 });
      }
    },
    onThrowComplete() {
      gsap.to(spin, { timeScale: 1, duration: 1 });
    },
  });

  // Initial setup
  adjustRadius();
  randomizeVisuals();

  // Event listeners
  window.addEventListener("resize", () => {
    dragDistancePerRotation = screenRange(window.innerWidth);
    adjustRadius();
  });

  rerollBtn.value.addEventListener("click", randomizeVisuals);
};

// Lifecycle hooks
onMounted(() => {
  setupAnimation();
});

onUnmounted(() => {
  // Cleanup GSAP instances
  if (spin) spin.kill();
  if (draggable) draggable[0].kill();
});
</script>

<template>
  <!-- Your template remains the same -->
  <div id="poster" ref="poster" class="noise">
    <!-- Smoooth Container -->
    <div ref="smooothContainer" class="smoooth-container">
      <div ref="smoooth" class="smoooth" aria-label="Rotating Smoooth letters">
        <div class="letter" data-letter="S">S</div>
        <div class="letter" data-letter="m">m</div>
        <div class="letter" data-letter="o">o</div>
        <div class="letter" data-letter="o">o</div>
        <div class="letter" data-letter="o">o</div>
        <div class="letter" data-letter="t">t</div>
        <div class="letter" data-letter="h">h</div>
      </div>
    </div>

    <!-- Flair Sticker -->
    <div ref="sticker" class="sticker flair" aria-hidden="true"></div>

    <!-- Circle Background -->
    <div ref="circle" class="circle" aria-hidden="true"></div>

    <!-- UI Controls -->
    <div ref="controls" class="controls">
      <button ref="pauseBtn" id="pause" type="button" aria-label="Pause or Play Carousel" @click="togglePause">
        <span class="label"></span>
      </button>

      <button id="screenshot" type="button" aria-label="Download Screenshot" @click="takeScreenshot">
        <span class="label"></span>
      </button>

      <button ref="rerollBtn" id="reroll" type="button" aria-label="Randomize Visuals">
        <span class="label">&#x21bb;</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#poster {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 100vh;

  --elastic-out: linear(
    0,
    0.2178 2.1%,
    1.1144 8.49%,
    1.2959 10.7%,
    1.3463 11.81%,
    1.3705 12.94%,
    1.3726,
    1.3643 14.48%,
    1.3151 16.2%,
    1.0317 21.81%,
    0.941 24.01%,
    0.8912 25.91%,
    0.8694 27.84%,
    0.8698 29.21%,
    0.8824 30.71%,
    1.0122 38.33%,
    1.0357,
    1.046 42.71%,
    1.0416 45.7%,
    0.9961 53.26%,
    0.9839 57.54%,
    0.9853 60.71%,
    1.0012 68.14%,
    1.0056 72.24%,
    0.9981 86.66%,
    1
  );
}

.logo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3vw;
  position: absolute;
  top: 5%;
  left: 50%;
  z-index: 3;
  transform: translateX(-50%);
  width: 15.7vw;
  max-width: min(150px, 15.5svh);

  svg {
    width: 100%;
    height: auto;
  }
}

.smoooth-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  max-width: 1024px;
  max-height: 1024px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.smoooth {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  max-width: 1024px;
  max-height: 1024px;
  perspective: 100vw;
  font-family: Mori;
  font-size: clamp(78px, 18vw, min(240px, 15.5svh));
  font-weight: bold;
}

.letter {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  height: 1lh;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  text-align: center;
}

/* Safari won't use backface-visibility hidden if this is applied */
@media not all and (pointer: coarse) {
  @supports not (-webkit-hyphens: none) {
    .letter {
      &::before {
        content: attr(data-letter);
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: -1;
        transform: translate3d(-50%, -50%, -2.25vw);
        backface-visibility: hidden;
        color: transparent;
        text-shadow: 0 -2vh 6vw rgba(0, 0, 0, 0.2);
      }
    }
  }
}

.sticker {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
  width: 33.33vw;
  height: 33.33vw;
  max-width: min(484px, 33.33svh);
  max-height: min(484px, 33.33svh);
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  image-rendering: pixelated;
}

.circle {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 0;
  transform: translate3d(-50%, -50%, 0);
  width: 68vw;
  height: 68vw;
  max-width: min(968px, 65svh);
  max-height: min(968px, 65svh);
  border-radius: 50%;
  box-shadow: inset 0 2vh 15vw rgba(255, 255, 255, 0.5),
    inset 0 -2vh 7.5vw rgba(0, 0, 0, 0.25), 0 6vh 10vw rgba(0, 0, 0, 0.15);
}

.controls {
  position: fixed;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  gap: 1vw;

  button {
    all: unset;
    display: grid;
    place-content: center;
    width: 48px;
    height: 48px;
    color: var(--color-surface-white);
    font-size: 36px;
    line-height: 0;
    appearance: none;
    cursor: pointer;
    transform: scale(1);
    transition: transform 1s var(--elastic-out);

    &:hover {
      transform: scale(1.5);
    }
  }

  .label {
    display: inline-block;
    position: relative;
    user-select: none;
  }
}

#pause {
  .label {
    top: 3px;
    left: -4px;

    &::before {
      content: "";
      display: inline-block;
      width: 0.1em;
      height: 0.5em;
      border-radius: 2px;
      background: white;
      box-shadow: 0.2em 0 0 white;
    }
  }

  &.paused {
    .label {
      left: 1px;

      &::before {
        content: "";
        display: inline-block;
        width: 0;
        height: 0;
        border-left: 0.4em solid white;
        border-top: 0.25em solid transparent;
        border-bottom: 0.25em solid transparent;
        background: transparent;
        box-shadow: none;
      }
    }
  }
}

#screenshot {
  filter: grayscale(1);

  &:hover .label::before {
    content: "📸";
  }

  .label {
    top: 2px;
    font-size: 26px;

    &::before {
      content: "📷";
    }
  }
}

#reroll {
  .label {
    top: 0;
    transform-origin: center calc(50% + 3.5px);
  }

  &:hover .label {
    transform: rotate(0);
    animation: spin 0.6s ease-in-out forwards;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>