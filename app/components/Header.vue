<script setup>
const items = ref([
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Products",
    to: "/products",
  },
  {
    label: "Categories",
    to: "/categories",
  },
  {
    label: "Contact",
    to: "/contact",
  },
]);

const search = ref("");
const cartCount = ref(3);

const sidebarOpen = ref(false);
</script>

<template>
  <header
    class="border-b border-gray-200 bg-white shadow-md shadow-gray-200 z-40 sticky top-0"
  >
    <UContainer class="h-16 flex items-center justify-between gap-4">
      <!-- <div
        class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4"
      > -->
      <!-- Left: Logo + Nav -->
      <div class="flex items-center justify-center gap-6">
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="flex items-center gap-2 font-bold text-lg shrink-0"
        >
          <!-- <div
            class="w-8 h-8 bg-violet-600 rounded-md flex items-center justify-center"
          >
            <UIcon name="i-lucide-zap" class="text-white w-5 h-5" />
          </div> -->
          <NuxtImg src="/icons/logo.svg" alt="Logo" class="h-8 w-auto" />
          <span>WooNuxt</span>
        </NuxtLink>

        <!-- Navigation Menu -->
        <UNavigationMenu
          :items="items"
          class="px-4"
          trailingIcon="false"
          :ui="{
            root: '!block',
            list: 'flex items-center justify-between gap-6 px-4   ',
            item: '',
            strategy: 'override',
            viewportWrapper: 'hidden !hidden',
            viewport: 'hidden !hidden',
            linkTrailing: 'hidden',
            link: 'cursor-pointer font-normal p-0 hover:text-gray-500 hover:before:bg-transparent text-gray-500 before:bg-transparent',
            linkActive: 'font-semibold !bg-transparent',
            linkTrailingIcon: 'hidden',
          }"
        />
      </div>

      <!-- Right: Search + Icons -->
      <div class="flex items-center gap-2">
        <!-- Search Input -->
        <UInput
          v-model="search"
          icon="i-lucide-search"
          placeholder="Search Products..."
          class="hidden md:block w-80 bg-gray-200 rounded-md"
          size="lg"
          :ui="{
            base: 'text-gray-500 bg-gray-50 border border-gray-300 ring-0 focus-visible:ring-0 inset-shadow-sm shadow-gray-200',
          }"
        />

        <!-- Account Button -->
        <UButton
          icon="i-lucide-user"
          color="neutral"
          variant="ghost"
          aria-label="Account"
          to="/account"
          class="hover:bg-transparent active:bg-transparent"
          :ui="{
            leadingIcon: 'size-8 text-slate-950 font-normal stroke-1',
          }"
        />

        <!-- Cart Button with Badge -->
        <div class="relative">
          <!-- <UChip :text="5" size="3xl"> -->
          <UButton
            icon="i-lucide-shopping-cart"
            color="neutral"
            variant="ghost"
            aria-label="Cart"
            to="/cart"
            class="hover:bg-transparent active:bg-transparent"
            :ui="{
              leadingIcon: 'size-8 text-slate-950',
            }"
          />
          <!-- </UChip> -->
          <UBadge
            v-if="cartCount > 0"
            :label="String(cartCount)"
            size="xs"
            color="primary"
            class="absolute -top-1 -right-1 pointer-events-none bg-indigo-800 text-white rounded-full text-[8px] p-1 gap-0 font-normal h-[12px] min-w-[12px]"
          />
        </div>

        <!-- Mobile Menu Button -->
        <UButton
          icon="i-lucide-menu"
          color="neutral"
          variant="ghost"
          class="md:hidden"
          aria-label="Menu"
        />
      </div>
      <!-- </div> -->
    </UContainer>
    <!-- Mobile Sidebar -->
    <div
      v-show="sidebarOpen"
      class="fixed top-0 right-0 bottom-0 w-64 bg-white z-50 shadow-lg flex flex-col pt-20 px-6 gap-5 md:hidden"
    >
      <UButton
        icon="i-lucide-x"
        color="neutral"
        variant="ghost"
        class="absolute top-4 right-4"
        @click="sidebarOpen = false"
      />

      <NuxtLink
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        @click="sidebarOpen = false"
        class="text-gray-700 font-medium"
      >
        {{ item.label }}
      </NuxtLink>
    </div>

    <!-- Backdrop -->
    <div
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
      class="fixed inset-0 bg-black/30 z-40 md:hidden"
    ></div>
  </header>
</template>
