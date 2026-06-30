<script setup>
const { src, alt } = defineProps({
  src: String,
  alt: String,
});
</script>

<template>
  <NuxtImg :src="src" :alt="alt" class="w-full h-full object-contain" />
</template>

<style lang="scss" scoped></style>
