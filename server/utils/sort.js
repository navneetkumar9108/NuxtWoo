// server/utils/sort.js

export function sortProducts(products, sort = "featured") {
  const sorted = [...products];

  switch (sort) {
    case "newest":
      return sorted.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);

    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);

    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);

    case "discount":
      return sorted.sort((a, b) => b.discount - a.discount);

    case "popular":
      return sorted.sort((a, b) => b.ratingCount - a.ratingCount);

    case "featured":
    default:
      return sorted.sort((a, b) => {
        if (a.isBestSeller !== b.isBestSeller) {
          return b.isBestSeller - a.isBestSeller;
        }

        if (a.isNew !== b.isNew) {
          return b.isNew - a.isNew;
        }

        return b.rating - a.rating;
      });
  }
}
