<script setup>
const tabs = [
    { label: "Under ₹1499", value: "under-1499" },
    { label: "Under ₹999", value: "under-999" },
    { label: "Under ₹699", value: "under-699" },
];
const activeTab = ref("under-999");

const queryForTab = computed(() => {
    if (activeTab.value === "under-1499") return { maxPrice: "1499" };
    if (activeTab.value === "under-999") return { maxPrice: "999" };
    if (activeTab.value === "under-699") return { maxPrice: "699" };
    return {};
});

const { data: products, pending } = await useLazyFetch("/api/products", {
    query: computed(() => ({ ...queryForTab.value, limit: 8 })),
    watch: [activeTab],
});

const scrollItems = computed(() =>
    (products.value?.data || []).map(p => ({
        ...p,
        id: p.plpId,       // UScrollArea ke internal tracking ke liye unique ban gaya
        productId: p.id    // asli product id, API calls/navigation ke liye
    }))
)

</script>

<template>
    <UContainer>
        <div class="flex items-center justify-between mb-4">
            <h2 class="text-sm sm:text-xl font-bold text-gray-900">Deals For You</h2>
            <ButtonUButton label="Browse all" to="/products" variant="link" class="text-red-400 text-xs"
                trailing-icon="i-lucide-arrow-right" />
        </div>

        <div class="flex gap-2 mb-6">
            <ButtonUButton v-for="tab in tabs" :key="tab.value" :label="tab.label" size="xl"
                :variant="activeTab === tab.value ? 'solid' : 'outline'" :class="activeTab === tab.value
                    ? 'bg-red-400 text-white border-red-400 hover:bg-red-400 active:bg-red-400'
                    : 'bg-white text-gray-700 border-gray-300 '" class="rounded-full font-medium "
                @click="activeTab = tab.value" />
        </div>
        <UScrollArea v-if="pending" :items="Array(8).fill({})" v-slot="{ }" orientation="horizontal" class="w-full"
            :ui="{ root: 'scrollbar-none', viewport: 'gap-4 md:gap-6' }">
            <CardProductSkeleton />
        </UScrollArea>

        <UScrollArea v-else v-slot="{ item }" :items="scrollItems" orientation="horizontal" class="w-full"
            :ui="{ root: 'scrollbar-none', viewport: 'gap-4 md:gap-6' }">

            <CardProductCard :product="item" class="w-40 lg:mx-0" />
        </UScrollArea>
    </UContainer>
</template>