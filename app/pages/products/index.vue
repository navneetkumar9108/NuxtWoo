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
  Number(route.query.maxPrice) || 10000,
]);
const selectedRating = ref(route.query.rating || undefined);


const { data: products } = await useFetch("/api/products", {
  query: {
    sort: sortBy,

    category: computed(() =>
      selectedCategories.value.length
        ? selectedCategories.value.join(",")
        : undefined,
    ),

    minPrice: computed(() => priceRange.value[0]),

    maxPrice: computed(() => priceRange.value[1]),

    rating: selectedRating,

    page: currentPage,
    limit: itemsPerPage,
  },
});
const { data: categories } = await useFetch("/api/categories");

const categoryItems = computed(() =>
  (categories.value?.data || []).map((category) => ({
    label: category.name,
    value: category.slug,
  })),
);

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

// watch(sortBy, (value) => {
//   console.log("Sort Changed:", value);
// });

watch([selectedCategories, priceRange, selectedRating, sortBy], () => {
  currentPage.value = 1;
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
          priceRange.value[1] !== 10000 ? priceRange.value[1] : undefined,
        rating: selectedRating.value || undefined,
        sort: sortBy.value !== "featured" ? sortBy.value : undefined,
        page: currentPage.value !== 1 ? currentPage.value : undefined,
      },
    });
  },
  { deep: true },
);
const isFilterOpen = ref(false);
const isSortOpen = ref(false);

const activeFilterCount = computed(
  () => selectedCategories.value.length + (selectedRating.value ? 1 : 0),
);

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Popularity", value: "popular" },
  { label: "Price: Low to High", value: "price-low" },
  { label: "Price: High to Low", value: "price-high" },
  { label: "Newest", value: "newest" },
];

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
  <UContainer class="px-2.5">
    <div class="py-10">
      <div class="mb-1 lg:mb-8">
        <h1 class="text-xl lg:text-3xl font-bold">
          {{
            selectedCategories.length === 1
              ? formatCategory(selectedCategories[0])
              : "All Products"
          }}
        </h1>
        <!-- <p class="text-muted mt-1">{{ filteredProducts.length }} results</p> -->
      </div>
      <UPageGrid class="sm:grid-cols-1 lg:grid-cols-[22%_auto] gap-4">
        <UCard class="hidden lg:block h-fit bg-neutral sticky top-18 rounded-xs ring-0">
          <template #header>
            <h2 class="font-semibold text-lg">Filters</h2>
          </template>
          <FilterPanel :items="items" :category-items="categoryItems" v-model:selected-categories="selectedCategories"
            v-model:price-range="priceRange" v-model:selected-rating="selectedRating" />
          <!-- <UAccordion :items="items" type="multiple">
                <template #body="{ item }">
                  <div v-if="item.label === 'Category'" class="space-y-3">
                    <UCheckboxGroup
                      :items="categoryItems"
                      v-model="selectedCategories"
                      :ui="{
                        label: 'text-black font-normal',
                      }"
                    />
                  </div>

                  <div
                    v-else-if="item.label === 'Price'"
                    class="space-y-3 mt-2"
                  >
                    <USlider
                      size="xs"
                      v-model="priceRange"
                      :min="0"
                      :max="10000"
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
              </UAccordion> -->
        </UCard>
        <div class="">
          <div class="hidden lg:flex items-center justify-end sticky top-18 z-2">
            <USelect v-model="sortBy" :items="sortOptions" placeholder="Sort by" class="w-48 flex self-end" />
          </div>
          <USeparator class="py-1 lg:py-7 flex items-center justify-center" />
          <UPageGrid class="h-fit gap-2  grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
            <CardProductCard v-for="product in products?.data || []" :key="product.id" :product="product" />
          </UPageGrid>
          <div class="mt-10 flex justify-center">
            <!-- <UPagination v-model:page="currentPage" :total="filteredProducts.length" :items-per-page="itemsPerPage" /> -->
            <UPagination v-model:page="currentPage" :total="products?.meta?.total || 0"
              :items-per-page="itemsPerPage" />
          </div>
        </div>
      </UPageGrid>
    </div>

    <div
      class="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 grid grid-cols-2 divide-x divide-gray-200">
      <button class="flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-700"
        @click="isSortOpen = true">
        <UIcon name="i-lucide-arrow-up-down" class="w-4 h-4" />
        SORT
      </button>
      <button class="flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-700"
        @click="isFilterOpen = true">
        <UIcon name="i-lucide-sliders-horizontal" class="w-4 h-4" />
        FILTER
        <span v-if="activeFilterCount" class="w-1.5 h-1.5 rounded-full bg-primary" />
      </button>
    </div>

    <!-- Filter bottom sheet -->
    <USlideover v-model:open="isFilterOpen" side="bottom" :ui="{ content: 'h-[85vh] rounded-t-xl' }">
      <template #header>
        <h2 class="font-semibold text-lg">Filters</h2>
      </template>
      <template #body>
        <FilterPanel :items="items" :category-items="categoryItems" v-model:selected-categories="selectedCategories"
          v-model:price-range="priceRange" v-model:selected-rating="selectedRating" />
      </template>
      <template #footer>
        <ButtonUButton label="Apply Filters" block @click="isFilterOpen = false" />
      </template>
    </USlideover>

    <!-- Sort bottom sheet -->
    <USlideover v-model:open="isSortOpen" side="bottom" :ui="{ content: 'h-[50vh] rounded-t-xl' }">
      <template #header>
        <h2 class="font-semibold text-lg">Sort By</h2>
      </template>
      <template #body>
        <URadioGroup v-model="sortOption" :items="sortOptions" />
      </template>
    </USlideover>
  </UContainer>
</template>
