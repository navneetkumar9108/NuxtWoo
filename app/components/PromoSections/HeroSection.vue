<script setup>
// const links = [
//   {
//     label: "Shop now",
//     to: "/docs/getting-started",
//     // class: "bg-gray-800 text-white ",
//     ui: {
//       base: "bg-gray-800 hover:bg-gray-800",
//       label: "text-white",
//     },
//   },
// ];

// const images = [
//   'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg',
//   'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg',
//   'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg',
//   'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg',
//   'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg',
//   'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg',
//   'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg'
// ]

// const columns = [images.slice(0, 2), images.slice(2, 5), images.slice(5, 7)]

</script>

<template>
  <UPageHero headline="Just landed." title="The New Year Collection"
    description="Our latest collection is here. Discover the latest trends and styles for the new year."
    orientation="horizontal" :links="[{
      label: 'Shop Collection', to: '/products', size: 'xl', ui: {
        base: 'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-600 rounded-xs'
      }
    }]" :ui="{
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

  <!-- <UContainer class="bg-white">

    <UPageHero title="Summer styles are finally here"
      description="This year, our new summer collection will shelter you from the harsh elements of a world that doesn't care if you live or die."
      :links="[{
        label: 'Shop Collection', to: '/products', size: 'xl', ui: {
          base: 'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-600 rounded-xs'
        }
      }]" :ui="{
        root: 'overflow-hidden',
        container: 'pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48 text-left gap-0',
        wrapper: 'text-left',
        title: 'text-4xl sm:text-6xl max-w-lg text-gray-800',
        description: 'text-xl max-w-lg mx-0',
        links: 'justify-start',
        base: 'bg-indigo-600 text-white',
      }">
      Decorative image grid
      <div aria-hidden="true"
        class="pointer-events-none sm:-top-2 lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl lg:right-0 ">
        <div
          class="absolute transform sm:-top-2 sm:left-1/2 sm:translate-x-8 lg:top-1/2 lg:left-1/2 lg:translate-x-8 lg:-translate-y-1/2 overflow-hidden">
          <div class="flex items-center space-x-6 lg:space-x-8">
            <div v-for="(col, colIdx) in columns" :key="colIdx" class="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
              <div v-for="(img, i) in col" :key="img" class="h-64 w-44 overflow-hidden rounded-lg"
                :class="{ 'sm:opacity-0 lg:opacity-100': colIdx === 0 && i === 0 }">
                <NuxtImg :src="img" alt="" class="size-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </UPageHero>
    <div class="relative overflow-hidden bg-white">
      <div class="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div class="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div class="sm:max-w-lg">
            <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Summer styles are finally here
            </h1>
            <p class="mt-4 text-xl text-gray-500">This year, our new summer collection will shelter you from the harsh
              elements of a world that doesn't care if you live or die.</p>
          </div>
          <div>
            <div class="mt-10">
              Decorative image grid
              <div aria-hidden="true"
                class="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl">
                <div
                  class="absolute transform sm:top-0 sm:left-1/2 sm:translate-x-8 lg:top-1/2 lg:left-1/2 lg:translate-x-8 lg:-translate-y-1/2">
                  <div class="flex items-center space-x-6 lg:space-x-8">
                    <div class="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div class="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
                          alt="" class="size-full object-cover" />
                      </div>
                      <div class="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
                          alt="" class="size-full object-cover" />
                      </div>
                    </div>
                    <div class="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div class="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
                          alt="" class="size-full object-cover" />
                      </div>
                      <div class="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
                          alt="" class="size-full object-cover" />
                      </div>
                      <div class="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
                          alt="" class="size-full object-cover" />
                      </div>
                    </div>
                    <div class="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div class="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                          alt="" class="size-full object-cover" />
                      </div>
                      <div class="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
                          alt="" class="size-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <a href="#"
                class="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700">Shop
                Collection</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UContainer> -->
</template>
