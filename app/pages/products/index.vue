<script setup>
const route = useRoute();
const router = useRouter();

useSeoMeta({
  title: "Products",
  ogTitle: "Products",
});

// --- Initialize all filters from URL query (fixes reload reset) ---
const sortBy = ref(route.query.sort || "featured");
const currentPage = ref(Number(route.query.page) || 1);
const itemsPerPage = 12;
const selectedCategories = ref(
  route.query.categories ? route.query.categories.split(",") : [],
);
const priceRange = ref([
  Number(route.query.minPrice) || 0,
  Number(route.query.maxPrice) || 1000,
]);
const selectedRating = ref(route.query.rating || undefined);

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

console.log(products.value);
// category coming from the Categories page (?category=beauty)
const activeCategory = computed(() => route.query.category || "");

// when activeCategory arrives from the Categories page, pre-select it
// in the sidebar checkbox group. The URL cleanup (removing 'category'
// and writing 'categories') happens in the single watch below so the
// two router.replace calls don't race each other.
watchEffect(() => {
  if (
    activeCategory.value &&
    !selectedCategories.value.includes(activeCategory.value)
  ) {
    selectedCategories.value = [activeCategory.value];
  }
});

const filteredProducts = computed(() => {
  let result = [...(products.value?.products || [])];

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

watch([selectedCategories, priceRange, selectedRating, sortBy], () => {
  currentPage.value = 1;
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredProducts.value.slice(start, start + itemsPerPage);
});

// --- Keep URL in sync with filters so reload doesn't clear them ---
// (also clears the old 'category' param from the Categories page,
// in the SAME router.replace call so it doesn't race with this one)
watch(
  [selectedCategories, priceRange, selectedRating, sortBy, currentPage],
  () => {
    router.replace({
      query: {
        ...route.query,
        category: undefined,
        categories: selectedCategories.value.length
          ? selectedCategories.value.join(",")
          : undefined,
        minPrice: priceRange.value[0] ? priceRange.value[0] : undefined,
        maxPrice:
          priceRange.value[1] !== 1000 ? priceRange.value[1] : undefined,
        rating: selectedRating.value || undefined,
        sort: sortBy.value !== "featured" ? sortBy.value : undefined,
        page: currentPage.value !== 1 ? currentPage.value : undefined,
      },
    });
  },
  { deep: true },
);

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
        <h1 class="text-3xl font-bold">
          {{
            selectedCategories.length === 1
              ? formatCategory(selectedCategories[0])
              : "All Products"
          }}
        </h1>
        <p class="text-muted mt-1">{{ filteredProducts.length }} results</p>
      </div>

      <div class="flex gap-8">
        <div class="flex-1 min-w-0">
          <UPageGrid class="lg:grid-cols-[25%_auto]">
            <UCard class="h-fit bg-neutral ring-primary sticky top-18">
              <template #header>
                <h2 class="font-semibold text-lg">Filters</h2>
              </template>

              <UAccordion :items="items" type="multiple" cl>
                <template #body="{ item }">
                  <!-- Category -->
                  <div v-if="item.label === 'Category'" class="space-y-3">
                    <UCheckboxGroup
                      :items="categories || []"
                      v-model="selectedCategories"
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
            <UPageGrid class="h-fit">
              <UPageCard
                v-for="product in paginatedProducts"
                :key="product.id"
                :to="`/products/${product.id}`"
                highlight
                highlightColor="success"
                class="overflow-hidden"
                :ui="{
                  root: 'bg-neutral hover:shadow-lg hover:bg-neutral ring',
                  container: 'sm:p-0',
                  wrapper: 'items-stretch',
                  header: 'mb-0 relative',
                  body: 'p-0',
                  leading: 'flex',
                }"
              >
                <template #header>
                  <NuxtImg
                    :src="product.thumbnail"
                    :alt="product.title"
                    class="w-full h-48 object-contain"
                  />
                  <!-- <UBadge
                    label="new"
                    color="error"
                    variant="subtle"
                    class="absolute top-2 backdrop-blur-xl bg-error/50 text-black"
                  >
                  </UBadge> -->
                  <UBadge
                    color="error"
                    variant="subtle"
                    class="absolute right-2 top-2 backdrop-blur-xl bg-error/50 text-black"
                  >
                    <span>{{ product.discountPercentage }} %</span>
                  </UBadge>
                  <UBadge
                    color="primary"
                    variant="subtle"
                    class="absolute left-2 bottom-2 backdrop-blur-xl bg-white/50 text-black"
                  >
                    <div class="flex items-center gap-2">
                      <span>{{ product.rating }}</span>
                      <UIcon name="i-lucide-star" class="size-3" />
                      <USeparator
                        orientation="vertical"
                        size="xs"
                        class="h-3"
                      />
                      <span>{{ 5 }}</span>
                    </div>
                  </UBadge>
                </template>
                <!-- <template #leading>
                  <NuxtImg
                    :src="product.thumbnail"
                    :alt="product.title"
                    class="w-full h-48 object-contain"
                  />
                </template> -->

                <template #body>
                  <div class="p-2 flex flex-col gap-1">
                    <div class="leading-tight">
                      <h2 class="font-bold text-gray-800 line-clamp-1">
                        {{ product.brand ? product.brand : "No Brand" }}
                      </h2>
                      <p class="text-sm text-gray-500">{{ product.title }}</p>
                    </div>

                    <p class="text-lg font-bold text-gray-900">
                      ₹ {{ product.price }}
                    </p>
                    <!-- Stars -->
                    <!-- <div class="flex items-center gap-1">
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
                    </div> -->

                    <!-- <UButton
                      block
                      color="neutral"
                      class="hover:bg-green-500 transition-colors mt-1"
                    >
                      Add to Cart
                    </UButton> -->
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
