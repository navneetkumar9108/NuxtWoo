import { categories } from "../data/categories";

export default defineEventHandler(() => {
  return successResponse(categories);
});
