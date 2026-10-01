<script setup>
definePageMeta({ title: 'Dashboard' })

const stats = ref([])
const pending = ref(true)

async function loadStats() {
    try {
        const [ordersRes, productsRes] = await Promise.all([
            $fetch('/api/admin/orders'),
            $fetch('/api/admin/products'),
        ])

        const orders = ordersRes.data || []
        const revenue = orders.reduce((sum, o) => sum + o.totalAmount, 0)

        stats.value = [
            { label: 'Total Orders', value: orders.length, icon: 'i-lucide-package' },
            { label: 'Total Products', value: productsRes.data?.length || 0, icon: 'i-lucide-shirt' },
            { label: 'Revenue', value: `₹${revenue}`, icon: 'i-lucide-indian-rupee' },
            { label: 'Pending Orders', value: orders.filter(o => o.orderStatus === 'placed').length, icon: 'i-lucide-clock' },
        ]
    } finally {
        pending.value = false
    }
}

onMounted(loadStats)
</script>

<template>
    <div class="p-4 sm:p-6">
        <div v-if="pending" class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <USkeleton v-for="i in 4" :key="i" class="h-24 rounded-xs" />
        </div>

        <div v-else class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <UCard v-for="stat in stats" :key="stat.label" class="bg-white ring-1 ring-neutral-200 rounded-xs">
                <div class="flex items-center gap-3">
                    <UIcon :name="stat.icon" class="size-8 text-primary" />
                    <div>
                        <p class="text-xs text-neutral-500">{{ stat.label }}</p>
                        <p class="text-xl font-bold">{{ stat.value }}</p>
                    </div>
                </div>
            </UCard>
        </div>
    </div>
</template>