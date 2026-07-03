<script setup>
const { product } = defineProps({
  product: Object,
});
</script>

<template>
  <UPageCard class="w-52.5 bg-neutral ring-0 mx-2.5 mb-7.5" :to="`/products/${product.id}`" :ui="{
    root: 'hover:bg-neutral hover:bg-white hover:shadow-lg transition-all duration-300 rounded-xs',
    container: 'sm:p-0 gap-0   ',

    header: 'w-full  h-70 mb-0 relative  bg-gray-200',
    body: 'px-2.5 mt-3 leading-tight w-52.5',
  }">
    <template #header>
      <ImageImg :src="product.thumbnail" :alt="product.title" />
      <!-- <NuxtImg
        :src="product.thumbnail"
        alt=""
        class="w-full h-full object-contain"
      /> -->
      <BadgeRatingBadge :rating="product.rating" :ratingCount="product.ratingCount" />
      <!-- <UBadge
        color="primary"
        variant="subtle"
        class="absolute left-2 bottom-1 backdrop-blur-xl bg-white/50 text-black rounded-xs"
      >
        <div class="flex items-center gap-1">
          <span>{{ product.rating }}</span>
          <UIcon name="i-lucide-star" class="size-3" />
          <USeparator orientation="vertical" size="xs" class="h-3" />
          <span>{{ product.rating }}</span>
        </div>
      </UBadge> -->
      <!-- <div class="absolute top-3 left-0"> -->
      <BadgeNewBadge :show="product.isNew" label="NEW" />
      <!-- <UBadge
        v-if="product.isNew"
        label="New"
        color="error"
        variant="solid"
        size="sm"
        :ui="{
          base: 'absolute top-3 left-0 rounded-none bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold tracking-wide pl-1 pr-5 py-1 shadow-md [clip-path:polygon(0_0,100%_0,85%_50%,100%_100%,0_100%)]',
        }"
      /> -->
      <!-- </div> -->
    </template>
    <template #body>
      <ProductInfo :brand="product.brand.name" :title="product.title" />
      <!-- <h3 class="text-[16px] font-bold text-gray-800">
        {{ product.brand ? product.brand : "No Brand" }}
      </h3>
      <h4 class="text-sm text-gray-600 font-normal truncate">
        {{ product.title }}
      </h4> -->
      <ProductPrice :price="product.price" :originalPrice="product.originalPrice" :discount="product.discount" />
      <!-- <div class="text-sm text-gray-800 mt-2.5 mb-1.5">
        <span class="text-sm mr-1.25"
          ><strong>₹ {{ product.price }}</strong></span
        >
        <span class="text-xs mr-1.25 text-error"
          ><s>₹ {{ product.originalPrice }}</s></span
        >
        <span class="text-xs text-success">({{ product.discount }} % OFF)</span>
      </div> -->
    </template>
  </UPageCard>
</template>

<style scoped></style>
