<script setup>
import { ref, toRefs, watchEffect } from "vue";
import { RouterLink, useRoute } from "vue-router";
import uniqolor  from 'uniqolor'
let randColor = ref('')

randColor.value = uniqolor.random();

const route = useRoute();

const props = defineProps({
  image: String,
  category: String,
});

const { image, category } = toRefs(props);

</script>

<template>
  <router-link to="libary">
    <div v-if="randColor.color"
    :style="`background-color: ${randColor.color};`"
      class="
      contrast-[2]
      brightness-[0.87]
      rounded-xl
      aspect-square
      relative
      overflow-hidden
      "
    >
    <div class="text-white pt-3 pl-4 font-semibold text-[23px]">{{ category }}</div>
      <img class="absolute contrast-[0.55] -right-3.5 bottom-0 max-w-[100px] rotate-[20deg]" :src="image || ''" alt="" />
    </div>
  </router-link>
</template>
