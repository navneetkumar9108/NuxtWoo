import { sizes } from "../data/sizes";

export default defineEventHandler(() => {
  return successResponse(sizes);
});
