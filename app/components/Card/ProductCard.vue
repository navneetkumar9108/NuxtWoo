<script setup>
const { product } = defineProps({
  product: Object,
});
</script>

<template>
  <UPageCard class="w-full lg:w-52.5 bg-neutral ring-0   lg:mx-2.5 mb-5 lg:mb-7.5 
  " :to="`/products/${product.slug}`" :ui="{
    root: 'hover:bg-neutral hover:bg-white hover:shadow-lg transition-all duration-300 rounded-xs',
    container: 'p-0 sm:p-0 gap-0  w-full',

    header: 'w-full  lg:h-70 mb-0 relative  bg-gray-200',
    body: 'px-2.5 mt-3 leading-tight w-full lg:w-52.5',
  }">
    <template #header>
      <ImageImg :src="product.thumbnail" :alt="product.title" />
      <BadgeRatingBadge :rating="product.rating" :ratingCount="product.ratingCount" />
      <BadgeNewBadge :show="product.isNew" label="NEW" />
    </template>
    <template #body>
      <ProductInfo :brand="product.brand.name" :title="product.title" />
      <ProductPrice :price="product.price" :originalPrice="product.originalPrice" :discount="product.discount" />
    </template>
  </UPageCard>
</template>

<style scoped></style>
