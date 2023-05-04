<script setup>
import SongRow from "../components/SongRow.vue";

import Play from "vue-material-design-icons/Play.vue";
import Pause from "vue-material-design-icons/Pause.vue";
import Heart from "vue-material-design-icons/Heart.vue";
import DotsHorizontal from "vue-material-design-icons/DotsHorizontal.vue";
import ClockTimeThreeOutline from "vue-material-design-icons/ClockTimeThreeOutline.vue";

import artist from "../artist.json";

import { useSongStore } from "../stores/song.js";

import { storeToRefs } from "pinia";

const useSong = useSongStore();

const { isPlaying, audio, currentTrack, currentArtist } = storeToRefs(useSong);

const playingFunc = () => {
  if (currentTrack.value) {
    useSong.playOrPauseThisSong(currentArtist.value, currentTrack.value);
    return;
  }
  useSong.playFromFirst();
};
</script>

<template>
  <div class="p-8">
    <button
      type="button"
      class="text-white text-2xl font-semibold hover:underline cursor-pointer"
    >
      {{ artist.name }}
    </button>
    <div class="py-1.5"></div>

    <div class="flex items-center w-full relative h-full">
      <img
        class="h-[140px] object-cover"
        width="140"
        :src="artist.albumCover"
      />

      <div class="w-full ml-5">
        <div
          class="text-white absolute w-full hover:underline cursor-pointer top-0 font-semibold"
          style="font-size: 33px"
        >
          {{ artist.name }}
        </div>
        <div class="text-gray-300 text-[13px] flex">
          <div class="flex cursor-pointer">Album</div>
          <div class="ml-2 flex cursor-pointer">
            <div
              class="w-[4px] h-[4px] bg-slate-300 rounded-full mt-2 mr-2"
            ></div>
            <span class="-ml-0.5">{{ artist.releaseYear }}</span>
          </div>
          <div class="ml-2 flex cursor-pointer">
            <div
              class="w-[4px] h-[4px] bg-slate-300 rounded-full mt-2 mr-2"
            ></div>
            <span class="-ml-0.5">{{ artist.tracks.length }} songs</span>
          </div>
          <div
            class="absolute flex gap-4 items-center justify-start bottom-0 mb-1.5"
          >
            <button
              type="button"
              class="p-1 rounded-full bg-white"
              @click="playingFunc"
            >
              <Play v-if="!isPlaying" fillColor="#181818" :size="25" />
              <Pause v-else fillColor="#181818" :size="25" />
            </button>
            <button type="button">
              <Heart fillColor="#1BD760" :size="30" />
            </button>
            <button type="button">
              <DotsHorizontal fillColor="#FFFFFF" :size="30" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-6"></div>
    <div class="flex items-center justify-between px-5 pt-2">
      <div class="flex items-center justify-between text-gray-400">
        <div class="mr-7">#</div>
        <div class="text-sm">Title</div>
      </div>

      <div>
        <ClockTimeThreeOutline fillColor="#FFFFFF" :size="18" />
      </div>
    </div>
    <div class="border-b border-b-[#2A2a2a] mt-2"></div>
    <div class="mb-4"></div>

    <ul
      class="w-full text-white"
      v-for="(track, index) in artist.tracks"
      :key="index"
    >
      <SongRow :artist="artist" :track="track" :index="++index" />
    </ul>
  </div>
</template>


<style scoped>
.circle {
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background-color: rgb(189, 189, 189);
}
</style>