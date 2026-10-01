<script setup>
definePageMeta({
    middleware: 'admin',
    layout: 'admin',
})

const route = useRoute()

const links = [
    [
        { label: 'Dashboard', icon: 'i-lucide-layout-dashboard', to: '/admin', exact: true },
        { label: 'Products', icon: 'i-lucide-shirt', to: '/admin/products' },
        { label: 'Orders', icon: 'i-lucide-package', to: '/admin/orders' },
    ],
]

const open = ref(false)
</script>

<template>
    <UDashboardGroup>
        <UDashboardSidebar v-model:open="open" collapsible resizable :ui="{ footer: 'border-t border-default' }">
            <template #header>
                <span class="font-bold text-lg px-2">Admin Panel</span>
            </template>

            <UNavigationMenu :items="links" orientation="vertical" />

            <template #footer>
                <UButton label="Back to Store" icon="i-lucide-arrow-left" variant="ghost" color="neutral" block
                    to="/" />
            </template>
        </UDashboardSidebar>

        <UDashboardPanel>
            <template #header>
                <UDashboardNavbar :title="route.meta.title || 'Admin'" />
            </template>

            <template #body>
                <NuxtPage />
            </template>
        </UDashboardPanel>
    </UDashboardGroup>
</template>