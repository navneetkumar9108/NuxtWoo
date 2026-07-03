import { materials } from "../data/materials";

export default defineEventHandler(() => {
  return successResponse(materials);
});
