<script setup>

const { label, icon, size, color, variant, ui } = defineProps({
    label: String,
    icon: String,
    size: String,
    color: String,
    variant: String,
    ui: Object
});


</script>

<template>
    <UBadge :label="label" :icon="icon" :size="size" :color="color" :variant="variant" :ui="ui" />
</template>

<style scoped></style>