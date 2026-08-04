<script setup>
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
// function loadOrders() {
//     orders.value = JSON.parse(
//         localStorage.getItem('orders') || '[]'
//     )
//     orders.value = all.filter(o => o.userEmail === auth.user?.email)
// }

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
    // {
    //     accessorKey: 'orderId',
    //     header: 'Order ID'
    // },
    // {
    //     accessorKey: 'items',
    //     header: 'Product',

    //     cell: ({ row }) => {
    //         const items = row.original.items || []

    //         return h(
    //             'div',
    //             { class: 'flex flex-col gap-3 min-w-60' },
    //             items.map((product) =>
    //                 h(
    //                     'div',
    //                     { class: 'flex items-center gap-3' },
    //                     [
    //                         h('img', {
    //                             src: product?.image,
    //                             alt: product?.name,
    //                             class: 'w-20 h-full object-cover rounded-xl shrink-0'
    //                         }),

    //                         h('div', undefined, [
    //                             h('p', { class: 'font-medium text-gray-800' }, product?.name),
    //                             h('p', { class: 'text-xs text-muted mt-0.5' }, product?.title),
    //                             h('p', { class: 'text-xs text-muted' }, `Size: ${product?.size}`)
    //                         ])
    //                     ]
    //                 )
    //             )
    //         )
    //     }
    // },
    {
        accessorKey: 'items',
        header: 'Product',

        cell: ({ row }) => {
            // const product = row.original.items?.[0]
            const product = row.original.product


            return h(
                'div',
                {
                    class: 'flex items-start gap-3 min-w-60'
                },
                [
                    h('img', {
                        src: product?.image,
                        alt: product?.name,
                        class: 'w-20 h-full object-cover rounded-xl shrink-0'
                    }),

                    h('div', undefined, [
                        h(
                            'p',
                            {
                                class: 'font-medium text-gray-800'
                            },
                            product?.name
                        ),

                        h(
                            'p',
                            {
                                class: 'text-xs text-muted mt-0.5'
                            },
                            product?.title
                        ),

                        h(
                            'p',
                            {
                                class: 'text-xs text-muted'
                            },
                            `Size: ${product?.size} · Quantity: ${product?.quantity}`
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
            return new Date(row.getValue('date')).toLocaleString('en-US', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
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
                {
                    class: `font-medium capitalize ${statusClasses[status] || 'text-neutral-600'
                        }`
                },
                [
                    status?.replace('_', ' ') || 'Placed',

                    status === 'cancelled' && cancelReason
                        ? h(
                            'p',
                            {
                                class: 'text-xs text-red-400 mt-1'
                            },
                            cancelReason
                        )
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
                resolveComponent('UButton'),
                {
                    icon: 'i-lucide-chevron-right',
                    variant: 'ghost',
                    color: 'neutral',
                    class: 'text-red-500 hover:bg-neutral-100',
                    to: { path: `/account/orders/${row.original.orderId}`, query: { itemId: row.original.product.id } }
                }
            )
        }
    }
]
// const globalFilter = ref('')

</script>

<template>
    <section>
        <!-- No Orders -->
        <div v-if="!orders.length" class="text-center py-16">
            <UIcon name="i-lucide-package-x" class="size-12 text-neutral-300 mx-auto mb-3" />

            <p class="text-neutral-500">
                No orders yet
            </p>

            <UButton to="/products" class="mt-4">
                Start Shopping
            </UButton>
        </div>

        <!-- Orders Table -->

        <div v-else class="">
            <!-- <div  class="sticky left-0 z-10 flex items-end justify-between gap-4 p-4 bg-elevated/50"> -->
            <div class="  p-4 bg-neutral-300">
                <h2 class="text-2xl font-bold text-highlighted">My Orders</h2>

            </div>
            <!-- </div> -->

            <UTable ref="table" :data="flatOrders" :columns="columns" v-model:pagination="pagination"
                :pagination-options="{ getPaginationRowModel: getPaginationRowModel() }"
                class="w-full border border-neutral-200 rounded-xs overflow-hidden" :ui="{
                    th: 'text-gray-800 bg-neutral-50 border-b border-neutral-200',
                    td: 'border-b border-neutral-200'
                }" />
            <!-- Pagination -->
            <div class="flex justify-center  pt-4 px-4">
                <UPagination :page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
                    :items-per-page="table?.tableApi?.getState().pagination.pageSize"
                    :total="table?.tableApi?.getFilteredRowModel().rows.length"
                    @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)" />
            </div>
        </div>
    </section>
    <!-- </UContainer> -->
</template>
