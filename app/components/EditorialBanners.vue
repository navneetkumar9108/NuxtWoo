<!-- components/home/EditorialBanners.vue -->
<script setup>
const banners = [
    {
        title: "Streetwear Edit",
        subtitle: "Bold graphics, oversized fits",
        link: "/products/streetwear",
        image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhpbmclMjBiYW5uZXJ8ZW58MHx8MHx8fDA%3D",
    },
    {
        title: "Ethnic Essentials",
        subtitle: "Festive-ready styles",
        link: "/products/ethnic",
        image: "https://images.unsplash.com/photo-1567967020310-9b20e78890e6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];
</script>

<template>
    <UContainer class="py-10">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 ">
            <UPageCard v-for="banner in banners" :key="banner.title" :to="banner.link" :title="banner.title"
                :description="banner.subtitle" class="group" :ui="{
                    root: 'relative overflow-hidden rounded-lg h-64 sm:h-80 ring-0',
                    container: 'relative p-0 gap-0 h-full',
                    wrapper: 'absolute bottom-0 z-10 flex flex-col justify-end p-5',
                    title: 'text-white text-lg sm:text-2xl font-bold',
                    description: 'text-white/90 text-sm mt-1',
                }">
                <NuxtImg :src="banner.image" :alt="banner.title"
                    class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div class="absolute inset-0 bg-black/30" />
            </UPageCard>
        </div>
    </UContainer>
</template>