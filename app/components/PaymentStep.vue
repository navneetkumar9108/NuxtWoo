<script setup>
import { useCartStore } from '~~/store/cart'
const cartStore = useCartStore()

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
</script>

<template>
    <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-3">
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

                <div v-if="paymentMethod === method.value && method.value === 'upi'" class="mt-3" @click.stop>
                    <UInput v-model="upiId" placeholder="yourname@upi" class="w-full" />
                </div>

                <div v-if="paymentMethod === method.value && method.value === 'card'" class="mt-3 flex flex-col gap-3"
                    @click.stop>
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
        </div>

        <div class="border-t border-neutral-200 pt-4 flex flex-col gap-2 text-sm">
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
        </div>
    </div>
</template>