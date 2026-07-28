<script setup>
// definePageMeta({ middleware: 'auth' })

const orders = ref([])

const statusColor = {
    placed: 'info',
    delivered: 'success',
    shipped: 'info',
    processing: 'warning',
    cancelled: 'error',
    return_requested: 'primary',
    exchange_requested: 'primary'
}

function loadOrders() {
    orders.value = JSON.parse(localStorage.getItem('orders') || '[]')
}

onMounted(loadOrders)
</script>

<template>
    <UContainer class="py-8">
        <h1 class="text-xl font-bold mb-6">My Orders</h1>

        <div v-if="!orders.length" class="text-center py-16">
            <UIcon name="i-lucide-package-x" class="size-12 text-neutral-300 mx-auto mb-3" />
            <p class="text-neutral-500">No orders yet</p>
            <UButton to="/products" class="mt-4">Start Shopping</UButton>
        </div>

        <div v-else class="space-y-4">
            <UCard v-for="order in orders" :key="order.orderId"
                class="bg-white rounded-xs ring-0 divide-y divide-neutral-100" :ui="{ body: 'p-0' }">
                <div class="flex items-center gap-3 p-4 bg-neutral-50">
                    <div class="size-9 rounded-full bg-white flex items-center justify-center relative shrink-0">
                        <UIcon name="i-lucide-package" class="size-5 text-neutral-700" />
                        <UIcon v-if="order.status === 'cancelled'" name="i-lucide-x-circle"
                            class="size-4 text-red-500 absolute -bottom-0.5 -right-0.5 bg-white rounded-full" />
                    </div>
                    <div>
                        <p class="text-sm font-semibold capitalize" :class="{
                            'text-red-500': order.status === 'cancelled',
                            'text-green-600': order.status === 'delivered',
                            'text-blue-600': order.status === 'return_requested' || order.status === 'exchange_requested',
                            'text-orange-500': order.status === 'processing',
                            'text-neutral-800': order.status === 'placed' || order.status === 'shipped'
                        }">
                            {{ order.status?.replace('_', ' ') || 'Placed' }}
                        </p>
                        <!-- <UBadge :color="statusColor[order.status] || 'neutral'" variant="subtle">
                            {{ order.status || 'placed' }}
                        </UBadge> -->
                        <p class="text-xs text-neutral-500">
                            on {{ order.date }}
                            <span v-if="order.status === 'cancelled' && order.cancelReason">
                                · {{ order.cancelReason }}
                            </span>
                        </p>
                    </div>
                </div>

                <NuxtLink :to="`/orders/${order.orderId}`"
                    class="flex items-center justify-between gap-4 p-4 hover:bg-neutral-100 ring-1 ring-neutral-200 rounded-4xl">
                    <div class="flex gap-3">
                        <img :src="order.items[0]?.image" class="w-16 h-20 object-cover rounded-2xl" />
                        <div>
                            <p class="text-sm font-semibold">{{ order.items[0]?.name }}</p>
                            <p class="text-xs text-neutral-500 mt-0.5">{{ order.items[0]?.title }}</p>
                            <p class="text-xs text-neutral-500">Size: {{ order.items[0]?.size }}</p>
                        </div>
                    </div>
                    <UIcon name="i-lucide-chevron-right" class="size-5 text-neutral-400 shrink-0" />
                </NuxtLink>
            </UCard>
        </div>
    </UContainer>
</template>