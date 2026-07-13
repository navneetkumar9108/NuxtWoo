<script setup>
import {useCartStore} from '~~/store/cart'
const cartStore = useCartStore()
const isOpen = ref(false)
</script>

<template>
    <div class="relative">
        <UButton icon="i-lucide-shopping-bag" color="neutral" variant="ghost" @click="isOpen = true" />
        <span v-if="cartStore.totalItems > 0" class="absolute -top-1 -right-1 flex items-center justify-center
             h-4 w-4 rounded-full bg-primary text-white text-[10px] font-medium">
            {{ cartStore.totalItems }}
        </span>

        <USlideover v-model:open="isOpen" side="right" :ui="{ content: 'max-w-md' }">
            <template #header>
                <h2 class="text-base font-semibold">
                    Bag ({{ cartStore.totalItems }})
                </h2>
            </template>

            <template #body>
                <div v-if="cartStore.items.length === 0" class="text-center py-16 text-neutral-500">
                    Your bag is empty
                </div>

                <div v-else class="flex flex-col gap-4">
                    <div v-for="item in cartStore.items" :key="`${item.id}-${item.variant}`"
                        class="flex gap-3 border-b border-neutral-200 pb-4">
                        <img :src="item.image" :alt="item.name" class="w-20 h-24 object-cover rounded-md" />

                        <div class="flex-1 flex flex-col justify-between">
                            <div>
                                <p class="text-sm font-medium line-clamp-1">{{ item.name }}</p>
                                <p v-if="item.variant" class="text-xs text-neutral-500">{{ item.variant }}</p>
                                <p class="text-sm font-semibold mt-1">₹{{ item.price }}</p>
                            </div>

                            <div class="flex items-center justify-between mt-2">
                                <UButtonGroup size="xs">
                                    <UButton icon="i-lucide-minus" color="neutral" variant="outline"
                                        @click="cartStore.updateQty(item.id, item.variant, item.qty - 1)" />
                                    <UButton color="neutral" variant="outline" :ui="{ base: 'pointer-events-none' }">
                                        {{ item.qty }}
                                    </UButton>
                                    <UButton icon="i-lucide-plus" color="neutral" variant="outline"
                                        @click="cartStore.updateQty(item.id, item.variant, item.qty + 1)" />
                                </UButtonGroup>

                                <UButton icon="i-lucide-trash-2" color="error" variant="ghost" size="xs"
                                    @click="cartStore.removeFromCart(item.id, item.variant)" />
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <template #footer v-if="cartStore.items.length > 0">
                <div class="w-full flex flex-col gap-3">
                    <div class="flex justify-between text-sm font-medium">
                        <span>Total</span>
                        <span>₹{{ cartStore.totalPrice }}</span>
                    </div>
                    <UButton block size="lg" color="primary" to="/checkout">
                        Checkout
                    </UButton>
                </div>
            </template>
        </USlideover>
    </div>
</template>