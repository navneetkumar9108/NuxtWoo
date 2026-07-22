<script setup>
const route = useRoute()

const steps = [
    { title: 'Bag', icon: 'i-lucide-shopping-bag', to: '/checkout/cart' },
    { title: 'Address', icon: 'i-lucide-map-pin', to: '/checkout/address' },
    { title: 'Payment', icon: 'i-lucide-credit-card', to: '/checkout/payment' }
]

const activeIndex = computed(() =>
    steps.findIndex(s => route.path === s.to)
)
</script>

<template>
    <div class="max-w-5xl mx-auto px-4 py-6">
        <UStepper :items="steps" :model-value="activeIndex" disabled class="mb-8" />
        <slot />
    </div>
</template>