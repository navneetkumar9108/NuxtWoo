import { fits } from "../data/fits";

export default defineEventHandler(() => {
  return successResponse(fits);
});
