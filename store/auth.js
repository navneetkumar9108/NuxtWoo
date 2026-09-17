import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const isLoggedIn = ref(false);

  const init = async () => {
    if (process.client) {
      try {
        const res = await $fetch("/api/auth/me");
        if (res.success) {
          user.value = res.data;
          isLoggedIn.value = true;
        }
      } catch (err) {
        user.value = null;
        isLoggedIn.value = false;
      }
    }
  };

  const register = async (data) => {
    const res = await $fetch("/api/auth/register", {
      method: "POST",
      body: data,
    });

    if (!res.success) {
      throw new Error(res.message || "Registration failed");
    }

    // Register ke baad automatically login bhi kar do
    await login({ email: data.email, password: data.password });
  };

  const login = async (data) => {
    const res = await $fetch("/api/auth/login", {
      method: "POST",
      body: data,
    });

    if (!res.success) {
      throw new Error(res.message || "Invalid Email or Password");
    }

    user.value = res.data;
    isLoggedIn.value = true;
  };

  const logout = async () => {
    await $fetch("/api/auth/logout", { method: "POST" });
    user.value = null;
    isLoggedIn.value = false;
    navigateTo("/");
  };

  const updateProfile = async (data) => {
    // Ye feature abhi backend me nahi hai, baad me banayenge
    console.warn("updateProfile API not implemented yet");
  };

  return {
    user,
    isLoggedIn,
    init,
    register,
    login,
    logout,
    updateProfile,
  };
});
