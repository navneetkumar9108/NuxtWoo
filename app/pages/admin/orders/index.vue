<script setup>
import { getPaginationRowModel } from '@tanstack/vue-table'

const route = useRoute()
const router = useRouter()
const table = useTemplateRef('table')
const globalFilter = ref('')

const orders = ref([])
const pending = ref(true)
const updatingId = ref(null)
const pagination = ref({
    pageIndex: Math.max(Number(route.query.page || 1) - 1, 0),
    pageSize: 8
})
definePageMeta({ middleware: 'admin', title: 'Orders' })
const statusOptions = ['placed', 'confirmed', 'shipped', 'delivered', 'cancelled']

watch(() => pagination.value.pageIndex, (i) =>
    router.replace({ query: { ...route.query, page: i + 1 } })
)

watch(globalFilter, () => { pagination.value.pageIndex = 0 })

const columns = [
    {
        id: 'order',
        header: 'Order',
        accessorFn: (o) =>
            [o._id.slice(-8), o.userId?.name, o.userId?.email].filter(Boolean).join(' ')
    },
    {
        id: 'status',
        header: 'Status',
        accessorFn: (o) => o.orderStatus
    },
    {
        id: 'update',
        header: 'Update Status',
        meta: { class: { th: 'text-right', td: 'text-right' } }
    },

]

const statusConfig = {
    placed: { color: 'text-blue-600', bg: 'bg-blue-50' },
    confirmed: { color: 'text-indigo-600', bg: 'bg-indigo-50' },
    shipped: { color: 'text-orange-600', bg: 'bg-orange-50' },
    delivered: { color: 'text-green-600', bg: 'bg-green-50' },
    cancelled: { color: 'text-red-600', bg: 'bg-red-50' },
}

async function loadOrders() {
    pending.value = true
    try {
        const res = await $fetch('/api/admin/orders')
        if (res.success) {
            orders.value = res.data
        } else {
            alert(res.message || 'Access denied')
        }
    } catch (err) {
        console.error('Failed to load orders', err)
    } finally {
        pending.value = false
    }
}

async function updateStatus(orderId, newStatus) {
    updatingId.value = orderId
    try {
        const res = await $fetch(`/api/admin/orders/${orderId}/update-status`, {
            method: 'PATCH',
            body: { orderStatus: newStatus },
        })
        if (res.success) {
            const order = orders.value.find((o) => o._id === orderId)
            if (order) order.orderStatus = newStatus
        }
    } catch (err) {
        console.error('Failed to update status', err)
    } finally {
        updatingId.value = null
    }
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    })
}

onMounted(() => {
    loadOrders()
})
</script>

<template>
    <!-- <UContainer class="py-8"> -->
    <div>
        <h1 class="text-2xl font-bold mb-2">All Orders (Admin)</h1>

        <div v-if="pending" class="space-y-3">
            <USkeleton v-for="i in 5" :key="i" class="h-20 w-full rounded-xs" />
        </div>

        <div v-else-if="!orders.length" class="text-center py-16 text-neutral-500">
            No orders found
        </div>

        <div v-else class="space-y-3">
            <!-- <UCard v-for="order in orders" :key="order._id" class="bg-white ring-1 ring-neutral-200 rounded-xs">
            <div class="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <p class="text-sm font-semibold">
                        Order #{{ order._id.slice(-8).toUpperCase() }}
                    </p>
                    <p class="text-xs text-neutral-500">
                        {{ order.userId?.name }} ({{ order.userId?.email }}) · {{ formatDate(order.createdAt) }}
                    </p>
                    <p class="text-xs text-neutral-500 mt-1">
                        {{ order.items.length }} items · ₹{{ order.totalAmount }}
                    </p>
                </div>

                <div class="flex items-center gap-2">
                    <span class="px-2.5 py-1 rounded-full text-xs font-medium"
                        :class="[statusConfig[order.orderStatus]?.bg, statusConfig[order.orderStatus]?.color]">
                        {{ order.orderStatus }}
                    </span>

                    <USelect :model-value="order.orderStatus" :items="statusOptions"
                        :disabled="updatingId === order._id" @update:model-value="(val) => updateStatus(order._id, val)"
                        class="w-40" />
                </div>
            </div>
        </UCard> -->
            <div class="bg-white ring-1 ring-neutral-200 rounded-xs">
                <div class="flex px-4 py-3.5 border-b border-accented">
                    <UInput v-model="globalFilter" icon="i-lucide-search" placeholder="Search orders..."
                        class="max-w-sm" :ui="{ base: 'focus-visible:ring-gray-400 rounded-sm' }" />
                </div>

                <UTable ref="table" v-model:pagination="pagination" v-model:global-filter="globalFilter" :data="orders"
                    :columns="columns" :get-row-id="(row) => row._id" :pagination-options="{
                        getPaginationRowModel: getPaginationRowModel(),
                        autoResetPageIndex: false
                    }" :ui="{ td: 'py-4' }">
                    <template #order-cell="{ row }">
                        <div>
                            <p class="text-sm font-semibold">
                                Order #{{ row.original._id.slice(-8).toUpperCase() }}
                            </p>
                            <p class="text-xs text-neutral-500">
                                {{ row.original.userId?.name }} ({{ row.original.userId?.email }}) · {{
                                    formatDate(row.original.createdAt) }}
                            </p>
                            <p class="text-xs text-neutral-500 mt-1">
                                {{ row.original.items.length }} items · ₹{{ row.original.totalAmount }}
                            </p>
                        </div>
                    </template>

                    <template #status-cell="{ row }">
                        <span class="px-2.5 py-1 rounded-full text-xs font-medium"
                            :class="[statusConfig[row.original.orderStatus]?.bg, statusConfig[row.original.orderStatus]?.color]">
                            {{ row.original.orderStatus }}
                        </span>
                    </template>
                    <template #update-cell="{ row }">
                        <USelect :model-value="row.original.orderStatus" :items="statusOptions"
                            :disabled="updatingId === row.original._id" class="w-40"
                            @update:model-value="(val) => updateStatus(row.original._id, val)" />
                    </template>
                </UTable>

                <div class="flex justify-center border-t border-default py-4 px-4">
                    <UPagination :page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
                        :items-per-page="table?.tableApi?.getState().pagination.pageSize"
                        :total="table?.tableApi?.getFilteredRowModel().rows.length"
                        @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)" active-color="error" color="error" />
                </div>
            </div>
        </div>
    </div>
    <!-- </UContainer> -->
</template>