<script setup>
definePageMeta({
    middleware: 'admin',
})

const products = ref([])
const pending = ref(true)
const deletingId = ref(null)

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
    <UContainer class="py-8">
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-bold">Manage Products</h1>
            <ButtonUButton label="Add New Product" icon="i-lucide-plus" to="/admin/products/new" color="primary" />
        </div>

        <div v-if="pending" class="space-y-3">
            <USkeleton v-for="i in 5" :key="i" class="h-20 w-full rounded-xs" />
        </div>

        <div v-else-if="!products.length" class="text-center py-16 text-neutral-500">
            No products yet
        </div>

        <div v-else class="space-y-3">
            <UCard v-for="product in products" :key="product._id" class="bg-white ring-1 ring-neutral-200 rounded-xs">
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
            </UCard>
        </div>
    </UContainer>
</template>