<script setup>
const { data: products } = await useFetch("https://fakestoreapi.com/products");
const topProducts = computed(() => (products.value || []).slice(0, 5));
</script>
<template>
  <UContainer>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold">Popular Products</h2>
      <UButton variant="link" color="primary" to="/products">View All</UButton>
    </div>
    <div class="grid grid-cols-5 gap-8">
      <div v-for="product in topProducts" :key="product.id" class="relative">
        <UBadge
          v-if="product.discount"
          color="error"
          class="absolute top-2 right-2 z-10"
        >
          -{{ product.discount }}%
        </UBadge>

        <UCard
          :ui="{
            body: 'p-3',
            root: 'bg-gray-200 ring-0 ring-transparent divide-y-0 divide-transparent',
          }"
        >
          <!-- Product image -->
          <template #header>
            <NuxtImg
              :src="product.image"
              class="w-full aspect-square object-cover rounded-lg"
            />
          </template>

          <div class="flex flex-col content-around">
            <div class="flex items-center gap-1">
              <!-- v-for se 5 stars loop -->
              <span
                v-for="i in 5"
                :key="i"
                class="relative text-xl text-gray-300"
              >
                ★
                <!-- Full yellow overlay -->
                <span
                  v-if="i <= Math.floor(product.rating.rate)"
                  class="absolute inset-0 text-yellow-400"
                  >★</span
                >
                <!-- Half yellow overlay -->
                <span
                  v-else-if="
                    i === Math.floor(product.rating.rate) + 1 &&
                    product.rating.rate % 1 >= 0.5
                  "
                  class="absolute inset-0 text-yellow-400 overflow-hidden"
                  style="width: 50%"
                  >★</span
                >
              </span>
              <span class="text-gray-500">({{ product.rating.rate }})</span>
            </div>

            <p class="text-sm font-medium mt-1 truncate">{{ product.title }}</p>

            <div class="flex items-center gap-2 mt-1">
              <span
                v-if="product.originalPrice"
                class="text-xs text-gray-400 line-through"
              >
                €{{ product.originalPrice }}
              </span>
              <span class="text-sm font-semibold">€{{ product.price }}</span>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </UContainer>
</template>
