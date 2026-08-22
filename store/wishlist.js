import { defineStore } from "pinia";
import { ref } from "vue";

export const useWishlistStore = defineStore("wishlist", () => {
  const items = ref([]);
  console.log("wishlist items", items.value);

  const totalItems = computed(() => items.value.length);
  console.log("totalItems", totalItems.value);
  function addToWishlist(product) {
    console.log("wishlist product", product);
    const existingItem = items.value.find((item) => item.id === product.id);

    if (existingItem) return;

    items.value.push({
      id: product.id,
      name: product.brand?.name || product.name,
      title: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      image: product.thumbnail || product.image,
      sizes: product.sizes,
    });
  }

  function removeFromWishlist(id) {
    items.value = items.value.filter((item) => item.id !== id);
  }

  function clearWishlist() {
    items.value = [];
  }

  return {
    items,
    totalItems,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
  };
});
