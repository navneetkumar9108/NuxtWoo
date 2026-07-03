import { colors } from "../data/colors";

export default defineEventHandler(() => {
  return successResponse(colors);
});
