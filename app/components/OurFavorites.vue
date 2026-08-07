<script setup>
const { data: products } = await useFetch("/api/products", {
    query: {
        limit: 5,
    },
});
</script>

<template>
    <UContainer>
        <div class="flex items-center justify-between w-full mb-4 lg:px-3">
            <h2 class="text-sm lg:text-xl font-bold text-gray-900">Our Favorites</h2>
            <UButton to="/favorites" label="Browse all favorites" trailing-icon="i-lucide-arrow-right"
                class="text-red-400 text-xs" variant="link" />
        </div>

        <UPageGrid class="gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 ">
            <CardProductCard v-for="product in products?.data || []" :key="product.id" :product="product" " />
        </UPageGrid>
        <!-- <UScrollArea v-slot=" { item }" :items="products?.data || []" orientation="horizontal" class="w-full"
                :ui="{ root: 'scrollbar-none', viewport: 'gap-4 md:gap-6' }">
                <CardProductCard :key="item.id" :product="item" />
                </UScrollArea> -->
    </UContainer>
</template>

<style lang="scss" scoped></style>