<script setup>
import { useAuthStore } from '~~/store/auth'
const authStore = useAuthStore()
// apni API se laao
// const { data: orders } = await useFetch('/api/orders/', { query: { limit: 3 } })
const { data: orders, pending } = useLazyFetch('/api/orders',
    {
        query: { limit: 3 },
        transform: (res) => res.success ? res.data : [],
        default: () => [],
    })
console.log("orders", orders.value);
</script>

<template>
    <div class="space-y-6 bg-white p-4 rounded-sm border border-neutral-200">
        <h1 class="text-xl font-bold">Overview</h1>

        <!-- Quick stats -->
        <div class="grid grid-cols-2 gap-4">
            <UCard class="ring-1 ring-neutral-200 rounded-xs">
                <p class="text-xs text-neutral-500">Total Orders</p>
                <p class="text-2xl font-semibold">{{ orders?.length || 0 }}</p>
            </UCard>
            <UCard class="ring-1 ring-neutral-200 rounded-xs">
                <p class="text-xs text-neutral-500">Wishlist</p>
                <NuxtLink to="/wishlist" class="text-sm text-primary">View items</NuxtLink>
            </UCard>
        </div>

        <!-- Recent orders -->
        <div>
            <div class="flex justify-between items-center mb-3">
                <h2 class="text-sm font-semibold">Recent Orders</h2>
                <NuxtLink to="/account/orders" class="text-xs text-primary">View all</NuxtLink>
            </div>
            <UCard v-for="order in orders" :key="order._id" class="mb-2 ring-1 ring-neutral-200 rounded-xs">
                <p class="text-sm font-semibold">Order {{ order._id.slice(-8).toUpperCase() }}</p>
                <p class="text-xs text-neutral-500">{{ order.items.length }} items · ₹{{ order.totalAmount }} · {{
                    order.orderStatus
                }}</p>
            </UCard>
        </div>
    </div>
</template>