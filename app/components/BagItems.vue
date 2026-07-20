<script setup>
import { useCartStore } from '~~/store/cart'
const cartStore = useCartStore()
</script>

<template>
    <div v-if="cartStore.items.length === 0" class="text-center py-16 text-neutral-500">
        <UIcon name="i-lucide-shopping-bag" class="size-10 mx-auto mb-3 text-neutral-300" />
        <p>Your bag is empty</p>
        <ButtonUButton label="Continue Shopping" variant="link" color="primary" to="/" class="mt-2" />
    </div>

    <div v-else class="flex flex-col gap-4">
        <div v-for="item in cartStore.items" :key="item.id"
            class="flex gap-3 border-b border-neutral-200 pb-4 last:border-b-0">
            <ImageImg :src="item.image" :alt="item.name" class="w-20 h-24 object-contain rounded-md shrink-0" />

            <div class="flex-1 flex flex-col justify-between min-w-0">
                <div>
                    <p class="text-sm font-medium line-clamp-1">{{ item.name }}</p>
                    <p v-if="item.size || item.color" class="text-xs text-neutral-500 mt-0.5">
                        <span v-if="item.size">Size: {{ item.size }}</span>
                        <span v-if="item.size && item.color"> · </span>
                        <span v-if="item.color">{{ item.color }}</span>
                    </p>
                    <p class="text-sm font-semibold mt-1">{{ formatPrice(item.price) }}</p>
                </div>

                <div class="flex items-center justify-between mt-2">
                    <div class="flex items-center gap-2">
                        <ButtonUButton icon="i-lucide-minus" color="neutral" variant="outline" size="xs"
                            :disabled="item.quantity <= 1" aria-label="Decrease quantity"
                            @click="cartStore.decreaseQuantity(item.id)" />
                        <span
                            class="inline-flex items-center justify-center w-10 h-7 text-sm font-medium border border-neutral-200 rounded-md">
                            {{ item.quantity }}
                        </span>
                        <ButtonUButton icon="i-lucide-plus" color="neutral" variant="outline" size="xs"
                            aria-label="Increase quantity" @click="cartStore.increaseQuantity(item.id)" />
                    </div>

                    <ButtonUButton icon="i-lucide-trash-2" color="error" variant="ghost" size="xs"
                        aria-label="Remove item" @click="cartStore.removeFromCart(item.id)" />
                </div>
            </div>
        </div>
    </div>
</template>