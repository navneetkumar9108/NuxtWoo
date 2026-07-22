<script setup>
import { useWishlistStore } from '~~/store/wishlist'
import { useCartStore } from '~~/store/cart'
// definePageMeta({ middleware: 'auth' })

const wishlistStore = useWishlistStore() // agar nahi banaya to bata dena, wo bhi bana du
const cartStore = useCartStore()

function moveToBag(item) {
    console.log('item', item);
    cartStore.addToCart(item)
    wishlistStore.removeFromWishlist(item.id)
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
                root: 'bg-white w-52.5 mx-auto rounded-xs',
                header: 'p-0 sm:p-0',
                body: 'p-0 sm:p-2'
            }">
                <template #header>
                    <ImageImg :src="item.image" :alt="item.title" class=" w-full h-full object-contain " />
                    <!-- <img :src="item.image" class="w-full h-70 object-cover rounded-xs" /> -->
                </template>
                <ProductInfo :brand="item.name" :title="item.title" />
                <ProductPrice :price="item.price" :originalPrice="item.originalPrice" :discount="item.discount" />
                <!-- <p class="text-sm font-medium line-clamp-1">{{ item.name }}</p>
                <p class="text-sm font-semibold mt-1">₹{{ item.price }}</p> -->

                <div class="flex gap-2 mt-3">
                    <UButton size="xs" block @click="moveToBag(item)">Move to Bag</UButton>
                    <UButton size="xs" variant="ghost" color="error" icon="i-lucide-trash-2"
                        @click="wishlistStore.removeFromWishlist(item.id)" />
                </div>
            </UCard>
        </div>
    </UContainer>
</template>