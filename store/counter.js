import { defineStore } from "pinia";
import { ref } from "vue";

export const useCounterStore = defineStore(
  "counter",
  () => {
    const count = ref(1);
    return { count };
  },
  {
    persist: true, // agar pinia-plugin-persistedstate use kar rahe ho
  },
);
