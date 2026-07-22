<script setup>
import { useAddressStore } from '~~/store/address'
import { useCartStore } from '~~/store/cart'
definePageMeta({ layout: 'checkout' })

const addressStore = useAddressStore()
const cartStore = useCartStore()
const router = useRouter()

// Snapshot address before cart/address gets cleared, so this page still
// shows correct info even after reset.
const deliveryAddress = addressStore.selectedAddress

onMounted(() => {
    cartStore.items = []
    cartStore.appliedCoupon = null
})
</script>

<template>
    <div class="max-w-lg mx-auto flex flex-col gap-4">
        <UCard>
            <div class="flex flex-col items-center text-center gap-3 py-4">
                <UIcon name="i-lucide-badge-check" class="size-14 text-green-500" />
                <h2 class="text-xl font-bold text-green-600">Order confirmed</h2>
                <p class="text-sm text-neutral-500">
                    Your order is confirmed. You will receive an order confirmation
                    email/SMS shortly with the expected delivery date for your items.
                </p>
            </div>
        </UCard>

        <UCard v-if="deliveryAddress">
            <div class="flex justify-between items-start gap-4">
                <div>
                    <p class="text-xs text-neutral-500">Delivering to:</p>
                    <p class="text-sm font-semibold mt-1">
                        {{ deliveryAddress.fullName }} | {{ deliveryAddress.phone }}
                    </p>
                    <p class="text-sm text-neutral-500 line-clamp-1">
                        {{ deliveryAddress.addressLine1 }}, {{ deliveryAddress.city }}, {{ deliveryAddress.state }}
                    </p>
                </div>
                <UIcon name="i-lucide-bike" class="size-10 text-primary shrink-0" />
            </div>

            <UButton variant="outline" color="primary" size="sm" class="mt-3" trailing-icon="i-lucide-chevron-right"
                to="/orders">
                Order Details
            </UButton>

            <USeparator class="mt-2 mb-2" />

            <p class="text-xs text-neutral-500 flex items-center gap-1 ">
                <UIcon name="i-lucide-sparkles" class="size-3.5" />
                You can Track/View/Modify order from orders page.
            </p>
        </UCard>

        <!-- <UCard>
            <div class="flex justify-between items-start gap-4">
                <div>
                    <div class="flex items-center gap-2">
                        <p class="text-sm font-semibold">Now pay at your convenience</p>
                        <UBadge color="success" variant="soft" size="xs">New</UBadge>
                    </div>
                    <p class="text-xs text-neutral-500 mt-2">
                        Now you can pay online using Pay Now option from orders or you
                        can Pay on Delivery (Cash/UPI).
                    </p>
                    <UButton variant="link" color="primary" size="xs" class="p-0 mt-1">
                        See How
                    </UButton>
                </div>
                <UIcon name="i-lucide-user-round" class="size-12 text-primary shrink-0" />
            </div>
        </UCard> -->

        <div class="grid grid-cols-2 gap-3">
            <UButton variant="outline" color="neutral" block @click="router.push('/')">
                Continue Shopping
            </UButton>
            <UButton color="primary" block to="/orders">
                View Order
            </UButton>
        </div>
    </div>
</template>