<script setup>
import { useWishlistStore } from '~~/store/wishlist'
import { useCartStore } from '~~/store/cart'
// definePageMeta({ middleware: 'auth' })

const wishlistStore = useWishlistStore() // agar nahi banaya to bata dena, wo bhi bana du
const cartStore = useCartStore()

// function moveToBag(item) {
//     console.log('item', item);
//     cartStore.addToCart(item)
//     wishlistStore.removeFromWishlist(item.id)
// }

const toast = useToast()

const sizeModalOpen = ref(false)
const activeItem = ref(null)
const selectedSize = ref(null)

function moveToBag(item) {
    activeItem.value = item
    selectedSize.value = null
    sizeModalOpen.value = true
}

function confirmMoveToBag() {
    if (!selectedSize.value) {
        toast.add({ title: 'Please select a size', color: 'error', icon: 'i-lucide-alert-circle' })
        return
    }
    console.log('item', activeItem.value)
    cartStore.addToCart({ ...activeItem.value, selectedSize: selectedSize.value })
    wishlistStore.removeFromWishlist(activeItem.value.id)
    toast.add({ title: 'Item moved to bag', color: 'success', icon: 'i-lucide-check-circle' })
    sizeModalOpen.value = false
}
</script>

<template>
    <UContainer class="py-8">
        <h1 class="text-xl font-bold mb-6">My Wishlist ({{ wishlistStore.items.length }})</h1>

        <div v-if="!wishlistStore.items.length" class="text-center py-16">
            <UIcon name="i-lucide-heart" class="size-12 text-neutral-300 mx-auto mb-3" />
            <p class="text-neutral-500">Your wishlist is empty</p>
            <UButton to="/products" class="mt-4">Explore Products</UButton>
        </div>

        <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">


            <UCard v-for="item in wishlistStore.items" :key="item.id" :ui="{
                root: 'bg-white w-52.5 mx-auto rounded-xs ring-0',
                header: 'p-0 sm:p-0',
                body: 'p-0 sm:p-2'
            }">
                <template #header>
                    <ImageImg :src="item.image" :alt="item.title" class=" w-full h-full object-contain " />
                    <!-- <img :src="item.image" class="w-full h-70 object-cover rounded-xs" /> -->
                </template>
                <ProductInfo :brand="item.name" :title="item.title" />
                <ProductPrice :price="item.price" :originalPrice="item.originalPrice" :discount="item.discount"
                    class="text-sm text-gray-800 mt-1.5 sm:mt-2.5 mb-1.5" />
                <!-- <p class="text-sm font-medium line-clamp-1">{{ item.name }}</p>
                <p class="text-sm font-semibold mt-1">₹{{ item.price }}</p> -->

                <div class="flex gap-2 mt-3">
                    <!-- <UButton size="xs" block @click="moveToBag(item)">Move to Bag</UButton> -->
                    <UButton size="xs" block @click="moveToBag(item)"
                        class="bg-red-400 text-white hover:bg-red-500 active:bg-red-600 rounded-xs p-1">
                        Move to Bag
                    </UButton>
                    <UButton size="xs" variant="ghost" color="error" icon="i-lucide-trash-2" @click="() => {
                        wishlistStore.removeFromWishlist(item.id)
                        toast.add({ title: 'Item removed from wishlist', color: 'success', icon: 'i-lucide-check-circle' })
                    }" />
                </div>
            </UCard>
        </div>
        <!-- Select Size Modal -->
        <UModal v-model:open="sizeModalOpen" :ui="{ content: 'max-w-sm bg-white rounded-xs' }">
            <template #header>
                <h2 class="text-base font-semibold">Select Size</h2>
            </template>

            <template #body>
                <div class="grid grid-cols-5 gap-3 justify-items-center">
                    <button v-for="size in activeItem?.sizes || []" :key="size.sizeId" type="button"
                        :disabled="size.stock === 0"
                        class="size-11 rounded-full border flex items-center justify-center text-sm font-medium transition-colors"
                        :class="[
                            selectedSize === size.id
                                ? 'border-primary text-primary'
                                : 'border-neutral-300 text-neutral-700 hover:border-neutral-400',
                            size.stock === 0 ? 'opacity-40 cursor-not-allowed line-through' : ''
                        ]" @click="selectedSize = size.name">
                        {{ size.name }}
                    </button>
                </div>

                <UButton block size="lg" color="primary" class="mt-6  bg-red-400 text-white hover:bg-red-500
                    active:bg-red-600 rounded-xs p-3" @click="confirmMoveToBag">
                    Done
                </UButton>
            </template>
        </UModal>

    </UContainer>
</template>