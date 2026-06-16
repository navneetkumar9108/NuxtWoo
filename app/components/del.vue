<script setup lang="ts"></script>

<template>
  <header class="bg-white sticky top-0 z-40 shadow-md">
    <div
      class="flex items-center justify-between py-4 px-4 md:px-8 lg:px-12 mx-36 md:mx-48 lg:mx-60 gap-6"
    >
      <NuxtLink to="/" class="w-40">
        <figure class="flex items-center gap-2">
          <img class="h-8 w-8" src="../assets/NuxtWoo.svg" alt="WooNuxt" />
          <figcaption class="text-lg font-bold">WooNuxt</figcaption>
        </figure>
      </NuxtLink>

      <nav>
        <ul
          class="flex items-center justify-between gap-6 px-4 text-sm text-gray-500"
        >
          <li>
            <NuxtLink to="/">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about">About</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/products">Products</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/contact">Contact</NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="flex items-center justify-end flex-1 gap-6">
        <form
          action=""
          class="flex items-center gap-2 rounded-md border border-gray-300 pl-2 max-w-80 w-[60%] text-gray-500 shadow-inner bg-gray-50"
        >
          <UIcon name="i-lucide-search" class="size-5" strokeWidth="2" />

          <input
            type="text"
            placeholder="Search Products..."
            class="outline-none p-2 flex-1"
          />
        </form>
        <div class="flex items-center gap-4">
          <UIcon name="i-lucide-user" class="size-5.5 stroke-[1.5]" />
          <UIcon
            name="i-lucide-shopping-cart"
            class="size-5.5"
            strokeWidth="2"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped></style>
