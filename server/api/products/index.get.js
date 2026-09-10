// import { productsV4 } from "~~/server/data/data";
import { productsV4 } from "~~/server/data/data2";
import { successResponse } from "../../utils/response";
import { filterProducts } from "../../utils/filter";
import { searchProducts } from "../../utils/search";
import { sortProducts } from "../../utils/sort";
import { paginate } from "../../utils/pagination";
import { normalizeProductsForPLP } from "~~/server/utils/normalizeProducts";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  // console.log("query:", query);

  // const enrichedProducts = productsV3.map((product) => enrichProduct(product));
  // let result = enrichedProducts;

  // let result = productsV4;
  // Product → Color wise cards
  let result = normalizeProductsForPLP(productsV4);
  // console.log("normalizeProducts:", result.slice(0, 5));

  result = filterProducts(result, query);
  // console.log("FILTERED COUNT:", result.length); // ← add this

  result = searchProducts(result, query.search);
  // console.log(
  //   "Before sort",
  //   result.slice(0, 5).map((p) => p.id),
  // );
  result = sortProducts(result, query.sort);
  // console.log(
  //   "After sort",
  //   result.slice(0, 5).map((p) => p.id),
  // );
  const paginated = paginate(result, query.page, query.limit);
  // console.log("RESULT BEFORE PAGINATE:", result.length);
  // console.log("PAGE:", query.page);
  // console.log("LIMIT:", query.limit);
  // console.log("PAGINATED:", paginated);
  // console.log("PAGINATED ITEMS:", paginated.items); // console.log("Sort Query Api:", query.sort);
  return successResponse(
    paginated.items,
    "Products fetched successfully",
    paginated.meta,
  );
});
