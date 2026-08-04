<script setup>
import { useCartStore } from '~~/store/cart'
const cartStore = useCartStore()

const code = ref('')
// const applying = ref(false)
const error = ref('')

// async function applyCoupon() {
// cartStore.applyCoupon(code.value)
// if (!code.value.trim()) return
// applying.value = true
// error.value = ''
// try {
//     const res = await $fetch('/api/coupon/apply', {
//         method: 'POST',
//         body: { code: code.value.trim(), cartTotal: cartStore.totalPrice }
//     })
//     cartStore.applyCoupon(res)
//     code.value = ''
// } catch (e) {
//     error.value = e.data?.message || 'Invalid coupon code'
// } finally {
//     applying.value = false
// }
// }


function handleApplyCoupon() {
    if (!code.value.trim()) return
    const result = cartStore.applyCoupon(code.value.trim())
    if (!result.success) {
        error.value = result.message
        return
    }
    error.value = ''
    code.value = ''
}


function removeCoupon() {
    cartStore.removeCoupon()
    error.value = ''
}
</script>

<template>
    <UCard :ui="{
        root: 'ring-0 rounded-xs',
        body: 'p-4 sm:p-6 bg-white'
    }">
        <template v-if="!cartStore.appliedCoupon">
            <UFormField :error="error" :ui="{
                label: 'text-gray-800 mb-2 '
            }">
                <template #label>
                    <span class="flex items-center gap-1 font-medium text-sm">
                        <UIcon name="i-lucide-ticket-percent" class="size-4" />
                        Apply Coupon
                    </span>
                </template>
                <div class="flex gap-2">
                    <UInput v-model="code" placeholder="Enter coupon code" class="flex-1"
                        :ui="{ base: 'bg-neutral-100 text-gray-800 py-2 ring-gray-200 focus-visible:ring-gray-200 focus-visible:ring-1' }"
                        @keyup.enter="handleApplyCoupon" />
                    <UButton :loading="applying" color="primary" @click="handleApplyCoupon"
                        class="bg-indigo-600 text-white  hover:bg-indigo-600 active:bg-indigo-600 py-2">
                        Apply
                    </UButton>
                </div>
            </UFormField>
        </template>
        <!-- 
        <template v-else>
            <UAlert color="success" variant="soft" icon="i-lucide-badge-check"
                :title="`${cartStore.appliedCoupon} applied`" :description="`You saved ₹${cartStore.appliedCoupon}`"
                :ui="{
                    icon: 'text-gray-800',
                    title: 'text-gray-800',
                    description: 'text-gray-800'

                }">
                <template #actions>
                    <UButton variant="ghost" color="neutral" size="xs" @click="removeCoupon"
                        class="bg-red-300 hover:bg-red-300 text-white">
                        Remove
                    </UButton>
                </template>
            </UAlert>
        </template> -->
        <template v-else>
            <div class="flex items-center justify-between gap-2">
                <span class="flex items-center gap-1.5 text-sm text-green-600 font-medium">
                    <UIcon name="i-lucide-ticket-percent" class="size-4" />
                    {{ cartStore.appliedCoupon.code }} applied — You saved ₹{{ cartStore.appliedCoupon.discount }}
                </span>
                <UButton variant="ghost" color="neutral" size="xs" class="hover:bg-red-400 hover:text-white rounded-xs"
                    @click="removeCoupon">
                    Remove
                </UButton>
            </div>
        </template>
    </UCard>
</template>