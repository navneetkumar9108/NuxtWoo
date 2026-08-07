<script setup>
// const categories = [
//   { src: "/images/Clothing.jpg", alt: "Clothing" },
//   { src: "/images/Tshirt.jpg", alt: "Tshirt" },
//   { src: "/images/Hoodies.jpg", alt: "Hoodies" },
//   { src: "/images/Music.jpg", alt: "Music" },
//   { src: "/images/Albums.jpg", alt: "Albums" },
//   { src: "/images/Posters.jpg", alt: "Posters" },
//   { src: "/images/Accessories.jpg", alt: "Accessories" },
//   { src: "/images/Decor.jpg", alt: "Decor" },
// ];


const { data: categories } = await useFetch("/api/categories");

const categoryImages = {
  "men-t-shirts": "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/OCTOBER/22/d5iooF1V_ca6b33d03c764ad7be28e767777eb528.jpg",
  "women-t-shirts": "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/FEBRUARY/28/c7VJsmwL_a7e4277a0e354a2886c966fa60193123.jpg",
  "joggers": "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2026/JANUARY/20/2OlsqHGB_3c14b18e166e462693e7998497108637.jpg",
  "jeans": "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/35411364/2025/8/1/ec7a9e5e-8049-4576-a77a-fdd4dbde9c1c1754041658636-MANGO-Women-Flared-Pure-Cotton-Mid-Rise-Light-Fade-Jeans-982-1.jpg",
  "dresses": "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/JULY/28/IuLqBY1K_022901b64fd54e01abb8cd2df5b33753.jpg",
}
</script>

<template>
  <UContainer>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-sm lg:text-xl font-bold text-gray-900">Shop by Category</h2>
      <UButton label="Browse all Categories" variant="link" class="text-red-400 text-xs"
        trailing-icon="i-lucide-arrow-right" to="/products" />
    </div>

    <UScrollArea v-slot="{ item }" :items="categories?.data || []" orientation="horizontal" class="w-full"
      :ui="{ root: 'scrollbar-none', viewport: 'gap-4 md:gap-6' }">
      <UPageCard :key="item.id" :to="`/products?category=${item.slug}`" class="shrink-0 w-28 sm:w-40 lg:w-56" :ui="{
        root: 'group ring-0 w-full h-full bg-transparent hover:bg-transparent',
        container: 'p-0 sm:p-0 rounded-full',
        wrapper: 'w-full h-full',
        header: 'w-full h-full mb-0 rounded-full bg-pink-300 overflow-hidden',
        body: 'w-full text-center mt-2.5'
      }">
        <template #header>
          <img :src="categoryImages[item.slug]" :alt="item.name"
            class="object-cover w-full h-28 sm:h-40 lg:h-56  rounded-full p-1 sm:p-2 transition-transform duration-500 group-hover:scale-110" />
        </template>
        <template #body>
          <span class="text-sm font-medium text-gray-800">{{ item.name }}</span>
        </template>
      </UPageCard>
    </UScrollArea>
  </UContainer>
</template>
