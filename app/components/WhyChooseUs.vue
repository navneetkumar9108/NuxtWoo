<script setup>
const usps = [
  { icon: 'i-lucide-truck', title: 'Free Delivery', desc: 'On orders above ₹999' },
  { icon: 'i-lucide-rotate-ccw', title: 'Easy Returns', desc: '7 day return policy' },
  { icon: 'i-lucide-wallet', title: 'Cash on Delivery', desc: 'Available pan India' },
  { icon: 'i-lucide-badge-check', title: '100% Authentic', desc: 'Verified brands only' }
]
</script>

<template>
  <UContainer class="mt-10">
    <UPageGrid class="grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 max-w-7xl mx-auto my-10 
      gap-4">
      <UPageCard v-for="usp in usps" :key="usp.title" :ui="{
        root: 'bg-white ring-0 ring-transparent transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-105 cursor-pointer',
        container: ' sm:p-0',
      }">
        <div class="flex items-center  gap-4 p-5 rounded-lg bg-white">
          <UIcon :name="usp.icon" class="size-10 shrink-0 text-indigo-300" />

          <div class="leading-tight w-full flex flex-col items-start">
            <h3 class="text-[1rem] sm:text-xl font-semibold ">{{ usp.title }}</h3>
            <p class="text-xs sm:text-sm text-wrap ">{{ usp.desc }}</p>
          </div>
        </div>
      </UPageCard>
    </UPageGrid>
  </UContainer>
</template>

<style scoped></style>
