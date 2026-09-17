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
      { label: 'Careers', to: '' },
      { label: 'Contact', to: '/contact' },
      { label: 'Blog', to: '' }
    ]
  },
  {
    label: 'Support',
    children: [
      { label: 'Track Order', to: '/account/orders' },
      { label: 'Returns', to: '' },
      { label: 'Shipping Info', to: '' },
      { label: 'FAQs', to: '' }
    ]
  },
  {
    label: 'Legal',
    children: [
      { label: 'Privacy Policy', to: '' },
      { label: 'Terms of Service', to: '' },
      { label: 'Cookie Policy', to: '' }
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
                  <ButtonUButton icon="i-lucide-arrow-right" size="xs" color="neutral" variant="solid"
                    class="rounded-xs" @click="subscribe" />
                  <!-- <UButton icon="i-lucide-arrow-right" size="xs" color="neutral" variant="solid" class="rounded-xs"
                    @click="subscribe" /> -->
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
            <ButtonUButton v-for="social in socialLinks" :key="social.icon" :icon="social.icon" :to="social.href"
              target="_blank" color="neutral" variant="ghost" size="sm"
              class="text-gray-500 hover:text-gray-900 bg-white hover:bg-white active:bg-white" />
          </div>
        </div>
      </UContainer>
    </template>
  </UFooter>
</template>