<script setup lang="ts">
const categories = [
  { src: "/images/Clothing.jpg", alt: "Clothing" },
  { src: "/images/Tshirt.jpg", alt: "Tshirt" },
  { src: "/images/Hoodies.jpg", alt: "Hoodies" },
  { src: "/images/Music.jpg", alt: "Music" },
  { src: "/images/Albums.jpg", alt: "Albums" },
  { src: "/images/Posters.jpg", alt: "Posters" },
  { src: "/images/Accessories.jpg", alt: "Accessories" },
  { src: "/images/Decor.jpg", alt: "Decor" },
];
</script>

<template>
  <UContainer>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold">Shop by Category</h2>
      <UButton label="View All" variant="ghost" color="neutral" />
    </div>
    <UPageGrid class="lg:grid-cols-6 gap-4">
      <!-- <UPageCard
        v-for="(cat, index) in categories.slice(0, 6)"
        :key="index"
        :title="cat.alt"
        :ui="{
          root: ' bg-transparent ',
          body: 'p-0 justify-center items-center',
          title: 'absolute bottom-3  text-white font-semibold text-sm z-10',
          container: 'sm:p-0',
        }"
      >
        <NuxtImg
          :src="cat.src"
          :alt="cat.alt"
          class="absolute inset-0 object-cover w-full h-full"
        />
      </UPageCard> -->
      <UCard
        v-for="category in categories.slice(0, 6)"
        :key="category.alt"
        class="p-0"
        :ui="{
          root: ' bg-transparent ring-0 ring-transparent divide-y-0 divide-transparent',
          body: 'sm:p-0 justify-center items-center ',
          title:
            'absolute bottom-3 text-center  text-white font-semibold text-sm z-10',
        }"
      >
        <NuxtLink to="" class="relative">
          <NuxtImg
            :src="category.src"
            :alt="category.alt"
            class="w-55 h-62 object-cover"
          />
          <span
            class="absolute bottom-3 left-1/2 -translate-x-1/2 text-white font-semibold text-sm"
            >{{ category.alt }}</span
          >
        </NuxtLink>
      </UCard>
    </UPageGrid>
  </UContainer>
</template>
