<script setup>
import { useAuthStore } from '../store/auth'
import { useCartStore } from '../store/cart'
import { useAddressStore } from '../store/address'
import { useWishlistStore } from '~~/store/wishlist'



const authStore = useAuthStore()
const cartStore = useCartStore()
const addressStore = useAddressStore()
const wishlistStore = useWishlistStore()


// onMounted(async () => {
//   await authStore.init()
//   if (authStore.isLoggedIn) {
//     cartStore.fetchCart()
//     addressStore.fetchAddresses()

//   }
// })

onMounted(async () => {
  await authStore.init()
  cartStore.initCartPreferences()
  if (authStore.isLoggedIn) {
    await Promise.all([
      cartStore.fetchCart(),
      addressStore.fetchAddresses(),
      wishlistStore.fetchWishlist(),

    ])
  }
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style lang="scss" scoped></style>
