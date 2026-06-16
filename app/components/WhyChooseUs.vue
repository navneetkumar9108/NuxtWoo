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
  <UPageGrid class="lg:grid-cols-4 mx-60 my-24 px-12 gap-4">
    <UPageCard
      v-for="service in servicesData"
      :key="service.title"
      :ui="{
        root: 'bg-white ring-0 ring-transparent',
        container: ' sm:p-0',
      }"
    >
      <div class="flex items-center gap-8 p-8 rounded-lg bg-white">
        <img :src="service.src" class="w-[60px] h-[60px]" />

        <div class="">
          <h3 class="text-xl font-semibold">{{ service.title }}</h3>
          <p class="text-sm">{{ service.description }}</p>
        </div>
      </div>
    </UPageCard>
  </UPageGrid>
</template>

<style scoped></style>
