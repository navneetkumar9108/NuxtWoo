<script setup>
const { brand, title } = defineProps({
  brand: String,
  title: String,
});
</script>

<template>
  <h3 class="text-[13px] sm:text-[16px] font-bold text-gray-800">
    {{ brand || "No Brand" }}
  </h3>
  <h4 class=" text-[11px] sm:text-sm text-gray-600 font-normal truncate">
    {{ title }}
  </h4>
</template>

<style lang="scss" scoped></style>
