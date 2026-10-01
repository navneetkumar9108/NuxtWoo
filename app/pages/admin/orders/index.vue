<script setup>
const orders = ref([])
const pending = ref(true)
const updatingId = ref(null)
definePageMeta({ middleware: 'admin' })
const statusOptions = ['placed', 'confirmed', 'shipped', 'delivered', 'cancelled']

const statusConfig = {
    placed: { color: 'text-blue-600', bg: 'bg-blue-50' },
    confirmed: { color: 'text-indigo-600', bg: 'bg-indigo-50' },
    shipped: { color: 'text-orange-600', bg: 'bg-orange-50' },
    delivered: { color: 'text-green-600', bg: 'bg-green-50' },
    cancelled: { color: 'text-red-600', bg: 'bg-red-50' },
}

async function loadOrders() {
    pending.value = true
    try {
        const res = await $fetch('/api/admin/orders')
        if (res.success) {
            orders.value = res.data
        } else {
            alert(res.message || 'Access denied')
        }
    } catch (err) {
        console.error('Failed to load orders', err)
    } finally {
        pending.value = false
    }
}

async function updateStatus(orderId, newStatus) {
    updatingId.value = orderId
    try {
        const res = await $fetch(`/api/admin/orders/${orderId}/update-status`, {
            method: 'PATCH',
            body: { orderStatus: newStatus },
        })
        if (res.success) {
            const order = orders.value.find((o) => o._id === orderId)
            if (order) order.orderStatus = newStatus
        }
    } catch (err) {
        console.error('Failed to update status', err)
    } finally {
        updatingId.value = null
    }
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    })
}

onMounted(() => {
    loadOrders()
})
</script>

<template>
    <UContainer class="py-8">
        <h1 class="text-2xl font-bold mb-6">All Orders (Admin)</h1>

        <div v-if="pending" class="space-y-3">
            <USkeleton v-for="i in 5" :key="i" class="h-20 w-full rounded-xs" />
        </div>

        <div v-else-if="!orders.length" class="text-center py-16 text-neutral-500">
            No orders found
        </div>

        <div v-else class="space-y-3">
            <UCard v-for="order in orders" :key="order._id" class="bg-white ring-1 ring-neutral-200 rounded-xs">
                <div class="flex items-center justify-between flex-wrap gap-3">
                    <div>
                        <p class="text-sm font-semibold">
                            Order #{{ order._id.slice(-8).toUpperCase() }}
                        </p>
                        <p class="text-xs text-neutral-500">
                            {{ order.userId?.name }} ({{ order.userId?.email }}) · {{ formatDate(order.createdAt) }}
                        </p>
                        <p class="text-xs text-neutral-500 mt-1">
                            {{ order.items.length }} items · ₹{{ order.totalAmount }}
                        </p>
                    </div>

                    <div class="flex items-center gap-2">
                        <span class="px-2.5 py-1 rounded-full text-xs font-medium"
                            :class="[statusConfig[order.orderStatus]?.bg, statusConfig[order.orderStatus]?.color]">
                            {{ order.orderStatus }}
                        </span>

                        <USelect :model-value="order.orderStatus" :items="statusOptions"
                            :disabled="updatingId === order._id"
                            @update:model-value="(val) => updateStatus(order._id, val)" class="w-40" />
                    </div>
                </div>
            </UCard>
        </div>
    </UContainer>
</template>