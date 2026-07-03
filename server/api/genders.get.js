import { genders } from "../data/genders";

export default defineEventHandler(() => {
  return successResponse(genders);
});
