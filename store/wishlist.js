import { defineStore } from "pinia";
import { ref } from "vue";

export const useWishlistStore = defineStore("wishlist", () => {
  const items = ref([]);

  function addToWishlist(product) {
    const existingItem = items.value.find((item) => item.id === product.id);

    if (existingItem) return;

    items.value.push({
      id: product.id,
      name: product.brand.name,
      title: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      image: product.thumbnail,
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
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
  };
});
