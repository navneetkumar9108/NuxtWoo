<script setup>
const { price, originalPrice, discount } = defineProps({
  price: Number,
  originalPrice: Number,
  discount: Number,
});
</script>

<template>
  <div class="text-sm text-gray-800 mt-2.5 mb-1.5">
    <span class="text-sm mr-1.25"
      ><strong>₹ {{ price }}</strong></span
    >
    <span class="text-xs mr-1.25 text-error"
      ><s>₹ {{ originalPrice }}</s></span
    >
    <span class="text-xs text-success">({{ discount }} % OFF)</span>
  </div>
</template>

<style lang="scss" scoped></style>
