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
const selectedBrands = ref(
  route.query.brands ? route.query.brands.split(",") : [],
);
const selectedGenders = ref(
  route.query.genders ? route.query.genders.split(",") : [],
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
    brand: computed(() =>
      selectedBrands.value.length
        ? selectedBrands.value.join(",")
        : undefined,
    ),
    gender: computed(() =>
      selectedGenders.value.length
        ? selectedGenders.value.join(",")
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
const { data: brands } = await useFetch("/api/brands");
const { data: genders } = await useFetch("/api/genders");

console.log('genders', genders.value?.data);
const brandItems = computed(() =>
  (brands.value?.data || []).map((brand) => ({
    label: brand.name,
    value: brand.slug,
  })),
);
const genderItems = computed(() =>
  (genders.value?.data || []).map((gender) => ({
    label: gender.name,
    value: gender.slug,
  })),
);
console.log('genderItems', genderItems.value);
const categoryItems = computed(() =>
  (categories.value?.data || []).map((category) => ({
    label: category.name,
    value: category.slug,
  })),
);

const activeCategory = computed(() => route.query.category || "");

const hasActiveFilters = computed(() => {
  return (
    selectedCategories.value.length > 0 ||
    selectedBrands.value.length > 0 ||
    selectedGenders.value.length > 0 ||
    selectedRating.value ||
    priceRange.value[0] !== 0 ||
    priceRange.value[1] !== 10000
  )
})

function clearFilters() {
  selectedCategories.value = []
  selectedBrands.value = []
  selectedGenders.value = []
  priceRange.value = [0, 10000]
  selectedRating.value = undefined
}
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

watch([selectedCategories, selectedBrands, selectedGenders, priceRange, selectedRating, sortBy], () => {
  currentPage.value = 1;
});


// --- Keep URL in sync with filters so reload doesn't clear them ---
// (also clears the old 'category' param from the Categories page,
// in the SAME router.replace call so it doesn't race with this one)
watch(
  [selectedCategories, selectedBrands, selectedGenders, priceRange, selectedRating, sortBy, currentPage],
  () => {
    router.replace({
      query: {
        ...route.query,
        category: undefined,
        categories: selectedCategories.value.length
          ? selectedCategories.value.join(",")
          : undefined,
        brands: selectedBrands.value.length
          ? selectedBrands.value.join(",")
          : undefined,
        genders: selectedGenders.value.length
          ? selectedGenders.value.join(",")
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
    trailingIcon: 'i-lucide-plus'

  },
  {
    label: "Brands",
    icon: "i-lucide-award",
    trailingIcon: 'i-lucide-plus'

  },
  {
    label: "Price",
    icon: "i-lucide-indian-rupee",
    trailingIcon: 'i-lucide-plus'

  },
  {
    label: "Gender",
    icon: "i-lucide-venus-and-mars",
    trailingIcon: 'i-lucide-plus'

  },
  {
    label: "Rating",
    icon: "i-lucide-star",
    trailingIcon: 'i-lucide-plus'

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
    <div class="py-2">
      <PromoSectionsBanner
        src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Cult_Classic_Cat.jpg?format=webp&w=1500&dpr=1&q=80"
        class="rounded-sm" />
      <!-- <div class="mb-1 lg:mb-8">
        <h1 class="text-xl lg:text-3xl font-bold">
          {{
            selectedCategories.length === 1
              ? formatCategory(selectedCategories[0])
              : "All Products"
          }}
        </h1>
      </div> -->
      <UPageGrid class="sm:grid-cols-1 lg:grid-cols-[22%_auto] gap-4">
        <UCard class="hidden lg:block h-fit bg-neutral sticky top-18 rounded-xs ring-0" :ui="{
          body: 'sm:p-1',
          header: 'sm:px-1'
        }">
          <template #header>
            <div class="flex items-center justify-between">
              <h2 class="font-semibold text-lg text-gray-800">
                Filters
              </h2>

              <UButton v-if="hasActiveFilters" variant="link" size="sm" label="Clear All" @click="clearFilters"
                class="text-red-600/50 hover:text-red-700 active:text-red-600/50  " />
            </div>
          </template>
          <FilterPanel :items="items" :category-items="categoryItems" :brand-items="brandItems"
            :gender-items="genderItems" v-model:selected-categories="selectedCategories"
            v-model:selected-brands="selectedBrands" v-model:selected-genders="selectedGenders"
            v-model:price-range="priceRange" v-model:selected-rating="selectedRating" />
        </UCard>
        <div class="">
          <div class="hidden lg:flex items-center justify-end sticky top-18 z-2">
            <USelect v-model="sortBy" size="xl" :items="sortOptions" placeholder="Sort by"
              class="w-48 flex self-end bg-white text-gray-800 hover:bg-white rounded-sm focus:ring-gray-800" :ui="{
                content: 'bg-white rounded-sm text-gray-800',
                viewport: 'text-gray-800',
                item: 'text-gray-800 hover:bg-gray-100 hover:text-gray-800 data-highlighted:not-data-disabled:before:bg-gray-200 data-highlighted:not-data-disabled:text-gray-800'

              }" />
          </div>
          <USeparator class="py-1 lg:pt-5 flex items-center justify-center" />
          <UPageGrid class=" gap-2 sm:gap-3 md:gap-4 lg:gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4">
            <CardProductCard v-for="product in products?.data || []" :key="product.id" :product="product" />
          </UPageGrid>
          <div class="mt-10  flex justify-center p-2 sm:p-4  backdrop-blur-sm">
            <UPagination size="xl" v-model:page="currentPage" :total="products?.meta?.total || 0"
              :items-per-page="itemsPerPage" :ui="{
                list: 'bg-white p-2 lg:p-4 rounded-full gap-2  ring-1 ring-gray-800',
                first: 'bg-white hover:bg-white active:bg-white text-gray-800 disabled:bg-white rounded-full  ring-1 ring-gray-800 ',
                prev: 'bg-white hover:bg-white active:bg-white text-gray-800 disabled:bg-white rounded-full ring-1 ring-gray-800',
                item: 'bg-white hover:bg-white active:bg-white text-gray-800 rounded-full font-medium transition-all duration-200 hover:scale-110  ring-1 ring-gray-800',
                next: 'bg-white hover:bg-white active:bg-white text-gray-800 disabled:bg-white rounded-full ring-1 ring-gray-800',
                last: 'bg-white hover:bg-white active:bg-white text-gray-800 disabled:bg-white rounded-full ring-1 ring-gray-800'
              }" />
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
    <USlideover v-model:open="isFilterOpen" side="bottom" :ui="{ content: 'h-[60vh] rounded-t-sm bg-white' }">
      <template #header>
        <div class="flex items-center justify-between w-full">
          <h2 class="font-semibold text-lg text-gray-800">
            Filters
          </h2>

          <UButton v-if="hasActiveFilters" variant="link" size="sm" label="Clear All" @click="clearFilters"
            class="text-red-600/50 hover:text-red-700 active:text-red-600/50  " />
        </div>
      </template>
      <template #body>
        <!-- <FilterPanel :items="items" :category-items="categoryItems" v-model:selected-categories="selectedCategories"
          v-model:price-range="priceRange" v-model:selected-rating="selectedRating" /> -->
        <FilterPanel :items="items" :category-items="categoryItems" :brand-items="brandItems"
          :gender-items="genderItems" v-model:selected-categories="selectedCategories"
          v-model:selected-brands="selectedBrands" v-model:selected-genders="selectedGenders"
          v-model:price-range="priceRange" v-model:selected-rating="selectedRating" />
      </template>
      <template #footer>
        <ButtonUButton label="Apply Filters" block @click="isFilterOpen = false"
          class="bg-red-400 hover:bg-red-400 active:bg-red-400 text-white" />
      </template>
    </USlideover>

    <!-- Sort bottom sheet -->
    <USlideover v-model:open="isSortOpen" side="bottom" :ui="{ content: 'h-[50vh] rounded-t-sm bg-white ' }">
      <template #header>
        <h2 class="font-semibold text-lg">Sort By</h2>
      </template>
      <template #body>
        <URadioGroup size="xl" v-model="sortBy" :items="sortOptions" :ui="{
          label: 'text-black font-normal', fieldset: '  py-2 ',
          base: 'ring-gray-800 ring-2 rounded-sm p-1',
          indicator: 'bg-white after:bg-red-400  after:rounded-sm after:size-full'
        }" />
      </template>
    </USlideover>
  </UContainer>
</template>
