import { productsV4 } from "~~/server/data/data";
import { productsV3 } from "../../data/productsV3";
import { successResponse } from "../../utils/response";
import { filterProducts } from "../../utils/filter";
import { searchProducts } from "../../utils/search";
import { sortProducts } from "../../utils/sort";
import { paginate } from "../../utils/pagination";

export default defineEventHandler((event) => {
  const query = getQuery(event);

  // const enrichedProducts = productsV3.map((product) => enrichProduct(product));
  // let result = enrichedProducts;

  let result = productsV4;
  // console.log("Enriched Products:", result.slice(0, 5));

  result = filterProducts(result, query);
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
  // console.log("query:", query);
  // console.log("Sort Query Api:", query.sort);
  return successResponse(
    paginated.items,
    "Products fetched successfully",
    paginated.meta,
  );
});
