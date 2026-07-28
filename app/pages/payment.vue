<script setup>
import { useCartStore } from '~~/store/cart'
import { useAddressStore } from '~~/store/address'
// definePageMeta({ layout: 'checkout' })

const cartStore = useCartStore()
const addressStore = useAddressStore()
const router = useRouter()


const paymentMethod = ref('upi')
const upiId = ref('')
const card = reactive({ number: '', name: '', expiry: '', cvv: '' })

const methods = [
    { value: 'upi', label: 'UPI', icon: 'i-lucide-smartphone', description: 'Google Pay, PhonePe, Paytm & more' },
    { value: 'card', label: 'Credit / Debit Card', icon: 'i-lucide-credit-card', description: 'Visa, Mastercard, RuPay' },
    { value: 'netbanking', label: 'Net Banking', icon: 'i-lucide-landmark', description: 'All major banks supported' },
    { value: 'cod', label: 'Cash on Delivery', icon: 'i-lucide-banknote', description: 'Pay when your order arrives' }
]

// Note: this only validates UI input. Actual payment capture (Razorpay/Stripe
// etc.) needs a real gateway SDK + a server route — wire that into placeOrder()
// in CheckoutStepper.vue.
const isValid = computed(() => {
    if (paymentMethod.value === 'upi') return /^[\w.-]+@[\w.-]+$/.test(upiId.value)
    if (paymentMethod.value === 'card') {
        return card.number.replace(/\s/g, '').length === 16
            && card.name.trim().length > 1
            && /^\d{2}\/\d{2}$/.test(card.expiry)
            && card.cvv.length === 3
    }
    return true // netbanking (redirect-based) and cod need no extra input here
})

defineExpose({ isValid, paymentMethod })


// const paymentMode = ref('cod')

async function placeOrder() {
    if (!isValid.value) return

    // Order ID generate karo (real backend hone tak temporary/local hi rahega)
    const orderId = `${Date.now()}${Math.floor(Math.random() * 1000)}`
    console.log('orderId', orderId);
    const order = {
        orderId,
        items: cartStore.items,
        totalAmount: cartStore.finalPrice,
        address: addressStore.selectedAddress,
        paymentMethod: paymentMethod.value,
        status: 'placed',
        date: new Date().toLocaleDateString('en-IN')
    }

    const existing = JSON.parse(localStorage.getItem('orders') || '[]')
    localStorage.setItem('orders', JSON.stringify([order, ...existing]))

    // TODO: yahan actual order-placement API call hoga, jo backend se real orderId return karega
    // const res = await $fetch('/api/order/place', { method: 'POST', body: {...} })
    // const orderId = res.orderId

    router.push({ path: '/confirm', query: { orderid: orderId } })
}
</script>

<template>
    <UContainer class="mt-10 mb-10">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2">

                <!-- <div class="flex flex-col gap-6">
                    <div class="flex flex-col gap-5">
                        <div v-for="method in methods" :key="method.value"
                            class="border rounded-lg p-4 cursor-pointer transition-colors"
                            :class="paymentMethod === method.value ? 'border-primary ring-1 ring-primary' : 'border-neutral-200'"
                            @click="paymentMethod = method.value">
                            <div class="flex items-center gap-3">
                                <UIcon :name="method.icon" class="size-5 text-neutral-600 shrink-0" />
                                <div class="min-w-0">
                                    <p class="text-sm font-medium">{{ method.label }}</p>
                                    <p class="text-xs text-neutral-500">{{ method.description }}</p>
                                </div>
                            </div>

                            <div v-if="paymentMethod === method.value && method.value === 'upi'" class="mt-3"
                                @click.stop>
                                <UInput v-model="upiId" placeholder="yourname@upi" class="w-full" />
                            </div>

                            <div v-if="paymentMethod === method.value && method.value === 'card'"
                                class="mt-3 flex flex-col gap-3" @click.stop>
                                <UInput v-model="card.number" placeholder="Card Number" maxlength="19" class="w-full" />
                                <UInput v-model="card.name" placeholder="Name on Card" class="w-full" />
                                <div class="grid grid-cols-2 gap-3">
                                    <UInput v-model="card.expiry" placeholder="MM/YY" maxlength="5" />
                                    <UInput v-model="card.cvv" placeholder="CVV" maxlength="3" type="password" />
                                </div>
                            </div>

                            <p v-if="paymentMethod === method.value && method.value === 'netbanking'"
                                class="text-xs text-neutral-500 mt-3">
                                You'll be redirected to your bank's website to complete payment.
                            </p>
                        </div>
                    </div> -->

                <div class="flex flex-col gap-6">
                    <div class="flex flex-col gap-5">
                        <UCard v-for="method in methods" :key="method.value"
                            class="cursor-pointer transition-colors bg-white ring-0" :ui="{
                                root: 'rounded-xs ring-0',
                                body: 'p-4 sm:p-4'
                            }"
                            :class="paymentMethod === method.value ? 'ring-1 ring-neutral-500' : 'ring-1 ring-neutral-200'"
                            @click="paymentMethod = method.value">
                            <div class="flex items-center gap-3">
                                <UIcon :name="method.icon" class="size-5 text-neutral-600 shrink-0" />
                                <div class="min-w-0">
                                    <p class="text-sm font-medium">{{ method.label }}</p>
                                    <p class="text-xs text-neutral-500">{{ method.description }}</p>
                                </div>
                            </div>

                            <div v-if="paymentMethod === method.value && method.value === 'upi'" class="mt-3"
                                @click.stop>
                                <UInput v-model="upiId" placeholder="yourname@upi" class="w-full" :ui="{
                                    base: 'bg-white text-gray-500 focus-visible:ring-1 focus-visible:ring-red-500'
                                }" />
                            </div>

                            <div v-if="paymentMethod === method.value && method.value === 'card'"
                                class="mt-3 flex flex-col gap-3" @click.stop>
                                <UInput v-model="card.number" placeholder="Card Number" maxlength="19" class="w-full"
                                    :ui="{
                                        base: 'bg-white text-gray-500 focus-visible:ring-1 focus-visible:ring-red-500'
                                    }" />
                                <UInput v-model="card.name" placeholder="Name on Card" class="w-full" :ui="{
                                    base: 'bg-white text-gray-500 focus-visible:ring-1 focus-visible:ring-red-500'
                                }" />
                                <div class="grid grid-cols-2 gap-3">
                                    <UInput v-model="card.expiry" placeholder="MM/YY" maxlength="5" :ui="{
                                        base: 'bg-white text-gray-500 focus-visible:ring-1 focus-visible:ring-red-500'
                                    }" />
                                    <UInput v-model="card.cvv" placeholder="CVV" maxlength="3" type="password" :ui="{
                                        base: 'bg-white text-gray-500 focus-visible:ring-1 focus-visible:ring-red-500'
                                    }" />
                                </div>
                            </div>

                            <p v-if="paymentMethod === method.value && method.value === 'netbanking'"
                                class="text-xs text-neutral-500 mt-3">
                                You'll be redirected to your bank's website to complete payment.
                            </p>
                        </UCard>
                    </div>

                    <!-- /<div class="border-t border-neutral-200 pt-4 flex flex-col gap-2 text-sm">
                    <div class="flex justify-between text-neutral-600">
                        <span>Subtotal</span>
                        <span>{{ formatPrice(cartStore.totalPrice) }}</span>
                    </div>
                    <div class="flex justify-between text-neutral-600">
                        <span>Delivery</span>
                        <span class="text-primary font-medium">Free</span>
                    </div>
                    <div class="flex justify-between font-semibold text-base pt-2 border-t border-neutral-200">
                        <span>Total</span>
                        <span>{{ formatPrice(cartStore.totalPrice) }}</span>
                    </div>
                </div> -->
                </div>
            </div>
            <UCard class="h-fit bg-white ring-0 rounded-xs " v-if="cartStore.totalPrice">
                <template #header>
                    <!-- <p class="font-semibold" icon="i-lucide-receipt">Price Details ({{ cartStore.items.length
                                }})</p> -->
                    <span class="flex items-center gap-1 font-medium text-sm">
                        <UIcon name="i-lucide-receipt" class="size-4" />
                        Price Details ({{ cartStore.items.length }} {{ cartStore.items.length === 1 ? 'item'
                            : 'items' }})
                    </span>
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
                        <span>- ₹{{ cartStore.appliedCoupon.discount }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Delivery Charges</span>
                        <span :class="cartStore.deliveryCharge === 0 ? 'text-green-600' : ''">
                            {{ cartStore.deliveryCharge === 0 ? 'FREE' : `₹${cartStore.deliveryCharge}` }}
                        </span>
                    </div>
                    <USeparator />
                    <div class="flex justify-between font-semibold">
                        <span>Total Amount</span>
                        <span>₹{{ cartStore.finalPrice }}</span>
                    </div>
                </div>

                <UButton block class="mt-4 bg-indigo-600 text-white p-3 hover:bg-indigo-600 active:bg-indigo-600"
                    @click="placeOrder">
                    Place Order
                </UButton>
            </UCard>

            <!-- <UCard class="h-fit" v-if="cartStore.totalPrice">
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

                    <USeparator />
                    <div class="flex justify-between font-semibold">
                        <span>Total Amount</span>
                        <span>₹{{ cartStore.finalPrice }}</span>
                    </div>
                </div>

                <UButton block class="mt-4" @click="placeOrder" :disabled="!isValid" to="/checkout/success">
                    Continue
                </UButton>
            </UCard> -->

        </div>
    </UContainer>
</template>