<script setup>
const route = useRoute()
const orderId = route.params.orderId

const { data: orderRes, pending, refresh } = await useLazyFetch(`/api/orders/${orderId}`)

const order = computed(() => orderRes.value?.data || null)

const expandedItemId = ref(null)

const returnModalOpen = ref(false)
const returnType = ref('return')
const returnReason = ref('')
const exchangeSizeId = ref('')

const cancelModalOpen = ref(false)
const cancelReason = ref('')

const returnReasons = [
    "Size doesn't fit",
    'Product damaged/defective',
    'Different from description',
    'Wrong item received',
    'No longer needed',
    'Other',
]

const cancelReasons = [
    'Ordered by mistake',
    'Found a better price elsewhere',
    'Delivery time too long',
    'Changed my mind',
    'Other',
]

const expandedItem = computed(() =>
    order.value?.items?.find((i) => String(i._id) === String(expandedItemId.value))
)

function toggleItem(item) {
    expandedItemId.value =
        String(expandedItemId.value) === String(item._id) ? null : item._id
}

// Query param se ya default pehla item expand karo
watch(
    order,
    (val) => {
        if (!val?.items?.length) return
        const queryItemId = route.query.itemId
        const matchedItem = val.items.find((i) => String(i._id) === String(queryItemId))

        if (matchedItem) {
            expandedItemId.value = matchedItem._id
        } else if (!expandedItemId.value) {
            expandedItemId.value = val.items[0]._id
        }
    },
    { immediate: true }
)

const sortedItems = computed(() => {
    if (!order.value?.items) return []
    const items = [...order.value.items]
    const idx = items.findIndex((i) => String(i._id) === String(expandedItemId.value))
    if (idx > -1) {
        const [item] = items.splice(idx, 1)
        items.unshift(item)
    }
    return items
})

async function confirmCancel() {
    if (!cancelReason.value || !expandedItemId.value) return

    try {
        const res = await $fetch(`/api/orders/${orderId}/cancel-item`, {
            method: 'PATCH',
            body: {
                itemId: expandedItemId.value,
                cancelReason: cancelReason.value,
            },
        })
        if (res.success) {
            await refresh()
        }
    } catch (err) {
        console.error('Failed to cancel item', err)
    } finally {
        cancelModalOpen.value = false
        cancelReason.value = ''
    }
}

async function confirmReturn() {
    if (!returnReason.value || !expandedItemId.value) return
    if (returnType.value === 'exchange' && !exchangeSizeId.value) return

    try {
        const res = await $fetch(`/api/orders/${orderId}/return-item`, {
            method: 'PATCH',
            body: {
                itemId: expandedItemId.value,
                returnType: returnType.value,
                returnReason: returnReason.value,
                exchangeSizeId: returnType.value === 'exchange' ? exchangeSizeId.value : undefined,
            },
        })
        if (res.success) {
            await refresh()
        }
    } catch (err) {
        console.error('Failed to submit return', err)
    } finally {
        returnModalOpen.value = false
        returnReason.value = ''
        exchangeSizeId.value = ''
    }
}

async function updateStatus(newStatus) {
    if (!expandedItemId.value) return

    try {
        const res = await $fetch(`/api/orders/${orderId}/update-item-status`, {
            method: 'PATCH',
            body: { itemId: expandedItemId.value, status: newStatus },
        })
        if (res.success) {
            await refresh()
        }
    } catch (err) {
        console.error('Failed to update status', err)
    }
}

function formatOrderDate(date) {
    if (!date) return ''
    return new Date(date).toLocaleString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    })
}
</script>

<template>
    <USkeleton v-if="pending" class="h-96 w-full max-w-2xl rounded-xs" />

    <section class="max-w-2xl" v-else-if="order">
        <UCard v-for="item in sortedItems" :key="item._id" class="ring-0 rounded-xs mb-3 cursor-pointer"
            :class="String(expandedItemId) === String(item._id) ? 'bg-neutral-200' : 'bg-neutral-100'"
            @click="toggleItem(item)" :ui="{ body: 'bg-white' }">
            <!-- Expanded: full detail -->
            <div v-if="String(expandedItemId) === String(item._id)"
                class="flex flex-col justify-center items-center text-center gap-3">
                <img :src="item.image" class="w-35 h-full object-cover rounded-2xl" />
                <div class="text-sm w-full">
                    <p class="font-semibold">{{ item.brandName }}</p>
                    <p class="text-neutral-500">{{ item.title }}</p>
                    <p class="text-neutral-500">Size: {{ item.sizeName }} · Quantity: {{ item.quantity }}</p>
                    <p class="text-neutral-500">Order ID: #{{ order._id.slice(-8).toUpperCase() }}</p>

                    <div class="flex items-center gap-3 p-4 rounded-2xl w-full mt-2" :class="{
                        'bg-red-500': item.status === 'cancelled',
                        'bg-green-600': item.status === 'delivered',
                        'bg-blue-600': item.status === 'return_requested' || item.status === 'exchange_requested',
                        'bg-orange-500': item.status === 'processing',
                        'bg-neutral-800': item.status === 'placed' || item.status === 'shipped' || !item.status,
                    }">
                        <div class="size-9 rounded-full bg-white flex items-center justify-center relative shrink-0">
                            <UIcon name="i-lucide-package" class="size-5 text-neutral-700" />
                            <UIcon v-if="item.status === 'cancelled'" name="i-ph-x-circle-fill"
                                class="size-5 text-white absolute -bottom-0.5 -right-0.5 bg-red-950 rounded-full" />
                            <UIcon v-if="item.status === 'delivered'" name="i-ph-check-circle-fill"
                                class="size-4 text-white absolute -bottom-0.5 -right-0.5 bg-green-950 rounded-full" />
                        </div>
                        <div>
                            <p class="text-sm font-semibold capitalize text-white">
                                {{ item.status?.replace('_', ' ') || 'Placed' }} on {{ formatOrderDate(order.createdAt)
                                }}
                            </p>
                            <p class="text-xs text-white text-start">
                                <span v-if="item.status === 'cancelled' && item.cancelReason">
                                    {{ item.cancelReason }}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Collapsed: compact -->
            <div v-else class="flex gap-3 bg-white">
                <img :src="item.image" class="w-14 h-full object-cover rounded-lg shrink-0" />
                <div class="text-sm">
                    <p class="font-medium">{{ item.brandName }}</p>
                    <p>{{ item.title }}</p>
                    <p class="text-neutral-500 text-xs">Size: {{ item.sizeName }} · Qty: {{ item.quantity }}</p>
                    <p class="text-xs mt-0.5 capitalize" :class="{
                        'text-red-500': item.status === 'cancelled',
                        'text-green-600': item.status === 'delivered',
                        'text-blue-600': item.status === 'return_requested' || item.status === 'exchange_requested',
                        'text-orange-500': item.status === 'processing',
                        'text-neutral-600': item.status === 'placed' || item.status === 'shipped' || !item.status,
                    }">
                        {{ item.status?.replace('_', ' ') || 'Placed' }}
                    </p>
                </div>
            </div>
        </UCard>

        <UCard class="bg-white ring-0 rounded-xs mb-3">
            <div class="flex gap-3">
                <UAvatar size="2xl"
                    src="https://assets.myntassets.com/assets/images/2026/JUNE/17/vAviurqR_d0a7490162924bf4afd3946f4b839450.png"
                    class="rounded-xl" />
                <div>
                    <p class="font-semibold text-[16px]">Delivery To</p>
                    <p class="text-xs">{{ order.shippingAddress?.fullName }}</p>
                </div>
            </div>
            <USeparator class="py-3" :ui="{ border: 'border-neutral-200' }" />
            <div class="flex items-center gap-3">
                <UIcon name="i-lucide-phone" />
                <div>
                    <p class="text-[16px] font-semibold">Contact Details</p>
                    <p class="text-xs">{{ order.shippingAddress?.phone }}</p>
                </div>
            </div>
            <div class="flex items-center gap-3 mt-3">
                <UIcon name="i-lsicon-location-outline" />
                <div>
                    <p class="text-[16px] font-semibold">Delivery Address</p>
                    <p class="text-xs text-balance">
                        {{ order.shippingAddress?.addressLine1 }}{{ order.shippingAddress?.addressLine2 }},
                        {{ order.shippingAddress?.city }}-{{ order.shippingAddress?.pincode }},{{
                            order.shippingAddress?.state }}
                    </p>
                </div>
            </div>
        </UCard>

        <ButtonUButton label="Cancel Order" v-if="expandedItem?.status === 'placed' || !expandedItem?.status" block
            color="error" variant="outline" @click="cancelModalOpen = true" />

        <ButtonUButton label="Return / Exchange" v-if="expandedItem?.status === 'delivered'" block color="primary"
            variant="outline" @click="returnModalOpen = true" />

        <p v-if="expandedItem?.status === 'cancelled'" class="text-sm text-red-500 mt-3">
            Cancelled — {{ expandedItem.cancelReason }}
        </p>
        <p v-if="expandedItem?.status === 'return_requested'" class="text-sm text-blue-600 mt-3">
            Return requested — {{ expandedItem.returnReason }}
        </p>
        <p v-if="expandedItem?.status === 'exchange_requested'" class="text-sm text-blue-600 mt-3">
            Exchange requested — {{ expandedItem.returnReason }}
        </p>

        <!-- Dev tools -->
        <UCard class="bg-yellow-50 ring-0 rounded-xs mb-3 p-3 mt-3">
            <p class="text-xs text-neutral-500 mb-2">Dev tools (testing only) — applies to selected item</p>
            <div class="flex gap-2 flex-wrap">
                <ButtonUButton label="Mark Shipped" size="xs" variant="outline" @click="updateStatus('shipped')" />
                <ButtonUButton label="Mark Delivered" size="xs" variant="outline" @click="updateStatus('delivered')" />
            </div>
        </UCard>

        <UModal v-model:open="cancelModalOpen" :ui="{ content: 'max-w-sm bg-white rounded-xs ring-neutral-200' }">
            <template #header>
                <h2 class="text-base font-semibold">Cancel Item</h2>
            </template>
            <template #body>
                <p class="text-sm text-neutral-500 mb-3">Please select a reason</p>
                <URadioGroup v-model="cancelReason" :items="cancelReasons.map((r) => ({ label: r, value: r }))" />
                <ButtonUButton label="Confirm Cancellation" block color="error" class="mt-6" :disabled="!cancelReason"
                    @click="confirmCancel" />
            </template>
        </UModal>

        <UModal v-model:open="returnModalOpen"
            :ui="{ content: 'max-w-sm bg-white rounded-xs ring-neutral-200', header: 'border-b-neutral-200 text-gray-800' }">
            <template #header>
                <h2 class="text-base font-semibold">Return / Exchange</h2>
            </template>
            <template #body>
                <UFormField label="What do you want to do?" class="mb-4" :ui="{ label: 'text-gray-800' }">
                    <URadioGroup v-model="returnType" orientation="horizontal" :items="[
                        { label: 'Return', value: 'return' },
                        { label: 'Exchange', value: 'exchange' },
                    ]" />
                </UFormField>

                <UFormField v-if="returnType === 'exchange'" label="New Size" class="mb-4"
                    :ui="{ label: 'text-gray-800' }">
                    <USelect v-model="exchangeSizeId" :items="expandedItem?.availableSizes || []"
                        placeholder="Select size" class="w-full" />
                </UFormField>

                <UFormField label="Reason" :ui="{ label: 'text-gray-800' }">
                    <URadioGroup v-model="returnReason" :items="returnReasons.map((r) => ({ label: r, value: r }))" />
                </UFormField>

                <ButtonUButton label="Submit Request" block color="primary"
                    class="mt-6 p-3 rounded-xs bg-red-400 text-white hover:bg-red-400 uppercase active:bg-red-400"
                    :disabled="!returnReason || (returnType === 'exchange' && !exchangeSizeId)"
                    @click="confirmReturn" />
            </template>
        </UModal>
    </section>

    <div v-else class="text-center py-16">
        <UIcon name="i-lucide-package-x" class="size-12 text-neutral-300 mx-auto mb-3" />
        <p class="text-neutral-500">Order not found</p>
    </div>
</template>