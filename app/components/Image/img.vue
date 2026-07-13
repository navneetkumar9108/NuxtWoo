<script setup>
const { src, alt } = defineProps({
  src: String,
  alt: String,
});
</script>

<template>
  <NuxtImg :src="src" :alt="alt" />
</template>

<style lang="scss" scoped></style>
