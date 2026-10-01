<script setup>
definePageMeta({
    middleware: 'admin',
})

const router = useRouter()
const toast = useToast()
const submitting = ref(false)

async function handleSubmit(formData) {
    submitting.value = true
    try {
        const res = await $fetch('/api/admin/products/create', {
            method: 'POST',
            body: formData,
        })

        if (res.success) {
            toast.add({ title: 'Product created', color: 'success', icon: 'i-lucide-check-circle' })
            router.push('/admin/products')
        } else {
            toast.add({ title: res.message || 'Failed to create product', color: 'error', icon: 'i-lucide-alert-circle' })
        }
    } catch (err) {
        toast.add({ title: err.data?.message || 'Something went wrong', color: 'error', icon: 'i-lucide-alert-circle' })
    } finally {
        submitting.value = false
    }
}


</script>

<template>
    <UContainer class="py-8">
        <h1 class="text-2xl font-bold mb-6">Add New Product</h1>
        <AdminProductForm @submit="handleSubmit" />
    </UContainer>
</template>