import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore("cart", () => {
  const items = ref([]);
  const appliedCoupon = ref(null); // { code, discount }

  function addToCart(product) {
    console.log("product", product);
    const existingItem = items.value.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
      return;
    }

    items.value.push({
      id: product.id,
      name: product.brand?.name || product.name,
      title: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      image: product.thumbnail || product.image,
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

  function applyCoupon(coupon) {
    appliedCoupon.value = coupon; // { code, discount }
  }
  console.log("appliedCoupon.value", appliedCoupon.value);
  function removeCoupon() {
    appliedCoupon.value = null;
  }

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  );

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );

  const totalOriginalPrice = computed(() =>
    items.value.reduce(
      (sum, item) => sum + item.originalPrice * item.quantity,
      0,
    ),
  );

  const discountAmount = computed(
    () => totalOriginalPrice.value - totalPrice.value,
  );

  const finalPrice = computed(
    () => Math.max(0, totalPrice.value - (appliedCoupon.value || 0)),
    // Math.max(0, totalPrice.value - (appliedCoupon.value?.discount || 0)),
  );

  return {
    items,
    appliedCoupon,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    applyCoupon,
    removeCoupon,
    totalItems,
    totalPrice,
    totalOriginalPrice,
    discountAmount,
    finalPrice,
  };
});
