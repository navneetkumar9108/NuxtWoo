<script setup></script>

<template>
    <UPageCard class="w-full lg:w-52.5 bg-neutral ring-0 mx-auto  mb-5 lg:mb-7.5 
  " :ui="{
    container: 'p-0 sm:p-0 gap-0  w-full',
    header: 'w-full  lg:h-70 mb-0   bg-gray-200 ',
    body: 'px-2.5 mt-3  w-full lg:w-52.5',
}">
        <template #header>
            <USkeleton class="w-full h-full bg-gray-300" />
        </template>
        <template #body>
            <USkeleton class="h-3 w-3/4 mt-2 bg-gray-300" />
            <USkeleton class="h-3 w-1/2  bg-gray-300 mt-1.5 sm:mt-2.5 mb-1.5" />
        </template>
    </UPageCard>
</template>

<style scoped></style>