<script setup>
const servicesData = [
  {
    title: "Free Shipping",
    description: "Free shipping on order over €50",
    src: "/icons/box.svg",
  },
  {
    title: "Peace of Mind",
    description: "30 days money back guarantee",
    src: "/icons/moneyback.svg",
  },
  {
    title: "100% Payment Secure",
    description: "Your payment are safe with us.",
    src: "/icons/secure.svg",
  },
  {
    title: "Support 24/7",
    description: "24/7 Online support",
    src: "/icons/support.svg",
  },
];
</script>

<template>
  <UPageGrid
    class=" grid-cols-1 sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-2 xl:grid-cols-4  2xl:mx-74 my-24 px-4 md:px-5 2xl:px-12 gap-4">
    <UPageCard v-for="service in servicesData" :key="service.title" :ui="{
      root: 'bg-white ring-0 ring-transparent',
      container: ' sm:p-0',
    }">
      <div class="flex items-center  gap-4 p-5 rounded-lg bg-white">
        <img :src="service.src" class="w-12 h-12" />

        <div class="leading-tight w-full flex flex-col items-start">
          <h3 class="text-[1rem] sm:text-xl font-semibold ">{{ service.title }}</h3>
          <p class="text-xs sm:text-sm text-wrap ">{{ service.description }}</p>
        </div>
      </div>
    </UPageCard>
  </UPageGrid>
</template>

<style scoped></style>
