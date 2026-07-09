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
  {
    label: "Account",
    to: "/account",
  },
]);

const search = ref("");
const cartCount = ref(3);

const isMobileMenuOpen = ref(false);
const isSearchOpen = ref(false)
const searchQuery = ref('')
</script>

<template>
  <header class="border-b border-gray-200 bg-white shadow-md shadow-gray-200 z-40 sticky top-0">
    <UContainer class="h-16 flex items-center justify-between gap-4">
      <!-- Left: Logo + Nav -->
      <div class="flex items-center justify-center gap-2 lg:gap-6">
        <!-- Mobile Menu Button -->
        <UButton icon="i-lucide-menu" color="neutral" variant="ghost" class="lg:hidden text-gray-800"
          @click="isMobileMenuOpen = true" />
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 font-bold text-lg shrink-0">
          <NuxtImg src="/icons/logo.svg" alt="Logo" class="h-8 w-auto" />
          <span>WooNuxt</span>
        </NuxtLink>

        <!-- Navigation Menu -->
        <UNavigationMenu :items="items" class="px-4" trailingIcon="false" :ui="{
          root: 'hidden lg:flex',
          list: 'flex items-center justify-between gap-6 px-4   ',
          item: '',
          strategy: 'override',
          viewportWrapper: 'hidden !hidden',
          viewport: 'hidden !hidden',
          linkTrailing: 'hidden',
          link: 'cursor-pointer font-normal p-0 hover:text-gray-500 hover:before:bg-transparent text-gray-500 before:bg-transparent',
          linkActive: 'font-semibold !bg-transparent',
          linkTrailingIcon: 'hidden',
        }" />
      </div>

      <!-- Right: Search + Icons -->
      <div class="flex items-center gap-2">
        <!-- Search Input -->
        <UInput v-model="search" icon="i-lucide-search" placeholder="Search Products..."
          class="hidden lg:block w-80 bg-gray-200 rounded-md" size="lg" :ui="{
            base: 'text-gray-500 bg-gray-50 border border-gray-300 ring-0 focus-visible:ring-0 inset-shadow-sm shadow-gray-200',
          }" />

        <!-- Account Button -->
        <UButton icon="i-lucide-user" color="neutral" variant="ghost" aria-label="Account" to="/account"
          class="hover:bg-transparent active:bg-transparent hidden lg:block" :ui="{
            leadingIcon: 'size-8 text-slate-950 font-normal stroke-1',
          }" />
        <!-- Search Icon -->
        <UButton class="lg:hidden text-gray-800" icon="i-lucide-search" color="neutral" variant="ghost" size="xl"
          @click="isSearchOpen = !isSearchOpen" />

        <!-- Cart Button with Badge -->
        <div class="relative">
          <!-- <UChip :text="5" size="3xl"> -->
          <UButton icon="i-lucide-shopping-cart" color="neutral" variant="ghost" aria-label="Cart" to="/cart"
            class="hover:bg-transparent active:bg-transparent" :ui="{
              leadingIcon: 'size-6 text-slate-950',
            }" />
          <!-- </UChip> -->
          <UBadge v-if="cartCount > 0" :label="String(cartCount)" size="xs" color="primary"
            class="absolute -top-1 -right-1 pointer-events-none bg-indigo-800 text-white rounded-full text-[8px] p-1 gap-0 font-normal h-[12px] min-w-[12px]" />
        </div>

      </div>
      <!-- </div> -->
    </UContainer>
    <!-- Mobile Sidebar -->

    <div v-if="isSearchOpen || searchQuery" class="px-4 pb-3 lg:hidden">
      <UInput v-model="searchQuery" icon="i-lucide-search" placeholder="Search products..." size="lg" class="w-full"
        :ui="{
          base: 'rounded-xs bg-gray-100 border-0 ring-0 focus:ring-0 pr-2 text-gray-800',
        }">
        <template v-if="searchQuery" #trailing>
          <UBadge color="neutral" variant="subtle" class="rounded-xs cursor-pointer flex items-center gap-1"
            @click="searchQuery = ''">
            Clear
            <UIcon name="i-lucide-x" class="size-3" />
          </UBadge>
        </template>
      </UInput>
    </div>
    <USlideover v-model:open="isMobileMenuOpen" side="left" :ui="{
      content: 'w-100 bg-white',
    }">
      <template #header>
        <h2 class="font-semibold text-lg">Menu</h2>
        <UButton icon="i-lucide-x" color="primary" variant="ghost" class="absolute top-4 right-4"
          @click="isMobileMenuOpen = false" />

      </template>

      <template #body>
        <UNavigationMenu :items="items" orientation="vertical" :ui="{
          list: 'flex flex-col gap-1',
          link: 'py-3 text-gray-700 data-[active]:text-white  transition-colors',

        }" @click="isMobileMenuOpen = false" />
      </template>
    </USlideover>

    <!-- Backdrop -->
    <!-- <div v-if="isMobileMenuOpen" @click="isMobileMenuOpen = false" class="fixed inset-0 bg-black z-40 md:hidden"></div> -->
  </header>
</template>
