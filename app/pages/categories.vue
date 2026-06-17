<script setup>
const router = useRouter();
const selectedCategory = ref("");

const { data: categories } = await useFetch(
  "https://dummyjson.com/products/category-list",
);

// const selectCategory = (category) => {
//   selectedCategory.value = category;
//   console.log("Clicked:", category);
//   console.log(selectedCategory.value);
// };
const formatCategory = (category) => {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const selectCategory = (category) => {
  router.push({ path: "/products", query: { category } });
};
// const categories = [
//   { src: "/images/Clothing.jpg", alt: "Clothing" },
//   { src: "/images/Tshirt.jpg", alt: "Tshirt" },
//   { src: "/images/Hoodies.jpg", alt: "Hoodies" },
//   { src: "/images/Music.jpg", alt: "Music" },
//   { src: "/images/Albums.jpg", alt: "Albums" },
//   { src: "/images/Posters.jpg", alt: "Posters" },
//   { src: "/images/Accessories.jpg", alt: "Accessories" },
//   { src: "/images/Decor.jpg", alt: "Decor" },
// ];
</script>

<template>
  <UContainer class="py-10">
    <UPageGrid class="lg:grid-cols-4 gap-8">
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
        v-for="(category, i) in categories"
        :key="i"
        :title="formatCategory(category)"
        @click="selectCategory(category)"
        class="cursor-pointer p-0"
        :ui="{
          root: '  ring-0 ring-transparent divide-y-0 divide-transparent',
          body: 'sm:p-0 justify-center items-center ',
        }"
      >
      </UCard>
      <!-- <UCard
        v-for="category in categories"
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
            class="w-full h-100 object-cover"
          />
          <span
            class="absolute bottom-3 left-1/2 -translate-x-1/2 text-white font-semibold text-sm"
            >{{ category.alt }}</span
          >
        </NuxtLink>
      </UCard> -->
    </UPageGrid>
  </UContainer>
</template>

<style lang="scss" scoped></style>
