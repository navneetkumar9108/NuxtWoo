// Mirrors the setup-store pattern used by ~~/store/cart.
// Adjust field names if your actual cart store uses a different shape.
// import { defineStore } from "pinia";

// export const useAddressStore = defineStore("address", () => {
//   const addresses = ref([]);
//   const selectedAddressId = ref(null);

//   const selectedAddress = computed(
//     () => addresses.value.find((a) => a.id === selectedAddressId.value) || null,
//   );

//   function addAddress(address) {
//     const id = crypto.randomUUID();
//     addresses.value.push({ id, ...address });
//     if (address.isDefault || addresses.value.length === 1) {
//       selectedAddressId.value = id;
//     }
//     return id;
//   }

//   function updateAddress(id, data) {
//     const index = addresses.value.findIndex((a) => a.id === id);
//     if (index !== -1)
//       addresses.value[index] = { ...addresses.value[index], ...data };
//   }

//   function removeAddress(id) {
//     addresses.value = addresses.value.filter((a) => a.id !== id);
//     if (selectedAddressId.value === id) {
//       selectedAddressId.value = addresses.value[0]?.id ?? null;
//     }
//   }

//   function selectAddress(id) {
//     selectedAddressId.value = id;
//   }

//   return {
//     addresses,
//     selectedAddressId,
//     selectedAddress,
//     addAddress,
//     updateAddress,
//     removeAddress,
//     selectAddress,
//   };
// });

import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAddressStore = defineStore("address", () => {
  const addresses = ref([]);
  const selectedAddressId = ref(null);
  const loading = ref(false);

  const selectedAddress = computed(
    () =>
      addresses.value.find((a) => a._id === selectedAddressId.value) || null,
  );

  async function fetchAddresses() {
    loading.value = true;
    try {
      const res = await $fetch("/api/addresses");
      if (res.success) {
        addresses.value = res.data;

        // Default address ya pehla address auto-select karo
        const defaultAddr = addresses.value.find((a) => a.isDefault);
        selectedAddressId.value =
          defaultAddr?._id || addresses.value[0]?._id || null;
      }
    } catch (err) {
      console.error("Failed to fetch addresses", err);
    } finally {
      loading.value = false;
    }
  }

  async function addAddress(address) {
    try {
      const res = await $fetch("/api/addresses/add", {
        method: "POST",
        body: address,
      });
      if (res.success) {
        addresses.value.push(res.data);
        if (address.isDefault || addresses.value.length === 1) {
          selectedAddressId.value = res.data._id;
        }
      }
      return res;
    } catch (err) {
      return {
        success: false,
        message: err.data?.message || "Failed to add address",
      };
    }
  }

  async function updateAddress(addressId, data) {
    try {
      const res = await $fetch("/api/addresses/update", {
        method: "PATCH",
        body: { addressId, ...data },
      });
      if (res.success) {
        await fetchAddresses(); // refresh list (isDefault switch bhi handle ho jayega)
      }
      return res;
    } catch (err) {
      return {
        success: false,
        message: err.data?.message || "Failed to update address",
      };
    }
  }

  async function removeAddress(addressId) {
    try {
      const res = await $fetch("/api/addresses/remove", {
        method: "DELETE",
        body: { addressId },
      });
      if (res.success) {
        addresses.value = addresses.value.filter((a) => a._id !== addressId);
        if (selectedAddressId.value === addressId) {
          selectedAddressId.value = addresses.value[0]?._id ?? null;
        }
      }
      return res;
    } catch (err) {
      return {
        success: false,
        message: err.data?.message || "Failed to remove address",
      };
    }
  }

  function selectAddress(id) {
    selectedAddressId.value = id;
  }

  return {
    addresses,
    selectedAddressId,
    selectedAddress,
    loading,
    fetchAddresses,
    addAddress,
    updateAddress,
    removeAddress,
    selectAddress,
  };
});
