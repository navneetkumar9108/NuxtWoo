<script setup>
const props = defineProps(["items", "categoryItems"]);
const selectedCategories = defineModel("selectedCategories");
const priceRange = defineModel("priceRange");
const selectedRating = defineModel("selectedRating");
</script>
<template>
  <UAccordion :items="items" type="multiple">
    <template #body="{ item }">
      <!-- Category -->
      <div v-if="item.label === 'Category'" class="space-y-3">
        <UCheckboxGroup
          :items="categoryItems"
          v-model="selectedCategories"
          :ui="{ label: 'text-black font-normal' }"
        />
      </div>

      <!-- Price -->
      <div v-else-if="item.label === 'Price'" class="space-y-3 mt-2">
        <USlider
          size="xs"
          v-model="priceRange"
          :min="0"
          :max="10000"
          :ui="{
            track: 'bg-gray-300',
            range: 'bg-blue-500',
            thumb: 'bg-white ring-gray-300',
          }"
        />
        <p class="text-sm text-black">
          ₹{{ priceRange[0] }} - ₹{{ priceRange[1] }}
        </p>
      </div>

      <!-- Rating -->
      <div v-else-if="item.label === 'Rating'" class="space-y-2">
        <URadioGroup
          v-model="selectedRating"
          :items="[
            { label: '4★ & Above', value: '4' },
            { label: '3★ & Above', value: '3' },
            { label: '2★ & Above', value: '2' },
          ]"
          :ui="{ label: 'text-black font-normal' }"
        />
      </div>
    </template>
  </UAccordion>
</template>
