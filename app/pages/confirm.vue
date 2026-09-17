<script setup>
import { useCartStore } from '~~/store/cart'

const cartStore = useCartStore()
const router = useRouter()
const route = useRoute()

const orderId = route.query.orderid

const order = ref(null)
const pending = ref(true)

async function fetchOrder() {
    try {
        const res = await $fetch(`/api/orders/${orderId}`)
        if (res.success) {
            order.value = res.data
        }
    } catch (err) {
        console.error('Failed to fetch order', err)
    } finally {
        pending.value = false
    }
}

onMounted(async () => {
    if (orderId) {
        await fetchOrder()
    }
    // Backend ne already cart clear kar diya hai order create hote waqt
    // Yahan sirf local state ko sync karo
    await cartStore.fetchCart()
})
</script>

<template>
    <UContainer class="mb-10 mt-10">
        <UCard class="bg-white ring-0 rounded-xs">
            <div class="max-w-lg mx-auto flex flex-col gap-4">
                <UCard class="bg-white ring-neutral-200 rounded-xs ">
                    <div class="flex flex-col items-center text-center gap-3 py-4">
                        <UIcon name="i-heroicons-check-badge-20-solid" class="size-14 text-red-400" />
                        <h2 class="text-xl font-bold text-red-400">Order confirmed</h2>
                        <p class="text-sm text-balance text-neutral-500">
                            Your order is confirmed. You will receive an order confirmation
                            email/SMS shortly with the expected delivery date for your items.
                        </p>
                        <p class="text-xs text-neutral-400">Order ID: {{ orderId }}</p>
                    </div>
                </UCard>

                <USkeleton v-if="pending" class="h-32 w-full rounded-xs" />

                <UCard v-else-if="order?.shippingAddress" class="bg-white ring-neutral-200 rounded-xs ">
                    <div class="flex justify-between items-start gap-4">
                        <div>
                            <p class="text-xs text-neutral-500">Delivering to:</p>
                            <p class="text-sm font-semibold mt-1">
                                {{ order.shippingAddress.fullName }} | {{ order.shippingAddress.phone }}
                            </p>
                            <p class="text-sm text-neutral-500 line-clamp-1">
                                {{ order.shippingAddress.addressLine1 }}, {{ order.shippingAddress.city }}, {{
                                    order.shippingAddress.state }}
                            </p>
                        </div>
                        <UIcon name="i-lucide-bike" class="size-10 text-red-400 shrink-0" />
                    </div>

                    <ButtonUButton label="Order Details" variant="outline" color="primary" size="sm"
                        class="mt-3 ring-red-400 rounded-xs text-red-400" trailing-icon="i-lucide-chevron-right"
                        to="/account/orders" />

                    <USeparator class="mt-2 mb-2" :ui="{ border: 'border-t-neutral-200' }" />

                    <p class="text-xs text-neutral-500 flex items-center gap-1 ">
                        <UIcon name="i-lucide-sparkles" class="size-3.5" />
                        You can Track/View/Modify order from orders page.
                    </p>
                </UCard>

                <UCard v-if="order" class="bg-white ring-neutral-200 rounded-xs">
                    <template #header>
                        <span class="text-sm font-medium">Order Summary</span>
                    </template>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span>Items Total</span>
                            <span>₹ {{ order.itemsTotal }}</span>
                        </div>

                        <div v-if="order.discount" class="flex justify-between text-green-600">
                            <span>Coupon Discount</span>
                            <span>- ₹{{ order.discount }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Delivery Charges</span>
                            <span :class="order.deliveryCharge === 0 ? 'text-green-600' : ''">
                                {{ order.deliveryCharge === 0 ? 'FREE' : `₹${order.deliveryCharge}` }}
                            </span>
                        </div>
                        <USeparator />
                        <div class="flex justify-between font-semibold">
                            <span>Total Amount</span>
                            <span>₹{{ order.totalAmount }}</span>
                        </div>
                    </div>
                </UCard>

                <div class="grid grid-cols-2 gap-3">
                    <ButtonUButton label="Continue Shopping" variant="outline" color="neutral" block
                        @click="router.push('/')"
                        class="p-3 rounded-xs bg-white ring-red-400 text-red-400 hover:bg-white active:bg-white cursor-pointer" />

                    <ButtonUButton label="View Order" color="primary" block to="/account/orders"
                        class="p-3 rounded-xs bg-red-400 text-white hover:bg-red-400 active:bg-red-400" />
                </div>
            </div>
        </UCard>
    </UContainer>
</template>