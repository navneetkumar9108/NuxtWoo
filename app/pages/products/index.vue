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
    // icon: "i-lucide-grid-2x2",

  },
  {
    label: "Brands",
    // icon: "i-lucide-award",

  },
  {
    label: "Price",
    // icon: "i-lucide-indian-rupee",

  },
  {
    label: "Gender",
    // icon: "i-lucide-venus-and-mars",

  },
  {
    label: "Rating",
    // icon: "i-lucide-star",

  },
];

const formatCategory = (category) => {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
const open = ref(false)
// Flatten all selected filters into one array of chips
const activeFilterChips = computed(() => {
  const chips = []

  selectedCategories.value.forEach(val => {
    const found = categoryItems.value.find(item => item.value === val)
    chips.push({ group: 'category', value: val, label: found?.label ?? val })
  })

  selectedBrands.value.forEach(val => {
    const found = brandItems.value.find(item => item.value === val)
    chips.push({ group: 'brand', value: val, label: found?.label ?? val })
  })

  selectedGenders.value.forEach(val => {
    const found = genderItems.value.find(item => item.value === val)
    chips.push({ group: 'gender', value: val, label: found?.label ?? val })
  })

  if (selectedRating.value) {
    chips.push({ group: 'rating', value: selectedRating.value, label: `${selectedRating.value}★ & Above` })
  }

  if (priceRange.value[0] !== 0 || priceRange.value[1] !== 10000) {
    chips.push({ group: 'price', value: null, label: `₹${priceRange.value[0]} - ₹${priceRange.value[1]}` })
  }

  return chips
})

function removeChip(chip) {
  if (chip.group === 'category') {
    selectedCategories.value = selectedCategories.value.filter(v => v !== chip.value)
  } else if (chip.group === 'brand') {
    selectedBrands.value = selectedBrands.value.filter(v => v !== chip.value)
  } else if (chip.group === 'gender') {
    selectedGenders.value = selectedGenders.value.filter(v => v !== chip.value)
  } else if (chip.group === 'rating') {
    selectedRating.value = null
  } else if (chip.group === 'price') {
    priceRange.value = [0, 10000]
  }
}
</script>
<template>
  <UContainer class="px-2.5">
    <div class="py-2">
      <PromoSectionsBanner
        src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Cult_Classic_Cat.jpg?format=webp&w=1500&dpr=1&q=80"
        class="rounded-sm" />
      <!-- <div class="hidden lg:block relative">
        <UCard class="h-fit bg-neutral sticky top-18 rounded-xs ring-0" :ui="{
          body: '',
          header: 'sm:px-1'
        }">
          <template #header>
            <div class="flex items-center justify-start">
              <button class="flex items-center gap-2" @click="open = !open">
                <UIcon name="i-lucide-filter" class="size-4 text-gray-600" />
                <h2 class="font-semibold text-lg text-gray-800">
                  Filters
                </h2>
                <UIcon name="i-lucide-chevron-down" class="size-4 text-gray-500 transition-transform"
                  :class="open ? 'rotate-180' : ''" />
              </button>
              <USeparator orientation="vertical" class="text-gray-800" :ui="{
                border: 'text-gray-800'
              }" />
              <UButton v-if="hasActiveFilters" variant="link" size="sm" label="Clear All" @click="clearFilters"
                class="text-red-600/50 hover:text-red-700 active:text-red-600/50" />

            </div>
          </template>
<div v-if="activeFilterChips.length" class="flex flex-wrap gap-2 px-1 pb-1">
  <UBadge v-for="chip in activeFilterChips" :key="`${chip.group}-${chip.value}`" :label="chip.label" variant="soft"
    color="neutral" class="cursor-pointer">
    <template #trailing>
                <UIcon name="i-lucide-x" class="size-3" @click="removeChip(chip)" />
              </template>
  </UBadge>
</div>
</UCard>

<Transition enter-active-class="transition ease-out duration-150" enter-from-class="opacity-0 -translate-y-1"
  enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-100"
  leave-from-class="opacity-100" leave-to-class="opacity-0">
  <div v-if="open"
    class="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-xs shadow-lg z-20 p-2">
    <FilterPanel :items="items" :category-items="categoryItems" :brand-items="brandItems" :gender-items="genderItems"
      v-model:selected-categories="selectedCategories" v-model:selected-brands="selectedBrands"
      v-model:selected-genders="selectedGenders" v-model:price-range="priceRange"
      v-model:selected-rating="selectedRating" />
  </div>
</Transition>
</div> -->
      <UPageGrid class="sm:grid-cols-1 lg:grid-cols-[22%_auto] gap-4">
        <UCard class="hidden lg:block h-fit bg-neutral sticky top-18 rounded-xs ring-0" :ui="{
          body: 'lg:pt-1 sm:p-0',
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
            <div v-if="activeFilterChips.length" class="flex flex-wrap gap-2 pb-1">
              <UBadge v-for="chip in activeFilterChips" :key="`${chip.group}-${chip.value}`" :label="chip.label"
                variant="soft" color="neutral" class="cursor-pointer" :ui="{
                  base: 'p-2 bg-white text-gray-800 justify-center ring',
                  label: 'pb-1',
                  trailingIcon: 'bg-gray-800'
                }">
                <template #trailing>
                  <UIcon name="i-tabler-square-x-filled" class="size-4 bg-gray-800 rounded-sm"
                    @click="removeChip(chip)" />
                </template>
              </UBadge>
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
          <!-- <div v-if="activeFilterChips.length" class="flex flex-wrap gap-2 pb-1">
            <UBadge v-for="chip in activeFilterChips" :key="`${chip.group}-${chip.value}`" :label="chip.label"
              variant="soft" color="neutral" class="cursor-pointer" :ui="{
                base: 'p-2 bg-white text-gray-800 justify-center ring',
                label: 'pb-1',
                trailingIcon: 'bg-gray-800'
              }">
              <template #trailing>
                <UIcon name="i-tabler-square-x-filled" class="size-4 bg-gray-800 rounded-sm"
                  @click="removeChip(chip)" />
              </template>
            </UBadge>
          </div> -->
          <USeparator class="py-1 lg:pt-5 flex items-center justify-center" />
          <UPageGrid class=" gap-2 sm:gap-3 md:gap-4 lg:gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4">
            <CardProductCard v-for="product in products?.data || []" :key="product.id" :product="product" />
          </UPageGrid>
          <div class="mt-10  flex justify-center p-2 sm:p-4  backdrop-blur-sm">
            <!-- <UPagination size="xl" v-model:page="currentPage" :total="products?.meta?.total || 0"
              :items-per-page="itemsPerPage" :ui="{
                list: 'bg-white p-2 lg:p-4 rounded-full gap-2  ring-1 ring-gray-800',
                first: 'bg-white hover:bg-white active:bg-white text-gray-800 disabled:bg-white rounded-full  ring-1 ring-gray-800 ',
                prev: 'bg-white hover:bg-white active:bg-white text-gray-800 disabled:bg-white rounded-full ring-1 ring-gray-800',
                item: 'bg-white hover:bg-white active:bg-white text-gray-800 rounded-full font-medium transition-all duration-200 hover:scale-110  ring-1 ring-gray-800',
                next: 'bg-white hover:bg-white active:bg-white text-gray-800 disabled:bg-white rounded-full ring-1 ring-gray-800',
                last: 'bg-white hover:bg-white active:bg-white text-gray-800 disabled:bg-white rounded-full ring-1 ring-gray-800'
              }" /> -->
            <UPagination size="xl" v-model:page="currentPage" :total="products?.meta?.total || 0"
              :items-per-page="itemsPerPage" active-color="error" active-variant="solid" color="error" :ui="{
                root: 'w-fit',
                list: 'bg-white p-2 rounded-lg ring-1 ring-gray-300 gap-1',

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
    <USlideover class="lg:hidden" v-model:open="isFilterOpen" side="bottom"
      :ui="{ content: 'h-[60vh] rounded-t-sm bg-white' }">
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
