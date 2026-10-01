// app/middleware/auth.js
export default defineNuxtRouteMiddleware(async (to) => {
  const event = import.meta.server ? useRequestEvent() : null;

  try {
    const res = event
      ? await $fetch("/api/auth/me", { headers: useRequestHeaders(["cookie"]) })
      : await $fetch("/api/auth/me");

    if (!res.success) {
      return navigateTo("/login");
    }
  } catch (err) {
    return navigateTo("/login");
  }
});
