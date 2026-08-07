<!-- <template>
    <UContainer class="py-6 sm:py-8">
        <section class="relative overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-900">
            <div class="grid min-h-[520px] lg:grid-cols-2">

                Content
                <div class="relative z-10 flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-16 xl:px-20">
                    Badge
                    <UBadge color="neutral" variant="soft" size="lg" class="mb-6 w-fit rounded-full px-4 py-2">
                        Final Sale · Limited Time
                    </UBadge>

                    Heading
                    <h1 class="max-w-xl text-5xl font-semibold tracking-tight text-highlighted sm:text-6xl lg:text-7xl">
                        Final Stock.
                        <br />

                        <span class="text-primary">
                            Up to 50% off.
                        </span>
                    </h1>

                    Description
                    <p class="mt-6 max-w-lg text-base leading-7 text-muted sm:text-lg">
                        Last chance to grab your favorite styles before they're gone.
                        Shop final stock at prices you'll love.
                    </p>

                    Actions
                    <div class="mt-8 flex flex-wrap items-center gap-3">
                        <UButton label="Shop the sale" icon="i-lucide-arrow-right" trailing size="xl" color="primary"
                            class="rounded-full px-6" />

                        <UButton label="View all products" size="xl" color="neutral" variant="ghost"
                            class="rounded-full" />
                    </div>

                    Small info
                    <div class="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
                        <div class="flex items-center gap-2">
                            <UIcon name="i-lucide-check-circle" class="size-4 text-primary" />
                            Free shipping
                        </div>

                        <div class="flex items-center gap-2">
                            <UIcon name="i-lucide-shield-check" class="size-4 text-primary" />
                            Secure checkout
                        </div>

                        <div class="flex items-center gap-2">
                            <UIcon name="i-lucide-refresh-cw" class="size-4 text-primary" />
                            Easy returns
                        </div>
                    </div>
                </div>

                Image
                <div class="relative min-h-[400px] lg:min-h-full">
                    <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-favorite-01.jpg"
                        alt="Final stock collection" class="absolute inset-0 h-full w-full object-cover" />

                    Image overlay
                    <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                    Discount floating card
                    <UCard
                        class="absolute bottom-6 right-6 w-44 border-white/20 bg-white/90 shadow-xl backdrop-blur-md dark:bg-neutral-900/90">
                        <div class="flex items-center gap-3">
                            <div class="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                <UIcon name="i-lucide-percent" class="size-5 text-primary" />
                            </div>

                            <div>
                                <p class="text-xs text-muted">
                                    Save up to
                                </p>
                                <p class="text-xl font-bold text-highlighted">
                                    50% OFF
                                </p>
                            </div>
                        </div>
                    </UCard>
                </div>
            </div>
        </section>
    </UContainer>
</template> -->

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