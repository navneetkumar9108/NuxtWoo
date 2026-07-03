import { licenses } from "../data/licenses";

export default defineEventHandler(() => {
  return successResponse(licenses);
});
