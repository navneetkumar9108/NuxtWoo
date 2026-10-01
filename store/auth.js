import { defineStore } from "pinia";
import { ref } from "vue";
import { useCartStore } from "./cart";
import { useWishlistStore } from "./wishlist";
import { useAddressStore } from "./address";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const isLoggedIn = ref(false);

  const init = async () => {
    if (process.client) {
      try {
        const res = await $fetch("/api/auth/me");
        if (res.success) {
          user.value = res.data;
          isLoggedIn.value = true;
        }
      } catch (err) {
        user.value = null;
        isLoggedIn.value = false;
      }
    }
  };

  const register = async (data) => {
    const res = await $fetch("/api/auth/register", {
      method: "POST",
      body: data,
    });

    if (!res.success) {
      throw new Error(res.message || "Registration failed");
    }

    // Register ke baad automatically login bhi kar do
    await login({ email: data.email, password: data.password });
  };

  const login = async (data) => {
    const res = await $fetch("/api/auth/login", {
      method: "POST",
      body: data,
    });

    if (!res.success) {
      throw new Error(res.message || "Invalid Email or Password");
    }

    user.value = res.data;
    isLoggedIn.value = true;

    const cartStore = useCartStore();
    const wishlistStore = useWishlistStore();
    const addressStore = useAddressStore();

    await Promise.all([
      cartStore.fetchCart(),
      wishlistStore.fetchWishlist(),
      addressStore.fetchAddresses(),
    ]);
  };

  const logout = async () => {
    await $fetch("/api/auth/logout", { method: "POST" });
    user.value = null;
    isLoggedIn.value = false;

    const cartStore = useCartStore();
    const wishlistStore = useWishlistStore();
    const addressStore = useAddressStore();

    cartStore.items = [];
    cartStore.selectedItemIds = [];
    wishlistStore.items = [];
    addressStore.addresses = [];
    addressStore.selectedAddressId = null;

    navigateTo("/");
  };

  const updateProfile = async (data) => {
    const res = await $fetch("/api/auth/update-profile", {
      method: "PATCH",
      body: data,
    });

    if (!res.success) {
      throw new Error(res.message || "Failed to update profile");
    }

    user.value = res.data;
    return res;
  };

  return {
    user,
    isLoggedIn,
    init,
    register,
    login,
    logout,
    updateProfile,
  };
});
