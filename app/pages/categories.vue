<script setup>
useSeoMeta({
  title: "Categories",
  ogTitle: "Categories",
});
const router = useRouter();

const { data: categories } = await useFetch(
  "https://dummyjson.com/products/category-list",
);


const formatCategory = (category) => {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const selectCategory = (category) => {
  router.push({ path: "/products", query: { category } });
};

</script>

<template>
  <UContainer class="py-10">
    <UPageGrid class="lg:grid-cols-4 gap-8">
      <UCard v-for="(category, i) in categories" :key="i" :title="formatCategory(category)"
        @click="selectCategory(category)" class="cursor-pointer p-0" :ui="{
          root: '  ring-0 ring-transparent divide-y-0 divide-transparent',
          body: 'sm:p-0 justify-center items-center ',
        }">
      </UCard>

    </UPageGrid>
  </UContainer>
</template>

<style lang="scss" scoped></style>
