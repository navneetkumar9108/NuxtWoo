<script setup>
import { useAddressStore } from '~~/store/address';
import { useCartStore } from '~~/store/cart';
import { useWishlistStore } from '~~/store/wishlist';

definePageMeta({ middleware: 'auth' })
const addressStore = useAddressStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const toast = useToast()

const deliveryAddress = computed(() => addressStore.selectedAddress)

async function bulkRemove() {
    for (const itemId of [...selectedItemIds.value]) {
        await cartStore.removeFromCart(itemId)
    }
    selectedItemIds.value = []
    toast.add({ title: 'Items removed from cart', color: 'success', icon: 'i-lucide-check-circle' })
}
async function moveToWishlist(item) {
    const result = await wishlistStore.addToWishlist({
        productId: item.productId,
        colorId: item.colorId,
    })
    if (result?.success) {
        await cartStore.removeFromCart(item._id)
    }
}

async function bulkMoveToWishlist() {
    for (const item of cartStore.selectedItems) {
        await moveToWishlist(item)
    }
    cartStore.clearSelection()
}

</script>

<template>
    <UContainer class="mt-10 mb-10">
        <div v-if="!cartStore.items.length" class="text-center py-16 h-screen ">
            <UIcon name="i-lucide-shopping-bag" class="size-12 text-neutral-300 mx-auto mb-3" />
            <p class="text-neutral-500">Your bag is empty</p>
            <ButtonUButton label="Explore Products" to="/products" class="mt-4" />
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
                    <!-- Select All bar -->
                    <UCard v-if="cartStore.items.length" class=" bg-white rounded-xs   ring-0">
                        <div class="flex items-center justify-between ">

                            <div class="flex items-center gap-5">
                                <UCheckbox v-model="cartStore.isAllSelected" />
                                <span class="text-sm font-medium text-gray-800">
                                    {{ cartStore.selectedItemIds.length ? `${cartStore.selectedItemIds.length} Selected`
                                        :
                                        'Select All' }}
                                </span>
                            </div>

                            <div v-if="cartStore.selectedItemIds.length" class="flex items-center gap-2">
                                <ButtonUButton label="Move to Wishlist" icon="i-lucide-heart" size="xs" variant="ghost"
                                    color="error" @click="bulkMoveToWishlist" />

                                <ButtonUButton label="Remove" icon="i-lucide-trash-2" size="xs" variant="ghost"
                                    color="error" @click="async () => {
                                        await cartStore.bulkRemove()
                                        toast.add({ title: 'Items removed from cart', color: 'success', icon: 'i-lucide-check-circle' })
                                    }" />
                            </div>
                        </div>
                    </UCard>


                    <UCard v-for="item in cartStore.items" :key="item._id" class="bg-white ring-0 rounded-xs ">
                        <div class="flex flex-col justify-between items-start ">
                            <div class="flex gap-5 items-start">
                                <UCheckbox :model-value="cartStore.selectedItemIds.includes(item._id)"
                                    @update:model-value="cartStore.toggleSelect(item._id)" />

                                <ImageImg :src="item.image" class="w-30 h-full object-cover rounded-xs" />
                                <div>
                                    <ProductInfo :brand="item.brandName" :title="item.title" />
                                    <ProductPrice :price="item.price" :originalPrice="item.originalPrice"
                                        :discount="item.discount"
                                        class="text-sm text-gray-800 mt-1.5 sm:mt-2.5 mb-1.5" />

                                    <p v-if="item.size || item.colorName"
                                        class=" text-xs text-neutral-500 mt-0.5 mb-0.5 font-bold">
                                        <span v-if="item.sizeName">Size: {{ item.sizeName }}</span>
                                        <span v-if="item.sizeName && item.colorName"> · </span>
                                        <span v-if="item.colorName">Color: {{ item.colorName }}</span>
                                    </p>
                                    <UInputNumber :model-value="item.quantity" :min="1" size="sm" class="mt-2 w-28 "
                                        @update:model-value="(qty) => cartStore.updateQuantity(item._id, qty)" :ui="{
                                            base: 'bg-neutral-100 text-gray-800 p-2 ring-gray-200 focus-visible:ring-gray-200 focus-visible:ring-1 rounded-xs '
                                        }">
                                        <template #decrement>
                                            <ButtonUButton size="xs" icon="i-lucide-minus" color="neutral"
                                                variant="outline"
                                                class="bg-white ring-0 text-gray-800  hover:bg-white active:bg-white disabled:bg-gray-200 cursor-pointer" />
                                        </template>

                                        <template #increment>
                                            <ButtonUButton size="xs" icon="i-lucide-plus" color="neutral"
                                                variant="outline"
                                                class="bg-white ring-0 text-gray-800 hover:bg-white active:bg-white cursor-pointer" />
                                        </template>
                                    </UInputNumber>
                                </div>
                            </div>
                            <USeparator :ui="{
                                border: 'border-t-neutral-200'
                            }" />
                            <div class="flex items-center justify-end w-full pt-3">
                                <ButtonUButton label="Remove From Cart" variant="ghost" color="error"
                                    icon="i-lucide-trash-2" class="rounded-xs" @click="() => {
                                        cartStore.removeFromCart(item._id)
                                        toast.add({ title: 'Item removed from cart', color: 'success', icon: 'i-lucide-check-circle' })
                                    }" />
                                <ButtonUButton label="Move To Wishlist" icon="i-lucide-heart" variant="ghost"
                                    class="rounded-xs" color="error" @click="async () => {
                                        await moveToWishlist(item)
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

                    <CouponApply v-if="cartStore.items.length !== 0" />
                    <!-- <UCard class="h-fit bg-white ring-0 rounded-xs " v-if="cartStore.totalPrice">
                        <template #header>

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

                        <ButtonUButton label="Checkout" block
                            class="mt-4 bg-indigo-600 text-white p-3 hover:bg-indigo-600 active:bg-indigo-600"
                            to="/checkout" />


                    </UCard> -->
                    <UCard class="h-fit bg-white ring-0 rounded-xs" v-if="cartStore.selectedItemIds.length">
                        <template #header>
                            <span class="flex items-center gap-1 font-medium text-sm">
                                <UIcon name="i-lucide-receipt" class="size-4" />
                                Price Details ({{ cartStore.selectedItemIds.length }} {{
                                    cartStore.selectedItemIds.length === 1 ? 'item' :
                                        'items' }})
                            </span>
                        </template>

                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Total MRP</span>
                                <span>₹ {{ cartStore.selectedTotalOriginalPrice }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Discount On MRP</span>
                                <span>- ₹ {{ cartStore.selectedDiscountAmount }}</span>
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
                                <span>₹{{ cartStore.selectedFinalPrice }}</span>
                            </div>
                        </div>

                        <ButtonUButton label="Checkout" block
                            class="mt-4 bg-indigo-600 text-white p-3 hover:bg-indigo-600 active:bg-indigo-600"
                            to="/checkout" />
                    </UCard>

                    <!-- Kuch bhi select nahi hai to ye dikhao -->
                    <UCard v-else class="h-fit bg-white ring-0 rounded-xs p-6 text-center">
                        <p class="text-sm text-neutral-500">Select items to see price details</p>
                    </UCard>
                </div>
            </div>
        </div>

    </UContainer>
</template>