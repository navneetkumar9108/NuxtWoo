<script setup>
import { useCartStore } from '~~/store/cart'
const cartStore = useCartStore()
</script>

<template>
    <div v-if="cartStore.items.length === 0" class="text-center py-16 text-neutral-500">
        <UIcon name="i-lucide-shopping-bag" class="size-10 mx-auto mb-3 text-neutral-300" />
        <p>Your bag is empty</p>
        <ButtonUButton label="Continue Shopping" variant="link" color="primary" to="/products" class="mt-2" />
    </div>

    <div v-else class="flex flex-col gap-4">
        <div v-for="item in cartStore.items" :key="item.id"
            class="flex gap-3 border-b border-neutral-200 pb-4 last:border-b-0">
            <ImageImg :src="item.image" :alt="item.name" class="w-20 h-full object-contain rounded-md shrink-0" />

            <div class="flex-1 flex flex-col justify-between min-w-0">
                <div>
                    <p class="text-sm font-medium line-clamp-1">{{ item.title }}</p>
                    <p v-if="item.sizeName || item.colorName" class="text-xs text-neutral-500 mt-0.5">
                        <span v-if="item.sizeName">Size: {{ item.sizeName }}</span>
                        <span v-if="item.sizeName && item.colorName"> · </span>
                        <span v-if="item.colorName">Color: {{ item.colorName }}</span>
                    </p>
                    <p class="text-sm font-semibold mt-1">{{ formatPrice(item.price) }}</p>
                </div>

                <div class="flex items-center justify-between mt-2">
                    <UInputNumber :model-value="item.quantity" :min="1" size="sm" class=" w-28 "
                        @update:model-value="(qty) => cartStore.updateQuantity(item._id, qty)" :ui="{
                            base: 'bg-neutral-100 text-gray-800 p-2 ring-gray-200 focus-visible:ring-gray-200 focus-visible:ring-1 rounded-xs '
                        }">
                        <template #decrement>
                            <ButtonUButton size="xs" icon="i-lucide-minus" color="neutral" variant="outline"
                                class="bg-white ring-0 text-gray-800  hover:bg-white active:bg-white disabled:bg-gray-200 cursor-pointer" />
                            <!-- <UButton size="xs" icon="i-lucide-minus" color="neutral" variant="outline"
                                                class="bg-white ring-0 text-gray-800  hover:bg-white active:bg-white disabled:bg-gray-200 cursor-pointer" /> -->
                        </template>

                        <template #increment>
                            <ButtonUButton size="xs" icon="i-lucide-plus" color="neutral" variant="outline"
                                class="bg-white ring-0 text-gray-800 hover:bg-white active:bg-white cursor-pointer" />
                            <!-- <UButton size="xs" icon="i-lucide-plus" color="neutral" variant="outline"
                                                class="bg-white ring-0 text-gray-800 hover:bg-white active:bg-white cursor-pointer" /> -->
                        </template>
                    </UInputNumber>

                    <ButtonUButton icon="i-lucide-trash-2" color="error" variant="ghost" size="xs"
                        aria-label="Remove item" @click="cartStore.removeFromCart(item._id)" />
                </div>
            </div>
        </div>
    </div>
</template>