<script setup>
const brandLogos = [
    { src: "https://images.meesho.com/images/marketing/1744636599446.webp", alt: "Brand 1" },
    { src: "https://images.meesho.com/images/marketing/1743159302944.webp", alt: "Brand 2" },
    { src: "https://images.meesho.com/images/marketing/1743159393231.webp", alt: "Brand 3" },
    { src: "https://images.meesho.com/images/marketing/1743159415385.webp", alt: "Brand 4" },
    { src: "https://images.meesho.com/images/marketing/1743159322237.webp", alt: "Brand 5" },
    { src: "https://images.meesho.com/images/marketing/1743159363205.webp", alt: "Brand 6" },
];
</script>

<template>
    <UMarquee pause-on-hover class="py-10 my-10 bg-white" :overlay="false">
        <UCard v-for="(brand, index) in brandLogos" :key="index"
            class="flex items-center justify-center shrink-0 w-40 h-20 rounded-lg bg-white ring-1 ring-gray-200 ">
            <img :src="brand.src" :alt="brand.alt" class="max-w-full max-h-full object-contain" />

        </UCard>
        <!-- <div v-for="(brand, index) in brandLogos" :key="index"
            class="flex items-center justify-center shrink-0 w-32 h-16 rounded-lg bg-gray-50 ring-1 ring-gray-200 px-4">
            <img :src="brand.src" :alt="brand.alt" class="max-w-full max-h-full object-contain" />
        </div> -->
    </UMarquee>
</template>

<style lang="scss" scoped></style>