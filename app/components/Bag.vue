<script setup>
import { useCartStore } from '~~/store/cart'
const cartStore = useCartStore()
const isOpen = defineModel('open', { default: false })


</script>

<template>
    <div class="relative">
        <ButtonUButton icon="i-lucide-shopping-bag" color="neutral" variant="ghost" aria-label="Open bag"
            class="text-gray-800 hover:text-white cursor-pointer" @click="isOpen = true" />

        <span v-if="cartStore.totalItems > 0" class="absolute -top-1 -right-1 flex items-center justify-center
             h-4 w-4 rounded-full bg-primary text-white text-[10px] font-medium">
            {{ cartStore.totalItems }}
        </span>

        <USlideover v-model:open="isOpen" side="right" :ui="{
            content: 'max-w-xs lg:max-w-md bg-white',
            footer: 'flex-col'
        }">
            <template #header>
                <h2 class="text-base font-semibold ">
                    Bag ({{ cartStore.totalItems }})
                </h2>
            </template>

            <template #body>
                <BagItems />
            </template>

            <template v-if="cartStore.items.length > 0" #footer>
                <div class="w-full flex flex-col gap-2">
                    <div class="flex justify-between text-sm font-medium">
                        <span>Total</span>
                        <span>{{ formatPrice(cartStore.totalPrice) }}</span>
                    </div>
                    <ButtonUButton label="Go to Bag" block size="lg" color="primary" to="/cart" @click="isOpen = false"
                        class="bg-indigo-600 text-white p-3 hover:bg-indigo-600 active:bg-indigo-600" />
                    <p class="text-sm text-center text-gray-500"> or </p>
                    <ButtonUButton label="Go to Checkout" block size="lg" variant="ghost" color="primary" to="/checkout"
                        @click="isOpen = false" class="text-indigo-600 p-0" />
                </div>
            </template>
        </USlideover>
    </div>
</template>