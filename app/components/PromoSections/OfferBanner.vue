<script setup>
const image = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'
</script>

<template>
    <UContainer class="py-10">
        <UPageHero :links="[{
            label: 'Shop the sale',
            to: '/sale',
            variant: 'link',
            color: 'neutral',
            trailingIcon: 'i-lucide-arrow-right',
            class: 'mt-4 w-fit px-0 text-sm font-semibold text-white'
        }]" :ui="{
            root: 'rounded-sm bg-[#0f172a] overflow-hidden',
            container: `relative py-16 sm:py-20 flex items-center
          justify-between gap-8 px-6 sm:px-10 lg:px-16 lg:py-24`,
            title: 'text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl',
            wrapper: 'text-left',
            links: 'justify-start'
        }">
            <template #title>
                Final Stock.<br>Up to 50% off.
            </template>

            <template #top>
                <div class="absolute right-6 sm:right-10 lg:right-16 top-1/2 -translate-y-1/2
             hidden  sm:block h-52 w-52 lg:h-64 lg:w-64 overflow-hidden rounded-xl">
                    <img :src="image" class="h-full w-full object-cover" alt="">
                </div>
            </template>
        </UPageHero>
    </UContainer>
</template>