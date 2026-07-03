// server/utils/search.js

export function searchProducts(products, search = "") {
  if (!search) return products;

  const keyword = search.toLowerCase().trim();

  return products.filter((product) => {
    return (
      product.title?.toLowerCase().includes(keyword) ||
      product.shortDescription?.toLowerCase().includes(keyword) ||
      product.description?.toLowerCase().includes(keyword) ||
      product.tags?.some((tag) => tag.toLowerCase().includes(keyword))
    );
  });
}
