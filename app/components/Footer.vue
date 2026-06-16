<script setup>
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
  <UFooter class="bg-white" :ui="{container:'hidden', top:'lg:pt-12 lg:pb-0 py-0',bottom:'lg:pt-0 pt-0 lg:pb-0 '}">
    <template #top>
      <UContainer>
        <div class="flex flex-col md:flex-row justify-between gap-12 py-12">
          <!-- LEFT: Logo + Description + Newsletter -->
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
            <!-- Newsletter -->
            <UDropdownMenu
              :items="items"
              :ui="{
                content:
                  'w-(--reka-dropdown-menu-trigger-width) bg-transparent ',
                item: 'text-black data-highlighted:before:bg-transparent data-[state=open]:before:bg-transparent data-highlighted:text-current',
                itemLeadingIcon: 'hidden',
              }"
            >
              <UButton
                label="Open"
                class="w-40 p-3 rounded-lg bg-transparent text-black hover:bg-transparent active:bg-transparent"
                color="neutral"
                variant="outline"
                block
                trailing-icon="i-lucide-chevron-down"
              />
            </UDropdownMenu>
          </div>

          <!-- RIGHT: Link Columns -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div v-for="col in footerLinks" :key="col.label" ">
              <h4
                class="text-black font-semibold text-sm uppercase tracking-wider mb-4"
              >
                {{ col.label }}
              </h4>
              <ul class="space-y-2">
                <li v-for="link in col.children" :key="link.label">
                  <NuxtLink
                    :to="link.to"
                    class="text-sm text-black transition-colors"
                  >
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
        <div
          class="flex flex-col md:flex-row items-center justify-between py-6 border-t border-gray-800"
        >
          <span class="text-sm text-gray-500"
            >© 2026 MyStore. All rights reserved.</span
          >
          <div class="flex gap-3 mt-4 md:mt-0">
            <UButton
              v-for="social in socialLinks"
              :key="social.icon"
              :icon="social.icon"
              :to="social.href"
              target="_blank"
              color="gray"
              variant="ghost"
              size="xs"
            />
          </div>
        </div>
      </UContainer>
    </template>
  </UFooter>
</template>

<style scoped></style>
