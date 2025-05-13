<script setup>
import CategorySelect from "../components/CategorySelect.vue";
import { TresCanvas } from "@tresjs/core";
import {
  ContactShadows,
  Levioso,
  TorusKnot,
  MouseParallax,
} from "@tresjs/cientos";

const categories = [
  { name: "Postcast", id: 23 },
  { name: "List Events", id: 24 },
  { name: "Made For You", id: 25 },
  { name: "New Releases", id: 26 },
  { name: "US-UK Hits", id: 27 },
  { name: "K-Pop Rising", id: 28 },
  { name: "Charts", id: 29 },
  { name: "Indie", id: 30 },
  { name: "Trending", id: 31 },
  { name: "Love", id: 32 },
  { name: "Discover", id: 33 },
  { name: "Love", id: 34 },
  { name: "Mood", id: 35 },
  { name: "Decades", id: 36 },
  { name: "Party", id: 38 },
  { name: "Devotional", id: 39 },
  { name: "Gaming", id: 40 },
  { name: "Chill", id: 41 },
  { name: "Work out", id: 42 },
  { name: "Rock", id: 44 },
  { name: "Sleep", id: 43 },
  { name: "Fresh Finds", id: 45 },
];
</script>

<template>
  <div class="block h-[400px]">
    <TresCanvas clear-color="#000">
      <Levioso :speed="2" :range="[0, 0.7]" :rotation-factor="15">
        <TorusKnot :scale="1.2">
          <TresMeshNormalMaterial />
        </TorusKnot>
      </Levioso>
      <ContactShadows :position-y="-1" color="#335" :scale="20" />
      <MouseParallax :factor="5" :ease="[3, 0.1]" />
    </TresCanvas>
  </div>
  <div class="p-8">
    <button type="button" class="text-white text-2xl font-semibold hover:underline cursor-pointer">
      Recommend Songs
    </button>
    <div class="py-1.5"></div>

    <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
      <CategorySelect v-for="category in categories" :key="category.id" :category="category.name" :image="`http://picsum.photos/id/${category.id}/300/300`" />
    </div>
  </div>
</template>
