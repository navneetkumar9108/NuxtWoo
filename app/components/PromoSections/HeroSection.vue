<script setup>
const images = [
  'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg',
  'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg',
  'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg',
  'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg',
  'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg',
  'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg',
  'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg'
]
</script>

<template>
  <UContainer>
    <UPageHero headline="Just landed." title="The New Year Collection"
      description="Our latest collection is here. Discover the latest trends and styles for the new year."
      orientation="horizontal" :links="[{
        label: 'Shop Collection', to: '/products', size: 'xl', ui: {
          base: 'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-600 rounded-xs'
        }
      }]" :ui="{
        root: 'h-[555px] mt-2',
        wrapper: 'relative leading-tight',
        header: 'leading-tight',
        container: 'relative z-10',
        headline: 'font-bold text-3xl md:text-4xl lg:text-6xl text-gray-800 mb-2 ',
        title: 'sm:text-3xl text-lg  text-gray-800',
        description: 'text-balance text-gray-800 text-[1rem] sm:text-[1rem] max-w-sm lg:max-w-md font-light mt-2',
        footer: 'mt-4',
      }">
      <template #top>
        <img
          src="https://plus.unsplash.com/premium_photo-1700762894937-a394bd088626?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          class="absolute inset-0 w-full h-full object-cover -z-10 rounded-sm" alt="" />
      </template>
    </UPageHero>
  </UContainer>
</template>
