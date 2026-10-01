<script setup>
definePageMeta({
    middleware: 'admin',
})

const route = useRoute()
const router = useRouter()
const toast = useToast()
const submitting = ref(false)

const { data: productRes, pending } = await useFetch(`/api/admin/products/${route.params.id}`)

async function handleSubmit(formData) {
    submitting.value = true
    try {
        const res = await $fetch(`/api/admin/products/${route.params.id}/update`, {
            method: 'PATCH',
            body: formData,
        })

        if (res.success) {
            toast.add({ title: 'Product updated', color: 'success', icon: 'i-lucide-check-circle' })
            router.push('/admin/products')
        } else {
            toast.add({ title: res.message || 'Failed to update product', color: 'error', icon: 'i-lucide-alert-circle' })
        }
    } catch (err) {
        toast.add({ title: err.data?.message || 'Something went wrong', color: 'error', icon: 'i-lucide-alert-circle' })
    } finally {
        submitting.value = false
    }
}
</script>

<template>
    <UContainer class="py-8 ">
        <h1 class="text-2xl font-bold mb-6">Edit Product</h1>

        <USkeleton v-if="pending" class="h-96 w-full rounded-xs" />

        <AdminProductForm v-else-if="productRes?.data" :initial-data="productRes.data" @submit="handleSubmit" />

        <div v-else class="text-center py-16 text-neutral-500">Product not found</div>
    </UContainer>
</template>