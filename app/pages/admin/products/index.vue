<script setup>
import { getPaginationRowModel } from '@tanstack/vue-table'

definePageMeta({
    middleware: 'admin',
    title: 'Products'
})

const route = useRoute()
const router = useRouter()

const table = useTemplateRef('table')
const products = ref([])
const pending = ref(true)
const deletingId = ref(null)
const globalFilter = ref('')
const pagination = ref({
    pageIndex: Math.max(Number(route.query.page || 1) - 1, 0),
    pageSize: 8
})

// page change hone pe URL update
watch(
    () => pagination.value.pageIndex,
    (i) => router.replace({ query: { ...route.query, page: i + 1 } })
)

// search badalne pe wapas page 1
watch(globalFilter, () => {
    pagination.value.pageIndex = 0
})



const columns = [
    {
        id: 'product',
        header: 'Product',
        accessorFn: (row) =>
            [row.title, row.brand?.name, row.category?.name, row.sku].filter(Boolean).join(' ')
    },
    {
        id: 'status',
        header: 'Status',
        accessorFn: (row) => (row.isActive ? 'Active' : 'Inactive')
    },
    {
        id: 'actions',
        header: '',
        meta: { class: { th: 'text-right', td: 'text-right' } }
    }
]


async function loadProducts() {
    pending.value = true
    try {
        const res = await $fetch('/api/admin/products')
        if (res.success) {
            products.value = res.data
        }
    } catch (err) {
        console.error('Failed to load products', err)
    } finally {
        pending.value = false
    }
}

async function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return

    deletingId.value = id
    try {
        const res = await $fetch(`/api/admin/products/${id}/delete`, { method: 'DELETE' })
        if (res.success) {
            products.value = products.value.filter((p) => p._id !== id)
        }
    } catch (err) {
        console.error('Failed to delete product', err)
    } finally {
        deletingId.value = null
    }
}


onMounted(() => {
    loadProducts()
})
</script>

<template>
    <!-- <UContainer class="py-8"> -->
    <div>
        <div class="flex items-center justify-between mb-2">
            <h1 class="text-2xl font-bold">Manage Products</h1>
            <ButtonUButton label="Add New Product" icon="i-lucide-plus" to="/admin/products/new"
                class="bg-indigo-600 rounded-sm" />
        </div>

        <div v-if="pending" class="space-y-3">
            <USkeleton v-for="i in 5" :key="i" class="h-20 w-full rounded-xs" />
        </div>

        <div v-else-if="!products.length" class="text-center py-16 text-neutral-500">
            No products yet
        </div>

        <div v-else class="space-y-3">
            <!-- <UCard v-for="product in products" :key="product._id" class="bg-white ring-1 ring-neutral-200 rounded-xs">
                <div class="flex items-center gap-4">
                    <img :src="product.colors?.[0]?.thumbnail" class="w-16 h-16 object-cover rounded-lg shrink-0" />

                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold line-clamp-1">{{ product.title }}</p>
                        <p class="text-xs text-neutral-500">
                            {{ product.brand?.name }} · {{ product.category?.name }} · SKU: {{ product.sku }}
                        </p>
                        <p class="text-xs text-neutral-500 mt-1">
                            {{ product.colors?.length || 0 }} colors · ₹{{ product.colors?.[0]?.pricing?.price || '—' }}
                        </p>
                    </div>

                    <div class="flex items-center gap-2 shrink-0">
                        <UBadge v-if="product.isActive" label="Active" color="success" variant="subtle" size="sm" />
                        <UBadge v-else label="Inactive" color="neutral" variant="subtle" size="sm" />

                        <ButtonUButton icon="i-lucide-pencil" variant="ghost" color="neutral" size="sm"
                            :to="`/admin/products/${product._id}`" />
                        <ButtonUButton icon="i-lucide-trash-2" variant="ghost" color="error" size="sm"
                            :loading="deletingId === product._id" @click="deleteProduct(product._id)" />
                    </div>
                </div>
            </UCard> -->
            <div class="bg-white ring-1 ring-neutral-200 rounded-xs">
                <div class="flex px-4 py-3.5 border-b border-accented">
                    <UInput v-model="globalFilter" class="max-w-sm" placeholder="Search products..." :ui="{
                        base: 'focus-visible:ring-gray-400 rounded-sm'
                    }" />
                </div>

                <UTable ref="table" v-model:pagination="pagination" v-model:global-filter="globalFilter"
                    :data="products" :columns="columns" :get-row-id="(row) => row._id" :pagination-options="{
                        getPaginationRowModel: getPaginationRowModel(), autoResetPageIndex: false
                    }" :ui="{ thead: '', td: 'py-4' }">
                    <template #product-cell="{ row }">
                        <div class="flex items-center gap-4">
                            <img :src="row.original.colors?.[0]?.thumbnail" :alt="row.original.title"
                                class="w-16 h-16 object-cover rounded-lg shrink-0" />
                            <div class="min-w-0">
                                <p class="text-sm font-semibold line-clamp-1">{{ row.original.title }}</p>
                                <p class="text-xs text-neutral-500">
                                    {{ row.original.brand?.name }} · {{ row.original.category?.name }} · SKU: {{
                                        row.original.sku }}
                                </p>
                                <p class="text-xs text-neutral-500 mt-1">
                                    {{ row.original.colors?.length || 0 }} colors · ₹{{
                                        row.original.colors?.[0]?.pricing?.price || '—' }}
                                </p>
                            </div>
                        </div>
                    </template>

                    <template #status-cell="{ row }">
                        <UBadge :label="row.original.isActive ? 'Active' : 'Inactive'"
                            :color="row.original.isActive ? 'success' : 'neutral'" variant="subtle" size="sm" />
                    </template>

                    <template #actions-cell="{ row }">
                        <div class="flex items-center justify-end gap-1">
                            <ButtonUButton icon="i-lucide-pencil" variant="ghost" color="neutral" size="sm"
                                :to="`/admin/products/${row.original._id}`" />
                            <ButtonUButton icon="i-lucide-trash-2" variant="ghost" color="error" size="sm"
                                :loading="deletingId === row.original._id" @click="deleteProduct(row.original._id)" />
                        </div>
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