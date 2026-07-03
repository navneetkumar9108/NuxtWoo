// server/utils/product.js

import { products } from "../data/products";

/**
 * Get product by ID
 */
export function getProductById(id) {
  return products.find((product) => product.id === Number(id));
}

/**
 * Get featured products
 */
export function getFeaturedProducts(limit = 8) {
  return products
    .filter((product) => product.isBestSeller)
    .slice(0, Number(limit));
}

/**
 * Get new arrivals
 */
export function getNewProducts(limit = 8) {
  return products.filter((product) => product.isNew).slice(0, Number(limit));
}

/**
 * Get best sellers
 */
export function getBestSellerProducts(limit = 8) {
  return products
    .filter((product) => product.isBestSeller)
    .slice(0, Number(limit));
}

/**
 * Get related products
 */
export function getRelatedProducts(product, limit = 4) {
  return products
    .filter(
      (item) =>
        item.id !== product.id && item.categoryId === product.categoryId,
    )
    .slice(0, Number(limit));
}
