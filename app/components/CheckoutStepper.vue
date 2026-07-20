<script setup>
import { useCartStore } from '~~/store/cart'
import { useAddressStore } from '~~/store/address'

const cartStore = useCartStore()
const addressStore = useAddressStore()

const items = [
    { title: 'Bag', icon: 'i-lucide-shopping-bag' },
    { title: 'Address', icon: 'i-lucide-map-pin' },
    { title: 'Payment', icon: 'i-lucide-credit-card' }
]

// Controlled ourselves (instead of via the stepper's own ref) so we can gate
// "Continue" on each step's validity before allowing it to advance.
const active = ref(0)
const paymentStep = useTemplateRef('paymentStep')
const placingOrder = ref(false)

const isLastStep = computed(() => active.value === items.length - 1)

const canProceed = computed(() => {
    if (active.value === 0) return cartStore.items.length > 0
    if (active.value === 1) return !!addressStore.selectedAddress
    if (active.value === 2) return paymentStep.value?.isValid ?? false
    return true
})

async function handleNext() {
    if (!canProceed.value) return
    if (isLastStep.value) {
        await placeOrder()
        return
    }
    active.value++
}

async function placeOrder() {
    placingOrder.value = true
    try {
        // TODO: call your actual order API route, e.g.
        // await $fetch('/api/orders', {
        //   method: 'POST',
        //   body: {
        //     items: cartStore.items,
        //     address: addressStore.selectedAddress,
        //     paymentMethod: paymentStep.value.paymentMethod
        //   }
        // })
    } finally {
        placingOrder.value = false
    }
}
</script>

<template>
    <div class="max-w-2xl mx-auto w-full mt-10 ">
        <UStepper v-model="active" :items="items" class="mb-2" disabled>
            <template #content="{ item }">
                <div class="py-6">
                    <BagItems v-if="item.title === 'Bag'" />
                    <AddressStep v-else-if="item.title === 'Address'" />
                    <PaymentStep v-else ref="paymentStep" />
                </div>
            </template>
        </UStepper>

        <div class="flex gap-3 justify-between border-t border-neutral-200 pt-4">
            <ButtonUButton label="Back" leading-icon="i-lucide-arrow-left" color="neutral" variant="outline"
                :disabled="active === 0" @click="active--" />

            <ButtonUButton :label="isLastStep ? 'Place Order' : 'Continue'"
                :trailing-icon="isLastStep ? undefined : 'i-lucide-arrow-right'" color="primary" :disabled="!canProceed"
                :loading="placingOrder" @click="handleNext" />

        </div>
    </div>
</template>