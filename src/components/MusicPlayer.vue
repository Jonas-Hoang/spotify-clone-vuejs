<script setup>
import { onMounted, ref, toRefs, watch, watchEffect } from "vue";

import Play from "vue-material-design-icons/Play.vue";
import Pause from "vue-material-design-icons/Pause.vue";
import Heart from "vue-material-design-icons/Heart.vue";
import SkipBackward from "vue-material-design-icons/SkipBackward.vue";
import SkipForward from "vue-material-design-icons/SkipForward.vue";
import PictureInPictureBottomRight from "vue-material-design-icons/PictureInPictureBottomRight.vue";

import { useSongStore } from "../stores/song.js";

import { storeToRefs } from "pinia";

const useSong = useSongStore();

const { isPlaying, audio, currentTrack, currentArtist } = storeToRefs(useSong);

let isHover = ref(null);
let isTrackTimeCurrent = ref(null);
let seeker = ref(null);
let isTrackTimeTotal = ref(null);
let range = ref(0);
let seekerContainer = ref(null);

onMounted(() => {
  if (audio.value) {
    setTimeout(() => {
      timeupdate();
      loadedmetadata();
    }, 300);
  }

  if (currentTrack.value) {
    seeker.value.addEventListener("change", function () {
      const time = audio.value.duration * seeker.value.value;
      audio.value.currentTime = time;
    });
    seeker.value.addEventListener("mousedown", function () {
      audio.value.pause();
      isPlaying.value = false;
    });

    seeker.value.addEventListener("mouseup", function () {
      audio.value.play();
      isPlaying.value = true;
    });

    seekerContainer.value.addEventListener("click", function (e) {
      const clickPosition =
        (e.pageX - seekerContainer.value.offsetLeft) /
        seekerContainer.value.offsetWitdh;
      const time = audio.value.duration * clickPosition;
      audio.value.currentTime = time;
      seeker.value.value =
        (100 / audio.value.duration) * audio.value.currentTime;
    });
  }
});

const timeupdate = () => {
  audio.value.addEventListener((timeupdate) => {
    const m = Math.floor(audio.value.currentTime / 60);
    const s = Math.floor(audio.value.currentTime - m * 60);
    isTrackTimeCurrent.value = m + ":" + s.toString().padStart(2, "0");
    const value = (100 / audio.value.duartion) * audio.value.currentTime;
    range.value = value;
    seeker.value.value = value;
  });
};

const loadedmetadata = () => {
  audio.value.addEventListener((loadedmetadata) => {
    const duration = audio.value.duration;
    const m = Math.floor(duration / 60);
    const s = Math.floor(duration % 60);
    isTrackTimeTotal.value = m + ":" + s.toString().padStart(2, "0");
  });
};

watch(
  () => audio.value,
  () => {
    timeupdate();
    loadedmetadata();
  }
);

watch(
  () => isTrackTimeCurrent.value,
  (time) => {
    if (time && time === isTrackTimeTotal.value) {
      useSong.nextSong(currentTrack.value);
    }
  }
);
</script>



<template>
  <div
    id="MusicPlayer"
    class="flex fixed justify-between items-center bottom-0 w-full z-50 h-[70px] bg-[#181818] border-t border-t-[#272727]"
  >
    <div class="flex items-center w-1/4">
      <div class="flex items-center ml-4">
        <img
          class="rounded-sm shadow-2xl"
          width="55"
          :src="currentArtist.albumCover"
        />
        <div class="ml-4">
          <div class="text-[14px] text-white hover:underline cursor-pointer">
            {{ currentTrack.name }}
          </div>
          <div
            class="text-[11px] text-gray-400 hover:text-white cursor-pointer"
          >
            {{ currentArtist.name }}
          </div>
        </div>
      </div>

      <div class="flex items-center ml-8">
        <Heart fillColor="#1BD760" :size="20" />
      </div>
    </div>
  </div>
</template>