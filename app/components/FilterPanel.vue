<script setup>
const props = defineProps(["items", "categoryItems", "brandItems", "genderItems"]);
const selectedBrands = defineModel("selectedBrands")
const selectedCategories = defineModel("selectedCategories");
const priceRange = defineModel("priceRange");
const selectedRating = defineModel("selectedRating");
const selectedGenders = defineModel("selectedGenders");
</script>
<template>
  <UAccordion :items="items" :default-value="['0', '1']" type="multiple" :ui="{
    header: 'bg-gray-200',
    body: 'py-2',

  }">
    <template #body="{ item }">
      <!-- Category -->
      <div v-if="item.label === 'Category'" class="space-y-3 h-">
        <UCheckboxGroup :items="categoryItems" v-model="selectedCategories" :ui="{ label: 'text-black font-normal' }" />
      </div>

      <!-- Brands -->
      <div v-if="item.label === 'Brands'" class="space-y-3">
        <UCheckboxGroup :items="brandItems" v-model="selectedBrands" :ui="{ label: 'text-black font-normal' }" />
      </div>
      <div v-if="item.label === 'Gender'" class="space-y-3">
        <UCheckboxGroup :items="genderItems" v-model="selectedGenders" :ui="{ label: 'text-black font-normal' }" />
      </div>

      <!-- Price -->
      <div v-else-if="item.label === 'Price'" class="space-y-3 mt-2 px-1">
        <USlider size="xs" v-model="priceRange" :min="0" :max="10000" :ui="{
          track: 'h-0.5',
          range: 'bg-gray-800',
          thumb: 'bg-white ring-gray-800 ring-2 size-2 ',
        }" />
        <p class="text-sm text-black px-6">
          ₹{{ priceRange[0] }} - ₹{{ priceRange[1] }}
        </p>
      </div>

      <!-- Rating -->
      <div v-else-if="item.label === 'Rating'" class="space-y-2">
        <URadioGroup v-model="selectedRating" :items="[
          { label: '4★ & Above', value: '4' },
          { label: '3★ & Above', value: '3' },
          { label: '2★ & Above', value: '2' },
        ]" :ui="{ label: 'text-black font-normal' }" />
      </div>
    </template>
  </UAccordion>
</template>

<style scoped></style>