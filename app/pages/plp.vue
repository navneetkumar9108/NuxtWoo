<script setup>
const viewMode = ref("grid");
const sortBy = ref("featured");
const currentPage = ref(1);
const itemsPerPage = 12;
const selectedCategories = ref([]);
const selectedPrice = ref(null);

const {
  data: products,
  pending,
  error,
  refresh,
} = await useFetch("https://fakestoreapi.com/products");

const filteredProducts = computed(() => {
  let result = [...products.value];

  if (selectedCategories.value.length) {
    result = result.filter((p) =>
      selectedCategories.value.includes(p.category),
    );
  }

  if (sortBy.value === "price-asc") result.sort((a, b) => a.price - b.price);
  if (sortBy.value === "price-desc") result.sort((a, b) => b.price - a.price);

  return result;
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredProducts.value.slice(start, start + itemsPerPage);
});

// const addToCart = (product) => {
//   console.log("Added to cart:", product.name);
// };
</script>
<template>
  <UContainer>
    <div class="py-10">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold">All Products</h1>
        <p class="text-muted mt-1">{{ filteredProducts.length }} results</p>
      </div>

      <div class="flex gap-8">
        <!-- Main Content -->
        <div class="flex-1 min-w-0">
          <!-- Product Grid -->
          <UPageGrid class="lg:grid-cols-4">
            <UPageCard v-for="product in paginatedProducts" :key="product.id" :title="product.name"
              :description="product.category" :to="`/products/${product.slug}`" :ui="{
                root: 'bg-white hover:bg-white',
              }">
              <template #leading>
                <NuxtImg :src="product.image" :alt="product.name" class="w-[280px] h-[315px] object-cover rounded-lg" />
              </template>

              <template #trailing>
                <div class="flex items-center justify-between mt-2">
                  <span class="text-lg font-bold">${{ product.price }}</span>
                  <UBadge v-if="product.badge" :label="product.badge" color="success" variant="subtle" />
                </div>
              </template>

              <template #footer>
                <UButton label="Add to Cart" icon="i-lucide-shopping-cart" block @click.prevent="addToCart(product)" />
              </template>
            </UPageCard>
          </UPageGrid>

          <!-- Pagination -->
          <div class="mt-10 flex justify-center">
            <UPagination v-model:page="currentPage" :total="filteredProducts.length" :items-per-page="itemsPerPage" />
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>
