<script setup>
const { rating, ratingCount } = defineProps({
  rating: Number,
  ratingCount: Number,
});

const formatter = new Intl.NumberFormat("en", {
  notation: "compact",
});
</script>

<template>
  <UBadge
    color="primary"
    variant="subtle"
    class="absolute left-2 bottom-1 backdrop-blur-xl bg-white/50 text-black rounded-xs"
  >
    <div class="flex items-center gap-1">
      <span>{{ rating }}</span>
      <UIcon name="i-lucide-star" class="size-3" />
      <USeparator orientation="vertical" size="xs" class="h-3" />
      <span>{{ formatter.format(ratingCount) }}</span>
    </div>
  </UBadge>
</template>

<style scoped></style>
