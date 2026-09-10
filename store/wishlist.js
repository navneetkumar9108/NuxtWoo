// import { defineStore } from "pinia";
// import { ref, computed } from "vue";

// export const useWishlistStore = defineStore("wishlist", () => {
//   const items = ref([]);
//   console.log("wishlist items", items.value);

//   const totalItems = computed(() => items.value.length);
//   console.log("totalItems", totalItems.value);
//   // function addToWishlist(product) {
//   //   console.log("wishlist product", product);
//   //   const existingItem = items.value.find((item) => item.id === product.id);

//   //   if (existingItem) return;

//   //   items.value.push({
//   //     id: product.id,
//   //     name: product.brand?.name || product.name,
//   //     title: product.title,
//   //     price: product.price,
//   //     originalPrice: product.originalPrice,
//   //     discount: product.discount,
//   //     image: product.thumbnail || product.image,
//   //     sizes: product.sizes,
//   //   });
//   // }

//   function addToWishlist(product) {
//     console.log("wishlist product", product);
//     console.log("selected color", product.selectedColor);

//     if (!product.selectedColor) {
//       console.log("No color selected");
//       return;
//     }

//     const existingItem = items.value.find(
//       (item) =>
//         item.productId === product.id &&
//         item.color?.id === product.selectedColor.id,
//     );

//     if (existingItem) return;

//     items.value.push({
//       productId: product.id,

//       brand: product.brand?.name,
//       title: product.title,

//       color: {
//         id: product.selectedColor.id,
//         name: product.selectedColor.name,
//         slug: product.selectedColor.slug,
//         hex: product.selectedColor.hex,
//       },

//       price: product.selectedColor.pricing.price,
//       originalPrice: product.selectedColor.pricing.originalPrice,
//       discount: product.selectedColor.pricing.discount,

//       image: product.selectedColor.thumbnail,

//       quantity: 1,
//     });
//   }

//   function removeFromWishlist(id) {
//     items.value = items.value.filter((item) => item.id !== id);
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

  const totalItems = computed(() => items.value.length);

  function addToWishlist(product) {
    // console.log("wishlist product:", product);

    const existingItem = items.value.find(
      (item) =>
        item.productId === product.productId &&
        item.color?.id === product.color?.id,
    );

    if (existingItem) return;

    items.value.push({
      productId: product.productId,
      title: product.title,
      brand: product.brand,

      color: product.color,

      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,

      image: product.image,
      sizes: product.sizes,
    });

    // console.log("wishlist items:", items.value);
  }

  function removeFromWishlist(productId, colorId) {
    items.value = items.value.filter(
      (item) => !(item.productId === productId && item.color?.id === colorId),
    );
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
