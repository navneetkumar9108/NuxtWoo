<!-- <script setup>
const search = ref("");
const cartCount = ref(3);

const isMobileMenuOpen = ref(false);
const isSearchOpen = ref(false)
const searchQuery = ref('')


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

const desktopNavItems = computed(() =>
  items.value.filter(item => item.to !== '/account')
);

</script> -->
<!-- 
<template>
  <header class="border-b border-gray-200 bg-white shadow-md shadow-gray-200 z-40 sticky top-0">
    <UContainer class="h-16 flex items-center justify-between gap-4"> -->
<!-- Left: Logo + Nav -->
<!-- <div class="flex items-center justify-center gap-2 lg:gap-6"> -->
<!-- Mobile Menu Button
        <!-- <ButtonUButton icon="i-lucide-menu" color="neutral" variant="ghost" class="lg:hidden text-gray-800"
          @click="isMobileMenuOpen = true" /> --> -->

<!-- Logo -->
<!-- <NuxtLink to="/" class="flex items-center gap-2 font-bold text-lg shrink-0">
          <ImageImg src="/icons/logo.svg" alt="Logo" class="h-8 w-auto" />
          <span>WooNuxt</span>
        </NuxtLink> -->

<!-- Navigation Menu -->
<!-- <UNavigationMenu :items="desktopNavItems" class="px-4" trailingIcon="false" :ui="{
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
      </div> -->

<!-- Right: Search + Icons -->
<!-- <div class="flex items-center gap-2"> -->
<!-- Search Input -->
<!-- <UInput v-model="search" icon="i-lucide-search" placeholder="Search Products..."
          class="hidden lg:block w-80 bg-gray-200 rounded-md" size="lg" :ui="{
            base: 'text-gray-500 bg-gray-50 border border-gray-300 ring-0 focus-visible:ring-0 inset-shadow-sm shadow-gray-200',
          }" /> -->

<!-- Account Button -->
<!-- <ButtonUButton icon="i-lucide-user" color="neutral" variant="ghost" aria-label="Account" to="/account"
          class="hover:text-white  hidden lg:inline-flex text-gray-800" /> -->

<!-- Search Icon -->
<!-- <ButtonUButton class="lg:hidden text-gray-800" icon="i-lucide-search" color="neutral" variant="ghost" size="xl"
          @click="isSearchOpen = !isSearchOpen" /> -->

<!-- Cart Button with Badge -->
<!-- <Bag /> -->

<!-- </div> -->
<!-- </div> ye phle se comment tha -->
<!-- </UContainer> -->
<!-- Mobile Sidebar -->

<!-- <div v-if="isSearchOpen || searchQuery" class="px-4 pb-3 lg:hidden">
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
        <ButtonUButton icon="i-lucide-x" color="primary" variant="ghost" class="absolute top-4 right-4"
          @click="isMobileMenuOpen = false" />
      </template>

      <template #body>
        <UNavigationMenu :items="items" orientation="vertical" :ui="{
          list: 'flex flex-col gap-1',
          link: 'py-3 text-gray-700 data-[active]:text-white  transition-colors',

        }" @click="isMobileMenuOpen = false" />
      </template>
    </USlideover>
  </header>
</template> -->


<script setup>
import { useAuthStore } from '~~/store/auth'
const authStore = useAuthStore() // apna actual auth store path use karo

const search = ref("");
const cartCount = ref(3);

const isMobileMenuOpen = ref(false);
const isSearchOpen = ref(false)
const searchQuery = ref('')

const items = ref([
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Categories", to: "/categories" },
  { label: "Contact", to: "/contact" },
  { label: "Account", to: "/account" },
]);

const desktopNavItems = computed(() =>
  items.value.filter(item => item.to !== '/account')
);

const accountMenuItems = computed(() => [
  [
    { label: 'Orders', icon: 'i-lucide-package', to: '/orders' },
    { label: 'Wishlist', icon: 'i-lucide-heart', to: '/wishlist' }
  ],
  [
    { label: 'Edit Profile', icon: 'i-lucide-user-pen', to: '/account/edit' },
    { label: 'Logout', icon: 'i-lucide-log-out', onSelect: () => authStore.logout() }
  ]
])
</script>

<template>
  <header class="border-b border-gray-200 bg-white shadow-md shadow-gray-200 z-40 sticky top-0">
    <UContainer class="h-16 flex items-center justify-between gap-4">
      <div class="flex items-center justify-center gap-2 lg:gap-6">
        <UButton icon="i-lucide-menu" color="neutral" variant="ghost" class="lg:hidden text-gray-800"
          @click="isMobileMenuOpen = true" />

        <NuxtLink to="/" class="flex items-center gap-2 font-bold text-lg shrink-0">
          <img src="/icons/logo.svg" alt="Logo" class="h-8 w-auto" />
          <span>WooNuxt</span>
        </NuxtLink>

        <UNavigationMenu :items="desktopNavItems" class="px-4" trailingIcon="false" :ui="{
          root: 'hidden lg:flex',
          list: 'flex items-center justify-between gap-6 px-4',
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

      <div class="flex items-center gap-2">
        <UInput v-model="search" icon="i-lucide-search" placeholder="Search Products..."
          class="hidden lg:block w-80 bg-gray-200 rounded-md" size="lg" :ui="{
            base: 'text-gray-500 bg-gray-50 border border-gray-300 ring-0 focus-visible:ring-0 inset-shadow-sm shadow-gray-200',
          }" />

        <!-- Account -->
        <UDropdownMenu v-if="authStore.user" :items="accountMenuItems" :ui="{ content: 'w-64' }">
          <!-- <UButton icon="i-lucide-user" color="neutral" variant="ghost" aria-label="Account"
            class="hidden lg:inline-flex text-gray-800" /> -->
          <UAvatar :alt="authStore.user.name" size="md" />

          <template #content-top>
            <div class="px-3 py-3 border-b border-gray-200">
              <p class="text-sm font-semibold">Hello {{ authStore.user.name }}</p>
              <p class="text-xs text-gray-500 mt-0.5">{{ authStore.user.phone }}</p>
            </div>
          </template>
        </UDropdownMenu>

        <UButton v-else icon="i-lucide-user" color="neutral" variant="ghost" aria-label="Account" to="/login"
          class="hidden lg:inline-flex text-gray-800" />

        <UButton class="lg:hidden text-gray-800" icon="i-lucide-search" color="neutral" variant="ghost" size="xl"
          @click="isSearchOpen = !isSearchOpen" />

        <Bag />
      </div>
    </UContainer>

    <div v-if="isSearchOpen || searchQuery" class="px-4 pb-3 lg:hidden">
      <UInput v-model="searchQuery" icon="i-lucide-search" placeholder="Search products..." size="lg" class="w-full"
        :ui="{ base: 'rounded-xs bg-gray-100 border-0 ring-0 focus:ring-0 pr-2 text-gray-800' }">
        <template v-if="searchQuery" #trailing>
          <UBadge color="neutral" variant="subtle" class="rounded-xs cursor-pointer flex items-center gap-1"
            @click="searchQuery = ''">
            Clear
            <UIcon name="i-lucide-x" class="size-3" />
          </UBadge>
        </template>
      </UInput>
    </div>

    <USlideover v-model:open="isMobileMenuOpen" side="left" :ui="{ content: 'w-100 bg-white' }">
      <template #header>
        <h2 class="font-semibold text-lg">Menu</h2>
        <UButton icon="i-lucide-x" color="primary" variant="ghost" class="absolute top-4 right-4"
          @click="isMobileMenuOpen = false" />
      </template>

      <template #body>
        <div v-if="authStore.user" class="px-1 pb-3 mb-2 border-b border-gray-200">
          <p class="text-sm font-semibold">Hello {{ authStore.user.name }}</p>
          <p class="text-xs text-gray-500 mt-0.5">{{ authStore.user.phone }}</p>
        </div>

        <UNavigationMenu :items="items" orientation="vertical" :ui="{
          list: 'flex flex-col gap-1',
          link: 'py-3 text-gray-700 data-[active]:text-white transition-colors',
        }" @click="isMobileMenuOpen = false" />

        <div v-if="authStore.user" class="flex flex-col gap-1 mt-2 pt-2 border-t border-gray-200">
          <UButton label="Edit Profile" icon="i-lucide-user-pen" variant="ghost" color="neutral" block
            class="justify-start" to="/account/edit" @click="isMobileMenuOpen = false" />
          <UButton label="Logout" icon="i-lucide-log-out" variant="ghost" color="error" block class="justify-start"
            @click="authStore.logout(); isMobileMenuOpen = false" />
        </div>
      </template>
    </USlideover>
  </header>
</template>