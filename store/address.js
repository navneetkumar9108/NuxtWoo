// Mirrors the setup-store pattern used by ~~/store/cart.
// Adjust field names if your actual cart store uses a different shape.
import { defineStore } from "pinia";

export const useAddressStore = defineStore("address", () => {
  const addresses = ref([]);
  const selectedAddressId = ref(null);

  const selectedAddress = computed(
    () => addresses.value.find((a) => a.id === selectedAddressId.value) || null,
  );

  function addAddress(address) {
    const id = crypto.randomUUID();
    addresses.value.push({ id, ...address });
    if (address.isDefault || addresses.value.length === 1) {
      selectedAddressId.value = id;
    }
    return id;
  }

  function updateAddress(id, data) {
    const index = addresses.value.findIndex((a) => a.id === id);
    if (index !== -1)
      addresses.value[index] = { ...addresses.value[index], ...data };
  }

  function removeAddress(id) {
    addresses.value = addresses.value.filter((a) => a.id !== id);
    if (selectedAddressId.value === id) {
      selectedAddressId.value = addresses.value[0]?.id ?? null;
    }
  }

  function selectAddress(id) {
    selectedAddressId.value = id;
  }

  return {
    addresses,
    selectedAddressId,
    selectedAddress,
    addAddress,
    updateAddress,
    removeAddress,
    selectAddress,
  };
});
