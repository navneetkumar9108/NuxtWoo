import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore("cart", () => {
  const items = ref([]);

  function addToCart(product) {
    console.log("product", product);
    const existingItem = items.value.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
      return;
    }

    items.value.push({
      id: product.id,
      name: product.brand.name,
      price: product.price,
      image: product.thumbnail,
      quantity: 1,
    });
  }

  function removeFromCart(id) {
    items.value = items.value.filter((item) => item.id !== id);
  }

  function increaseQuantity(id) {
    const item = items.value.find((item) => item.id === id);

    if (item) {
      item.quantity++;
    }
  }

  function decreaseQuantity(id) {
    const item = items.value.find((item) => item.id === id);

    if (!item) return;

    if (item.quantity > 1) {
      item.quantity--;
    } else {
      removeFromCart(item.id);
    }
  }

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  );

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );

  return {
    items,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalItems,
    totalPrice,
  };
});
