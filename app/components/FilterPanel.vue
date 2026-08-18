<script setup>
const props = defineProps(["items", "categoryItems", "brandItems", "genderItems"
]);
const selectedBrands = defineModel("selectedBrands")
const selectedCategories = defineModel("selectedCategories");
const priceRange = defineModel("priceRange");
const selectedRating = defineModel("selectedRating");
const selectedGenders = defineModel("selectedGenders");

// const emit = defineEmits(["clear-filters"])

</script>
<template>

  <UAccordion :items="items" :default-value="['0', '1']" type="multiple" :ui="{
    header: 'bg-gray-200',
    body: 'py-2',

  }">
    <template #body="{ item }">
      <!-- Category -->
      <div v-if="item.label === 'Category'" class="space-y-3 h-">
        <UCheckboxGroup size="xl" :items="categoryItems" v-model="selectedCategories" :ui="{
          label: 'text-black font-normal',
          base: ' ring-2 ring-gray-800 p-1',
          indicator: 'rounded-sm bg-red-400  ',
        }" />
      </div>

      <!-- Brands -->
      <div v-else-if="item.label === 'Brands'" class="space-y-3">
        <UCheckboxGroup size="xl" :items="brandItems" v-model="selectedBrands" :ui="{
          label: 'text-black font-normal',
          base: ' ring-2 ring-gray-800 p-1',
          indicator: 'rounded-sm bg-red-400  ',
        }" />
      </div>
      <div v-else-if="item.label === 'Gender'" class="space-y-3">
        <UCheckboxGroup size="xl" :items="genderItems" v-model="selectedGenders" :ui="{
          label: 'text-black font-normal',
          base: ' ring-2 ring-gray-800 p-1',
          indicator: 'rounded-sm bg-red-400  ',
        }" />
      </div>

      <!-- Price -->
      <div v-else-if="item.label === 'Price'" class="space-y-3 mt-2 px-1">
        <USlider size="xs" v-model="priceRange" :min="0" :max="10000" :ui="{
          track: 'h-0.5',
          range: 'bg-red-400',
          thumb: 'bg-white ring-red-400 ring-2 size-2 ',
        }" />
        <p class="text-xs font-semibold text-black px-6">
          ₹{{ priceRange[0] }} - ₹{{ priceRange[1] }}
        </p>
      </div>

      <!-- Rating -->
      <div v-else-if="item.label === 'Rating'" class="space-y-2 ">
        <URadioGroup v-model="selectedRating" size="xl" :items="[
          { label: '4★ & Above', value: '4' },
          { label: '3★ & Above', value: '3' },
          { label: '2★ & Above', value: '2' },
        ]" :ui="{
          label: 'text-black font-normal', fieldset: '  py-2 ',
          base: 'ring-gray-800 ring-2 rounded-sm p-1',
          indicator: 'bg-white after:bg-red-400  after:rounded-sm after:size-full'
        }" />
      </div>
    </template>
  </UAccordion>
</template>

<style scoped></style>