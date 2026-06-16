<!-- useFetch -->
<!-- <script setup>
const route = useRoute();
const {
  data: product,
  pending,
  error,
  refresh,
} = await useFetch(`https://dummyjson.com/products/${route.params.id}`);
</script> -->

<!-- <template>
  <div class="fixed-200">
    <h1>Product Page</h1>
    <h1 v-if="error">Oops! Error encountered: {{ error }}</h1>
    <h1 v-if="pending">Loading....</h1>
    <div v-if="product">
      <div class="container">
        <div class="left-column">
          <h3>{{ product.id }}</h3>
          <img :src="product.images" alt="" class="img-70" />
        </div>

        <div class="right-column">
          <h3>{{ product.title }}</h3>
          <h3>{{ product.description }}</h3>
          <h3>{{ product.category }}</h3>
          <h3>Price: $ {{ product.price }}</h3>
        </div>
      </div>
    </div>
  </div>
</template> -->

<script setup>
const route = useRoute();
const qty = ref(1);
const selectedSize = ref("");
const activeIndex = ref(0);

// Fetch product by slug
const { data: product } = await useFetch(
  `https://dummyjson.com/products/${route.params.id}`,
);

const discount = computed(() => {
  if (!product.value?.originalPrice) return null;
  return Math.round(
    (1 - product.value.price / product.value.originalPrice) * 100,
  );
});

// const breadcrumbs = computed(() => [
//   { label: "Home", to: "/" },
//   {
//     label: product.value?.category,
//     to: `/products/${route.params.id}`,
//   },
//   { label: product.value?.name },
// ]);

const tabs = [
  { label: "Description", slot: "description" },
  { label: "Reviews", slot: "reviews" },
  { label: "Specifications", slot: "specs" },
];

const specColumns = [
  { accessorKey: "label", header: "Specification" },
  { accessorKey: "value", header: "Value" },
];

const specs = computed(() => [
  { label: "brand", value: product.value.brand },
  { label: "Weight", value: `${product.value.weight} kg` },
  {
    label: "Dimensions",
    value: `${product.value.dimensions.width} × ${product.value.dimensions.height} × ${product.value.dimensions.depth} cm`,
  },
  { label: "Warranty", value: product.value.warrantyInformation },
  { label: "Shipping", value: product.value.shippingInformation },
  { label: "Return Policy", value: product.value.returnPolicy },
  { label: "Min. Order Qty", value: product.value.minimumOrderQuantity },
  { label: "Barcode", value: product.value.meta.barcode },
]);

const reviews = ref([
  {
    id: 1,
    name: "Rahul Sharma",
    rating: 5,
    date: "12 Jun 2025",
    comment: "Bahut acha product hai, quality ekdum top notch!",
  },
  {
    id: 2,
    name: "Priya Singh",
    rating: 4,
    date: "3 May 2025",
    comment: "Good product, delivery thodi slow thi but overall satisfied.",
  },
  {
    id: 3,
    name: "Amit Kumar",
    rating: 3,
    date: "20 Apr 2025",
    comment: "Average quality, price ke hisaab se theek hai.",
  },
]);
</script>
<template>
  <UContainer class="py-10">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <!-- Left: Images -->
      <!-- <div>
        <NuxtImg
          :src="product.thumbnail"
          class="w-full rounded-xl object-cover shadow-sm shadow-gray-300"
        />
      </div> -->

      <div class="flex flex-col gap-3">
        <!-- Main Image with Prev/Next -->
        <div
          class="relative rounded-xl overflow-hidden aspect-square bg-gray-100 group"
        >
          <img
            :src="product.images[activeIndex]"
            class="w-full h-full object-cover transition-all duration-300"
          />

          <!-- Prev Button -->
          <button
            @click="
              activeIndex =
                (activeIndex - 1 + product.images.length) %
                product.images.length
            "
            class="absolute left-2 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center bg-white/80 hover:bg-white rounded-full p-2 shadow opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <UIcon name="i-lucide-chevron-left" class="w-5 h-5" />
          </button>

          <!-- Next Button -->
          <button
            @click="activeIndex = (activeIndex + 1) % product.images.length"
            class="absolute right-2 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center bg-white/80 hover:bg-white rounded-full p-2 shadow opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <UIcon name="i-lucide-chevron-right" class="w-5 h-5" />
          </button>
        </div>

        <!-- Thumbnail Strip -->
        <div class="flex gap-2 overflow-x-auto">
          <button
            v-for="(img, i) in product.images"
            :key="i"
            @click="activeIndex = i"
            class="shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all"
            :class="
              activeIndex === i
                ? 'border-primary'
                : 'border-transparent opacity-60'
            "
          >
            <img :src="img" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <!-- Right: Details -->
      <div class="flex flex-col gap-6">
        <!-- Breadcrumb -->
        <UBreadcrumb :links="breadcrumbs" />

        <!-- Title & Badge -->
        <div>
          <div class="flex items-center gap-2 mb-2">
            <UBadge
              :label="product.availabilityStatus"
              color="success"
              variant="subtle"
            />
            <UBadge
              v-if="product.isNew"
              label="New"
              color="primary"
              variant="subtle"
            />
          </div>
          <h1 class="text-3xl font-bold">{{ product.title }}</h1>
        </div>

        <!-- Price -->
        <div class="flex items-center gap-3">
          <span class="text-2xl font-bold text-primary"
            >₹{{ product.price }}</span
          >
          <span
            v-if="product.originalPrice"
            class="text-gray-400 line-through text-lg"
          >
            ₹{{ product.originalPrice }}
          </span>
          <UBadge
            v-if="product.discountPercentage"
            :label="`${product.discountPercentage}% off`"
            color="error"
            variant="subtle"
          />
        </div>

        <USeparator />

        <!-- Variants (Size/Color) -->
        <div class="flex flex-col gap-3" v-if="product.sizes">
          <p class="font-medium">Size</p>
          <div class="flex gap-2 flex-wrap">
            <UButton
              v-for="size in product.sizes"
              :key="size"
              :variant="selectedSize === size ? 'solid' : 'outline'"
              :color="selectedSize === size ? 'primary' : 'neutral'"
              size="sm"
              @click="selectedSize = size"
            >
              {{ size }}
            </UButton>
          </div>
        </div>

        <!-- Quantity + Add to Cart -->
        <div class="flex items-center gap-4">
          <div class="flex items-center border rounded-lg overflow-hidden">
            <UButton
              icon="i-lucide-minus"
              variant="ghost"
              @click="qty > 1 && qty--"
            />
            <span class="px-4 font-medium">{{ qty }}</span>
            <UButton icon="i-lucide-plus" variant="ghost" @click="qty++" />
          </div>

          <UButton class="flex-1" size="lg" icon="i-lucide-shopping-cart">
            Add to Cart
          </UButton>

          <UButton icon="i-lucide-heart" variant="outline" size="lg" />
        </div>

        <!-- Description -->
        <USeparator />
        <div>
          <p class="text-gray-500 leading-relaxed">{{ product.description }}</p>
        </div>

        <!-- Meta info -->
        <div class="flex flex-col gap-2 text-sm text-gray-500">
          <span>SKU: {{ product.sku }}</span>
          <span>Category: {{ product.category }}</span>
        </div>
      </div>
    </div>

    <!-- Tabs: Description / Reviews / Specs -->
    <div class="mt-16">
      <UTabs :items="tabs" class="w-full">
        <template #description>
          <div class="prose max-w-none py-4" v-html="product.description" />
        </template>
        <template #reviews>
          <div class="py-4 flex flex-col gap-4">
            <!-- Rating Summary -->
            <!-- <div class="flex items-center gap-4">
              <span class="text-5xl font-bold">4.2</span>
              <div>
                <div class="flex gap-1 text-yellow-400">
                  <UIcon name="i-lucide-star" v-for="i in 5" :key="i" />
                </div>
                <p class="text-sm text-gray-500 mt-1">Based on 128 reviews</p>
              </div>
            </div> -->

            <USeparator />

            <!-- Review Cards -->
            <UCard
              v-for="review in product.reviews"
              :key="review.reviewerEmail"
            >
              <div class="flex flex-col gap-2">
                <!-- Header -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <UAvatar :alt="review.reviewerName" size="sm" />
                    <span class="font-medium">{{ review.reviewerName }}</span>
                  </div>
                  <span class="text-sm text-gray-400">{{
                    new Date(review.date).toLocaleDateString("en-IN")
                  }}</span>
                </div>

                <!-- Stars -->
                <div class="flex gap-1">
                  <UIcon
                    v-for="i in 5"
                    :key="i"
                    :name="
                      i <= review.rating ? 'i-lucide-star' : 'i-lucide-star-off'
                    "
                    :class="
                      i <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                    "
                  />
                </div>

                <!-- Comment -->
                <p class="text-gray-500 text-sm">{{ review.comment }}</p>
              </div>
            </UCard>

            <!-- Load More -->
            <!-- <UButton variant="outline" class="self-center">Load More</UButton> -->
          </div>
        </template>
        <template #specs>
          <UTable
            :data="specs"
            :columns="specColumns"
            :ui="{
              th: 'text-black',
            }"
          />
        </template>
      </UTabs>
    </div>
  </UContainer>
</template>
