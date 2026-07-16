// server/utils/product.js

import { productsV4 } from "../data/data";
/**
 * Get product by ID
 */
export function getProductById(id) {
  return productsV4.find((product) => product.id === Number(id));
}

/**
 * Get featured products
 */
export function getFeaturedProducts(limit = 8) {
  return productsV4
    .filter((product) => product.isBestSeller)
    .slice(0, Number(limit));
}

/**
 * Get new arrivals
 */
export function getNewProducts(limit = 8) {
  return productsV4.filter((product) => product.isNew).slice(0, Number(limit));
}

/**
 * Get best sellers
 */
export function getBestSellerProducts(limit = 8) {
  return productsV4
    .filter((product) => product.isBestSeller)
    .slice(0, Number(limit));
}

/**
 * Get related products
 */
export function getRelatedProducts(product, limit = 4) {
  return productsV4
    .filter(
      (item) =>
        item.id !== product.id && item.category.id === product.category.id,
    )
    .slice(0, Number(limit));
}
