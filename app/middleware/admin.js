// app/middleware/admin.js
export default defineNuxtRouteMiddleware(async (to) => {
  const event = import.meta.server ? useRequestEvent() : null;

  try {
    const res = event
      ? await $fetch("/api/auth/me", { headers: useRequestHeaders(["cookie"]) })
      : await $fetch("/api/auth/me");

    if (!res.success || res.data.role !== "admin") {
      return navigateTo("/");
    }
  } catch (err) {
    return navigateTo("/");
  }
});
