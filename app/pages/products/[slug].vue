<script setup>
import { useWishlistStore } from '~~/store/wishlist';
import { useCartStore } from '~~/store/cart';
const route = useRoute();
const selectedSize = ref("");
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()



const { data: product, pending, } = await useLazyFetch(`/api/products/${route.params.slug}`);


const selectedColor = ref(route.query.color || "");

const selectedColorData = computed(() =>
  product.value?.data?.colors?.find(
    (color) => color.slug === selectedColor.value
  )
);

watch(
  () => product.value?.data,
  (newProduct) => {
    if (!newProduct) return;
    selectedColor.value = route.query.color || newProduct.colors?.[0]?.slug || "";
  },
  { immediate: true }
);

async function changeColor(colorSlug) {
  selectedColor.value = colorSlug;

  await navigateTo({
    path: route.path,
    query: {
      ...route.query,
      color: colorSlug,
    },
    replace: true,
  });
}


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


const toast = useToast() // Nuxt UI v3 ka built-in toast composable

async function handleAddToCart() {
  if (!selectedColorData.value) {
    toast.add({
      title: "Please select a color",
      icon: "i-lucide-alert-circle",
      class: "bg-red-100 text-red-800 rounded-xs",
    });
    return;
  }

  if (!selectedSize.value) {
    toast.add({
      title: "Please select a size",
      icon: "i-lucide-alert-circle",
      class: "bg-red-100 text-red-800 rounded-xs",
    });
    return;
  }

  // selectedSize sirf naam (string) hai, poora size object dhoondo
  const sizeObj = selectedColorData.value.sizes.find(
    (s) => s.name === selectedSize.value
  );

  if (!sizeObj) {
    toast.add({
      title: "Invalid size selected",
      icon: "i-lucide-alert-circle",
      class: "bg-red-100 text-red-800 rounded-xs",
    });
    return;
  }

  const result = await cartStore.addToCart({
    productId: product.value.data._id,
    colorId: selectedColorData.value._id,
    sizeId: sizeObj._id,
    quantity: 1,
  });

  if (result?.success) {
    toast.add({
      title: "Item added to cart",
      color: "success",
      icon: "i-lucide-check-circle",
    });
  } else {
    toast.add({
      title: result?.message || "Failed to add item",
      icon: "i-lucide-alert-circle",
      class: "bg-red-100 text-red-800 rounded-xs",
    });
  }
}



async function handleAddToWishlist() {
  if (!selectedColorData.value) {
    toast.add({
      title: "Please select a color",
      icon: "i-lucide-alert-circle",
      class: "bg-red-100 text-red-800 rounded-xs",
    });
    return;
  }

  const result = await wishlistStore.addToWishlist({
    productId: product.value.data._id,
    colorId: selectedColorData.value._id,
  });

  if (result?.success) {
    toast.add({
      title: "Item added to wishlist",
      color: "success",
      icon: "i-lucide-check-circle",
    });
  } else {
    toast.add({
      title: result?.message || "Failed to add to wishlist",
      icon: "i-lucide-alert-circle",
      class: "bg-red-100 text-red-800 rounded-xs",
    });
  }
}



</script>

<template>
  <UContainer class="py-10">
    <UPageGrid class="lg:grid-cols-[60%_auto] gap-2 sm:gap-10 items-start">
      <!-- Left: Images -->

      <UPageGrid v-if="pending" class="hidden sm:grid sm:grid-cols-2 lg:grid-cols-2 gap-2">
        <CardProductSkeleton v-for="(image, index) in selectedColorData?.images || []" :key="index"
          class="w-full aspect-square rounded-xs" />
      </UPageGrid>
      <UPageGrid v-else class="hidden sm:grid sm:grid-cols-2 lg:grid-cols-2 gap-2">
        <div class="overflow-hidden " v-for="(image, index) in selectedColorData?.images || []" :key="index">
          <NuxtImg :src="image"
            class="w-full rounded-xs object-cover transition-transform duration-500 hover:scale-110 cursor-zoom-in " />
        </div>
      </UPageGrid>
      <UCarousel v-slot="{ item }" wheel-gestures dots :items="selectedColorData?.images || []"
        class="w-full   mx-auto sm:hidden" :ui="{
          dot: 'size-1',
          dots: '-bottom-2'
        }">
        <NuxtImg :src="item" height="320" class="w-full rounded-lg" loading="lazy" playsinline />

      </UCarousel>
      <!-- Right: Details -->
      <div class="flex flex-col">


        <!--brand Title  Badge price -->
        <div>
          <h1 class="text-2xl font-bold text-gray-800">{{ product.data?.brand.name }}</h1>
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
          <span class="text-2xl text-gray-800 mr-3">
            <strong>₹{{ selectedColorData?.pricing?.price }}</strong>
          </span>

          <p class="text-gray-500 text-xl opacity-[0.8] inline-block mt-3.5">
            <span class="mr-3">
              MRP
              <s>₹ {{ selectedColorData?.pricing?.originalPrice }}</s>
            </span>

            <span class="text-xl font-bold text-success">
              ({{ selectedColorData?.pricing?.discount }}% OFF)
            </span>

          </p>
          <p class="text-[16px] mb-2.5 text-teal-600 font-bold mt-1">
            <span>inclusive of all taxes</span>
          </p>
        </div>

        <div v-if="product.data?.colors?.length" class="space-y-2">
          <p class="font-medium mb-1">MORE COLORS</p>
          <p class="text-sm font-medium text-gray-800">
            Color: <span class="font-normal text-gray-600">{{ selectedColorData?.name }}</span>
          </p>

          <div class="flex items-center gap-3">
            <button v-for="color in product.data.colors" :key="color.id" type="button"
              class="size-8 rounded-full ring-2 ring-offset-2 transition-all"
              :class="selectedColor === color.slug ? 'ring-gray-900' : 'ring-gray-300'"
              :style="{ backgroundColor: color.hex }" :title="color.name" @click="changeColor(color.slug)" />
          </div>
        </div>
        <div class="flex flex-col mt-2.5 mb-6">
          <p class="font-medium mb-2.5">SELECT SIZE</p>
          <div class="flex  flex-row  gap-1">

            <ButtonUButton variant="outline" v-for="item in selectedColorData?.sizes || []" :key="item.id"
              @click="selectedSize = item.name"
              class="rounded-full w-12.5 h-12.5 p-0 flex items-center justify-center text-sm font-bold bg-neutral hover:bg-neutral active:bg-neutral relative"
              :ui="{
                base:
                  selectedSize === item.name
                    ? 'ring-red-500 text-red-500'
                    : 'ring-gray-800 text-gray-800',
              }">
              {{ item.name }}

              <UBadge color="success" class="absolute -bottom-1 flex items-center justify-center w-10 py-0 px-0">
                {{ item.stock === 0 ? "(Out of Stock)" : item.stock }}
              </UBadge>
            </ButtonUButton>
          </div>
        </div>

        <!-- Add to Cart -->
        <div class="flex items-center gap-4 mb-5.75">
          <ButtonUButton label="Add to Cart"
            class="w-[50%] justify-center py-3.75 font-bold text-[16px] bg-red-400 hover:bg-red-400 active:bg-red-400 text-white rounded-sm"
            icon="i-lucide-shopping-bag" size="lg" color="primary" variant="solid" @click="handleAddToCart" />


          <ButtonUButton label="WISHLIST"
            class="w-[40%] justify-center py-3.75 font-bold text-[16px] hover:ring-gray-800 text-gray-800 rounded-sm ring-error"
            icon="i-lucide-heart" variant="outline" @click="handleAddToWishlist" />
        </div>

        <!-- Description -->
        <USeparator />

        <div class="mt-5">
          <div class="flex items-center gap-2">
            <h4 class="text-[16px] text-gray-800 uppercase font-bold">Product Details
            </h4>
            <!-- <UIcon name="boxicons:list-square" class="size-4" /> -->
          </div>

          <ul class="text-[16px] text-gray-800 font-normal leading-snug mt-3 list-disc pl-5">
            <li v-for="highlight in product.data.highlights" :key="highlight">
              {{ highlight }}
            </li>
          </ul>
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
