<script setup>
import { useCartStore } from '~~/store/cart';
definePageMeta({ layout: 'checkout' })

const cartStore = useCartStore()
const router = useRouter()
console.log('cart', cartStore);
function goToAddress() {
    router.push('/checkout/address')
}
</script>

<template>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-4">
            <UCard v-for="item in cartStore.items" :key="item.id">
                <div class="flex flex-row justify-between items-start gap-4">
                    <div class="flex gap-5">
                        <ImageImg :src="item.image" class="w-30 h-full object-cover rounded" />
                        <div>
                            <ProductInfo :brand="item.name" :title="item.title" />
                            <ProductPrice :price="item.price" :originalPrice="item.originalPrice"
                                :discount="item.discount" />
                            <div class="flex items-center gap-2 mt-2">
                                <UButton size="xs" variant="outline" icon="i-lucide-minus"
                                    @click="cartStore.decreaseQuantity(item.id)" />
                                <span>{{ item.quantity }}</span>
                                <UButton size="xs" variant="outline" icon="i-lucide-plus"
                                    @click="cartStore.increaseQuantity(item.id)" />
                            </div>
                        </div>
                    </div>
                    <UButton variant="ghost" color="error" icon="i-lucide-trash-2"
                        @click="cartStore.removeFromCart(item.id)" />
                </div>
            </UCard>
            <CouponApply v-if="cartStore.items.length !== 0" />

        </div>

        <UCard class="h-fit" v-if="cartStore.totalPrice">
            <template #header>
                <p class="font-semibold">Price Details ({{ cartStore.items.length }})</p>
            </template>

            <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                    <span>Total MRP</span>
                    <span>₹ {{ cartStore.totalOriginalPrice }}</span>
                </div>
                <div class="flex justify-between">
                    <span>Discount On MRP</span>
                    <span>- ₹ {{ cartStore.discountAmount }}</span>
                </div>
                <div v-if="cartStore.appliedCoupon" class="flex justify-between text-green-600">
                    <span>Coupon Discount</span>
                    <span>- ₹{{ cartStore.appliedCoupon }}</span>
                </div>
                <USeparator />
                <div class="flex justify-between font-semibold">
                    <span>Total Amount</span>
                    <span>₹{{ cartStore.finalPrice }}</span>
                </div>
            </div>

            <UButton block class="mt-4" to="/checkout/address">
                Continue
            </UButton>
        </UCard>
    </div>
</template>