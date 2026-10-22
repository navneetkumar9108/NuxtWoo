<script setup>
definePageMeta({ title: 'Dashboard' })

const stats = ref([])
const recentOrders = ref([])
const lowStock = ref([])
const pending = ref(true)
const error = ref(null)

const statusColor = {
    placed: 'warning',
    shipped: 'info',
    delivered: 'success',
    cancelled: 'error',
}

async function loadStats() {
    pending.value = true
    error.value = null
    try {
        const [ordersRes, productsRes] = await Promise.all([
            $fetch('/api/admin/orders'),
            $fetch('/api/admin/products'),
        ])

        const orders = ordersRes.data || []
        const products = productsRes.data || []
        const revenue = orders.reduce((sum, o) => sum + o.totalAmount, 0)

        stats.value = [
            { label: 'Total Orders', value: orders.length, icon: 'i-lucide-package' },
            { label: 'Total Products', value: products.length, icon: 'i-lucide-shirt' },
            { label: 'Revenue', value: `₹${revenue.toLocaleString('en-IN')}`, icon: 'i-lucide-indian-rupee' },
            { label: 'Pending Orders', value: orders.filter(o => o.orderStatus === 'placed').length, icon: 'i-lucide-clock' },
        ]

        recentOrders.value = [...orders]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5)

        lowStock.value = products.filter(p => p.stock < 5).slice(0, 5)
    } catch (e) {
        error.value = 'Data load nahi hua'
    } finally {
        pending.value = false
    }
}

onMounted(loadStats)
</script>

<template>
    <div class="p-4 space-y-6">
        <!-- Header + quick actions -->
        <div class="flex items-center justify-between">
            <h1 class="text-lg font-semibold">Dashboard</h1>
            <div class="flex gap-2">
                <UButton size="sm" icon="i-lucide-refresh-cw" variant="outline" :loading="pending" @click="loadStats" />
                <UButton size="sm" icon="i-lucide-plus" to="/admin/products/new">Add Product</UButton>
            </div>
        </div>

        <UAlert v-if="error" color="error" variant="subtle" :title="error" />

        <!-- Stats -->
        <div v-if="pending" class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <USkeleton v-for="i in 4" :key="i" class="h-24 rounded-xs" />
        </div>

        <template v-else>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
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

            <div class="grid lg:grid-cols-3 gap-4">
                <!-- Recent orders -->
                <UCard class="lg:col-span-2 ring-1 ring-neutral-200 rounded-xs">
                    <template #header>
                        <div class="flex items-center justify-between">
                            <h2 class="font-semibold text-sm">Recent Orders</h2>
                            <UButton size="xs" variant="link" to="/admin/orders">View all</UButton>
                        </div>
                    </template>

                    <div v-if="!recentOrders.length" class="text-sm text-neutral-500 py-4 text-center">
                        Abhi koi order nahi
                    </div>
                    <ul v-else class="divide-y divide-neutral-100">
                        <li v-for="o in recentOrders" :key="o._id" class="flex items-center justify-between py-2 text-sm">
                            <div>
                                <p class="font-medium">#{{ o._id.slice(-8).toUpperCase() }}</p>
                                <p class="text-xs text-neutral-500">{{ new Date(o.createdAt).toLocaleDateString('en-IN') }}</p>
                            </div>
                            <div class="flex items-center gap-10">
                                <span>₹{{ o.totalAmount }}</span>
                                <UBadge :color="statusColor[o.orderStatus] || 'neutral'" variant="subtle" size="sm">
                                    {{ o.orderStatus }}
                                </UBadge>
                            </div>
                        </li>
                    </ul>
                </UCard>

                <!-- Low stock -->
                <UCard class="ring-1 ring-neutral-200 rounded-xs">
                    <template #header>
                        <h2 class="font-semibold text-sm">Low Stock</h2>
                    </template>

                    <p v-if="!lowStock.length" class="text-sm text-neutral-500 py-4 text-center">Sab stock theek hai ✅</p>
                    <ul v-else class="divide-y divide-neutral-100">
                        <li v-for="p in lowStock" :key="p._id" class="flex items-center justify-between py-2 text-sm">
                            <span class="truncate pr-2">{{ p.name }}</span>
                            <UBadge color="error" variant="subtle" size="sm">{{ p.stock }} left</UBadge>
                        </li>
                    </ul>
                </UCard>
            </div>
        </template>
    </div>
</template>