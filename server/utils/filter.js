// server/utils/filter.js
import { categories } from "../data/categories";
export function filterProducts(products, query = {}) {
  let filtered = [...products];

  // Brand
  if (query.brand) {
    filtered = filtered.filter(
      (product) => product.brandId === Number(query.brand),
    );
  }

  // Category
  // if (query.category) {
  //   filtered = filtered.filter(
  //     (product) => product.categoryId === Number(query.category),
  //   );
  // }

  // Category
  if (query.category) {
    const categorySlugs = query.category.split(",");

    const categoryIds = categories
      .filter((category) => categorySlugs.includes(category.slug))
      .map((category) => category.id);

    console.log("Query Category:", query.category);
    console.log("Category Slugs:", categorySlugs);
    console.log("Category IDs:", categoryIds);

    filtered = filtered.filter((product) =>
      categoryIds.includes(product.categoryId),
    );

    console.log("Total Products After Filter:", filtered.length);
  }
  console.log(
    "Filtered Products:",
    filtered.map((p) => ({
      id: p.id,
      categoryId: p.categoryId,
    })),
  );
  // Gender
  if (query.gender) {
    filtered = filtered.filter(
      (product) => product.genderId === Number(query.gender),
    );
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

  console.log("Min Price:", query.minPrice);
  console.log("Max Price:", query.maxPrice);

  // Rating
  if (query.rating) {
    filtered = filtered.filter(
      (product) => product.rating >= Number(query.rating),
    );
    console.log(
      "Products After Rating:",
      filtered.map((p) => ({
        id: p.id,
        rating: p.rating,
      })),
    );
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
    filtered = filtered.filter((product) => product.isBestSeller);
  }

  return filtered;
}
