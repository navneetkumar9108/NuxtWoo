<script setup>
import { useAddressStore } from '~~/store/address';
import { useCartStore } from '~~/store/cart';
import { useWishlistStore } from '~~/store/wishlist';

//definePageMeta({ layout: 'checkout' })
const addressStore = useAddressStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const router = useRouter()
const toast = useToast()


const deliveryAddress = addressStore.selectedAddress

const qtyModalOpen = ref(false)
const activeItemId = ref(null)
const selectedQty = ref(1)

// const noteOpen = ref(true)
// const orderNote = ref('')

// function applyNote() {
//     cartStore.setOrderNote(orderNote.value)
//     noteOpen.value = false
//     console.log('store orderNote:', cartStore.orderNote)

// }

function moveToWishlist(item) {
    wishlistStore.addToWishlist(item)
    cartStore.removeFromCart(item.id)
}

function openQtyModal(item) {
    activeItemId.value = item.id
    selectedQty.value = item.quantity
    qtyModalOpen.value = true
}

function confirmQty() {
    cartStore.setQuantity(activeItemId.value, selectedQty.value)
    qtyModalOpen.value = false
}

console.log('cart', cartStore);
function goToAddress() {
    router.push('/checkout/address')
}
</script>

<template>
    <UContainer class="mt-10 mb-10">
        <div v-if="!cartStore.items.length" class="text-center py-16 h-screen ">
            <UIcon name="i-lucide-shopping-bag" class="size-12 text-neutral-300 mx-auto mb-3" />
            <p class="text-neutral-500">Your bag is empty</p>
            <UButton to="/products" class="mt-4">Explore Products</UButton>
        </div>
        <div v-else>
            <h1 class="mb-10 text-4xl text-gray-800 font-bold">Shopping Carts</h1>
            <USeparator class="mb-10 " :ui="{
                border: 'text-gray-800',
            }" />
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-2 space-y-4 ">
                    <UCard v-if="deliveryAddress" class="bg-neutral-50 rounded-xs ring-0">
                        <div class="flex justify-between items-start gap-4">
                            <div>
                                <!-- <p class="text-xs text-neutral-500">Delivering to:</p> -->
                                <p class="text-sm font-semibold mt-1">
                                    <span class="font-normal">Deliver to: </span>{{ deliveryAddress.fullName }} | {{
                                        deliveryAddress.phone }}
                                </p>
                                <p class="text-sm text-neutral-500 line-clamp-1">
                                    {{ deliveryAddress.addressLine1 }}, {{ deliveryAddress.city }}, {{
                                        deliveryAddress.state
                                    }}
                                </p>
                            </div>
                            <UIcon name="i-lucide-bike" class="size-10 text-gray-800 shrink-0" />
                        </div>
                    </UCard>
                    <UCard v-for="item in cartStore.items" :key="item.id" class="bg-white ring-0 rounded-xs ">
                        <div class="flex flex-col justify-between items-start ">
                            <div class="flex gap-5">
                                <ImageImg :src="item.image" class="w-30 h-full object-cover rounded-xs" />
                                <div>
                                    <ProductInfo :brand="item.name" :title="item.title" />
                                    <ProductPrice :price="item.price" :originalPrice="item.originalPrice"
                                        :discount="item.discount"
                                        class="text-sm text-gray-800 mt-1.5 sm:mt-2.5 mb-1.5" />

                                    <p v-if="item.size || item.color"
                                        class=" text-xs text-neutral-500 mt-0.5 mb-0.5 font-bold">
                                        <span v-if="item.size">Size: {{ item.size }}</span>
                                        <span v-if="item.size && item.color"> · </span>
                                        <span v-if="item.color">{{ item.color }}</span>
                                    </p>
                                    <UInputNumber :model-value="item.quantity" :min="1" size="sm" class="mt-2 w-28 "
                                        @update:model-value="(qty) => cartStore.setQuantity(item.id, qty)" :ui="{
                                            base: 'bg-neutral-100 text-gray-800 p-2 ring-gray-200 focus-visible:ring-gray-200 focus-visible:ring-1 rounded-xs '
                                        }">
                                        <template #decrement>
                                            <UButton size="xs" icon="i-lucide-minus" color="neutral" variant="outline"
                                                class="bg-white ring-0 text-gray-800  hover:bg-white active:bg-white disabled:bg-gray-200 cursor-pointer" />
                                        </template>

                                        <template #increment>
                                            <UButton size="xs" icon="i-lucide-plus" color="neutral" variant="outline"
                                                class="bg-white ring-0 text-gray-800 hover:bg-white active:bg-white cursor-pointer" />
                                        </template>
                                    </UInputNumber>
                                </div>
                            </div>
                            <USeparator :ui="{
                                border: 'border-t-neutral-200'
                            }" />
                            <div class="flex items-center justify-end w-full pt-3">
                                <UButton label="Remove From Cart" variant="ghost" color="error" icon="i-lucide-trash-2"
                                    class="rounded-xs" @click="() => {
                                        cartStore.removeFromCart(item.id)
                                        toast.add({ title: 'Item removed from cart', color: 'success', icon: 'i-lucide-check-circle' })
                                    }" />
                                <ButtonUButton label="Move To Wishlist" icon="i-lucide-heart" variant="ghost"
                                    class="rounded-xs" color="error" @click="() => {
                                        moveToWishlist(item)
                                        toast.add({ title: 'Item moved to wishlist', color: 'success', icon: 'i-lucide-check-circle' })
                                    }" />
                            </div>
                        </div>
                    </UCard>
                    <NuxtLink to="/wishlist" class=" cursor-pointer">
                        <UCard to="/wishlist" class="bg-white ring-0 rounded-xs " :ui="{
                            body: 'flex items-center justify-between gap-2',
                        }">
                            <div class="flex items-center justify-start gap-2">
                                <UIcon name="i-lucide-heart" class="size-5 text-red-500 shrink-0" />
                                <span>ADD FROM WISHLIST</span>
                            </div>
                            <UIcon name="i-lucide-chevron-right" class="size-5 text-red-500 shrink-0" />
                        </UCard>

                    </NuxtLink>
                </div>
                <div class=" space-y-4 ">
                    <!-- <UCard class="bg-white ring-0 rounded-xs"> -->
                    <!-- <UCollapsible v-model:open="noteOpen">
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
                        </UCollapsible> -->
                    <!-- <p v-if="cartStore.orderNote" class="text-xs text-neutral-500 mt-2 line-clamp-2">
                            {{ cartStore.orderNote }}
                        </p> -->
                    <!-- </UCard> -->
                    <CouponApply v-if="cartStore.items.length !== 0" />
                    <UCard class="h-fit bg-white ring-0 rounded-xs " v-if="cartStore.totalPrice">
                        <template #header>
                            <!-- <p class="font-semibold" icon="i-lucide-receipt">Price Details ({{ cartStore.items.length
                                }})</p> -->
                            <span class="flex items-center gap-1 font-medium text-sm">
                                <UIcon name="i-lucide-receipt" class="size-4" />
                                Price Details ({{ cartStore.items.length }} {{ cartStore.items.length === 1 ? 'item'
                                    : 'items' }})
                            </span>
                        </template>

                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Total MRP</span>
                                <span>₹ {{ cartStore.totalOriginalPrice }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Discount On MRP</span>
                                <span>- ₹ {{ cartStore.discountAmount }}</span>
                            </div>
                            <div v-if="cartStore.appliedCoupon" class="flex justify-between text-green-600">
                                <span>Coupon Discount</span>
                                <span>- ₹{{ cartStore.appliedCoupon.discount }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Delivery Charges</span>
                                <span :class="cartStore.deliveryCharge === 0 ? 'text-green-600' : ''">
                                    {{ cartStore.deliveryCharge === 0 ? 'FREE' : `₹${cartStore.deliveryCharge}` }}
                                </span>
                            </div>
                            <USeparator />
                            <div class="flex justify-between font-semibold">
                                <span>Total Amount</span>
                                <span>₹{{ cartStore.finalPrice }}</span>
                            </div>
                        </div>

                        <UButton block
                            class="mt-4 bg-indigo-600 text-white p-3 hover:bg-indigo-600 active:bg-indigo-600"
                            to="/checkout">
                            Checkout
                        </UButton>
                    </UCard>
                </div>
            </div>
        </div>

    </UContainer>
</template>