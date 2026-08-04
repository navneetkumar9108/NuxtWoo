<script setup>
import { useAuthStore } from '~~/store/auth'

const authStore = useAuthStore()
const route = useRoute()

const sidebarSections = [
    {
        title: null,
        items: [{ label: 'Overview', to: '/account', icon: 'i-lucide-layout-dashboard' }]
    },
    {
        title: 'ORDERS',
        items: [{ label: 'Orders & Returns', to: '/account/orders', icon: 'i-lucide-package' }]
    },
    {
        title: 'ACCOUNT',
        items: [
            { label: 'Profile', to: '/account' },
            { label: 'Wishlist', to: '/wishlist' }
        ]
    }
]
function isActive(path) {
    if (path === '/account') {
        return route.path === '/account'   // exact match hi chahiye
    }
    return route.path === path || route.path.startsWith(path + '/')
}

onMounted(() => authStore.init())
</script>

<template>
    <UContainer class="py-8">
        <div class="mb-6">
            <h1 class="text-2xl font-bold">Account</h1>
            <p class="text-sm text-neutral-500">{{ authStore.user?.name }}</p>
        </div>
        <USeparator class="" :ui="{ border: 'border-neutral-200' }" />

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside class="lg:col-span-1 lg:border-r lg:border-neutral-200 ">
                <nav class="space-y-6">
                    <div v-for="section in sidebarSections" :key="section.title || 'main'" class="mb-2">
                        <p v-if="section.title" class="text-xs font-medium text-neutral-400 ">
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
        </div>
    </UContainer>
</template>