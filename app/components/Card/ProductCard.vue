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
      <ImageImg :src="product.thumbnail" :alt="product.title" class=" w-full h-full object-contain" />
      <BadgeRatingBadge :rating="product.rating" :ratingCount="product.ratingCount" />
      <BadgeUBadge v-if="product.isNew" label="NEW" color="error" variant="solid" size="sm" :ui="{
        label: 'italic',
        base: 'absolute top-3 left-0 rounded-none bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold tracking-wide pl-1 pr-5 py-1 shadow-md [clip-path:polygon(0_0,100%_0,85%_50%,100%_100%,0_100%)]',
      }" />
    </template>
    <template #body>
      <ProductInfo :brand="product.brand.name" :title="product.title" />
      <ProductPrice :price="product.price" :originalPrice="product.originalPrice" :discount="product.discount" />
    </template>
  </UPageCard>
</template>

<style scoped></style>
