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
      <ButtonUButton label="View All" variant="link" color="neutral" to="/categories" />
    </div>
    <UPageGrid class=" grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4  items-start">
      <UPageCard v-for="(cat, index) in categories.slice(0, 6)" :key="index" :ui="{
        root: 'ring-0 w-full h-full',
        container: 'p-0 sm:p-0',
        wrapper: 'w-full h-full',
        header: 'w-full h-full mb-0'
      }">
        <template #header>
          <span class="absolute bottom-2 left-1/2 -translate-x-1/2 text-white ">{{ cat.alt }}</span>
          <ImageImg :src="cat.src" :alt="cat.alt" class='object-cover  w-full lg:w-55 h-62 rounded-lg' />
        </template>
      </UPageCard>
      <!-- <UCard v-for="category in categories.slice(0, 6)" :key="category.alt" :title="category.alt" class="p-0" :ui="{
        root: ' bg-transparent ring-0 ring-transparent divide-y-0 divide-transparent w-full h-full',
        header: 'sm:px-0 py-0 p-0 h-full w-full',
        body: 'sm:p-0 justify-center items-center ',
        title:
          'absolute bottom-3 text-center  text-white font-semibold text-sm z-10',
      }">

        <template #header>
          <NuxtLink to="" class="relative">
            <NuxtImg :src="category.src" :alt="category.alt" class="w-full h-full  object-contain" />
            <span
            class="absolute bottom-3 left-1/2 -translate-x-1/2 text-white font-semibold text-sm"
            >{{ category.alt }}</span
          >
          </NuxtLink>
        </template>
</UCard> -->
    </UPageGrid>
  </UContainer>
</template>
