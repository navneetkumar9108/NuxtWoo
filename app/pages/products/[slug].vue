<script setup>
import { useCartStore } from '~~/store/cart';
const route = useRoute();
const qty = ref(1);
const selectedSize = ref("");
const activeIndex = ref(0);
const selectedVariantIndex = ref(0);
const cartStore = useCartStore()


// Fetch product by slug

const { data: product } = await useFetch(
  `/api/products/${route.params.slug}`,
);

// console.log('product', product.value);
const discount = computed(() => {
  if (!product.value?.originalPrice) return null;
  return Math.round(
    (1 - product.value.price / product.value.originalPrice) * 100,
  );
});

const galleryImages = computed(() => {
  return product.value?.data?.variants?.[selectedVariantIndex.value]?.images || [];
});



function handleAddToCart() {
  cartStore.addToCart(product.value)
}

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

const formatter = new Intl.NumberFormat("en", {
  notation: "compact",
});

const specRows = computed(() =>
  Object.entries(product.value.data.specifications).map(([key, value]) => ({
    label: key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, s => s.toUpperCase()),
    value,
  }))
)
const items = [
  'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/640?random=2',
  'https://picsum.photos/640/640?random=3',
  'https://picsum.photos/640/640?random=4',
  'https://picsum.photos/640/640?random=5',
  'https://picsum.photos/640/640?random=6'
]

</script>

<template>
  <UContainer class="py-10">
    <UPageGrid class="lg:grid-cols-[60%_auto] gap-2 sm:gap-10 items-start">
      <!-- Left: Images -->
      <UPageGrid class="hidden sm:grid sm:grid-cols-2 lg:grid-cols-2 gap-2">
        <div class="overflow-hidden" v-for="(image, index) in galleryImages" :key="index">

          <NuxtImg :src="image"
            class="w-full rounded-xs object-cover transition-transform duration-500 hover:scale-110 cursor-zoom-in " />
        </div>
      </UPageGrid>
      <UCarousel v-slot="{ item }" wheel-gestures dots :items="galleryImages" class="w-full   mx-auto sm:hidden" :ui="{
        dot: 'size-1',
        dots: '-bottom-2'
      }">
        <NuxtImg :src="item" height="320" class="w-full rounded-lg" loading="lazy" playsinline />

      </UCarousel>
      <!-- Right: Details -->
      <div class="flex flex-col">


        <!--brand Title  Badge price -->
        <div>
          <h1 class="text-2xl font-bold text-gray-800">{{ product.data.brand.name }}</h1>
          <h1 class="text-xl font-normal text-gray-600 pt-1.5 pb-5">
            {{ product.data.title }}
          </h1>
          <div class="flex items-center gap-2">

            <UBadge size="xl" color="primary" variant="subtle"
              class="backdrop-blur-xl bg-white/50 border hover:border-zinc-300 border-gray-200 rounded-sm mb-3">
              <div class="flex items-center gap-2">
                <span class="font-bold text-gray-800 text-[16px]">{{
                  product.data.rating
                }}</span>
                <UIcon name="i-lucide-star" class="size-4 font-bold text-gray-800" />
                <USeparator orientation="vertical" size="xs" class="h-3 text-gray-600" />
                <span class="text-gray-600 font-normal">{{ formatter.format(product.data.ratingCount) }} Ratings</span>
              </div>
            </UBadge>
          </div>
          <USeparator size="xs" class="text-gray-600" />
          <span class="text-2xl text-gray-800 mr-3"><strong>₹{{ product.data.price }}</strong></span>
          <p class="text-gray-500 text-xl opacity-[0.8] inline-block mt-3.5">
            <span class="mr-3">MRP <s>₹ {{ product.data.originalPrice }}</s></span>
            <span class="text-xl font-bold text-success">({{ product.data.discount }}% OFF)</span>
          </p>
          <p class="text-[16px] mb-2.5 text-teal-600 font-bold mt-1">
            <span>inclusive of all taxes</span>
          </p>
        </div>

        <!-- Variants (Size/Color) -->

        <UCarousel v-slot="{ item, index }" :items="product.data.variants" arrows wheel-gestures
          :prev="{ variant: 'solid' }" :next="{ variant: 'solid' }" :ui="{
            item: 'basis-1/4 ps-0',
            prev: 'sm:start-0 ',
            next: 'sm:end-0',
            container: 'ms-0'
          }">
          <NuxtImg :src="item.images[0]" width="100" height="100" class="rounded-xs cursor-pointer" loading="lazy"
            @click="selectedVariantIndex = index" />
        </UCarousel>

        <div class="flex flex-col mt-2.5 mb-6">
          <p class="font-medium mb-2.5">SELECT SIZE</p>
          <div class="flex  flex-row  gap-1">

            <UButton variant="outline" v-for="item in product.data.variants[selectedVariantIndex].sizes"
              :key="item.sizeId" @click="selectedSize = item.sizeId"
              class="rounded-full w-12.5 h-12.5 p-0 flex items-center justify-center text-sm font-bold bg-neutral hover:bg-neutral active:bg-neutral relative"
              :ui="{
                base:
                  selectedSize === item.sizeId
                    ? 'ring-red-500 text-red-500'
                    : 'ring-gray-800 text-gray-800',
              }">
              {{ item.size.name }}

              <UBadge color="success" class="absolute -bottom-1 flex items-center justify-center w-10 py-0 px-0">
                {{ item.stock === 0 ? "(Out of Stock) " :
                  item.stock }}
              </UBadge>
            </UButton>
          </div>
        </div>

        <!-- Add to Cart -->
        <div class="flex items-center gap-4 mb-5.75">
          <UButton class="w-[50%] justify-center py-3.75 font-bold text-[16px] bg-error text-white rounded-sm"
            icon="i-lucide-shopping-bag" size="lg" color="primary" variant="solid" @click="handleAddToCart">Add to Cart</UButton>
          <UButton
            class="w-[40%] justify-center py-3.75 font-bold text-[16px] hover:ring-gray-800 text-gray-800 rounded-sm ring-error"
            icon="i-lucide-heart" variant="outline">
            WISHLIST
          </UButton>
        </div>

        <!-- Description -->
        <USeparator />

        <div class="mt-5">
          <div class="flex items-center gap-2">
            <h4 class="text-[16px] text-gray-800 uppercase font-bold">Product Details
            </h4>
            <UIcon name="boxicons:list-square" class="size-4" />
          </div>
          <p class="text-[16px] text-gray-800 font-normal leading-snug mt-3">
          <ul v-for="highlight in product.data.highlights" :key="highlight">
            <li>{{ highlight }}</li>
          </ul>
          </p>
        </div>

        <div class="mt-5">
          <h4 class="text-[16px] text-gray-800 uppercase font-bold">Specifications
          </h4>
          <UTable :data="specRows" :columns="[
            { accessorKey: 'label', header: 'Property' },
            { accessorKey: 'value', header: 'Details' },
          ]" :ui="{
            td: 'text-sm text-gray-700 py-4 px-0',
            th: 'text-sm font-semibold text-gray-900 py-4 px-0',
          }" />

        </div>


        <div class="mt-5">
          <h4 class="text-[16px] text-gray-800 uppercase font-bold">description</h4>

          <p class="text-gray-700 leading-snug ">
            {{ product.data.description }}
          </p>
        </div>

        <!-- Meta info -->
        <div class="flex flex-col text-sm text-gray-500 leading-snug mt-5">
          <span>SKU: {{ product.data.sku }}</span>
          <span>Category: {{ product.data.category.name }}</span>
        </div>
      </div>
    </UPageGrid>
  </UContainer>
</template>
