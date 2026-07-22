// import { defineStore } from "pinia";

// export const useAuthStore = defineStore("auth", () => {
//   const user = ref(null);

//   const isLoggedIn = computed(() => !!user.value);

//   async function login({ email, password }) {
//     const data = await $fetch("/api/auth/login", {
//       method: "POST",
//       body: { email, password },
//     });
//     user.value = data.user;
//     return data;
//   }

//   async function register({ name, email, password }) {
//     const data = await $fetch("/api/auth/register", {
//       method: "POST",
//       body: { name, email, password },
//     });
//     user.value = data.user;
//     return data;
//   }

//   async function logout() {
//     await $fetch("/api/auth/logout", { method: "POST" });
//     user.value = null;
//   }

//   async function fetchUser() {
//     try {
//       const data = await $fetch("/api/auth/me");
//       user.value = data.user;
//     } catch {
//       user.value = null;
//     }
//   }

//   return { user, isLoggedIn, login, register, logout, fetchUser };
// });

import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const isLoggedIn = ref(false);

  const init = () => {
    if (process.client) {
      user.value = JSON.parse(localStorage.getItem("user"));
      isLoggedIn.value = localStorage.getItem("isLoggedIn") === "true";
    }
  };

  const register = async (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find((item) => item.email === data.email);

    if (exists) {
      throw new Error("Email already exists");
    }

    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("isLoggedIn", "true");

    user.value = newUser;
    isLoggedIn.value = true;
  };

  const login = async (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const loggedUser = users.find(
      (item) => item.email === data.email && item.password === data.password,
    );

    if (!loggedUser) {
      throw new Error("Invalid Email or Password");
    }

    localStorage.setItem("user", JSON.stringify(loggedUser));
    localStorage.setItem("isLoggedIn", "true");

    user.value = loggedUser;
    isLoggedIn.value = true;
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    user.value = null;
    isLoggedIn.value = false;
  };

  return {
    user,
    isLoggedIn,
    init,
    register,
    login,
    logout,
  };
});
