<script setup>
import HomeCard from "../components/HomeCard.vue";
import { TresCanvas } from "@tresjs/core";
import { Box, OrbitControls, Text3D } from "@tresjs/cientos";
</script>

<template>
  <div class="block h-[200px]">
    <TresCanvas clear-color="#000">
      <Text3D text="Spotify" font="/fonts/FiraCodeRegular.json" center need-updates />
      <TresPerspectiveCamera :position="[3, 3, 3]" />
      <OrbitControls />
      <Box :scale="2">
        <TresMeshToonMaterial color="#1ED760" />
      </Box>
      <TresAmbientLight />
      <TresDirectionalLight :position="[0, 2, 4]" />
      <!-- <TresGridHelper /> -->
    </TresCanvas>
  </div>
  <div class="p-8">
    <button type="button" class="text-white text-2xl font-semibold hover:underline cursor-pointer">
      Podcasts to make you smarter
    </button>
    <div class="py-1.5"></div>

    <div class="flex items-center">
      <HomeCard image="http://picsum.photos/id/30/300/300" title="Tech Talk Daily" subTitle="Latest in AI & Innovation" />
      <HomeCard image="http://picsum.photos/id/45/300/300" title="Mindful Moments" subTitle="Meditation & Wellness" />
      <HomeCard class="md:block hidden" image="http://picsum.photos/id/65/300/300" title="Business Breakdowns" subTitle="Startup Success Stories" />
      <HomeCard class="lg:block hidden" image="http://picsum.photos/id/67/300/300" title="Science Weekly" subTitle="Discoveries Explained" />
      <HomeCard class="xl:block hidden" image="http://picsum.photos/id/100/300/300" title="History Uncovered" subTitle="Fascinating Past Events" />
      <HomeCard image="http://picsum.photos/id/110/300/300" title="Creative Minds" subTitle="Art & Design Inspiration" />
      <HomeCard image="http://picsum.photos/id/112/300/300" title="Language Lab" subTitle="Learn While You Listen" />
    </div>
  </div>

  <div class="p-8">
    <button type="button" class="text-white text-2xl font-semibold hover:underline cursor-pointer">
      Recommended Radio
    </button>
    <div class="py-1.5"></div>

    <div class="flex items-center">
      <HomeCard image="http://picsum.photos/id/20/300/300" title="Chill Vibes" subTitle="Relaxing Electronic Mix" />
      <HomeCard image="http://picsum.photos/id/35/300/300" title="Jazz Lounge" subTitle="Smooth Instrumentals" />
      <HomeCard class="md:block hidden" image="http://picsum.photos/id/55/300/300" title="Indie Discoveries" subTitle="Fresh Alternative" />
      <HomeCard class="lg:block hidden" image="http://picsum.photos/id/57/300/300" title="Hip-Hop Central" subTitle="Best New Rap" />
      <HomeCard class="xl:block hidden" image="http://picsum.photos/id/90/300/300" title="Classical Hour" subTitle="Timeless Masterpieces" />
      <HomeCard image="http://picsum.photos/id/110/300/300" title="Rock Legends" subTitle="Greatest Hits" />
      <HomeCard image="http://picsum.photos/id/110/300/300" title="Pop Revolution" subTitle="Chart Toppers" />
    </div>
  </div>

  <div class="p-8">
    <button type="button" class="text-white text-2xl font-semibold hover:underline cursor-pointer">
      Recommended Songs
    </button>
    <div class="py-1.5"></div>

    <div class="flex items-center">
      <HomeCard image="http://picsum.photos/id/40/300/300" title="Morning Motivation" subTitle="Upbeat Start to Your Day" />
      <HomeCard image="http://picsum.photos/id/55/300/300" title="Late Night Drive" subTitle="Mellow Roadtrip Tunes" />
      <HomeCard class="md:block hidden" image="http://picsum.photos/id/75/300/300" title="Workout Energy" subTitle="High Intensity Beats" />
      <HomeCard class="lg:block hidden" image="http://picsum.photos/id/77/300/300" title="Rainy Day Feels" subTitle="Cozy Acoustic" />
      <HomeCard class="xl:block hidden" image="http://picsum.photos/id/110/300/300" title="Party Starters" subTitle="Dance Floor Essentials" />
      <HomeCard image="http://picsum.photos/id/116/300/300" title="Focus Flow" subTitle="Concentration Boost" />
    </div>
  </div>
</template>