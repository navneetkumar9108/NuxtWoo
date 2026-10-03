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

</script>

<template>
    <UDashboardGroup>
        <UDashboardSidebar collapsible resizable :ui="{ footer: 'border-t border-default' }">
            <template #header>
                <span class="font-bold text-lg px-2">Poshaak Admin Panel</span>
            </template>

            <UNavigationMenu :items="links" orientation="vertical" />

            <template #footer>
                <UButton label="Back to Store" icon="i-lucide-arrow-left" variant="ghost" color="neutral" block
                    to="/" />
            </template>
        </UDashboardSidebar>

        <UDashboardPanel>
            <template #header>
                <UDashboardNavbar :title="route.meta.title || 'Admin'">
                    <template #leading>
                        <UDashboardSidebarCollapse />
                    </template>
                </UDashboardNavbar>
            </template>

            <template #body>
                <NuxtPage />
            </template>
        </UDashboardPanel>
    </UDashboardGroup>
</template>