import { brands } from "../data/brands";

export default defineEventHandler(() => {
  return successResponse(brands);
});
