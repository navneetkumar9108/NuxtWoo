// server/utils/filter.js
export function filterProducts(products, query = {}) {
  let filtered = [...products];
  console.log("QUERY RECEIVED:", query);

  if (query.brand) {
    const brand = query.brand.split(",");
    filtered = filtered.filter((product) => brand.includes(product.brand.slug));
  }

  if (query.category) {
    const category = query.category.split(",");

    filtered = filtered.filter((product) =>
      category.includes(product.category.slug),
    );
  }

  if (query.gender) {
    // console.log(
    //   "Filtered Products:",
    //   filtered.map((p) => ({
    //     id: p.id,
    //     categoryId: p.categoryId,
    //   })),
    // );
    // Gender
    const gender = query.gender.split(",");
    filtered = filtered.filter((product) =>
      gender.includes(product.gender.slug),
    );
    // filtered = filtered.filter(
    //   (product) => product.genderId === Number(query.gender),
    // );
  }

  // Material
  if (query.material) {
    filtered = filtered.filter(
      (product) => product.materialId === Number(query.material),
    );
  }

  // Fit
  if (query.fit) {
    filtered = filtered.filter(
      (product) => product.fitId === Number(query.fit),
    );
  }

  // License
  if (query.license) {
    filtered = filtered.filter(
      (product) => product.licenseId === Number(query.license),
    );
  }

  // Color
  if (query.color) {
    filtered = filtered.filter((product) =>
      product.variants.some(
        (variant) => variant.colorId === Number(query.color),
      ),
    );
  }

  // Size
  if (query.size) {
    filtered = filtered.filter((product) =>
      product.variants.some((variant) =>
        variant.sizes.some((size) => size.sizeId === Number(query.size)),
      ),
    );
  }

  // Minimum Price
  if (query.minPrice) {
    filtered = filtered.filter(
      (product) => product.price >= Number(query.minPrice),
    );
  }

  // Maximum Price
  if (query.maxPrice) {
    filtered = filtered.filter(
      (product) => product.price <= Number(query.maxPrice),
    );
  }

  // console.log("Min Price:", query.minPrice);
  // console.log("Max Price:", query.maxPrice);

  // Rating
  if (query.rating) {
    filtered = filtered.filter(
      (product) => product.rating >= Number(query.rating),
    );
    // console.log(
    //   "Products After Rating:",
    //   filtered.map((p) => ({
    //     id: p.id,
    //     rating: p.rating,
    //   })),
    // );
  }

  // Discount
  if (query.discount) {
    filtered = filtered.filter(
      (product) => product.discount >= Number(query.discount),
    );
  }

  // Stock
  if (query.inStock === "true") {
    filtered = filtered.filter((product) => product.stock > 0);
  }

  // New Arrival
  if (query.isNew === "true") {
    filtered = filtered.filter((product) => product.isNew);
  }

  // Best Seller
  if (query.isBestSeller === "true") {
    console.log("BEFORE:", filtered.length);
    filtered = filtered.filter((product) => product.isBestSeller);
    console.log("AFTER:", filtered.length);
  }

  // Featured
  if (query.isFeatured === "true") {
    filtered = filtered.filter((product) => product.isFeatured);
  }

  return filtered;
}
