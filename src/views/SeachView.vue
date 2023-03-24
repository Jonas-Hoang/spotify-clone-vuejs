<script setup>
import CategorySelect from "../components/CategorySelect.vue";
</script>

<template>
  <div class="p-8">
    <button
      type="button"
      class="text-white text-2xl font-semibold hover:underline cursor-pointer"
    >
      Recommend Songs
    </button>
    <div class="py-1.5"></div>

    <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
      <CategorySelect category="Postcast" image="http://picsum.photos/id/23/300/300" />
      <CategorySelect category="List Events" image="http://picsum.photos/id/24/300/300" />
      <CategorySelect category="Made For You" image="http://picsum.photos/id/25/300/300" />
      <CategorySelect category="New Releases" image="http://picsum.photos/id/26/300/300" />
      <CategorySelect category="US-UK Hits" image="http://picsum.photos/id/27/300/300" />
      <CategorySelect category="K-Pop Rising" image="http://picsum.photos/id/28/300/300" />
      <CategorySelect category="Charts" image="http://picsum.photos/id/29/300/300" />
      <CategorySelect category="Indie" image="http://picsum.photos/id/30/300/300" />
      <CategorySelect category="Trending" image="http://picsum.photos/id/31/300/300" />
      <CategorySelect category="Love" image="http://picsum.photos/id/32/300/300" />
      <CategorySelect category="Discover" image="http://picsum.photos/id/33/300/300" />
      <CategorySelect category="Love" image="http://picsum.photos/id/34/300/300" />
      <CategorySelect category="Mood" image="http://picsum.photos/id/35/300/300" />
      <CategorySelect category="Decades" image="http://picsum.photos/id/36/300/300" />
      <CategorySelect category="Party" image="http://picsum.photos/id/38/300/300" />
      <CategorySelect category="Devotional" image="http://picsum.photos/id/39/300/300" />
      <CategorySelect category="Gaming" image="http://picsum.photos/id/40/300/300" />
      <CategorySelect category="Chill" image="http://picsum.photos/id/41/300/300" />
      <CategorySelect category="Work out" image="http://picsum.photos/id/42/300/300" />
      <CategorySelect category="Rock" image="http://picsum.photos/id/44/300/300" />
      <CategorySelect category="Sleep" image="http://picsum.photos/id/43/300/300" />
      <CategorySelect category="Fresh Finds" image="http://picsum.photos/id/45/300/300" />
    </div>
  </div>
</template>
