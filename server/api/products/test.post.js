import { Product } from "#server/models/Product";

export default defineEventHandler(async () => {
  const product = await Product.create({
    name: "Test T-Shirt",
    price: 999,
    stock: 10,
  });
  return product;
});
