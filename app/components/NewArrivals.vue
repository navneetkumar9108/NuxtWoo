<script setup>
const { data: products } = await useFetch("/api/products", {
    query: {
        isNew: true, limit: 8
    },

});
</script>

<template>
    <UContainer>
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-sm sm:text-xl font-bold text-gray-900">
                New Arrivals
            </h2>
            <UButton label="Browse all" to="/products?sort=newest" variant="link" class="text-red-400 text-xs"
                trailing-icon="i-lucide-arrow-right" />
        </div>

        <UScrollArea v-slot="{ item }" :items="products?.data || []" orientation="horizontal" class="w-full"
            :ui="{ root: 'scrollbar-none', viewport: 'gap-4 md:gap-6' }">
            <CardProductCard :key="item.id" :product="item" class="w-40 lg:mx-0" />
        </UScrollArea>

        <div v-if="pending" class="flex gap-4 overflow-x-auto">
            <USkeleton v-for="i in 4" :key="i" class="min-w-55 h-80 rounded-lg" />
        </div>
    </UContainer>
</template>

<style lang="scss" scoped></style>