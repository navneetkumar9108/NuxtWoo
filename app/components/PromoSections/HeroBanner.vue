<script setup>
const items = [
    {
        title: "New Season Arrivals",
        subtitle: "Up to 50% off on trending styles",
        cta: "Shop Now",
        to: "/collections/new-arrivals",
        image: "https://images.unsplash.com/photo-1721152531882-eb1dd6dd9c1d?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Festive Collection",
        subtitle: "Handpicked ethnic wear for every occasion",
        cta: "Explore",
        to: "/collections/festive",
        image: "https://plus.unsplash.com/premium_photo-1700824490393-c9355c267144?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Footwear Fest",
        subtitle: "Buy 1 Get 1 on select styles",
        cta: "Grab Deal",
        to: "/collections/footwear",
        image: "https://images.unsplash.com/photo-1618659394332-0800e880f478?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];

</script>

<template>
    <UContainer class="mt-1">

        <!-- <UCarousel v-slot="{ item }" loop arrows wheel-gestures dots :autoplay="{ delay: 4000 }" :items="items" :ui="{
            item: 'basis-full',
            prev: 'hidden sm:flex sm:start-5 bg-white text-red-400 rounded-sm ring-0 hover:bg-white active:bg-white z-10',
            next: 'hidden sm:flex sm:end-5 bg-white text-red-400 rounded-sm ring-0 hover:bg-white active:bg-white z-10',
            dots: 'bottom-4 gap-2',
            dot: 'size-1 rounded-full bg-white/50  data-[state=active]:bg-white data-[state=active]:w-6 transition-all'
        }">
            <div class="relative w-full h-[280px] sm:h-[400px] md:h-[512px]">

                <img :src="item.image" class="rounded-lg w-full h-full object-cover " loading="lazy">
                <div
                    class="absolute inset-0 bg-black/30 flex flex-col justify-center px-6 sm:px-16 rounded-lg leading-tight">
                    <h2 class="text-white text-2xl sm:text-4xl font-bold mb-2">
                        {{ item.title }}
                    </h2>
                    <p class="text-white/90 text-sm sm:text-lg mb-4">
                        {{ item.subtitle }}
                    </p>
                    <UButton :to="item.link" size="xl" class="w-fit p-3 bg-gray-200 hover:bg-white active:bg-white">
                        {{ item.cta }}
                    </UButton>
                </div>
            </div>
        </UCarousel> -->
        <UCarousel v-slot="{ item }" loop arrows wheel-gestures dots :autoplay="{ delay: 4000 }" :items="items" :ui="{
            item: 'basis-full',
            prev: 'hidden sm:flex sm:start-5 bg-white text-red-400 rounded-sm ring-0 hover:bg-white active:bg-white z-10',
            next: 'hidden sm:flex sm:end-5 bg-white text-red-400 rounded-sm ring-0 hover:bg-white active:bg-white z-10',
            dots: 'bottom-4 gap-2',
            dot: 'size-1 rounded-full bg-white/50  data-[state=active]:bg-white data-[state=active]:w-6 transition-all'
        }">
            <UPageHero :title="item.title" :description="item.subtitle" orientation="vertical"
                :links="[{ label: item.cta, to: item.to, size: 'lg', class: 'bg-red-400/50 text-white text-sm sm:text-lg rounded-sm', variant: 'solid' }]"
                :ui="{
                    root: 'relative isolate overflow-hidden bg-cover bg-center h-[280px] sm:h-[400px] md:h-[555px] rounded-sm',
                    container: 'py-16 sm:py-24 md:py-32',
                    title: 'text-white text-2xl sm:text-4xl',
                    description: 'text-white/90 text-sm sm:text-lg mt-2',
                    header: 'leading-tight',
                    footer: 'mt-5',
                    links: 'justify-center',
                    base: 'bg-gray-800'

                }" :style="{ backgroundImage: `url(${item.image})` }">
                <template #top>
                    <div class="absolute inset-0 -z-10 bg-black/35 " />
                </template>
            </UPageHero>
        </UCarousel>
    </UContainer>
</template>

<style lang="scss" scoped></style>