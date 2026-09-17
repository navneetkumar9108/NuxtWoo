<script setup>
const { data: products, pending } = await useLazyFetch("/api/products", {
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
            <ButtonUButton label="Browse all" to="/products?sort=newest" variant="link" class="text-red-400 text-xs"
                trailing-icon="i-lucide-arrow-right" />

        </div>
        <UScrollArea v-if="pending" :items="Array(8).fill({})" v-slot="{ }" orientation="horizontal" class="w-full"
            :ui="{ root: 'scrollbar-none', viewport: 'gap-4 md:gap-6' }">
            <CardProductSkeleton />
        </UScrollArea>
        <UScrollArea v-else v-slot="{ item }" :items="products?.data || []" orientation="horizontal" class="w-full"
            :ui="{ root: 'scrollbar-none', viewport: 'gap-4 md:gap-6' }">
            <CardProductCard :key="item.id" :product="item" class="w-40 lg:mx-0" />
        </UScrollArea>
    </UContainer>
</template>

<style lang="scss" scoped></style>