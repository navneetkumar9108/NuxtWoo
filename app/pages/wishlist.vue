<script setup>
import { useWishlistStore } from '~~/store/wishlist'
import { useCartStore } from '~~/store/cart'

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()
const toast = useToast()
definePageMeta({ middleware: 'auth' })

const sizeModalOpen = ref(false)
const activeItem = ref(null)
const selectedSizeId = ref(null)
const availableSizes = ref([])
const loadingSizes = ref(false)

onMounted(() => {
    wishlistStore.fetchWishlist()
})

async function moveToBag(item) {
    activeItem.value = item
    selectedSizeId.value = null
    sizeModalOpen.value = true
    loadingSizes.value = true

    // Product se us color ke available sizes fetch karo
    try {
        const res = await $fetch(`/api/products/by-id/${item.productId}`)
        if (res.success) {
            const color = res.data.colors.find((c) => c._id === item.colorId)
            availableSizes.value = color?.sizes || []
        }
    } catch (err) {
        console.error('Failed to load sizes', err)
        availableSizes.value = []
    } finally {
        loadingSizes.value = false
    }
}

async function confirmMoveToBag() {
    if (!selectedSizeId.value) {
        toast.add({ title: 'Please select a size', color: 'error', icon: 'i-lucide-alert-circle' })
        return
    }

    const result = await cartStore.addToCart({
        productId: activeItem.value.productId,
        colorId: activeItem.value.colorId,
        sizeId: selectedSizeId.value,
        quantity: 1,
    })

    if (result?.success) {
        await wishlistStore.removeFromWishlist(activeItem.value._id)
        toast.add({ title: 'Item moved to bag', color: 'success', icon: 'i-lucide-check-circle' })
        sizeModalOpen.value = false
    } else {
        toast.add({ title: result?.message || 'Failed to move to bag', color: 'error', icon: 'i-lucide-alert-circle' })
    }
}

async function handleRemove(itemId) {
    await wishlistStore.removeFromWishlist(itemId)
    toast.add({ title: 'Item removed from wishlist', color: 'success', icon: 'i-lucide-check-circle' })
}
</script>

<template>
    <UContainer class="py-8">
        <h1 class="text-xl font-bold mb-6">My Wishlist ({{ wishlistStore.items.length }})</h1>

        <div v-if="wishlistStore.loading" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <USkeleton v-for="i in 5" :key="i" class="h-64 w-52.5 mx-auto rounded-xs" />
        </div>

        <div v-else-if="!wishlistStore.items.length" class="text-center py-16">
            <UIcon name="i-lucide-heart" class="size-12 text-neutral-300 mx-auto mb-3" />
            <p class="text-neutral-500">Your wishlist is empty</p>
            <ButtonUButton label="Explore Products" to="/products" class="mt-4" />
        </div>

        <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <UCard v-for="item in wishlistStore.items" :key="item._id" :ui="{
                root: 'bg-white w-52.5 mx-auto rounded-xs ring-0',
                header: 'p-0 sm:p-0',
                body: 'p-0 sm:p-2',
            }">
                <template #header>
                    <ImageImg :src="item.image" :alt="item.title" class="w-full h-full object-contain" />
                </template>
                <ProductInfo :brand="item.brandName" :title="item.title" />
                <ProductPrice :price="item.price" :originalPrice="item.originalPrice" :discount="item.discount"
                    class="text-sm text-gray-800 mt-1.5 sm:mt-2.5 mb-1.5" />

                <div class="flex gap-2 mt-3">
                    <ButtonUButton label="Move to Bag" size="xs" block @click="moveToBag(item)"
                        class="bg-red-400 text-white hover:bg-red-500 active:bg-red-600 rounded-xs p-1" />
                    <ButtonUButton size="xs" variant="ghost" color="error" icon="i-lucide-trash-2"
                        @click="handleRemove(item._id)" />
                </div>
            </UCard>
        </div>

        <!-- Select Size Modal -->
        <UModal v-model:open="sizeModalOpen" :ui="{ content: 'max-w-sm bg-white rounded-xs' }">
            <template #header>
                <h2 class="text-base font-semibold">Select Size</h2>
            </template>

            <template #body>
                <USkeleton v-if="loadingSizes" class="h-11 w-full rounded-xs" />

                <div v-else class="grid grid-cols-5 gap-3 justify-items-center">
                    <button v-for="size in availableSizes" :key="size._id" type="button" :disabled="size.stock === 0"
                        class="size-11 rounded-full border flex items-center justify-center text-sm font-medium transition-colors"
                        :class="[
                            selectedSizeId === size._id
                                ? 'border-primary text-primary'
                                : 'border-neutral-300 text-neutral-700 hover:border-neutral-400',
                            size.stock === 0 ? 'opacity-40 cursor-not-allowed line-through' : '',
                        ]" @click="selectedSizeId = size._id">
                        {{ size.name }}
                    </button>
                </div>

                <ButtonUButton label="Done" block size="lg" color="primary"
                    class="mt-6 bg-red-400 text-white hover:bg-red-500 active:bg-red-600 rounded-xs p-3"
                    @click="confirmMoveToBag" />
            </template>
        </UModal>
    </UContainer>
</template>