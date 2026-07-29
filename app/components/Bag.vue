<script setup>
import { useCartStore } from '~~/store/cart'
const cartStore = useCartStore()
const noteOpen = ref(true)
const orderNote = ref('')
const isOpen = defineModel('open', { default: false })

function applyNote() {
    cartStore.setOrderNote(orderNote.value)
    noteOpen.value = false
    console.log('store orderNote:', cartStore.orderNote)

}
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
            content: 'max-w-md bg-white',
            footer: 'flex-col'
        }">
            <template #header>
                <h2 class="text-base font-semibold">
                    Bag ({{ cartStore.totalItems }})
                </h2>
            </template>

            <template #body>
                <BagItems />

            </template>

            <template v-if="cartStore.items.length > 0" #footer>
                <UCard class="bg-neutral-200 ring-0 rounded-xs w-full">
                    <UCollapsible v-model:open="noteOpen">
                        <button type="button" class="flex items-center justify-between w-full">
                            <span class="flex items-center gap-1 font-medium text-sm">
                                <UIcon name="i-lucide-pencil" class="size-4" />
                                Order note
                            </span>
                            <UIcon name="i-lucide-chevron-up" class="size-4 transition-transform"
                                :class="noteOpen ? '' : 'rotate-180'" />
                        </button>

                        <template #content>
                            <UTextarea v-model="orderNote" placeholder="Order special instructions" :rows="4"
                                class="w-full mt-4"
                                :ui="{ base: 'bg-neutral-100 border-0 text-gray-800 ring-gray-200 focus-visible:ring-gray-200 focus-visible:ring-1' }" />

                            <UButton label="Apply"
                                class="mt-4  px-6 bg-indigo-600 text-white  hover:bg-indigo-600 active:bg-indigo-600"
                                color="primary" @click="applyNote" />
                        </template>
                    </UCollapsible>
                    <p v-if="!noteOpen && cartStore.orderNote" class="text-xs text-neutral-500 mt-2 line-clamp-2">
                        {{ cartStore.orderNote }}
                    </p>
                </UCard>
                <div class="w-full flex flex-col gap-3">
                    <div class="flex justify-between text-sm font-medium">
                        <span>Total</span>
                        <span>{{ formatPrice(cartStore.totalPrice) }}</span>
                    </div>
                    <ButtonUButton label="Go to Bag" block size="lg" color="primary" to="/cart" @click="isOpen = false"
                        class="bg-indigo-600 text-white p-3 hover:bg-indigo-600 active:bg-indigo-600" />
                </div>
            </template>
        </USlideover>
    </div>
</template>