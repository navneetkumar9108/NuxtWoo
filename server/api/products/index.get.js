import { Product } from "~~/server/models/Product";
import { successResponse } from "../../utils/response";
import { filterProducts } from "../../utils/filter";
import { searchProducts } from "../../utils/search";
import { sortProducts } from "../../utils/sort";
import { paginate } from "../../utils/pagination";
import { normalizeProductsForPLP } from "~~/server/utils/normalizeProducts";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  // MongoDB se saara data fetch karo
  const productsFromDB = await Product.find().lean();

  // Product → Color wise cards
  let result = normalizeProductsForPLP(productsFromDB);

  result = filterProducts(result, query);

  result = searchProducts(result, query.search);

  result = sortProducts(result, query.sort);

  const paginated = paginate(result, query.page, query.limit);

  return successResponse(
    paginated.items,
    "Products fetched successfully",
    paginated.meta,
  );
});
