<script setup lang="ts">

</script>

<template>
    <UContainer class="py-10 ">
        <UPageHero title="Long-term thinking"
            description="We're committed to responsible, sustainable, and ethical manufacturing. Our small-scale approach allows us to focus on quality and reduce our impact. We're doing our best to delay the inevitable heat-death of the universe."
            :links="[{
                label: 'Read our story', to: '#', size: 'xl', class: 'text-gray-900', ui: {
                    base: 'bg-white  hover:bg-white active:bg-white rounded-xs p-4'
                }
            }]" :ui="{
                root: 'rounded-sm overflow-hidden',
                container: 'py-32 sm:py-40 relative isolate ',
                wrapper: 'mx-24',
                title: 'text-white lg:text-4xl ',
                description: 'text-white/80 lg:text-xl '
            }">
            <template #top>
                <NuxtImg
                    src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-feature-section-full-width.jpg"
                    alt="" class="absolute inset-0 -z-10 size-full object-cover" />
                <div class="absolute inset-0 -z-10 bg-black/60" />
            </template>
        </UPageHero>
    </UContainer>
</template>

<style lang="scss" scoped></style>