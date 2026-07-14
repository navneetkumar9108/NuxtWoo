// stores/cart.js
import { defineStore } from "pinia";

export const useCartStore = defineStore(
  "cart",
  () => {
    // state
    const items = ref([]); // [{ id, name, price, image, qty, variant }]

    // getters
    const totalItems = computed(() =>
      items.value.reduce((sum, i) => sum + i.qty, 0),
    );

    const totalPrice = computed(() =>
      items.value.reduce((sum, i) => sum + i.price * i.qty, 0),
    );

    const isInCart = computed(
      () => (id, variant) =>
        items.value.some((i) => i.id === id && i.variant === variant),
    );

    // actions
    function addToCart(product, qty = 1, variant = null) {
      console.log("product", product);
      const existing = items.value.find((i) => i.id === product.data.id);
      console.log("product", existing);
      if (existing) {
        existing.qty += qty;
      } else {
        items.value.push({
          id: product.data.id,
          name: product.data.brand.name,
          price: product.data.price,
          image: product.data.thumbnail,
          variant,
          qty,
        });
      }
    }
    console.log("items", items);
    function removeFromCart(id, variant = null) {
      items.value = items.value.filter(
        (i) => !(i.id === id && i.variant === variant),
      );
    }

    function updateQty(id, variant, qty) {
      const item = items.value.find(
        (i) => i.id === id && i.variant === variant,
      );
      if (item) item.qty = Math.max(1, qty);
    }

    function clearCart() {
      items.value = [];
    }

    return {
      items,
      totalItems,
      totalPrice,
      isInCart,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
    };
  },
  {
    persist: true, // agar pinia-plugin-persistedstate use kar rahe ho
  },
);
