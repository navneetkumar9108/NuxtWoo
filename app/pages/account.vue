<script setup>
import { useAuthStore } from '~~/store/auth'

const authStore = useAuthStore()
const route = useRoute()

const sidebarSections = [
    // {
    //     title: null,
    //     items: [{ label: 'Overview', to: '/account', icon: 'i-lucide-layout-dashboard' }]
    // },
    {
        title: 'ACCOUNT',
        items: [
            { label: 'Overview', to: '/account', icon: 'i-lucide-layout-dashboard' },
            { label: 'Orders & Returns', to: '/account/orders', icon: 'i-lucide-package' },
            { label: 'Addresses', to: '/account/addresses', icon: 'i-lucide-map-pin' },
            { label: 'Wishlist', to: '/wishlist', icon: 'i-lucide-heart' },
            // { label: 'Profile', to: '/account' },
            // { label: 'Payment Methods', to: '/account/payment-methods', icon: 'i-lucide-credit-card' },
        ]
    },
    // {
    //     title: 'ORDERS',
    //     items: [{ label: 'Orders & Returns', to: '/account/orders', icon: 'i-lucide-package' }]
    // }
]
function isActive(path) {
    if (path === '/account') {
        return route.path === '/account'   // exact match hi chahiye
    }
    return route.path === path || route.path.startsWith(path + '/')
}
const items = computed(() =>
    sidebarSections.map((section) => [
        ...(section.title ? [{ type: 'label', label: section.title }] : []),
        ...section.items.map((i) => ({
            label: i.label,
            to: i.to,
            icon: i.icon,
            active: isActive(i.to)
        }))
    ])
)
onMounted(() => authStore.init())

definePageMeta({ middleware: 'auth' })

function logout() {
    authStore.logout()
    navigateTo('/')
}
</script>

<template>
    <UContainer class="py-6 lg:py-8 ">
        <!-- <div class="mb-6">
            <h1 class="text-xl lg:text-2xl font-bold">Account</h1>
            <p class="text-sm text-neutral-500">{{ authStore.user?.name }}</p>
        </div>
        <USeparator :ui="{ border: 'border-neutral-200' }" />

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 mt-6 lg:mt-8">
            Mobile: horizontal scroll tabs | Desktop: vertical sidebar
            <aside class="lg:col-span-1 lg:border-r lg:border-neutral-200">
                <nav class="lg:space-y-6">
                    <div class="lg:hidden -mx-4 px-4 overflow-x-auto scrollbar-none">
                        <ul class="flex gap-4 whitespace-nowrap pb-2 border-b border-neutral-200">
                            <template v-for="section in sidebarSections" :key="section.title || 'main'">
                                <li v-for="item in section.items" :key="item.to">
                                    <NuxtLink :to="item.to" class="text-sm block py-1"
                                        :class="isActive(item.to) ? 'text-primary font-semibold border-b-2 border-primary' : 'text-neutral-600'">
                                        {{ item.label }}
                                    </NuxtLink>
                                </li>
                            </template>
</ul>
</div>

Desktop nav
<div v-for="section in sidebarSections" :key="section.title || 'main'" class="hidden lg:block mb-2">
    <p v-if="section.title" class="text-xs font-medium text-neutral-400">
        {{ section.title }}
    </p>
    <ul class="space-y-2 mt-2">
        <li v-for="item in section.items" :key="item.to">
            <NuxtLink :to="item.to" class="text-sm block"
                :class="isActive(item.to) ? 'text-primary font-semibold' : 'text-neutral-600 hover:text-neutral-900'">
                {{ item.label }}
            </NuxtLink>
        </li>
    </ul>
    <USeparator class="mt-2" />
</div>
</nav>
</aside>

<div class="lg:col-span-3">
    <NuxtPage />
</div>
</div> -->
        <div class="flex gap-6 lg:gap-8">
            <USidebar v-model:open="open" collapsible="none" class="bg-white border"
                :style="{ '--sidebar-width': '20rem' }" :ui="{
                    header: 'gap-4 py-8'
                }">
                <template #header>
                    <NuxtLink to="/account/profile" class="flex items-center justify-between w-full gap-3">

                        <div>
                            <h2 class="text-md font-semibold text-[#1D2A3E]">Hey, {{ authStore.user?.name }}</h2>
                            <p class="text-xs text-neutral-500">Logged with {{ authStore.user?.email }}</p>
                        </div>
                        <UAvatar :alt="authStore.user?.name" size="md" />
                    </NuxtLink>
                </template>

                <UNavigationMenu :items="items" orientation="vertical" />
                <template #footer>
                    <UButton label="Logout" icon="i-lucide-log-out" color="neutral" variant="ghost" block
                        @click="logout" />
                </template>
            </USidebar>

            <div class="flex-1">
                <NuxtPage />
            </div>
        </div>
    </UContainer>
</template>