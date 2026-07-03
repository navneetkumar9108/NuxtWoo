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
