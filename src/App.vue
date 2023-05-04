<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import MenuItem from "../src/components/MenuItem.vue";

import MusicPlayer from "../src/components/MusicPlayer.vue";

import ChevronUp from "vue-material-design-icons/ChevronUp.vue";
import ChevronDown from "vue-material-design-icons/ChevronDown.vue";
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";
import ChevronLeft from "vue-material-design-icons/ChevronLeft.vue";

let openMenu = ref(false);
</script>

<template>
  <div id="app">
    <div
      class="w-[calc(100%-240px)] h-[60px] fixed right-0 z-20 bg-[#101010] bg-opacity-80 flex items-center justify-between"
    >
      <div class="flex items-center ml-6">
        <button
          type="button"
          class="rounded-full bg-black p-[1px] cursor-pointer"
        >
          <ChevronLeft fillColor="#FFF" :size="30" />
        </button>
        <button
          type="button"
          class="rounded-full bg-black p-[1px] ml-4 cursor-pointer"
        >
          <ChevronRight fillColor="#FFF" :size="30" />
        </button>
      </div>

      <button
        type="button"
        @click="!openMenu"
        :class="openMenu ? 'bg-[#282828]' : 'bg-black'"
        class="rounded-full hover:bg-[#282828] p-0.5 mr-8 mt-0.5 cursor-pointer"
      >
        <div class="flex items-center">
          <img
            width="27"
            class="rounded-full"
            src="https://cdn.piepme.com/14333/images/piep-MDImwFPf16788523568951678852356895.jpeg"
            alt=""
          />
          <div class="text-white text-[14px] ml-1.5 font-semibold">
            Jonas Toi Choi
          </div>
          <ChevronDown
            v-if="!openMenu"
            @click="openMenu = true"
            fillColor="#FFF"
            :size="30"
          />
          <ChevronUp
            v-else
            @click="openMenu = false"
            fillColor="#FFF"
            :size="30"
          />
        </div>
      </button>

      <span
        v-if="openMenu"
        class="fixed rounded-sm shadow-2xl w-[190px] bg-[#282828] top-[52px] right-[35px] p-1 cursor-pointer"
      >
        <ul class="text-gray-200 font-semibold text-[14px]">
          <li class="px-3 py-2.5 hover:bg-[#3E3D3D] border-b-gray-600">
            Profile
          </li>
          <li class="px-3 py-2.5 hover:bg-[#3E3D3D] border-b-gray-600">
            Log out
          </li>
        </ul>
      </span>
    </div>
    <div id="sideNav" class="p-6 h-[100%] w-[240px] fixed z-50 bg-black">
      <router-link to="/">
        <img width="125" src="../public/icons/spotify-logo.png" alt="" />
      </router-link>
      <div class="my-8"></div>
      <ul>
        <router-link to="/">
          <MenuItem
            class="ml-[1px]"
            :iconSize="23"
            name="Home"
            iconString="home"
            pageUrl="/"
          />
        </router-link>
        <router-link to="/search">
          <MenuItem
            class="ml-[1px]"
            :iconSize="23"
            name="Search"
            iconString="search"
            pageUrl="/search"
          />
        </router-link>
        <router-link to="/library">
          <MenuItem
            class="ml-[1px]"
            :iconSize="23"
            name="Your Library"
            iconString="library"
            pageUrl="/library"
          />
        </router-link>

        <div class="py-3.5"></div>
        <MenuItem
          class="ml-[1px]"
          :iconSize="23"
          name="Create Playlist"
          iconString="playlist"
          pageUrl="/liked"
        />
        <MenuItem
          class="ml-[1px]"
          :iconSize="23"
          name="Liked Songs"
          iconString="liked"
          pageUrl="/liked"
        />
      </ul>

      <div class="border-b border-b-gray-700"></div>
      <ul>
        <li
          class="font-semibold cursor-pointer text-[13px] mt-3 text-gray-300 hover:text-white"
        >
          My playlist #1
        </li>
        <li
          class="font-semibold cursor-pointer text-[13px] mt-3 text-gray-300 hover:text-white"
        >
          My playlist #2
        </li>
        <li
          class="font-semibold cursor-pointer text-[13px] mt-3 text-gray-300 hover:text-white"
        >
          My playlist #3
        </li>
        <li
          class="font-semibold cursor-pointer text-[13px] mt-3 text-gray-300 hover:text-white"
        >
          My playlist #4
        </li>
      </ul>
    </div>
  </div>

  <div
    class="fixed right-0 top-0 w-[calc(100%-240px)] overflow-auto h-full bg-gradient-to-b from-[#1c1c1c] to-black"
  >
    <div class="mt-[70px]"></div>
    <router-view></router-view>
    <div class="mt-[100px]"></div>
    <MusicPlayer />
  </div>
</template>
