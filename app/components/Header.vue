<script setup>
import { useAuthStore } from '~~/store/auth'
import { useWishlistStore } from '~~/store/wishlist';
import { useAddressStore } from '~~/store/address';

const authStore = useAuthStore()
const wishlistStore = useWishlistStore()
const addressStore = useAddressStore()


const isMobileMenuOpen = ref(false);
const isSearchOpen = ref(false)
const searchQuery = ref('')


const deliveryAddress = computed(() => addressStore.selectedAddress)
const { data: categories } = await useFetch("/api/categories");



const megaMenus = {
  men: [
    {
      groups: [
        { title: "Topwear", links: ["T-Shirts", "Casual Shirts", "Formal Shirts", "Sweatshirts", "Sweaters", "Jackets", "Blazers & Coats", "Suits", "Rain Jackets"] },
        { title: "Indian & Festive Wear", links: ["Kurtas & Kurta Sets", "Sherwanis", "Nehru Jackets", "Dhotis"] },
      ],
    },
    {
      groups: [
        { title: "Bottomwear", links: ["Jeans", "Casual Trousers", "Formal Trousers", "Shorts", "Track Pants & Joggers"] },
        { title: "Innerwear & Sleepwear", links: ["Briefs & Trunks", "Boxers", "Vests", "Sleepwear & Loungewear", "Thermals"] },
        { title: "Plus Size", links: [] },
      ],
    },
    {
      groups: [
        { title: "Footwear", links: ["Casual Shoes", "Sports Shoes", "Formal Shoes", "Sneakers", "Sandals & Floaters", "Flip Flops", "Socks"] },
        { title: "Personal Care & Grooming", links: [] },
        { title: "Sunglasses & Frames", links: [] },
        { title: "Watches", links: [] },
      ],
    },
    {
      groups: [
        { title: "Sports & Active Wear", links: ["Sports Shoes", "Sports Sandals", "Active T-Shirts", "Track Pants & Shorts", "Tracksuits", "Jackets & Sweatshirts", "Sports Accessories", "Swimwear"] },
        { title: "Gadgets", links: ["Smart Wearables", "Fitness Gadgets", "Headphones", "Speakers"] },
      ],
    },
    {
      groups: [
        { title: "Fashion Accessories", links: ["Wallets", "Belts", "Perfumes & Body Mists", "Trimmers", "Deodorants", "Ties, Cufflinks & Pocket Squares", "Accessory Gift Sets", "Caps & Hats", "Mufflers, Scarves & Gloves", "Phone Cases", "Rings & Wristwear", "Helmets"] },
        { title: "Bags & Backpacks", links: [] },
        { title: "Luggages & Trolleys", links: [] },
      ],
    },
  ],
  // women, kids, etc. same structure banao
}
const categoryItems = computed(() =>
  (categories.value?.data || []).map((category) => ({
    label: category.name,
    to: `/products?category=${category.slug}`,
  })),
);
// watchEffect(() => console.log('categories:', categoryItems.value))
const items = computed(() => [
  { label: "Home", to: "/" },
  {
    label: "Products", to: "/products",
  },
  { label: "Contact", to: "/contact" },
  { label: "Account", to: authStore.user ? "/account" : "/login" },
]);
// const items = computed(() => [
//   { label: "Home", to: "/" },
//   { label: "Men", slot: "mega", value: "men", to: "/products?gender=men" },
//   { label: "Women", slot: "mega", value: "women", to: "/products?gender=women" },
//   {
//     label: "Products", to: "/products", children: [{ label: "Men", type: "label" }, ...categoryItems.value, { label: "Women", type: "label" }, ...categoryItems.value],
//   },
//   { label: "Contact", to: "/contact" },
//   { label: "Account", to: authStore.user ? "/account" : "/login" },
// ]);

const desktopNavItems = computed(() =>
  items.value.filter(item => item.to !== '/account' && item.to !== '/login')
);

// const accountMenuItems = computed(() => [
//   [
//     { label: 'Orders', icon: 'i-lucide-package', to: '/account/orders' },
//     { label: 'Wishlist', icon: 'i-lucide-heart', to: '/wishlist' }
//   ],
//   [
//     { label: 'Profile', icon: 'i-lucide-user-pen', to: '/account', exact: true },
//     { label: 'Logout', icon: 'i-lucide-log-out', onSelect: () => authStore.logout() }
//   ]
// ])

const accountMenuItems = computed(() => {
  const items = [
    [
      { label: 'Orders', icon: 'i-lucide-package', to: '/account/orders' },
      { label: 'Wishlist', icon: 'i-lucide-heart', to: '/wishlist' }
    ]
  ]

  if (authStore.user?.role === 'admin') {
    items.push([
      { label: 'Admin Panel', icon: 'i-lucide-shield', to: '/admin' }
    ])
  }

  items.push([
    { label: 'Profile', icon: 'i-lucide-user-pen', to: '/account', exact: true },
    { label: 'Logout', icon: 'i-lucide-log-out', onSelect: () => authStore.logout() }
  ])

  return items
})

// function submitSearch() {
//   if (!searchQuery.value.trim()) return
//   navigateTo({ path: '/products', query: { search: searchQuery.value } })
//   isSearchOpen.value = false
// }

function submitSearch() {
  if (!searchQuery.value.trim()) return
  navigateTo({ path: '/products', query: { search: searchQuery.value } })

}
function handleSearch() {
  if (!searchQuery.value.trim()) return

  submitSearch()

  isSearchOpen.value = false
  searchQuery.value = ''
}
</script>

<template>
  <header class="border-b border-gray-200 bg-white/50 backdrop-blur-xl shadow-md shadow-gray-200 z-20 sticky top-0">
    <UContainer class="h-16 flex items-center justify-between gap-4">
      <ButtonUButton icon="i-lucide-menu" color="neutral" variant="ghost"
        class="lg:hidden text-gray-800 flex-1 active:bg-white" @click="isMobileMenuOpen = true" />

      <!-- <NuxtLink to="/"
        class="flex items-center gap-2 font-bold text-sm md:text-lg shrink-0  flex-1 justify-center lg:justify-start">
        <img src="/icons/logo.svg" alt="Poshaak" class="h-8 w-auto" />
        <span class="hidden md:block">Poshaak</span>
      </NuxtLink> -->

<NuxtLink to="/"
      class="flex items-center gap-2 shrink-0 flex-1 justify-center lg:flex-1 lg:justify-start">
      <NuxtImg
        src="/images/Poshaak.png"
        alt="Poshaak"
        width="140"
        height="40"
        class="h-9 md:h-10 w-auto bg-white/50"
        loading="eager"
      />
    </NuxtLink>

      <UNavigationMenu :items="desktopNavItems" class="px-4" trailingIcon="false" :ui="{
        root: 'hidden lg:flex',
        list: 'flex items-center justify-between gap-6 px-4',
        item: '',
        strategy: 'override',
        viewportWrapper: 'top-13',
        viewport: 'rounded-xs',
        linkTrailing: 'hidden',
        link: 'cursor-pointer font-normal p-0 hover:text-gray-500 hover:before:bg-transparent text-gray-800 before:bg-transparent hover:border-b',
        linkActive: 'font-semibold !bg-transparent',
        linkTrailingIcon: 'hidden',
      }" />

      <!-- <UNavigationMenu :items="desktopNavItems" class="px-4" :ui="{
        root: 'hidden lg:flex',
        list: 'flex items-center justify-between gap-6 px-4',
        item: '',
        strategy: 'override',
        linkTrailing: 'hidden',
        link: 'cursor-pointer font-normal p-0 hover:text-gray-500 hover:before:bg-transparent text-gray-800 before:bg-transparent hover:border-b',
        linkActive: 'font-semibold !bg-transparent',
        linkTrailingIcon: 'hidden',
        viewportWrapper: 'fixed inset-x-0 top-14 flex justify-center',
        viewport: 'rounded-xs w-full max-w-7xl shadow-lg ',
      }">
        <template #mega-content="{ item }">
          <UPageGrid class="lg:grid-cols-5 p-6 ">
            <div v-for="(col, i) in megaMenus[item.value]" :key="i" class="space-y-6">
              <div v-for="group in col.groups" :key="group.title">
                <h3 class="text-primary font-semibold text-sm mb-2">{{ group.title }}</h3>
                <ul class="space-y-1.5">
                  <li v-for="link in group.links" :key="link">
                    <ULink class="text-sm text-gray-700 hover:text-primary">{{ link }}</ULink>
                  </li>
                </ul>
              </div>
            </div>
          </UPageGrid>
        </template>
</UNavigationMenu> -->


      <div class="flex items-center gap-2 flex-1 justify-end">
        <!-- <ButtonUButton v-if="deliveryAddress" :label="deliveryAddress?.city"
          class=" text-gray-800 active:bg-white hover:bg-white" icon="i-lsicon-location-outline" color="neutral"
          variant="ghost" /> -->
        <UPopover v-if="authStore.user" mode="hover" :content="{ side: 'bottom', sideOffset: 18 }"
          :ui="{ content: 'w-full h-fit bg-white ring-0 rounded-xs' }">
          <ButtonUButton v-if="deliveryAddress" :label="deliveryAddress?.city"
            class=" text-gray-800 active:bg-white hover:bg-white" icon="i-lsicon-location-outline" color="neutral"
            variant="ghost" />

          <template #content>
            <UCard v-if="deliveryAddress" class="bg-neutral-50 rounded-xs ring-0">
              <div class="flex justify-between items-start gap-4">
                <div>
                  <!-- <p class="text-xs text-neutral-500">Delivering to:</p> -->
                  <p class="text-sm font-semibold mt-1">
                    <span class="font-normal"></span>{{ deliveryAddress.fullName }} | {{
                      deliveryAddress.phone }}
                  </p>
                  <p class="text-sm text-neutral-500 line-clamp-1">
                    {{ deliveryAddress.addressLine1 }},{{ deliveryAddress.addressLine2 }},{{ deliveryAddress.city
                    }}, {{
                      deliveryAddress.state
                    }},{{ deliveryAddress.pincode }}
                  </p>
                </div>
                <UIcon name="i-lucide-bike" class="size-10 text-gray-800 shrink-0" />
              </div>
            </UCard>
          </template>
        </UPopover>
        <ButtonUButton class=" text-gray-800 active:bg-white hover:bg-white" icon="i-lucide-search" color="neutral"
          variant="ghost" @click="isSearchOpen = !isSearchOpen" />

        <UPopover v-if="authStore.user" mode="hover" :content="{ side: 'bottom', sideOffset: 18 }"
          :ui="{ content: 'w-64  bg-white ring-0 rounded-xs' }">
          <UAvatar :alt="authStore.user.name" size="md" class="hover:bg-white bg-transparent rounded-md  text-gray-800"
            :ui="{ fallback: 'text-gray-800' }" />

          <template #content>
            <div class="px-3 py-3 border-b border-gray-200 ">
              <p class="text-sm font-semibold">Hello {{ authStore.user.name }}</p>
              <p class="text-xs text-gray-500 mt-0.5">{{ authStore.user.phone }}</p>
            </div>
            <div class="flex flex-col p-1">
              <ButtonUButton v-for="item in accountMenuItems.flat()" :key="item.label" :label="item.label"
                :icon="item.icon" :to="item.to" variant="ghost" color="neutral"
                class="justify-start rounded-xs text-gray-800 hover:text-white" @click="item.onSelect?.()" />
            </div>
          </template>
        </UPopover>
        <ButtonUButton v-else icon="i-lucide-user" color="neutral" variant="ghost" aria-label="Account" to="/login"
          class="hidden lg:inline-flex text-gray-800 active:bg-white hover:bg-white" />

        <UChip :show="wishlistStore.items.length > 0" :text="wishlistStore.items.length" size="3xl"
          class="hidden lg:inline-flex" :ui="{
            base: '-top-1 -right-1 -translate-y-0 translate-x-0 h-4 w-4 ring-0 text-white text-[10px]'
          }">
          <ButtonUButton icon="i-lucide-heart" color="neutral" variant="ghost" aria-label="Wishlist" to="/wishlist"
            class="hidden lg:inline-flex text-gray-800 active:bg-white hover:bg-white" />
        </UChip>

        <Bag />
      </div>
    </UContainer>
    <UContainer class="transition-all duration-500 ease-out">
      <div v-if="isSearchOpen || searchQuery" class="px-4 pb-3 lg:px-0 ">
        <UInput v-model="searchQuery" @keyup.enter="handleSearch" icon="i-lucide-search"
          placeholder="Search products..." size="lg" class="w-full"
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

    </UContainer>

    <USlideover v-model:open="isMobileMenuOpen" side="left" :ui="{ content: 'max-w-xs bg-white' }" class="lg:hidden">
      <template #header>
        <h2 class="font-semibold text-lg">Menu</h2>
        <ButtonUButton icon="i-lucide-x" color="primary" variant="ghost" class="absolute top-4 right-4"
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

        <!-- Logged in: same links as desktop dropdown -->
        <div v-if="authStore.user" class="flex flex-col gap-1 mt-2 pt-2 border-t border-gray-200">
          <ButtonUButton v-for="item in accountMenuItems.flat()" :key="item.label" :label="item.label" :icon="item.icon"
            :to="item.to" variant="ghost" :color="item.label === 'Logout' ? 'error' : 'neutral'" block
            class="justify-start text-gray-400" @click="item.onSelect ? item.onSelect() : (isMobileMenuOpen = false)" />
        </div>

        <!-- Logged out: same as desktop login button -->
        <div v-else class="mt-2 pt-2 border-t border-gray-200">
          <ButtonUButton label="Login" icon="i-lucide-user" color="neutral" variant="ghost" block class="justify-start"
            to="/login" @click="isMobileMenuOpen = false" />
        </div>
      </template>
    </USlideover>
  </header>
</template>
