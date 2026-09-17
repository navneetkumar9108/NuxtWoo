// import { defineStore } from "pinia";
// import { ref, computed } from "vue";

// export const useWishlistStore = defineStore("wishlist", () => {
//   const items = ref([]);

//   const totalItems = computed(() => items.value.length);

//   function addToWishlist(product) {
//     // console.log("wishlist product:", product);

//     const existingItem = items.value.find(
//       (item) =>
//         item.productId === product.productId &&
//         item.color?.id === product.color?.id,
//     );

//     if (existingItem) return;

//     items.value.push({
//       productId: product.productId,
//       title: product.title,
//       brand: product.brand,

//       color: product.color,

//       price: product.price,
//       originalPrice: product.originalPrice,
//       discount: product.discount,

//       image: product.image,
//       sizes: product.sizes,
//     });

//     // console.log("wishlist items:", items.value);
//   }

//   function removeFromWishlist(productId, colorId) {
//     items.value = items.value.filter(
//       (item) => !(item.productId === productId && item.color?.id === colorId),
//     );
//   }

//   function clearWishlist() {
//     items.value = [];
//   }

//   return {
//     items,
//     totalItems,
//     addToWishlist,
//     removeFromWishlist,
//     clearWishlist,
//   };
// });

import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useWishlistStore = defineStore("wishlist", () => {
  const items = ref([]);
  const loading = ref(false);

  const totalItems = computed(() => items.value.length);

  async function fetchWishlist() {
    loading.value = true;
    try {
      const res = await $fetch("/api/wishlist");
      if (res.success) {
        items.value = res.data.items || [];
      }
    } catch (err) {
      console.error("Failed to fetch wishlist", err);
    } finally {
      loading.value = false;
    }
  }

  async function addToWishlist(product) {
    try {
      const res = await $fetch("/api/wishlist/add", {
        method: "POST",
        body: {
          productId: product.productId,
          colorId: product.colorId,
        },
      });
      if (res.success) {
        items.value = res.data.items;
      }
      return res;
    } catch (err) {
      return {
        success: false,
        message: err.data?.message || "Failed to add to wishlist",
      };
    }
  }

  async function removeFromWishlist(itemId) {
    try {
      const res = await $fetch("/api/wishlist/remove", {
        method: "DELETE",
        body: { itemId },
      });
      if (res.success) {
        items.value = res.data.items;
      }
    } catch (err) {
      console.error("Failed to remove from wishlist", err);
    }
  }

  function isInWishlist(productId, colorId) {
    return items.value.some(
      (item) => item.productId === productId && item.colorId === colorId,
    );
  }

  return {
    items,
    loading,
    totalItems,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };
});
