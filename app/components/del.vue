<!-- <script setup lang="ts"></script> -->

<!-- <template>
  <header class="bg-white sticky top-0 z-40 shadow-md">
    <div
      class="flex items-center justify-between py-4 px-4 md:px-8 lg:px-12 mx-36 md:mx-48 lg:mx-60 gap-6"
    >
      <NuxtLink to="/" class="w-40">
        <figure class="flex items-center gap-2">
          <img class="h-8 w-8" src="../assets/NuxtWoo.svg" alt="WooNuxt" />
          <figcaption class="text-lg font-bold">WooNuxt</figcaption>
        </figure>
      </NuxtLink>

      <nav>
        <ul
          class="flex items-center justify-between gap-6 px-4 text-sm text-gray-500"
        >
          <li>
            <NuxtLink to="/">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about">About</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/products">Products</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/contact">Contact</NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="flex items-center justify-end flex-1 gap-6">
        <form
          action=""
          class="flex items-center gap-2 rounded-md border border-gray-300 pl-2 max-w-80 w-[60%] text-gray-500 shadow-inner bg-gray-50"
        >
          <UIcon name="i-lucide-search" class="size-5" strokeWidth="2" />

          <input
            type="text"
            placeholder="Search Products..."
            class="outline-none p-2 flex-1"
          />
        </form>
        <div class="flex items-center gap-4">
          <UIcon name="i-lucide-user" class="size-5.5 stroke-[1.5]" />
          <UIcon
            name="i-lucide-shopping-cart"
            class="size-5.5"
            strokeWidth="2"
          />
        </div>
      </div>
    </div>
  </header>
</template> -->

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
<!-- <style lang="scss" scoped></style> -->
<!-- <UButton
                      block
                      color="neutral"
                      class="hover:bg-green-500 transition-colors mt-1"
                    >
                      Add to Cart
                    </UButton> -->

<!-- <div @mouseenter="isHovering = true" @mouseleave="isHovering = false">
    <UPageCard
      class="w-52.5 bg-netural ring-0 mx-2.5 mb-7.5"
      :ui="{
        container:
          'sm:p-0 gap-0  hover:bg-white hover:shadow-lg transition-all duration-300 ',
        header: 'w-full  h-70 mb-0 relative ',
        body: 'px-2.5 mt-3 leading-tight',
      }"
    >
      <template #header>
        <div class="relative w-full h-full">
          <UCarousel
            :key="isHovering"
            v-slot="{ item }"
            loop
            :dots="isHovering"
            :autoplay="isHovering ? { delay: 2000 } : false"
            :items="items"
            class="w-full h-full"
            :ui="{
              dots: ' -bottom-3 gap-1',
              dot: 'w-1 h-1',
            }"
          >
            <NuxtImg :src="item" alt="" class="w-full h-full object-contain" />
          </UCarousel>
          <UBadge
            color="primary"
            variant="subtle"
            class="absolute left-2 bottom-1 backdrop-blur-xl bg-white/50 text-black rounded-xs z-10"
          >
            <div class="flex items-center gap-1">
              <span>4.5</span>
              <UIcon name="i-lucide-star" class="size-3" />
              <USeparator orientation="vertical" size="xs" class="h-3" />
              <span>1.2k</span>
            </div>
          </UBadge>
          <UBadge
            label="NEW"
            color="error"
            variant="solid"
            size="sm"
            :ui="{
              base: 'absolute top-3 left-0 z-10 rounded-none bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold tracking-wide pl-1 pr-5 py-1 shadow-md [clip-path:polygon(0_0,100%_0,85%_50%,100%_100%,0_100%)]',
            }"
          />
        </div>
      </template>
      <template #body>
        <h3 class="text-[16px] font-bold text-gray-800">PRONK</h3>
        <h4 class="text-sm text-gray-600 font-normal">
          Men Printed Raw Edge T-shirt
        </h4>
        <div class="text-sm text-gray-800 mt-2.5 mb-1.5">
          <span class="text-sm mr-[5px] font-bold"><strong>₹ 593</strong></span>
          <span class="text-xs mr-[5px] text-error"><s>₹ 1499</s></span>
          <span class="text-xs text-success">(60 % OFF)</span>
        </div>
      </template>
    </UPageCard>
  </div> -->

<!-- <UPageCard
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
            

                    
                  </div>
                </template>
              </UPageCard> -->

<!-- propuct script plp -->
<!-- <script setup>
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
const { data: products, pending, error } = await useFetch("/api/product");
console.log("products", products.value);
// const {
//   data: products,
//   pending,
//   error,
//   refresh,
// } = await useFetch("https://dummyjson.com/products?limit=194");

const { data: categories } = await useFetch(
  "https://dummyjson.com/products/category-list",
);

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
</script> -->

// const { // data: products, // pending, // error, // refresh, // } = await
useFetch("https://dummyjson.com/products?limit=194"); // const { data:
categories } = await useFetch( //
"https://dummyjson.com/products/category-list", // ); // const maxPrice =
computed(() => { // return Math.max(...(products.value?.data.products ||
[]).map((p) => p.price)); // }); // const priceRange = ref([ //
Number(route.query.minPrice) || 0, // Number(route.query.maxPrice) ||
maxPrice.value, // ]);

<!-- pdp image and thumbnail strip code -->
<!-- <div class="flex flex-col gap-3">
        Main Image with Prev/Next
        <div class="relative rounded-xl overflow-hidden aspect-square bg-gray-100 group">
          <img :src="product.images[activeIndex]" class="w-full h-full object-cover transition-all duration-300" />
          

          Prev Button
          <button @click="
            activeIndex =
            (activeIndex - 1 + product.images.length) %
            product.images.length
            "
            class="absolute left-2 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center bg-white/80 hover:bg-white rounded-full p-2 shadow opacity-0 group-hover:opacity-100 transition-opacity">
            <UIcon name="i-lucide-chevron-left" class="w-5 h-5" />
          </button>

          Next Button
          <button @click="activeIndex = (activeIndex + 1) % product.images.length"
            class="absolute right-2 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center bg-white/80 hover:bg-white rounded-full p-2 shadow opacity-0 group-hover:opacity-100 transition-opacity">
            <UIcon name="i-lucide-chevron-right" class="w-5 h-5" />
          </button>
        </div>

        Thumbnail Strip
        <div class="flex gap-2 overflow-x-auto">
          <button v-for="(img, i) in product.images" :key="i" @click="activeIndex = i"
            class="shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all" :class="activeIndex === i
              ? 'border-primary'
              : 'border-transparent opacity-60'
              ">
            <img :src="img" class="w-full h-full object-cover" />
          </button>
        </div>
      </div> -->

<!-- Quantity + Add to Cart -->
<!-- <div class="flex items-center gap-4 mb-5.75">
                    <!-- <div class="flex items-center border rounded-lg overflow-hidden">
                      <UButton
                        icon="i-lucide-minus"
                        variant="ghost"
                        @click="qty > 1 && qty--"
                      />
                      <span class="px-4 font-medium">{{ qty }}</span>
                      <UButton icon="i-lucide-plus" variant="ghost" @click="qty++" />
                    </div>  -->

<!-- <UButton class="flex-1" size="lg" icon="i-lucide-shopping-cart">
                      Add to Cart
                    </UButton> -->



<!-- Tabs: Description / Reviews / Specs -->
<!-- <div class="mt-16">
                          <UTabs :items="tabs" class="w-full">
                            <template #description>
                              <div class="prose max-w-none py-4" v-html="product.description" />
                            </template>
                    <template #reviews>
                              <div class="py-4 flex flex-col gap-4">
                    
                                <341 to 350 not use></341>
                                Rating Summary 
                                 <div class="flex items-center gap-4">
                                  <span class="text-5xl font-bold">4.2</span>
                                  <div>
                                    <div class="flex gap-1 text-yellow-400">
                                      <UIcon name="i-lucide-star" v-for="i in 5" :key="i" />
                                    </div>
                                    <p class="text-sm text-gray-500 mt-1">Based on 128 reviews</p>
                                  </div>
                                </div>
                    
                                <USeparator />
                    
                                Review Cards
                                <UCard v-for="review in product.reviews" :key="review.reviewerEmail">
                                  <div class="flex flex-col gap-2">
                                    Header
                                    <div class="flex items-center justify-between">
                                      <div class="flex items-center gap-2">
                                        <UAvatar :alt="review.reviewerName" size="sm" />
                                        <span class="font-medium">{{ review.reviewerName }}</span>
                                      </div>
                                      <span class="text-sm text-gray-400">{{
                                        new Date(review.date).toLocaleDateString("en-IN")
                                      }}</span>
                                    </div>
                    
                                    Stars
                                    <div class="flex gap-1">
                                      <UIcon v-for="i in 5" :key="i" :name="i <= review.rating ? 'i-lucide-star' : 'i-lucide-star-off'
                                        " :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                                          " />
                                    </div>
                    
                                    Comment
                                    <p class="text-gray-500 text-sm">{{ review.comment }}</p>
                                  </div>
                                </UCard>
                    
                                Load More 
                                 <UButton variant="outline" class="self-center">Load More</UButton>
                              </div>
                            </template>
                    <template #specs>
                              <UTable :data="specs" :columns="specColumns" :ui="{
                                th: 'text-black',
                              }" />
                            </template>
                    </UTabs>
                    </div> -->

<!-- Description -->

<!-- <div class="space-y-4 mt-7.5">
                                Header
                                <div class="flex items-center gap-2">
                                  <h3 class="font-bold text-[16px] tracking-wide text-gray-800 uppercase">
                                    DELIVERY OPTIONS
                                  </h3>
                                  <UIcon name="i-lucide-truck" class="size-4 text-gray-700" />
                                </div>
                      
                                <div class="flex items-center justify-between border border-gray-300 rounded-md px-3 py-2.5 w-fit">
                                  <div class="flex items-center gap-2">
                                    <span class="font-semibold text-sm text-gray-900">801103</span>
                                    <UIcon name="i-lucide-check-circle-2" class="size-4 text-emerald-500" />
                                  </div>
                                  <UButton label="CHANGE" variant="link" color="error" class="font-bold text-xs p-0" />
                                </div>
                      
                                Info rows
                                <div class="space-y-3.5">
                                  <div class="flex items-center gap-3">
                                    <UIcon name="i-lucide-truck" class="size-5 text-gray-700" />
                                    <p class="text-sm font-semibold text-gray-900">
                                      Get it by Mon, Jun 29
                                    </p>
                                  </div>
                      
                                  <div class="flex items-center gap-3">
                                    <UIcon name="i-lucide-banknote" class="size-5 text-gray-700" />
                                    <p class="text-sm font-semibold text-gray-900">
                                      Pay on delivery available
                                    </p>
                                  </div>
                      
                                  <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                      <UIcon name="i-lucide-rotate-ccw" class="size-5 text-gray-700" />
                                      <p class="text-sm font-semibold text-gray-900">
                                        Easy 7 days return &amp; exchange available
                                      </p>
                                    </div>
                                    <UButton label="MORE INFO" trailing-icon="i-lucide-chevron-right" variant="link" color="error"
                                      class="font-bold text-xs p-0" />
                                  </div>
                                </div>
                              </div> -->




<!-- plp -->
<!-- <template>
  <UContainer>
    <div class="py-10">
      <div class="mb-1 lg:mb-8">
        <h1 class="text-xl lg:text-3xl font-bold">
          {{
            selectedCategories.length === 1
              ? formatCategory(selectedCategories[0])
              : "All Products"
          }}
        </h1> -->
<!-- <p class="text-muted mt-1">{{ filteredProducts.length }} results</p> -->
<!-- </div>
      <UPageGrid class="lg:grid-cols-[22%_auto] gap-4">
        <UCard class="hidden lg:block h-fit bg-neutral sticky top-18 rounded-xs ring-0">
          <template #header>
            <h2 class="font-semibold text-lg">Filters</h2>
          </template>
          <FilterPanel :items="items" :category-items="categoryItems" v-model:selected-categories="selectedCategories"
            v-model:price-range="priceRange" v-model:selected-rating="selectedRating" /> -->

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
<!-- </UCard>
        <div class="">
          <div class="flex items-center justify-end sticky top-18 z-2 ">
            <USelect v-model="sortBy" :items="sortOptions" placeholder="Sort by" class="w-48 flex self-end" />
          </div>
          <USeparator class="py-1 lg:py-7 flex items-center justify-center" />
          <UPageGrid class="h-fit gap-2 grid-cols-2 lg:grid-cols-4">
            <CardProductCard v-for="product in products?.data || []" :key="product.id" :product="product" />
          </UPageGrid>
          <div class="mt-10 flex justify-center">
            <!-- <UPagination v-model:page="currentPage" :total="filteredProducts.length" :items-per-page="itemsPerPage" /> -->
<!-- <UPagination v-model:page="currentPage" :total="products?.meta?.total || 0"
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
    </div>  -->

<!-- Filter bottom sheet -->
<!-- <USlideover v-model:open="isFilterOpen" side="bottom" :ui="{ content: 'h-[85vh] rounded-t-xl' }">
      <template #header>
        <h2 class="font-semibold text-lg">Filters</h2>
      </template>
      <template #body>
        <FilterPanel :items="items" :category-items="categoryItems" v-model:selected-categories="selectedCategories"
          v-model:price-range="priceRange" v-model:selected-rating="selectedRating" />
      </template>
      <template #footer>
        <UButton block @click="isFilterOpen = false">Apply Filters</UButton>
      </template>
    </USlideover> -->

<!-- Sort bottom sheet -->
<!-- <USlideover v-model:open="isSortOpen" side="bottom" :ui="{ content: 'h-[50vh] rounded-t-xl' }">
      <template #header>
        <h2 class="font-semibold text-lg">Sort By</h2>
      </template>
      <template #body>
        <URadioGroup v-model="sortOption" :items="sortOptions" />
      </template>
    </USlideover>
  </UContainer>
</template> -->

<!-- product card -->
<!-- <template>
  <UPageCard
    class="w-full max-w-[180px] sm:max-w-[210px] lg:w-52.5 lg:max-w-none bg-neutral ring-0 mx-auto sm:mx-2.5 mb-4 sm:mb-7.5"
    :to="`/products/${product.slug}`"
    :ui="{
      root: 'hover:bg-neutral hover:bg-white hover:shadow-lg transition-all duration-300 rounded-xs',
      container: 'sm:p-0 gap-0',
      header: 'w-full h-40 sm:h-56 lg:h-70 mb-0 relative bg-gray-200',
      body: 'px-2 sm:px-2.5 mt-2 sm:mt-3 leading-tight w-full',
    }"
  >
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
</template> -->

<!-- plp -->
<!-- <template>
  <UContainer>
    <div class="py-4 sm:py-6 lg:py-10">
      <div class="mb-1 lg:mb-8">
        <h1 class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
          {{
            selectedCategories.length === 1
              ? formatCategory(selectedCategories[0])
              : "All Products"
          }}
        </h1>
      </div>

      <UPageGrid class="grid-cols-1 lg:grid-cols-[22%_auto] gap-4">
        <UCard class="hidden lg:block h-fit bg-neutral sticky top-18 rounded-xs ring-0">
          <template #header>
            <h2 class="font-semibold text-lg">Filters</h2>
          </template>
          <FilterPanel :items="items" :category-items="categoryItems" v-model:selected-categories="selectedCategories"
            v-model:price-range="priceRange" v-model:selected-rating="selectedRating" />
        </UCard>

        <div>
          <div class="flex items-center justify-end sticky top-16 lg:top-18 z-2 bg-white/80 backdrop-blur py-1">
            <USelect v-model="sortBy" :items="sortOptions" placeholder="Sort by"
              class="w-32 sm:w-40 lg:w-48 flex self-end" />
          </div>
          <USeparator class="py-1 lg:py-7 flex items-center justify-center" />

          <UPageGrid class="h-fit gap-2 sm:gap-3 lg:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            <CardProductCard v-for="product in products?.data || []" :key="product.id" :product="product" />
          </UPageGrid>

          <div class="mt-6 sm:mt-8 lg:mt-10 flex justify-center pb-16 lg:pb-0">
            <UPagination v-model:page="currentPage" :total="products?.meta?.total || 0"
              :items-per-page="itemsPerPage" />
          </div>
        </div>
      </UPageGrid>
    </div>

    <div
      class="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 grid grid-cols-2 divide-x divide-gray-200">
      <button class="flex items-center justify-center gap-2 py-3 text-xs sm:text-sm font-medium text-gray-700"
        @click="isSortOpen = true">
        <UIcon name="i-lucide-arrow-up-down" class="w-4 h-4" />
        SORT
      </button>
      <button class="flex items-center justify-center gap-2 py-3 text-xs sm:text-sm font-medium text-gray-700"
        @click="isFilterOpen = true">
        <UIcon name="i-lucide-sliders-horizontal" class="w-4 h-4" />
        FILTER
        <span v-if="activeFilterCount" class="w-1.5 h-1.5 rounded-full bg-primary" />
      </button>
    </div>

    <USlideover v-model:open="isFilterOpen" side="bottom" :ui="{ content: 'h-[90vh] sm:h-[85vh] rounded-t-xl' }">
      <template #header>
        <h2 class="font-semibold text-lg">Filters</h2>
      </template>
      <template #body>
        <FilterPanel :items="items" :category-items="categoryItems" v-model:selected-categories="selectedCategories"
          v-model:price-range="priceRange" v-model:selected-rating="selectedRating" />
      </template>
      <template #footer>
        <UButton block @click="isFilterOpen = false">Apply Filters</UButton>
      </template>
    </USlideover>

    <USlideover v-model:open="isSortOpen" side="bottom" :ui="{ content: 'h-[50vh] rounded-t-xl' }">
      <template #header>
        <h2 class="font-semibold text-lg">Sort By</h2>
      </template>
      <template #body>
        <URadioGroup v-model="sortOption" :items="sortOptions" />
      </template>
    </USlideover>
  </UContainer>
</template> -->


root: ' bg-transparent ',
body: 'p-0 justify-center items-center',
title: 'absolute bottom-3 text-white font-semibold text-sm z-10',
container: 'sm:p-0',