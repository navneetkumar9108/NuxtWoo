<!-- <script setup>
const email = ref("");

const footerLinks = [
  {
    label: "Company",
    children: [
      { label: "About Us", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Blog", to: "/blog" },
    ],
  },
  {
    label: "Support",
    children: [
      { label: "Help Center", to: "/help" },
      { label: "Contact", to: "/contact" },
      { label: "Returns", to: "/returns" },
    ],
  },
  {
    label: "Legal",
    children: [
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
    ],
  },
  {
    label: "Legal",
    children: [
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
    ],
  },
];

const socialLinks = [
  { icon: "i-simple-icons-instagram", href: "#" },
  { icon: "i-simple-icons-twitter", href: "#" },
  { icon: "i-simple-icons-facebook", href: "#" },
];

const items = [
  [
    {
      label: "View",
      icon: "i-lucide-eye",
    },
    {
      label: "Copy",
      icon: "i-lucide-copy",
    },
    {
      label: "Edit",
      icon: "i-lucide-pencil",
    },
  ],
  [
    {
      label: "Delete",
      color: "error",
      icon: "i-lucide-trash",
    },
  ],
];
</script>

<template>
  <UFooter class="bg-white"
    :ui="{ container: 'hidden', top: 'lg:pt-12 lg:pb-0 py-0', bottom: 'lg:pt-0 pt-0 lg:pb-0 ' }">
    <template #top>
      <UContainer>
        <div class="flex flex-col md:flex-row justify-between gap-12 py-12">
          LEFT: Logo + Description + Newsletter
          <div class="max-w-md">
            <div class="flex items-center gap-2 font-bold text-lg mb-4">
              <NuxtImg src="/icons/logo.svg" alt="Logo" class="h-8 w-auto" />
              <span>WooNuxt</span>
            </div>
            <p class="text-sm text-gray-700 mb-6 text-balance">
              WooNuxt is unmatched when it comes to performance and scalability.
              Reap the benefits of having a online store that out performs all
              of your competitors. You can edit components to display your own
              information just like the one you're reading now.
            </p>
            Newsletter
            <UDropdownMenu :items="items" :ui="{
              content:
                'w-(--reka-dropdown-menu-trigger-width) bg-transparent ',
              item: 'text-black data-highlighted:before:bg-transparent data-[state=open]:before:bg-transparent data-highlighted:text-current',
              itemLeadingIcon: 'hidden',
            }">
              <ButtonUButton label="Open"
                class="w-40 p-3 rounded-lg bg-transparent text-black hover:bg-transparent active:bg-transparent"
                color="neutral" variant="outline" block trailing-icon="i-lucide-chevron-down" />

            </UDropdownMenu>
          </div>

          RIGHT: Link Columns
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div v-for="col in footerLinks" :key="col.label" ">
              <h4
                class=" text-black font-semibold text-sm uppercase tracking-wider mb-4">
              {{ col.label }}
              </h4>
              <ul class="space-y-2">
                <li v-for="link in col.children" :key="link.label">
                  <NuxtLink :to="link.to" class="text-sm text-black transition-colors">
                    {{ link.label }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </UContainer>
    </template>

    <template #bottom>
      <UContainer>
        <div class="flex flex-col md:flex-row items-center justify-between py-6 border-t border-gray-800">
          <span class="text-sm text-gray-500">© 2026 MyStore. All rights reserved.</span>
          <div class="flex gap-3 mt-4 md:mt-0">
            <ButtonUButton v-for="social in socialLinks" :key="social.icon" :icon="social.icon" :to="social.href"
              target="_blank" color="gray" variant="ghost" size="xs" />
          </div>
        </div>
      </UContainer>
    </template>
  </UFooter>
</template>

<style scoped></style> -->


<script setup>
const footerLinks = [
  {
    label: 'Shop',
    children: [
      { label: 'New Arrivals', to: '/products?sort=newest' },
      { label: 'Best Sellers', to: '/products?sort=best' },
      { label: 'Sale', to: '/products?sale=true' },
      { label: 'All Products', to: '/products' }
    ]
  },
  {
    label: 'Company',
    children: [
      { label: 'About Us', to: '/about' },
      { label: 'Careers', to: '/careers' },
      { label: 'Contact', to: '/contact' },
      { label: 'Blog', to: '/blog' }
    ]
  },
  {
    label: 'Support',
    children: [
      { label: 'Track Order', to: '/account/orders' },
      { label: 'Returns', to: '/returns' },
      { label: 'Shipping Info', to: '/shipping' },
      { label: 'FAQs', to: '/faq' }
    ]
  },
  {
    label: 'Legal',
    children: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
      { label: 'Cookie Policy', to: '/cookies' }
    ]
  }
]

const socialLinks = [
  { icon: 'i-lucide-instagram', href: 'https://instagram.com' },
  { icon: 'i-lucide-facebook', href: 'https://facebook.com' },
  { icon: 'i-lucide-twitter', href: 'https://twitter.com' },
  { icon: 'i-lucide-youtube', href: 'https://youtube.com' }
]

const email = ref('')

function subscribe() {
  if (!email.value.trim()) return
  // newsletter API call yaha
  email.value = ''
}
</script>

<template>
  <UFooter class="bg-white border-t border-gray-200"
    :ui="{ container: 'hidden', top: 'lg:pt-16 lg:pb-0 py-0', bottom: 'lg:pt-0 pt-0 lg:pb-0' }">
    <template #top>
      <UContainer>
        <div class="flex flex-col lg:flex-row justify-between gap-12 py-12">
          <!-- LEFT: Logo + Description + Newsletter -->
          <div class="max-w-md">
            <div class="flex items-center gap-2 font-bold text-lg mb-4">
              <NuxtImg src="/icons/logo.svg" alt="Logo" class="h-8 w-auto" />
              <span>WooNuxt</span>
            </div>

            <p class="text-sm text-gray-600 mb-6 text-balance leading-relaxed">
              WooNuxt is unmatched when it comes to performance and scalability.
              Reap the benefits of an online store that outperforms all of your
              competitors.
            </p>

            <!-- Newsletter -->
            <div>
              <p class="text-sm font-medium text-gray-900 mb-2">Subscribe to our newsletter</p>
              <UInput v-model="email" type="email" placeholder="Enter your email" size="lg" class="w-full max-w-xs"
                :ui="{ base: 'rounded-xs bg-gray-50 border border-gray-300 ring-0 focus:ring-0' }"
                @keyup.enter="subscribe">
                <template #trailing>
                  <UButton icon="i-lucide-arrow-right" size="xs" color="neutral" variant="solid" class="rounded-xs"
                    @click="subscribe" />
                </template>
              </UInput>
            </div>
          </div>

          <!-- RIGHT: Link Columns -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div v-for="col in footerLinks" :key="col.label">
              <h4 class="text-gray-900 font-semibold text-sm uppercase tracking-wider mb-4">
                {{ col.label }}
              </h4>
              <ul class="space-y-2.5">
                <li v-for="link in col.children" :key="link.label">
                  <NuxtLink :to="link.to" class="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    {{ link.label }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </UContainer>
    </template>

    <template #bottom>
      <UContainer>
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 py-6 border-t border-gray-200">
          <span class="text-sm text-gray-500">© {{ new Date().getFullYear() }} WooNuxt. All rights reserved.</span>

          <div class="flex gap-2">
            <UButton v-for="social in socialLinks" :key="social.icon" :icon="social.icon" :to="social.href"
              target="_blank" color="neutral" variant="ghost" size="sm"
              class="text-gray-500 hover:text-gray-900 bg-white hover:bg-white active:bg-white" />
          </div>
        </div>
      </UContainer>
    </template>
  </UFooter>
</template>