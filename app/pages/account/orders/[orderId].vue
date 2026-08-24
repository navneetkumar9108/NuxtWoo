<script setup>
import { useAuthStore } from '~~/store/auth'

const auth = useAuthStore()
// definePageMeta({ middleware: 'auth' })
const returnModalOpen = ref(false)
const returnType = ref('return') // 'return' | 'exchange'
const returnReason = ref('')
const exchangeSize = ref('')
const expandedItemId = ref(null)

const route = useRoute()
const orders = ref([])

const cancelModalOpen = ref(false)
const cancelReason = ref('')

const returnReasons = [
    'Size doesn\'t fit',
    'Product damaged/defective',
    'Different from description',
    'Wrong item received',
    'No longer needed',
    'Other'
]


const cancelReasons = [
    'Ordered by mistake',
    'Found a better price elsewhere',
    'Delivery time too long',
    'Changed my mind',
    'Other'
]

// function loadOrders() {
//     orders.value = JSON.parse(localStorage.getItem('orders') || '[]')
// }

function loadOrders() {
    const all = JSON.parse(localStorage.getItem('orders') || '[]')
    orders.value = all.filter(o => o.userEmail === auth.user?.email)
}


// const order = computed(() =>
//     orders.value.find(o => o.orderId === route.params.orderId)
// )
const order = computed(() =>
    orders.value.find(
        o => o.orderId === route.params.orderId && o.userEmail === auth.user?.email
    )
)

// currently expanded/selected item — sab actions isi item pe apply honge
const expandedItem = computed(() =>
    order.value?.items?.find(i => String(i.id) === String(expandedItemId.value))
)

function toggleItem(item) {
    expandedItemId.value = String(expandedItemId.value) === String(item.id) ? null : item.id
}
const sizeOptions = computed(() =>
    expandedItem.value?.sizes?.map(s => ({ label: s.name, value: s.id })) || []
)

// page load hote hi pehla item default expanded
// watch(order, (val) => {
//     if (val?.items?.length && !expandedItemId.value) {
//         expandedItemId.value = val.items[0].id
//     }
// }, { immediate: true })
// watch(order, (val) => {
//     if (!val?.items?.length) return

//     // agar list page se specific item click karke aaye ho, wahi expand hoga
//     const queryItemId = route.query.itemId

//     if (queryItemId && val.items.some(i => i.id === queryItemId)) {
//         expandedItemId.value = queryItemId
//     } else if (!expandedItemId.value) {
//         expandedItemId.value = val.items[0].id
//     }
// }, { immediate: true })
// watch(order, (val) => {
//     if (!val?.items?.length) return

//     const queryItemId = route.query.itemId

//     if (queryItemId && val.items.some(i => String(i.id) === String(queryItemId))) {
//         expandedItemId.value = val.items.find(i => String(i.id) === String(queryItemId))?.id
//     } else if (!expandedItemId.value) {
//         expandedItemId.value = val.items[0].id
//     }
// }, { immediate: true })

// query param se ya default pehla item expand karo
watch(order, (val) => {
    if (!val?.items?.length) return

    const queryItemId = route.query.itemId
    const matchedItem = val.items.find(i => String(i.id) === String(queryItemId))

    if (matchedItem) {
        expandedItemId.value = matchedItem.id
    } else if (!expandedItemId.value) {
        expandedItemId.value = val.items[0].id
    }
}, { immediate: true })

// expanded item ko top pe laane wali sorted list
// const sortedItems = computed(() => {
//     if (!order.value?.items) return []

//     const items = [...order.value.items]
//     const expandedIndex = items.findIndex(i => i.id === expandedItemId.value)

//     if (expandedIndex > -1) {
//         const [expandedItem] = items.splice(expandedIndex, 1)
//         items.unshift(expandedItem)
//     }

//     return items
// })
const sortedItems = computed(() => {
    if (!order.value?.items) return []

    const items = [...order.value.items]
    const expandedIndex = items.findIndex(i => String(i.id) === String(expandedItemId.value))

    if (expandedIndex > -1) {
        const [expandedItem] = items.splice(expandedIndex, 1)
        items.unshift(expandedItem)
    }

    return items
})

function updateOrders(updatedItems) {
    const updated = orders.value.map(o => {
        if (o.orderId === order.value.orderId) {
            return { ...o, items: updatedItems }
        }
        return o
    })

    localStorage.setItem('orders', JSON.stringify(updated))
    orders.value = updated
}

// function confirmCancel() {
//     if (!cancelReason.value) return

//     const updated = orders.value.map(o => {
//         if (o.orderId === order.value.orderId) {
//             return {
//                 ...o,
//                 status: 'cancelled',
//                 cancelReason: cancelReason.value,
//                 cancelledAt: new Date().toLocaleDateString('en-IN')
//             }
//         }
//         return o
//     })

//     localStorage.setItem('orders', JSON.stringify(updated))
//     orders.value = updated
//     cancelModalOpen.value = false
// }

function confirmCancel() {
    if (!cancelReason.value || !expandedItemId.value) return

    const updatedItems = order.value.items.map(item =>
        String(item.id) === String(expandedItemId.value)
            ? {
                ...item,
                status: 'cancelled',
                cancelReason: cancelReason.value,
                cancelledAt: new Date().toLocaleDateString('en-IN')
            }
            : item
    )

    updateOrders(updatedItems)
    cancelModalOpen.value = false
    cancelReason.value = ''
}

// function confirmReturn() {
//     if (!returnReason.value) return
//     if (returnType.value === 'exchange' && !exchangeSize.value) return

//     const updated = orders.value.map(o => {
//         if (o.orderId === order.value.orderId) {
//             return {
//                 ...o,
//                 status: returnType.value === 'exchange' ? 'exchange_requested' : 'return_requested',
//                 returnReason: returnReason.value,
//                 returnType: returnType.value,
//                 exchangeSize: returnType.value === 'exchange' ? exchangeSize.value : null,
//                 returnRequestedAt: new Date().toLocaleDateString('en-IN')
//             }
//         }
//         return o
//     })

//     localStorage.setItem('orders', JSON.stringify(updated))
//     orders.value = updated
//     returnModalOpen.value = false
// }

function confirmReturn() {
    if (!returnReason.value || !expandedItemId.value) return
    if (returnType.value === 'exchange' && !exchangeSize.value) return

    const updatedItems = order.value.items.map(item =>
        String(item.id) === String(expandedItemId.value)
            ? {
                ...item,
                status: returnType.value === 'exchange' ? 'exchange_requested' : 'return_requested',
                returnReason: returnReason.value,
                returnType: returnType.value,
                exchangeSize: returnType.value === 'exchange' ? exchangeSize.value : null,
                returnRequestedAt: new Date().toLocaleDateString('en-IN')
            }
            : item
    )

    updateOrders(updatedItems)
    returnModalOpen.value = false
    returnReason.value = ''
    exchangeSize.value = ''
}

// function updateStatus(newStatus) {
//     const updated = orders.value.map(o =>
//         o.orderId === order.value.orderId ? { ...o, status: newStatus } : o
//     )
//     localStorage.setItem('orders', JSON.stringify(updated))
//     orders.value = updated
// }

function updateStatus(newStatus) {
    if (!expandedItemId.value) return

    const updatedItems = order.value.items.map(item =>
        String(item.id) === String(expandedItemId.value)
            ? { ...item, status: newStatus }
            : item
    )

    updateOrders(updatedItems)
}
function formatOrderDate(date) {
    if (!date) return ''

    return new Date(date).toLocaleString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    })
}

// onMounted(loadOrders)
onMounted(() => {
    auth.init()
    loadOrders()
})
</script>

<template>


    <!-- <UContainer class="py-8 max-w-2xl" v-if="order"> -->
    <section class=" max-w-2xl" v-if="order">
        <UCard v-for="item in sortedItems" :key="item.id" class="ring-0 rounded-xs mb-3 cursor-pointer"
            :class="String(expandedItemId) === String(item.id) ? 'bg-neutral-200' : 'bg-neutral-100'"
            @click="toggleItem(item)" :ui="{ body: 'bg-white' }">
            <!-- Expanded: full detail -->
            <div v-if="String(expandedItemId) === String(item.id)"
                class="flex flex-col justify-center items-center text-center gap-3">
                <img :src="item.image" class="w-35 h-full object-cover rounded-2xl" />
                <div class="text-sm w-full">
                    <p class="font-semibold">{{ item.name }}</p>
                    <p class="text-neutral-500">{{ item.title }}</p>
                    <p class="text-neutral-500">Size: {{ item.size }} · Quantity: {{ item.quantity }}</p>
                    <p class="text-neutral-500">Order ID: #{{ order.orderId }}</p>

                    <div class="flex items-center gap-3 p-4 rounded-2xl w-full mt-2" :class="{
                        'bg-red-500': item.status === 'cancelled',
                        'bg-green-600': item.status === 'delivered',
                        'bg-blue-600': item.status === 'return_requested' || item.status === 'exchange_requested',
                        'bg-orange-500': item.status === 'processing',
                        'bg-neutral-800': item.status === 'placed' || item.status === 'shipped' || !item.status
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
                                {{ item.status?.replace('_', ' ') || 'Placed' }} on {{ formatOrderDate(order.date) }}
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
                    <p class="font-medium">{{ item.name }}</p>
                    <p class="">{{ item.title }}</p>
                    <p class="text-neutral-500 text-xs">Size: {{ item.size }} · Qty: {{ item.quantity }}</p>
                    <p class="text-xs mt-0.5 capitalize" :class="{
                        'text-red-500': item.status === 'cancelled',
                        'text-green-600': item.status === 'delivered',
                        'text-blue-600': item.status === 'return_requested' || item.status === 'exchange_requested',
                        'text-orange-500': item.status === 'processing',
                        'text-neutral-600': item.status === 'placed' || item.status === 'shipped' || !item.status
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
                    <p class="text-xs"> {{ order.address?.fullName }}</p>
                </div>
            </div>
            <USeparator class="py-3" :ui="{
                border: 'border-neutral-200'
            }" />
            <div class="flex items-center gap-3">
                <UIcon name="i-lucide-phone" />
                <div>
                    <p class="text-[16px] font-semibold">Contact Details</p>
                    <p class="text-xs">{{ order.address?.phone }}</p>
                </div>
            </div>
            <div class="flex items-center gap-3 mt-3">
                <UIcon name="i-lsicon-location-outline" class="size-10" />
                <div>
                    <p class="text-[16px] font-semibold">Delivery Address</p>
                    <p class="text-xs text-balance">{{ order.address?.addressLine1 }}{{ order.address?.addressLine2 }},
                        {{ order.address?.city }}-{{ order.address?.pincode }},{{ order.address?.state }}</p>
                </div>
            </div>
        </UCard>

        <UButton v-if="expandedItem?.status === 'placed' || !expandedItem?.status" block color="error" variant="outline"
            @click="cancelModalOpen = true">
            Cancel Order
        </UButton>
        <UButton v-if="expandedItem?.status === 'delivered'" block color="primary" variant="outline"
            @click="returnModalOpen = true">
            Return / Exchange
        </UButton>

        <p v-if="expandedItem?.status === 'cancelled'" class="text-sm text-red-500 mt-3">
            Cancelled — {{ expandedItem.cancelReason }}
        </p>
        <p v-if="expandedItem?.status === 'return_requested'" class="text-sm text-blue-600 mt-3">
            Return requested — {{ expandedItem.returnReason }}
        </p>
        <p v-if="expandedItem?.status === 'exchange_requested'" class="text-sm text-blue-600 mt-3">
            Exchange requested (Size: {{ expandedItem.exchangeSize }}) — {{ expandedItem.returnReason }}
        </p>

        <!-- Sirf development/testing ke liye — production mein hata dena -->
        <UCard class="bg-yellow-50 ring-0 rounded-xs mb-3 p-3">
            <p class="text-xs text-neutral-500 mb-2">Dev tools (testing only) — applies to selected item</p>
            <div class="flex gap-2 flex-wrap">
                <UButton size="xs" variant="outline" @click="updateStatus('shipped')">Mark Shipped</UButton>
                <UButton size="xs" variant="outline" @click="updateStatus('delivered')">Mark Delivered</UButton>
            </div>
        </UCard>

        <UModal v-model:open="cancelModalOpen" :ui="{ content: 'max-w-sm bg-white rounded-xs ring-neutral-200' }">
            <template #header>
                <h2 class="text-base font-semibold">Cancel Item</h2>
            </template>
            <template #body>
                <p class="text-sm text-neutral-500 mb-3">Please select a reason</p>
                <URadioGroup v-model="cancelReason" :items="cancelReasons.map(r => ({ label: r, value: r }))" />
                <UButton block color="error" class="mt-6" :disabled="!cancelReason" @click="confirmCancel">
                    Confirm Cancellation
                </UButton>
            </template>
        </UModal>

        <!-- Return/Exchange Modal -->
        <UModal v-model:open="returnModalOpen" :ui="{
            content: 'max-w-sm bg-white rounded-xs ring-neutral-200',
            header: 'border-b-neutral-200 text-gray-800',
        }">
            <template #header>
                <h2 class="text-base font-semibold">Return / Exchange</h2>
            </template>
            <template #body>
                <UFormField label="What do you want to do?" class="mb-4" :ui="{ label: 'text-gray-800' }">
                    <URadioGroup v-model="returnType" orientation="horizontal" :items="[
                        { label: 'Return', value: 'return' },
                        { label: 'Exchange', value: 'exchange' }
                    ]" :ui="{
                        label: 'text-red-400', base: 'bg-white border border-red-400 rounded-sm',
                        indicator: 'bg-white after:bg-red-400 after:rounded-sm after:size-3'
                    }" />
                </UFormField>

                <UFormField v-if="returnType === 'exchange'" label="New Size" class="mb-4"
                    :ui="{ label: 'text-gray-800' }">
                    <USelect v-model="exchangeSize" :items="sizeOptions" placeholder="Select size"
                        class="w-full bg-white hover:bg-white focus:ring-1 ring-neutral-200 focus:ring-neutral-200 text-red-400 rounded-xs"
                        :ui="{
                            content: 'w-64 bg-white ring-0 rounded-xs',
                            item: 'rounded-xs before:rounded-xs text-red-400',
                            itemLabel: ''
                        }" />
                </UFormField>

                <UFormField label="Reason" :ui="{ label: 'text-gray-800' }">
                    <URadioGroup v-model="returnReason" :items="returnReasons.map(r => ({ label: r, value: r }))" :ui="{
                        label: 'text-red-400', base: 'bg-white border border-red-400 rounded-sm',
                        indicator: 'bg-white after:bg-red-400 after:rounded-sm after:size-3'
                    }" />
                </UFormField>

                <UButton block color="primary" class="mt-6 p-3 rounded-xs bg-red-400 text-white hover:bg-red-400
                    uppercase active:bg-red-400"
                    :disabled="!returnReason || (returnType === 'exchange' && !exchangeSize)" @click="confirmReturn">
                    Submit Request
                </UButton>
            </template>
        </UModal>
    </section>
    <!-- </UContainer> -->
</template>