<script setup>
const sortBy = ref("featured");
const currentPage = ref(1);
const itemsPerPage = 12;
const selectedCategories = ref([]);
const priceRange = ref([0, 1000]);
const selectedRating = ref();
const route = useRoute();

const skip = computed(() => (currentPage.value - 1) * itemsPerPage);
const {
  data: products,
  pending,
  error,
  refresh,
} = await useFetch("https://dummyjson.com/products?limit=194");

const { data: categories } = await useFetch(
  "https://dummyjson.com/products/category-list",
);

const activeCategory = computed(() => route.query.category || "");

const filteredProducts = computed(() => {
  let result = [...(products.value?.products || [])];

  if (activeCategory.value) {
    result = result.filter((p) => p.category === activeCategory.value);
  }

  if (selectedCategories.value.length) {
    result = result.filter((p) =>
      selectedCategories.value.includes(p.category),
    );
  }
  result = result.filter(
    (p) => p.price >= priceRange.value[0] && p.price <= priceRange.value[1],
  );

  if (selectedRating.value) {
    result = result.filter((p) => p.rating >= Number(selectedRating.value));
  }

  if (sortBy.value === "price-asc") result.sort((a, b) => a.price - b.price);
  if (sortBy.value === "price-desc") result.sort((a, b) => b.price - a.price);

  return result;
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredProducts.value.slice(start, start + itemsPerPage);
});

const items = [
  {
    label: "Category",
    icon: "i-lucide-grid-2x2",
  },
  {
    label: "Price",
    icon: "i-lucide-indian-rupee",
  },
  {
    label: "Rating",
    icon: "i-lucide-star",
  },
];

const formatCategory = (category) => {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
</script>
<template>
  <UContainer>
    <div class="py-10">
      <div class="mb-8">
        <!-- <h1 class="text-3xl font-bold">All Products</h1> -->
        <h1 class="text-3xl font-bold">
          {{ activeCategory ? formatCategory(activeCategory) : "All Products" }}
        </h1>
        <p class="text-muted mt-1">{{ filteredProducts.length }} results</p>
      </div>

      <div class="flex gap-8">
        <div class="flex-1 min-w-0">
          <UPageGrid class="lg:grid-cols-[25%_auto]">
            <UCard class="h-fit bg-transparent sticky top-18">
              <template #header>
                <h2 class="font-semibold text-lg">Filters</h2>
              </template>

              <UAccordion
                :items="
                  activeCategory
                    ? items.filter((i) => i.label !== 'Category')
                    : items
                "
                type="multiple"
              >
                <template #body="{ item }">
                  <!-- Category -->
                  <div v-if="item.label === 'Category'" class="space-y-3">
                    <UCheckboxGroup
                      :items="categories || []"
                      :key="category"
                      v-model="selectedCategories"
                      :label="category"
                      :value="category"
                      :ui="{
                        label: 'text-black font-normal',
                      }"
                    />
                  </div>

                  <!-- Price -->
                  <div
                    v-else-if="item.label === 'Price'"
                    class="space-y-3 mt-2"
                  >
                    <USlider
                      size="xs"
                      v-model="priceRange"
                      :min="0"
                      :max="1000"
                      :ui="{
                        track: 'bg-gray-300',
                        range: 'bg-blue-500',
                        thumb: 'bg-white ring-gray-300',
                      }"
                    />

                    <p class="text-sm text-black">
                      ₹{{ priceRange[0] }} - ₹{{ priceRange[1] }}
                    </p>
                  </div>

                  <!-- Rating -->
                  <div v-else-if="item.label === 'Rating'" class="space-y-2">
                    <URadioGroup
                      v-model="selectedRating"
                      :items="[
                        { label: '4★ & Above', value: '4' },
                        { label: '3★ & Above', value: '3' },
                        { label: '2★ & Above', value: '2' },
                      ]"
                      :ui="{
                        label: 'text-black font-normal',
                      }"
                    />
                  </div>
                </template>
              </UAccordion>
            </UCard>
            <UPageGrid class="lg:grid-cols-3 h-fit gap-6">
              <!-- <UPageCard
                v-for="product in paginatedProducts"
                :key="product.id"
                :title="product.title"
                :description="product.category"
                :to="`/products/${product.id}`"
                :ui="{
                  root: 'bg-gray-200 hover:bg-gray-200',
                  body: ' flex-0',
                  leading: 'flex',
                }"
              >
                <template #leading>
                  <NuxtImg
                    :src="product.thumbnail"
                    :alt="product.name"
                    class="w-full h-48 object-contain rounded-lg"
                  />
                </template>

                <template #body>
                  <div
                    class="flex flex-col items-start h-full justify-between mt-2"
                  >
                    <div class="flex items-center gap-1">
                      <span
                        v-for="i in 5"
                        :key="i"
                        class="relative text-xl text-gray-300"
                      >
                        ★
                        <span
                          v-if="i <= Math.floor(product.rating)"
                          class="absolute inset-0 text-yellow-400"
                          >★</span
                        >
                        <span
                          v-else-if="
                            i === Math.floor(product.rating) + 1 &&
                            product.rating.rate % 1 >= 0.5
                          "
                          class="absolute inset-0 text-yellow-400 overflow-hidden"
                          style="width: 50%"
                          >★</span
                        >
                      </span>
                      <span class="text-gray-500">({{ product.rating }})</span>
                    </div>

                    <span class="text-sm font-semibold">{{
                      product.category
                    }}</span>
                    <span class="text-sm font-semibold"
                      >₹ {{ product.price }}</span
                    >
                  </div>
                </template>
              </UPageCard> -->

              <UPageCard
                v-for="product in paginatedProducts"
                :key="product.id"
                :to="`/products/${product.id}`"
                class="overflow-hidden transition-transform duration-300 hover:-translate-y-1"
                :ui="{
                  root: 'bg-white',
                  container: 'sm:p-0',
                  wrapper: 'items-stretch',
                  body: 'p-0',
                  leading: 'flex',
                }"
              >
                <template #leading>
                  <NuxtImg
                    :src="product.thumbnail"
                    :alt="product.title"
                    class="w-full h-48 object-contain"
                  />
                </template>

                <template #body>
                  <div class="p-4 flex flex-col gap-2">
                    <h2 class="font-bold text-gray-800 line-clamp-1">
                      {{ product.title }}
                    </h2>
                    <p class="text-sm text-gray-500">{{ product.category }}</p>

                    <!-- Stars -->
                    <div class="flex items-center gap-1">
                      <span
                        v-for="i in 5"
                        :key="i"
                        class="relative text-xl text-gray-300"
                      >
                        ★
                        <span
                          v-if="i <= Math.floor(product.rating)"
                          class="absolute inset-0 text-yellow-400"
                          >★</span
                        >
                        <span
                          v-else-if="
                            i === Math.floor(product.rating) + 1 &&
                            product.rating % 1 >= 0.5
                          "
                          class="absolute inset-0 text-yellow-400 overflow-hidden"
                          style="width: 50%"
                          >★</span
                        >
                      </span>
                      <span class="text-sm text-gray-500"
                        >({{ product.rating }})</span
                      >
                    </div>

                    <p class="text-lg font-bold text-gray-900">
                      ₹ {{ product.price }}
                    </p>

                    <UButton
                      block
                      color="neutral"
                      class="hover:bg-green-500 transition-colors mt-1"
                    >
                      Add to Cart
                    </UButton>
                  </div>
                </template>
              </UPageCard>
            </UPageGrid>
          </UPageGrid>

          <div class="mt-10 flex justify-center">
            <UPagination
              v-model:page="currentPage"
              :total="filteredProducts.length"
              :items-per-page="itemsPerPage"
            />
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>
