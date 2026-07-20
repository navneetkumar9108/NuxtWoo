<script setup>
const cartStore = useCartStore()

const code = ref('')
const applying = ref(false)
const error = ref('')

async function applyCoupon() {
    if (!code.value.trim()) return
    applying.value = true
    error.value = ''
    try {
        const res = await $fetch('/api/coupon/apply', {
            method: 'POST',
            body: { code: code.value.trim(), cartTotal: cartStore.totalPrice }
        })
        cartStore.applyCoupon(res)
        code.value = ''
    } catch (e) {
        error.value = e.data?.message || 'Invalid coupon code'
    } finally {
        applying.value = false
    }
}

function removeCoupon() {
    cartStore.removeCoupon()
    error.value = ''
}
</script>

<template>
    <UCard :ui="{ body: 'p-4 sm:p-4' }">
        <template v-if="!cartStore.appliedCoupon">
            <UFormField label="Apply Coupon" :error="error">
                <div class="flex gap-2">
                    <UInput v-model="code" placeholder="Enter coupon code" class="flex-1" @keyup.enter="applyCoupon" />
                    <UButton :loading="applying" color="primary" @click="applyCoupon">
                        Apply
                    </UButton>
                </div>
            </UFormField>
        </template>

        <template v-else>
            <UAlert color="success" variant="soft" icon="i-lucide-badge-check"
                :title="`${cartStore.appliedCoupon.code} applied`"
                :description="`You saved ₹${cartStore.appliedCoupon.discount}`">
                <template #actions>
                    <UButton variant="ghost" color="neutral" size="xs" @click="removeCoupon">
                        Remove
                    </UButton>
                </template>
            </UAlert>
        </template>
    </UCard>
</template>