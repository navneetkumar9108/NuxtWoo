<script setup>
const { show, label } = defineProps({
  show: Boolean,
  label: {
    type: String,
    default: "New",
  },
});
</script>

<template>
  <div>
    <UBadge
      v-if="show"
      :label="label"
      color="error"
      variant="solid"
      size="sm"
      :ui="{
        label: 'italic',
        base: 'absolute top-3 left-0 rounded-none bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold tracking-wide pl-1 pr-5 py-1 shadow-md [clip-path:polygon(0_0,100%_0,85%_50%,100%_100%,0_100%)]',
      }"
    />
  </div>
</template>

<style lang="scss" scoped></style>
