<script setup>
import { useAuthStore } from '~~/store/auth'
import { useAddressStore } from '~~/store/address';
import { useCartStore } from '~~/store/cart'


const cartStore = useCartStore() // ~~/store/cart
const auth = useAuthStore()
const addressStore = useAddressStore();

const deliveryAddress = addressStore.selectedAddress
console.log('deliveryAddress', deliveryAddress);
// const form = reactive({
//     email: '',
//     firstName: '',
//     lastName: '',
//     company: '',
//     address: '',
//     apartment: '',
//     city: '',
//     country: 'us',
//     state: '',
//     postalCode: '',
//     phone: '',
// })

// const deliveryMethod = ref('standard')
// const paymentMethod = ref('card')

// const card = reactive({
//     number: '',
//     name: '',
//     expiry: '',
//     cvc: '',
// })

const deliveryOptions = [
    { value: 'standard', label: 'Standard', note: '4-10 business days', price: 0 },
    { value: 'express', label: 'Express', note: '2-5 business days', price: 50 },
]

const deliveryMethod = computed({
    get: () => cartStore.deliveryMethod,
    set: (value) => cartStore.setDeliveryMethod(value),
});
const countries = [
    { label: 'United States', value: 'us' },
    { label: 'India', value: 'in' },
]

const subtotal = computed(() =>
    cart.items.reduce((sum, i) => sum + i.price * i.qty, 0)
)
const shipping = computed(() =>
    deliveryOptions.find(d => d.value === deliveryMethod.value)?.price ?? 0
)
const taxes = computed(() => +(subtotal.value * 0.0862).toFixed(2))
const total = computed(() => subtotal.value + shipping.value + taxes.value)




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

const noteOpen = ref(true)
const orderNote = ref('')
const isOpen = defineModel('open', { default: false })

function applyNote() {
    cartStore.setOrderNote(orderNote.value)
    noteOpen.value = false
    console.log('store orderNote:', cartStore.orderNote)

}
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
        userEmail: auth.user?.email,
        // items: cartStore.items,
        items: cartStore.items.map(item => ({
            ...item,
            status: 'placed'   // ← har item ka apna status
        })),
        totalAmount: cartStore.finalPrice,
        address: addressStore.selectedAddress,
        paymentMethod: paymentMethod.value,
        orderNote: cartStore.orderNote,
        // status: 'placed',
        // date: new Date().toLocaleDateString('en-IN')
        date: new Date().toISOString()
    }

    const existing = JSON.parse(localStorage.getItem('orders') || '[]')
    localStorage.setItem('orders', JSON.stringify([order, ...existing]))

    // TODO: yahan actual order-placement API call hoga, jo backend se real orderId return karega
    // const res = await $fetch('/api/order/place', { method: 'POST', body: {...} })
    // const orderId = res.orderId

    router.push({ path: '/confirm', query: { orderid: orderId } })
}

const openItems = reactive({})
</script>

<template>
    <UContainer class="my-10">

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Left: form -->
            <div class="lg:col-span-2 space-y-4">
                <!-- <h2 class="text-sm font-medium mb-4">Order summary</h2> -->
                <!-- <section>
                    <h2 class="text-sm font-medium mb-4">Contact information</h2>
                    <UFormField label="Email address">
                        <UInput v-model="form.email" type="email" class="w-full" />
                    </UFormField>
                </section>-->

                <UCard v-if="deliveryAddress" class="bg-neutral-50 rounded-xs ring-0">
                    <div class="flex justify-between items-center gap-4">
                        <div>
                            <!-- <p class="text-xs text-neutral-500">Delivering to:</p> -->
                            <p class="text-sm font-semibold mt-1">
                                <span class="font-normal">Deliver to: </span>{{ deliveryAddress.fullName }} | {{
                                    deliveryAddress.phone }}
                            </p>
                            <p class="text-sm text-neutral-500 line-clamp-1">
                                {{ deliveryAddress.addressLine1 }}, {{
                                    deliveryAddress.state
                                }}
                            </p>
                        </div>
                        <!-- <UIcon name="i-lucide-bike" class="size-10 text-gray-800 shrink-0" /> -->
                        <UButton variant="outline" class=" ring-red-400 text-red-400 p-4 text-xs" to="/address">
                            Change Address
                        </UButton>
                    </div>
                </UCard>
                <ButtonUButton v-else label="Add New Address" icon="i-lucide-plus" variant="outline" color="neutral"
                    block
                    class="mt-0 bg-white ring-neutral-200 rounded-xs text-gray-800  p-5 hover:bg-neutral-200 active:bg-neutral-200 justify-start"
                    to="/address" />
                <!-- <div class="flex flex-col gap-6"> -->
                <section>
                    <!-- <h2 class="text-sm font-medium mb-4">Delivery method</h2> -->
                    <URadioGroup v-model="deliveryMethod" variant="card" orientation="horizontal"
                        legend="Delivery method" :items="deliveryOptions" value-key="value" label-key="label"
                        description-key="note"
                        class="grid grid-cols-1 gap-4 ring-1 ring-neutral-200 rounded-xs p-4 bg-white" :ui="{
                            item: 'has-data-[state=checked]:border-red-400 border-neutral-200 rounded-xs p-4 bg-white  w-full',
                            label: 'text-sm font-medium text-gray-800',
                            description: 'text-xs text-neutral-500 mt-1',
                            legend: 'text-sm font-medium mb-4 text-gray-800',

                            base: 'bg-white border border-red-400  rounded-sm',
                            indicator: 'bg-white after:bg-red-400 after:rounded-sm  after:size-3'

                        }">
                        <template #description="{ item }">
                            <p class="text-xs text-neutral-500">{{ item.note }}</p>
                            <p class="text-sm font-medium mt-2">₹ {{ item.price.toFixed(2) }}</p>
                        </template>
                    </URadioGroup>
                </section>
                <div class="flex flex-col gap-2">
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

                        <div v-if="paymentMethod === method.value && method.value === 'upi'" class="mt-3" @click.stop>
                            <UInput v-model="upiId" placeholder="yourname@upi" class="w-full" :ui="{
                                base: 'bg-white text-gray-500 focus-visible:ring-1 focus-visible:ring-red-500'
                            }" />
                        </div>

                        <div v-if="paymentMethod === method.value && method.value === 'card'"
                            class="mt-3 flex flex-col gap-3" @click.stop>
                            <UInput v-model="card.number" placeholder="Card Number" maxlength="19" class="w-full" :ui="{
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
                <!-- </div> -->

                <UCard class="bg-white ring-1 ring-neutral-200 rounded-xs w-full">
                    <UCollapsible v-model:open="noteOpen">
                        <button type="button" class="flex items-center justify-between w-full">
                            <span class="flex items-center gap-1 font-medium text-sm">
                                <UIcon name="i-lucide-pencil" class="size-4" />
                                Order note
                            </span>
                            <UIcon name="i-lucide-chevron-up" class="size-4 transition-transform"
                                :class="noteOpen ? '' : 'rotate-180'" />
                        </button>

                        <template #content>
                            <UTextarea v-model="orderNote" placeholder="Order special instructions" :rows="4"
                                class="w-full mt-4"
                                :ui="{ base: 'bg-neutral-100 border-0 text-gray-800 ring-gray-200 focus-visible:ring-gray-200 focus-visible:ring-1' }" />

                            <UButton label="Apply"
                                class="mt-4  px-6 bg-indigo-600 text-white  hover:bg-indigo-600 active:bg-indigo-600"
                                color="primary" @click="applyNote" />
                        </template>
                    </UCollapsible>
                    <p v-if="!noteOpen && cartStore.orderNote" class="text-xs text-neutral-500 mt-2 line-clamp-2">
                        {{ cartStore.orderNote }}
                    </p>
                </UCard>
            </div>

            <!-- Right: order summary -->
            <!-- <div> -->
            <div class="space-y-4">
                <!-- <h2 class="text-sm font-medium mb-4">Order summary</h2> -->
                <!-- <UCard v-for="item in cartStore.items" :key="item.id" class="bg-white ring-0 rounded-xs ">
                    <div class="flex flex-col justify-between items-start ">
                        <div class="flex gap-5 leading-tight">
                            <ImageImg :src="item.image" class="w-20 h-full object-cover rounded-xs " />
                            <div>
                                <ProductInfo :brand="item.name" :title="item.title" />
                                <ProductPrice :price="item.price" :originalPrice="item.originalPrice"
                                    :discount="item.discount" class="text-sm text-gray-800 mt-1.5 sm:mt-0 mb-0" />

                                <p v-if="item.size || item.color"
                                    class=" text-xs text-neutral-500 mt-0.5 mb-0.5 font-bold">
                                    <span v-if="item.size">Size: {{ item.size }}</span>
                                    <span v-if="item.size && item.color"> · </span>
                                    <span v-if="item.color">{{ item.color }}</span>
                                </p>
                                <span class=" text-xs text-neutral-500 mt-0.5 mb-0.5 font-bold"
                                    v-if="item.quantity">Qty: {{
                                        item.quantity }}</span>
                            </div>
                        </div>
                    </div>
                </UCard> -->
                <UCard class="bg-white ring-0 rounded-xs ">
                    <UAccordion :items="cartStore.items.map(item => ({
                        label: item.name,
                        slot: `item-${item.id}`,
                        item
                    }))">
                        <template v-for="item in cartStore.items" :key="item.id" #[`item-${item.id}`]>
                            <div class="flex gap-5 leading-tight">
                                <Img :src="item.image" class="w-20 h-full object-cover rounded-xs" />
                                <div>
                                    <ProductInfo :brand="item.name" :title="item.title" />
                                    <ProductPrice :price="item.price" :originalPrice="item.originalPrice"
                                        :discount="item.discount" />
                                    <p v-if="item.size || item.color" class="text-xs text-neutral-500 font-bold">
                                        <span v-if="item.size">Size: {{ item.size }}</span>
                                        <span v-if="item.size && item.color"> · </span>
                                        <span v-if="item.color">{{ item.color }}</span>
                                    </p>
                                    <span class="text-xs text-neutral-500 font-bold" v-if="item.quantity">Qty: {{
                                        item.quantity }}</span>
                                </div>
                            </div>
                        </template>
                    </UAccordion>
                </UCard>
                <USeparator class="my-4" :ui="{
                    border: 'border-t-neutral-200'
                }" />

                <UCard class="h-fit bg-white ring-0 rounded-xs " v-if="cartStore.totalPrice">
                    <template #header>
                        <!-- <p class="font-semibold" icon="i-lucide-receipt">Price Details ({{ cartStore.items.length
                                        }})</p> -->
                        <span class="flex items-center gap-1 font-medium text-sm">
                            <UIcon name="i-lucide-receipt" class="size-4" />
                            Price Details ({{ cartStore.items?.length }} {{ cartStore.items?.length === 1 ? 'item'
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
            </div>

        </div>
        <!-- </div> -->
    </UContainer>
</template>