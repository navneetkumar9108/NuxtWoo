// // server/utils/search.js

// export function searchProducts(products, search = "") {
//   if (!search) return products;

//   // const keyword = search.toLowerCase().trim();
//   const words = searchTerm.toLowerCase().trim().split(/\s+/); // spaces se split

//   return products.filter((product) => {
//     return (
//       product.title?.toLowerCase().includes(keyword) ||
//       product.brand?.name?.toLowerCase().includes(keyword) ||
//       product.category?.name?.toLowerCase().includes(keyword) ||
//       product.shortDescription?.toLowerCase().includes(keyword) ||
//       product.description?.toLowerCase().includes(keyword) ||
//       product.colorName?.toLowerCase().includes(keyword) ||
//       product.tags?.some((tag) => tag.toLowerCase().includes(keyword))
//     );
//   });
// }

export function searchProducts(products, searchTerm) {
  if (!searchTerm?.trim()) return products;

  const words = searchTerm.toLowerCase().trim().split(/\s+/); // spaces se split

  return products.filter((product) => {
    const searchableText = [
      product.title,
      product.brand?.name,
      product.category?.name,
      product.colorName,
      ...(product.tags || []),
    ]
      .join(" ")
      .toLowerCase();

    // Har word match hona chahiye (AND logic)
    return words.every((word) => searchableText.includes(word));
  });
}
