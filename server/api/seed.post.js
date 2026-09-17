import { Product } from "~~/server/models/Product";
import { productsV4 } from "~~/server/data/data2.updated";

export default defineEventHandler(async () => {
  await Product.deleteMany({});
  const inserted = await Product.insertMany(productsV4);
  return {
    success: true,
    message: `${inserted.length} products inserted`,
  };
});
