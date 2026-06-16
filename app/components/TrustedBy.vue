<script setup lang="ts">
const items = [
  { src: "/icons/logoipsum-211.svg", alt: "Logo 1" },
  { src: "/icons/logoipsum-215.svg", alt: "Logo 2" },
  { src: "/icons/logoipsum-221.svg", alt: "Logo 3" },
  { src: "/icons/logoipsum-225.svg", alt: "Logo 4" },
  { src: "/icons/logoipsum-280.svg", alt: "Logo 5" },
  { src: "/icons/logoipsum-284.svg", alt: "Logo 6" },
];
</script>

<template>
  <div>
    <UPageLogos
      :items="items"
      class=""
      :ui="{
        root: 'mx-60 my-16 px-12',
        logos: 'gap-10 mt-0',
        logo: 'rounded-none w-auto   bg-transparent ',
      }"
    />
  </div>
</template>
