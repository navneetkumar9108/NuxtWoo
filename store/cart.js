import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore("cart", () => {
  const items = ref([]);
  console.log("cart items", items.value);
  const appliedCoupon = ref(null); // { code, discount }
  // Delivery
  const deliveryMethod = ref("standard");

  const STANDARD_DELIVERY_CHARGE = 0;
  const EXPRESS_DELIVERY_CHARGE = 50;

  // const FREE_DELIVERY_THRESHOLD = 999;
  const orderNote = ref("");
  const COUPONS = { SAVE50: 50, WELCOME10: 100 };

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
      size: product.selectedSize,
      sizes: product.sizes,
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

  // function applyCoupon(coupon) {
  //   appliedCoupon.value = coupon; // { code, discount }
  // }

  function applyCoupon(code) {
    const upperCode = code.toUpperCase();
    const discount = COUPONS[upperCode];
    if (!discount) {
      return { success: false, message: "Invalid coupon code" };
    }
    appliedCoupon.value = { code: upperCode, discount };
    return { success: true };
  }

  console.log("appliedCoupon.value", appliedCoupon.value);

  function removeCoupon() {
    appliedCoupon.value = null;
  }

  function setDeliveryMethod(method) {
    deliveryMethod.value = method;
  }

  const deliveryCharge = computed(() => {
    if (deliveryMethod.value === "express") {
      return 50;
    }
    return 0;
  });

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  );

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );

  // const deliveryCharge = computed(() =>
  //   totalPrice.value >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE,
  // );

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
    () =>
      Math.max(
        0,
        totalPrice.value -
          (appliedCoupon.value?.discount || 0) +
          deliveryCharge.value,
      ),
    // Math.max(0, totalPrice.value - (appliedCoupon.value?.discount || 0)),
  );

  function setQuantity(id, qty) {
    const item = items.value.find((item) => item.id === id);
    if (item) item.quantity = qty;
  }

  function setOrderNote(note) {
    orderNote.value = note;
  }

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
    setQuantity,
    deliveryMethod,
    deliveryCharge,
    setDeliveryMethod,
    setOrderNote,
    orderNote,
  };
});
