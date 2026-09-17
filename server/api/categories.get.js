import { Product } from "~~/server/models/Product";

export default defineEventHandler(async () => {
  const productsFromDB = await Product.find().lean();

  const categories = [
    ...new Map(
      productsFromDB.map((product) => [
        product.category.slug,
        product.category,
      ]),
    ).values(),
  ];

  return successResponse(categories, "Categories fetched successfully");
});
