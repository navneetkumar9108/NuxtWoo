// import { defineStore } from "pinia";
// import { ref, computed } from "vue";

// export const useCartStore = defineStore("cart", () => {
//   const items = ref([]);
//   // console.log("cart items", items.value);
//   const appliedCoupon = ref(null); // { code, discount }
//   // Delivery
//   const deliveryMethod = ref("standard");

//   const STANDARD_DELIVERY_CHARGE = 0;
//   const EXPRESS_DELIVERY_CHARGE = 50;

//   // const FREE_DELIVERY_THRESHOLD = 999;
//   const orderNote = ref("");
//   const COUPONS = { SAVE50: 50, WELCOME10: 100 };

//   // function addToCart(product) {
//   //   console.log("product", product);
//   //   const existingItem = items.value.find((item) => item.id === product.id);

//   //   if (existingItem) {
//   //     existingItem.quantity++;
//   //     return;
//   //   }

//   //   items.value.push({
//   //     id: product.id,
//   //     name: product.brand?.name || product.name,
//   //     title: product.title,
//   //     price: product.price,
//   //     originalPrice: product.originalPrice,
//   //     discount: product.discount,
//   //     image: product.thumbnail || product.image,
//   //     size: product.selectedSize,
//   //     sizes: product.sizes,
//   //     quantity: 1,
//   //   });
//   // }
//   function addToCart(product) {
//     // console.log("product", product);
//     const cartId = `${product.productId}-${product.color.id}-${product.size || product.selectedSize}`;

//     const existingItem = items.value.find((item) => item.cartId === cartId);

//     if (existingItem) {
//       existingItem.quantity++;
//       return;
//     }

//     items.value.push({
//       cartId,

//       productId: product.productId,

//       name: product.brand?.name,
//       title: product.title,

//       price: product.price,
//       originalPrice: product.originalPrice,
//       discount: product.discount,

//       image: product.image,

//       color: product.color.name,
//       size: product.size || product.selectedSize,

//       quantity: 1,
//     });
//   }

//   function removeFromCart(id) {
//     items.value = items.value.filter((item) => item.id !== id);
//   }

//   function increaseQuantity(id) {
//     const item = items.value.find((item) => item.id === id);

//     if (item) {
//       item.quantity++;
//     }
//   }

//   function decreaseQuantity(id) {
//     const item = items.value.find((item) => item.id === id);

//     if (!item) return;

//     if (item.quantity > 1) {
//       item.quantity--;
//     } else {
//       removeFromCart(item.id);
//     }
//   }

//   // function applyCoupon(coupon) {
//   //   appliedCoupon.value = coupon; // { code, discount }
//   // }

//   function applyCoupon(code) {
//     const upperCode = code.toUpperCase();
//     const discount = COUPONS[upperCode];
//     if (!discount) {
//       return { success: false, message: "Invalid coupon code" };
//     }
//     appliedCoupon.value = { code: upperCode, discount };
//     return { success: true };
//   }

//   // console.log("appliedCoupon.value", appliedCoupon.value);

//   function removeCoupon() {
//     appliedCoupon.value = null;
//   }

//   function setDeliveryMethod(method) {
//     deliveryMethod.value = method;
//   }

//   const deliveryCharge = computed(() => {
//     if (deliveryMethod.value === "express") {
//       return 50;
//     }
//     return 0;
//   });

//   const totalItems = computed(() =>
//     items.value.reduce((sum, item) => sum + item.quantity, 0),
//   );

//   const totalPrice = computed(() =>
//     items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
//   );

//   // const deliveryCharge = computed(() =>
//   //   totalPrice.value >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE,
//   // );

//   const totalOriginalPrice = computed(() =>
//     items.value.reduce(
//       (sum, item) => sum + item.originalPrice * item.quantity,
//       0,
//     ),
//   );

//   const discountAmount = computed(
//     () => totalOriginalPrice.value - totalPrice.value,
//   );

//   const finalPrice = computed(
//     () =>
//       Math.max(
//         0,
//         totalPrice.value -
//           (appliedCoupon.value?.discount || 0) +
//           deliveryCharge.value,
//       ),
//     // Math.max(0, totalPrice.value - (appliedCoupon.value?.discount || 0)),
//   );

//   function setQuantity(id, qty) {
//     const item = items.value.find((item) => item.id === id);
//     if (item) item.quantity = qty;
//   }

//   function setOrderNote(note) {
//     orderNote.value = note;
//   }

//   return {
//     items,
//     appliedCoupon,
//     addToCart,
//     removeFromCart,
//     increaseQuantity,
//     decreaseQuantity,
//     applyCoupon,
//     removeCoupon,
//     totalItems,
//     totalPrice,
//     totalOriginalPrice,
//     discountAmount,
//     finalPrice,
//     setQuantity,
//     deliveryMethod,
//     deliveryCharge,
//     setDeliveryMethod,
//     setOrderNote,
//     orderNote,
//   };
// });

import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

export const useCartStore = defineStore("cart", () => {
  const items = ref([]);
  const appliedCoupon = ref(null);
  const deliveryMethod = ref("standard");
  const selectedItemIds = ref([]);
  const orderNote = ref("");
  const loading = ref(false);

  const COUPONS = { SAVE50: 50, WELCOME10: 100 };

  function initCartPreferences() {
    if (process.client) {
      const savedCoupon = localStorage.getItem("appliedCoupon");
      const savedDelivery = localStorage.getItem("deliveryMethod");
      if (savedCoupon) appliedCoupon.value = JSON.parse(savedCoupon);
      if (savedDelivery) deliveryMethod.value = savedDelivery;
    }
  }

  watch(appliedCoupon, (val) => {
    if (process.client) {
      localStorage.setItem("appliedCoupon", JSON.stringify(val));
    }
  });

  watch(deliveryMethod, (val) => {
    if (process.client) {
      localStorage.setItem("deliveryMethod", val);
    }
  });

  async function fetchCart() {
    loading.value = true;
    try {
      const res = await $fetch("/api/cart");
      if (res.success) {
        items.value = res.data.items || [];
      }
    } catch (err) {
      console.error("Failed to fetch cart", err);
    } finally {
      loading.value = false;
    }
  }

  async function addToCart(product) {
    try {
      const res = await $fetch("/api/cart/add", {
        method: "POST",
        body: {
          productId: product.productId,
          colorId: product.colorId,
          sizeId: product.sizeId,
          quantity: product.quantity || 1,
        },
      });
      if (res.success) {
        items.value = res.data.items;
      }
      return res;
    } catch (err) {
      return {
        success: false,
        message: err.data?.message || "Failed to add to cart",
      };
    }
  }

  async function removeFromCart(itemId) {
    try {
      const res = await $fetch("/api/cart/remove", {
        method: "DELETE",
        body: { itemId },
      });
      if (res.success) {
        items.value = res.data.items;
      }
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  }

  async function updateQuantity(itemId, quantity) {
    try {
      const res = await $fetch("/api/cart/update", {
        method: "PATCH",
        body: { itemId, quantity },
      });
      if (res.success) {
        items.value = res.data.items;
      }
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  }

  function increaseQuantity(itemId) {
    const item = items.value.find((i) => i._id === itemId);
    if (item) updateQuantity(itemId, item.quantity + 1);
  }

  function decreaseQuantity(itemId) {
    const item = items.value.find((i) => i._id === itemId);
    if (!item) return;
    if (item.quantity > 1) {
      updateQuantity(itemId, item.quantity - 1);
    } else {
      removeFromCart(itemId);
    }
  }

  function applyCoupon(code) {
    const upperCode = code.toUpperCase();
    const discount = COUPONS[upperCode];
    if (!discount) {
      return { success: false, message: "Invalid coupon code" };
    }
    appliedCoupon.value = { code: upperCode, discount };
    return { success: true };
  }

  function removeCoupon() {
    appliedCoupon.value = null;
  }

  function setDeliveryMethod(method) {
    deliveryMethod.value = method;
  }

  function setOrderNote(note) {
    orderNote.value = note;
  }

  const deliveryCharge = computed(() =>
    deliveryMethod.value === "express" ? 50 : 0,
  );

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  );

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );

  const totalOriginalPrice = computed(() =>
    items.value.reduce(
      (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
      0,
    ),
  );

  const discountAmount = computed(
    () => totalOriginalPrice.value - totalPrice.value,
  );

  const finalPrice = computed(() =>
    Math.max(
      0,
      totalPrice.value -
        (appliedCoupon.value?.discount || 0) +
        deliveryCharge.value,
    ),
  );

  const isAllSelected = computed({
    get: () =>
      items.value.length > 0 &&
      selectedItemIds.value.length === items.value.length,
    set: (val) => {
      selectedItemIds.value = val ? items.value.map((i) => i._id) : [];
    },
  });

  const selectedItems = computed(() =>
    items.value.filter((item) => selectedItemIds.value.includes(item._id)),
  );

  const selectedTotalPrice = computed(() =>
    selectedItems.value.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    ),
  );

  const selectedTotalOriginalPrice = computed(() =>
    selectedItems.value.reduce(
      (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
      0,
    ),
  );

  const selectedDiscountAmount = computed(
    () => selectedTotalOriginalPrice.value - selectedTotalPrice.value,
  );

  const selectedFinalPrice = computed(() =>
    Math.max(
      0,
      selectedTotalPrice.value -
        (appliedCoupon.value?.discount || 0) +
        deliveryCharge.value,
    ),
  );

  // Naye functions
  function toggleSelect(itemId) {
    const idx = selectedItemIds.value.indexOf(itemId);
    if (idx > -1) {
      selectedItemIds.value.splice(idx, 1);
    } else {
      selectedItemIds.value.push(itemId);
    }
  }

  function clearSelection() {
    selectedItemIds.value = [];
  }

  async function bulkRemove() {
    for (const itemId of [...selectedItemIds.value]) {
      await removeFromCart(itemId);
    }
    selectedItemIds.value = [];
  }

  return {
    items,
    loading,
    appliedCoupon,
    fetchCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    applyCoupon,
    removeCoupon,
    totalItems,
    totalPrice,
    totalOriginalPrice,
    discountAmount,
    finalPrice,
    deliveryMethod,
    deliveryCharge,
    setDeliveryMethod,
    setOrderNote,
    orderNote,
    initCartPreferences,

    selectedItemIds,
    isAllSelected,
    selectedItems,
    selectedTotalPrice,
    selectedTotalOriginalPrice,
    selectedDiscountAmount,
    selectedFinalPrice,
    toggleSelect,
    clearSelection,
    bulkRemove,
  };
});
