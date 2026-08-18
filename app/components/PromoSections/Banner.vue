<script setup>
defineProps({
    src: { type: String, required: true },
    alt: { type: String, default: 'Category Banner' }
})
</script>

<template>
    <!-- <UContainer class="px-0 sm:px-0"> -->
    <NuxtImg :src="src" :alt="alt" class="w-full h-auto object-cover rounded-lg  mb-2 lg:mb-6" loading="eager"
        format="webp" quality="80" />
    <!-- </UContainer> -->
</template>