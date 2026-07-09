<script setup>
const links = [
  {
    label: "Shop now",
    to: "/docs/getting-started",
    // class: "bg-gray-800 text-white ",
    ui: {
      base: "bg-gray-800 hover:bg-gray-800",
      label: "text-white",
    },
  },
];
</script>

<template>
  <UPageHero headline="Just landed." title="The New Year Collection"
    description="Our latest collection is here. Discover the latest trends and styles for the new year."
    orientation="horizontal" :links="links" :ui="{
      wrapper: 'relative leading-tight',
      header: 'leading-tight',
      container: 'relative z-10',
      headline: 'font-bold text-3xl md:text-4xl lg:text-6xl text-gray-800 mb-2 ',
      title: 'sm:text-3xl text-lg  text-gray-800',
      description: 'text-balance text-gray-800 text-[1rem] sm:text-[1rem] max-w-sm lg:max-w-md font-light mt-2',
      footer: 'mt-4',
    }">
    <template #top>
      <img src="/images/hero_4.jpg" class="absolute inset-0 w-full h-full object-cover -z-10 " alt="" />
    </template>
  </UPageHero>
</template>
