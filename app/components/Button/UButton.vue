<script setup>

defineOptions({ inheritAttrs: false });

// const props = defineProps({
//     label: String,
//     icon: String,
//     size: String,
//     color: String,
//     variant: String,
//     to: String,
//     type: String,
//     trailingIcon: String,
//     leadingIcon: String,
//     ui: Object,
//     target: String
// });
// const { label, icon, size, color, type, variant, to, trailingIcon, leadingIcon, ui } = defineProps({
//     label: String,
//     icon: String,
//     size: String,
//     color: String,
//     variant: String,
//     to: String,
//     type: String,
//     trailingIcon: String,
//     leadingIcon: String,
//     ui: Object
// });

</script>

<template>
    <!-- <UButton :label=label :icon=icon :color=color :variant=variant :size=size :to=to :type=type
        :trailing-icon="trailingIcon" :leading-icon="leadingIcon" :ui=ui :target=target /> -->
    <!-- <UButton v-bind="props" /> -->

    <UButton v-bind="$attrs">
        <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
            <slot :name="slotName" v-bind="slotProps" />
        </template>
    </UButton>
</template>

<style scoped></style>