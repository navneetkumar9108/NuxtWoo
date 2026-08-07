<script setup>
import { useAuthStore } from '~~/store/auth'
import { useWishlistStore } from '~~/store/wishlist';
const authStore = useAuthStore() // apna actual auth store path use karo
const wishlistStore = useWishlistStore() // agar nahi banaya to bata dena, wo bhi bana du

const search = ref("");
const cartCount = ref(3);

const isMobileMenuOpen = ref(false);
const isSearchOpen = ref(false)
const searchQuery = ref('')

// { label: "Categories", to: "/categories" },

const items = ref([
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Contact", to: "/contact" },
  { label: "Account", to: "/account" },
]);

const desktopNavItems = computed(() =>
  items.value.filter(item => item.to !== '/account')
);

const accountMenuItems = computed(() => [
  [
    { label: 'Orders', icon: 'i-lucide-package', to: '/account/orders' },
    { label: 'Wishlist', icon: 'i-lucide-heart', to: '/wishlist' }
  ],
  [
    { label: 'Profile', icon: 'i-lucide-user-pen', to: '/account', exact: true },
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
        <UDropdownMenu v-if="authStore.user" :items="accountMenuItems" :ui="{
          content: 'w-64 bg-white ring-0 rounded-xs',
          item: 'rounded-xs before:rounded-xs ',
          itemLabel: ''
        }">
          <UAvatar :alt="authStore.user.name" size="md" />

          <template #content-top>
            <div class="px-3 py-3 border-b border-gray-200">
              <p class="text-sm font-semibold">Hello {{ authStore.user.name }}</p>
              <p class="text-xs text-gray-500 mt-0.5">{{ authStore.user.phone }}</p>
            </div>
          </template>
        </UDropdownMenu>

        <UButton v-else icon="i-lucide-user" color="neutral" variant="ghost" aria-label="Account" to="/login"
          class="hidden lg:inline-flex text-gray-800 hover:text-white" />

        <UChip v-if="wishlistStore.items" :text="wishlistStore.items.length" size="3xl" :ui="{
          base: '-top-1 -right-1 -translate-y-0 translate-x-0 h-4 w-4 ring-0  text-white text-[10px]'
        }">
          <UButton icon="i-lucide-heart" color="neutral" variant="ghost" aria-label="Wishlist" to="/wishlist"
            class="hidden lg:inline-flex hover:bg-gray-800 text-gray-800 hover:text-white " />
        </UChip>
        <!-- <span v-if="wishlistStore.totalItems > 0" class="absolute -top-1 -right-1 flex items-center justify-center
             h-4 w-4 rounded-full bg-primary text-white text-[10px] font-medium">
          {{ wishlistStore.items }}
        </span> -->

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

    <USlideover v-model:open="isMobileMenuOpen" side="left" :ui="{ content: 'max-w-xs bg-white' }">
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


<!-- <script setup>
  import { useAuthStore } from '~~/store/auth'
  import { useWishlistStore } from '~~/store/wishlist'

  const authStore = useAuthStore()
  const wishlistStore = useWishlistStore()

  const search = ref('')
  const isSearchOpen = ref(false)

  const items = ref([
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/products' },
    { label: 'Contact', to: '/contact' },
  ])

  const accountMenuItems = computed(() => [
    [
      { label: 'Orders', icon: 'i-lucide-package', to: '/account/orders' },
      { label: 'Wishlist', icon: 'i-lucide-heart', to: '/wishlist' },
    ],
    [
      { label: 'Profile', icon: 'i-lucide-user-pen', to: '/account', exact: true },
      { label: 'Logout', icon: 'i-lucide-log-out', onSelect: () => authStore.logout() },
    ],
  ])
</script>

<template>
  <UHeader :ui="{ root: 'border-b border-gray-200 shadow-sm shadow-gray-100 bg-white', center: 'flex-1' }">
    <template #title>
      <NuxtLink to="/" class="flex items-center gap-2 font-bold text-lg shrink-0">
        <img
          src="https://media.canva.com/v2/image-resize/format:PNG/height:518/quality:100/uri:ifs%3A%2F%2FM%2F4e89280a-a5b8-48e9-9fd2-70ef7be09b97/watermark:F/width:760?csig=AAAAAAAAAAAAAAAAAAAAAK-HJ9336znW0WaeorV2C5-gm8oRwK15Lx16k8TcgEYi&exp=1786115391&osig=AAAAAAAAAAAAAAAAAAAAAKPc4w6hBVpXHSYcyVolk6fOLHIjzLPJTt10ofW-fCZf&signer=media-rpc&x-canva-quality=screen_3x"
          alt="Logo" class="h-8 w-auto" />
        <span>LuxeLane</span>
      </NuxtLink>
    </template>

    desktop nav
    <UNavigationMenu :items="items" variant="link" :ui="{
      link: 'font-normal text-gray-500 hover:text-gray-900',
      linkLeadingIcon: 'hidden',
    }" />

    <template #right>
      <UInput v-model="search" icon="i-lucide-search" placeholder="Search products..." size="lg"
        class="hidden lg:block w-72" :ui="{ base: 'bg-gray-50 border border-gray-300 ring-0 focus-visible:ring-0' }" />

      <UButton icon="i-lucide-search" color="neutral" variant="ghost" class="lg:hidden" aria-label="Search"
        @click="isSearchOpen = !isSearchOpen" />

      <UChip :text="wishlistStore.items?.length" :show="!!wishlistStore.items?.length" size="3xl" :ui="{
        base: '-top-1 -right-1 h-4 w-4 ring-0 text-[10px]',
      }">
        <UButton icon="i-lucide-heart" color="neutral" variant="ghost" to="/wishlist" aria-label="Wishlist"
          class="hidden lg:inline-flex" />
      </UChip>

      <Bag />

      <UDropdownMenu v-if="authStore.user" :items="accountMenuItems" :ui="{ content: 'w-64' }">
        <UAvatar :alt="authStore.user.name" size="md" class="cursor-pointer" />

        <template #content-top>
          <div class="px-3 py-3 border-b border-gray-200">
            <p class="text-sm font-semibold">Hello {{ authStore.user.name }}</p>
            <p class="text-xs text-gray-500 mt-0.5">{{ authStore.user.phone }}</p>
          </div>
        </template>
      </UDropdownMenu>

      <UButton v-else icon="i-lucide-user" color="neutral" variant="ghost" to="/login" aria-label="Account"
        class="hidden lg:inline-flex" />
    </template>

    mobile drawer content (UHeader handles the toggle + slideover itself)
    <template #body>
      <div v-if="authStore.user" class="pb-3 mb-2 border-b border-gray-200">
        <p class="text-sm font-semibold">Hello {{ authStore.user.name }}</p>
        <p class="text-xs text-gray-500 mt-0.5">{{ authStore.user.phone }}</p>
      </div>

      <UNavigationMenu :items="[...items, { label: 'Account', to: '/account' }]" orientation="vertical"
        class="-mx-2.5" />

      <div v-if="authStore.user" class="flex flex-col gap-1 mt-2 pt-2 border-t border-gray-200">
        <UButton label="Edit Profile" icon="i-lucide-user-pen" variant="ghost" color="neutral" block
          class="justify-start" to="/account/edit" />
        <UButton label="Logout" icon="i-lucide-log-out" variant="ghost" color="error" block class="justify-start"
          @click="authStore.logout()" />
      </div>
    </template>
  </UHeader>

  <div v-if="isSearchOpen" class="px-4 pb-3 lg:hidden border-b border-gray-200">
    <UInput v-model="search" icon="i-lucide-search" placeholder="Search products..." size="lg" class="w-full"
      :ui="{ base: 'bg-gray-50 border-0 ring-0 focus:ring-0' }">
      <template v-if="search" #trailing>
        <UBadge color="neutral" variant="subtle" class="cursor-pointer flex items-center gap-1" @click="search = ''">
          Clear
          <UIcon name="i-lucide-x" class="size-3" />
        </UBadge>
      </template>
    </UInput>
  </div>
</template> -->