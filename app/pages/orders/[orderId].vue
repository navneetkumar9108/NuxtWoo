<script setup>
// definePageMeta({ middleware: 'auth' })
const returnModalOpen = ref(false)
const returnType = ref('return') // 'return' | 'exchange'
const returnReason = ref('')
const exchangeSize = ref('')

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

function loadOrders() {
    orders.value = JSON.parse(localStorage.getItem('orders') || '[]')
}

const order = computed(() =>
    orders.value.find(o => o.orderId === route.params.orderId)
)

function confirmCancel() {
    if (!cancelReason.value) return

    const updated = orders.value.map(o => {
        if (o.orderId === order.value.orderId) {
            return {
                ...o,
                status: 'cancelled',
                cancelReason: cancelReason.value,
                cancelledAt: new Date().toLocaleDateString('en-IN')
            }
        }
        return o
    })

    localStorage.setItem('orders', JSON.stringify(updated))
    orders.value = updated
    cancelModalOpen.value = false
}

function confirmReturn() {
    if (!returnReason.value) return
    if (returnType.value === 'exchange' && !exchangeSize.value) return

    const updated = orders.value.map(o => {
        if (o.orderId === order.value.orderId) {
            return {
                ...o,
                status: returnType.value === 'exchange' ? 'exchange_requested' : 'return_requested',
                returnReason: returnReason.value,
                returnType: returnType.value,
                exchangeSize: returnType.value === 'exchange' ? exchangeSize.value : null,
                returnRequestedAt: new Date().toLocaleDateString('en-IN')
            }
        }
        return o
    })

    localStorage.setItem('orders', JSON.stringify(updated))
    orders.value = updated
    returnModalOpen.value = false
}
function updateStatus(newStatus) {
    const updated = orders.value.map(o =>
        o.orderId === order.value.orderId ? { ...o, status: newStatus } : o
    )
    localStorage.setItem('orders', JSON.stringify(updated))
    orders.value = updated
}

onMounted(loadOrders)
</script>

<template>
    <UContainer class="py-8 max-w-2xl" v-if="order">
        <h1 class="text-xl font-bold mb-6">Order #{{ order.orderId }}</h1>

        <UCard v-for="item in order.items" :key="item.id" class="bg-white ring-0 rounded-xs mb-3">
            <div class="flex gap-3">
                <img :src="item.image" class="w-16 h-20 object-cover rounded-xs" />
                <div>
                    <p class="text-sm font-semibold">{{ item.name }}</p>
                    <p class="text-xs text-neutral-500">{{ item.title }}</p>
                    <p class="text-xs text-neutral-500">Size: {{ item.size }} · Qty: {{ item.quantity }}</p>
                </div>
            </div>
        </UCard>

        <UCard class="bg-white ring-0 rounded-xs mb-3">
            <p class="text-sm">Delivering to: {{ order.address?.fullName }}</p>
            <p class="text-xs text-neutral-500">{{ order.address?.addressLine1 }}, {{ order.address?.city }}</p>
            <p class="text-sm font-semibold mt-2">Total: ₹{{ order.totalAmount }}</p>
        </UCard>

        <UButton v-if="order.status === 'placed'" block color="error" variant="outline" @click="cancelModalOpen = true">
            Cancel Order
        </UButton>
        <UButton v-if="order.status === 'delivered'" block color="primary" variant="outline"
            @click="returnModalOpen = true">
            Return / Exchange
        </UButton>

        <p v-if="order.status === 'cancelled'" class="text-sm text-red-500 mt-3">
            Cancelled — {{ order.cancelReason }}
        </p>
        <p v-if="order.status === 'return_requested'" class="text-sm text-blue-600 mt-3">
            Return requested — {{ order.returnReason }}
        </p>
        <p v-if="order.status === 'exchange_requested'" class="text-sm text-blue-600 mt-3">
            Exchange requested (Size: {{ order.exchangeSize }}) — {{ order.returnReason }}
        </p>
        <!-- Sirf development/testing ke liye — production mein hata dena -->
        <UCard class="bg-yellow-50 ring-0 rounded-xs mb-3 p-3">
            <p class="text-xs text-neutral-500 mb-2">Dev tools (testing only)</p>
            <div class="flex gap-2 flex-wrap">
                <UButton size="xs" variant="outline" @click="updateStatus('shipped')">Mark Shipped</UButton>
                <UButton size="xs" variant="outline" @click="updateStatus('delivered')">Mark Delivered</UButton>
            </div>
        </UCard>

        <UModal v-model:open="cancelModalOpen" :ui="{ content: 'max-w-sm bg-white' }">
            <template #header>
                <h2 class="text-base font-semibold">Cancel Order</h2>
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
        <UModal v-model:open="returnModalOpen" :ui="{ content: 'max-w-sm bg-white' }">
            <template #header>
                <h2 class="text-base font-semibold">Return / Exchange</h2>
            </template>
            <template #body>
                <UFormField label="What do you want to do?" class="mb-4">
                    <URadioGroup v-model="returnType" orientation="horizontal" :items="[
                        { label: 'Return', value: 'return' },
                        { label: 'Exchange', value: 'exchange' }
                    ]" />
                </UFormField>

                <UFormField v-if="returnType === 'exchange'" label="New Size" class="mb-4">
                    <USelect v-model="exchangeSize"
                        :items="order.items[0]?.sizes?.map(s => ({ label: s.name, value: s.sizeId })) || []"
                        placeholder="Select size" class="w-full" />
                </UFormField>

                <UFormField label="Reason">
                    <URadioGroup v-model="returnReason" :items="returnReasons.map(r => ({ label: r, value: r }))" />
                </UFormField>

                <UButton block color="primary" class="mt-6"
                    :disabled="!returnReason || (returnType === 'exchange' && !exchangeSize)" @click="confirmReturn">
                    Submit Request
                </UButton>
            </template>
        </UModal>
    </UContainer>
</template>