<!-- <script setup>
import { getPaginationRowModel, getFilteredRowModel } from '@tanstack/vue-table'
import { useAuthStore } from '~~/store/auth'

const auth = useAuthStore()
const orders = ref([])
const table = useTemplateRef('table')

const pagination = ref({ pageIndex: 0, pageSize: 5 })

function loadOrders() {
    const all = JSON.parse(localStorage.getItem('orders') || '[]')
    orders.value = all.filter(o => o.userEmail === auth.user?.email)
}


const flatOrders = computed(() => {
    return orders.value.flatMap((order) =>
        (order.items || []).map((item) => ({
            ...order,
            product: item,
            status: item.status || 'placed'   // item-level status override
        }))
    )
})

onMounted(() => {
    auth.init()
    loadOrders()
})

const columns = [
    {
        accessorKey: 'items',
        header: 'Product',

        cell: ({ row }) => {
            const product = row.original.product

            return h(
                'div',
                { class: 'flex items-start gap-2 sm:gap-3 min-w-0 w-fit' },
                [
                    h('img', {
                        src: product?.image,
                        alt: product?.name,
                        class: 'w-14 sm:w-20 h-full object-cover rounded-lg sm:rounded-xl shrink-0'
                    }),

                    h('div', { class: 'min-w-0' }, [
                        h(
                            'p',
                            { class: 'font-medium text-gray-800 text-sm sm:text-base line-clamp-1' },
                            product?.name
                        ),

                        h(
                            'p',
                            { class: 'text-xs text-muted mt-0.5 ' },
                            product?.title
                        ),

                        h(
                            'p',
                            { class: 'text-xs text-muted' },
                            `Size: ${product?.size} · Qty: ${product?.quantity}`
                        )
                    ])
                ]
            )
        }
    },

    {
        accessorKey: 'date',
        header: 'Date',
        cell: ({ row }) => {
            const date = row.original.date
            // console.log('Date', date);
            return new Date(date).toLocaleString('en-US', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true

            })

        }
    },

    {
        accessorKey: 'status',
        header: 'Status',

        cell: ({ row }) => {
            const status = row.original.status
            const cancelReason = row.original.product?.cancelReason

            const statusClasses = {
                placed: 'text-blue-600',
                delivered: 'text-green-600',
                shipped: 'text-blue-600',
                processing: 'text-orange-500',
                cancelled: 'text-red-500',
                return_requested: 'text-purple-600',
                exchange_requested: 'text-purple-600'
            }

            return h(
                'div',
                { class: `font-medium capitalize text-xs sm:text-sm ${statusClasses[status] || 'text-neutral-600'}` },
                [
                    status?.replace('_', ' ') || 'Placed',

                    status === 'cancelled' && cancelReason
                        ? h('p', { class: 'text-xs text-red-400 mt-1 hidden sm:block' }, cancelReason)
                        : null
                ]
            )
        }
    },

    {
        id: 'action',
        header: '',

        cell: ({ row }) => {
            return h(
                resolveComponent('ButtonUButton'),
                {
                    icon: 'i-lucide-chevron-right',
                    variant: 'ghost',
                    color: 'neutral',
                    size: 'sm',
                    class: 'text-red-500 hover:bg-neutral-100',
                    to: {
                        path: `/account/orders/${row.original.orderId}`,
                        query: { itemId: row.original.product.id }
                    }
                }
            )
        }
    }
]

</script>

<template>
    <section>
        <div v-if="!orders.length" class="text-center py-16 ">
            <UIcon name="i-lucide-package-x" class="size-12 text-neutral-300 mx-auto mb-3" />

            <p class="text-neutral-500">
                No orders yet
            </p>

            <ButtonUButton label="Start Shopping" to="/products" class="mt-4" />


        </div>


        <div v-else class="">
            <div class="  p-4 bg-neutral-300">
                <h2 class="text-2xl font-bold text-highlighted">My Orders</h2>

            </div>

            <UTable ref="table" :data="flatOrders" :columns="columns" v-model:pagination="pagination"
                :pagination-options="{ getPaginationRowModel: getPaginationRowModel() }"
                class="w-full border border-neutral-200 rounded-xs overflow-hidden" :ui="{
                    th: 'text-gray-800 bg-neutral-50 border-b border-neutral-200',
                    td: 'border-b border-neutral-200'
                }" />
            <div class="flex justify-center  pt-4 px-4">
                <UPagination :page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
                    :items-per-page="table?.tableApi?.getState().pagination.pageSize"
                    :total="table?.tableApi?.getFilteredRowModel().rows.length"
                    @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)" active-color="error"
                    active-variant="solid" color="error" :ui="{
                        root: 'w-fit',
                        list: 'bg-white p-2 rounded-lg ring-1 ring-gray-300 gap-1',
                    }" />
            </div>
        </div>
    </section>
</template> -->

<script setup>
// const orders = ref([])
// const pending = ref(true)

// async function loadOrders() {
//     pending.value = true
//     try {
//         const res = await $fetch('/api/orders')
//         if (res.success) {
//             orders.value = res.data
//         }
//     } catch (err) {
//         console.error('Failed to fetch orders', err)
//     } finally {
//         pending.value = false
//     }
// }

// onMounted(() => {
//     loadOrders()
// })

definePageMeta({ middleware: 'auth' })

const { data: orders, pending } = useLazyFetch('/api/orders', {
    transform: (res) => res.success ? res.data : [],
    default: () => [],
})

const statusConfig = {
    placed: { label: 'Placed', color: 'text-blue-600', bg: 'bg-blue-50', icon: 'i-lucide-package' },
    confirmed: { label: 'Confirmed', color: 'text-indigo-600', bg: 'bg-indigo-50', icon: 'i-lucide-check-circle' },
    shipped: { label: 'Shipped', color: 'text-orange-600', bg: 'bg-orange-50', icon: 'i-lucide-truck' },
    delivered: { label: 'Delivered', color: 'text-green-600', bg: 'bg-green-50', icon: 'i-lucide-package-check' },
    cancelled: { label: 'Cancelled', color: 'text-red-600', bg: 'bg-red-50', icon: 'i-lucide-x-circle' },
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    })
}
</script>

<template>
    <section>
        <!-- Loading -->
        <div v-if="pending" class="space-y-4 p-4">
            <USkeleton v-for="i in 3" :key="i" class="h-32 w-full rounded-xs" />
        </div>

        <!-- No Orders -->
        <div v-else-if="!orders.length" class="text-center py-16">
            <UIcon name="i-lucide-package-x" class="size-12 text-neutral-300 mx-auto mb-3" />
            <p class="text-neutral-500">No orders yet</p>
            <ButtonUButton label="Start Shopping" to="/products" class="mt-4" />
        </div>

        <!-- Orders List -->
        <div v-else class="space-y-4">
            <div class="p-4 bg-neutral-100 rounded-xs">
                <h2 class="text-xl font-bold text-gray-800">My Orders</h2>
                <p class="text-sm text-neutral-500 mt-1">{{ orders.length }} {{ orders.length === 1 ? 'order' : 'orders'
                }}</p>
            </div>

            <UCard v-for="order in orders" :key="order._id"
                class="bg-white ring-1 ring-neutral-200 rounded-xs hover:ring-neutral-300 transition-all cursor-pointer"
                @click="navigateTo(`/account/orders/${order._id}`)">
                <!-- Header row -->
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-2">
                        <span class="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                            :class="[statusConfig[order.orderStatus]?.bg, statusConfig[order.orderStatus]?.color]">
                            <UIcon :name="statusConfig[order.orderStatus]?.icon" class="size-3.5" />
                            {{ statusConfig[order.orderStatus]?.label || order.orderStatus }}
                        </span>
                        <span class="text-xs text-neutral-400">·</span>
                        <span class="text-xs text-neutral-500">{{ formatDate(order.createdAt) }}</span>
                    </div>
                    <UIcon name="i-lucide-chevron-right" class="size-4 text-neutral-400" />
                </div>

                <!-- Items thumbnail strip -->
                <div class="flex items-center gap-3">
                    <div class="flex -space-x-3">
                        <img v-for="(item, idx) in order.items.slice(0, 3)" :key="idx" :src="item.image"
                            class="w-14 h-14 rounded-lg object-cover ring-2 ring-white" />
                        <div v-if="order.items.length > 3"
                            class="w-14 h-14 rounded-lg bg-neutral-100 ring-2 ring-white flex items-center justify-center text-xs font-medium text-neutral-600">
                            +{{ order.items.length - 3 }}
                        </div>
                    </div>

                    <div class="min-w-0 flex-1">
                        <p class="text-sm font-medium text-gray-800 line-clamp-1">
                            {{ order.items[0]?.title }}
                            <span v-if="order.items.length > 1" class="text-neutral-500">
                                + {{ order.items.length - 1 }} more
                            </span>
                        </p>
                        <p class="text-xs text-neutral-500 mt-0.5">
                            {{order.items.reduce((sum, i) => sum + i.quantity, 0)}} items
                        </p>
                    </div>
                </div>

                <USeparator class="my-3" :ui="{ border: 'border-t-neutral-200' }" />

                <!-- Footer row -->
                <div class="flex items-center justify-between">
                    <span class="text-xs text-neutral-500">Order ID: {{ order._id.slice(-8).toUpperCase() }}</span>
                    <span class="text-sm font-semibold text-gray-800">₹{{ order.totalAmount }}</span>
                </div>
            </UCard>
        </div>
    </section>
</template>