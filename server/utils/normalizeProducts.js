export function normalizeProductsForPLP(products) {
  return products.flatMap((product) =>
    product.colors.map((color) => ({
      ...product,

      // Unique ID for each color card
      plpId: `${product.id}-${color.id}`,

      // Selected color
      color: color,

      colorId: color.id,
      colorName: color.name,
      colorSlug: color.slug,

      // Color-specific data
      thumbnail: color.thumbnail,
      images: color.images,
      sizes: color.sizes,

      // Color-specific pricing
      price: color.pricing.price,
      originalPrice: color.pricing.originalPrice,
      discount: color.pricing.discount,
    })),
  );
}
