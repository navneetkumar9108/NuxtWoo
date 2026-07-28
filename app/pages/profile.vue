<script setup>
import { z } from 'zod'

import { useAuthStore } from '~~/store/auth'

//definePageMeta({ middleware: 'auth' })

const authStore = useAuthStore()
const toast = useToast()

const isEditing = ref(false)

const schema = z.object({
    name: z.string().min(2, 'Name daalo'),
    email: z.string().email('Valid email daalo'),
    phone: z.string().length(10, '10-digit number'),
    gender: z.string().min(1, 'Gender select karo'),
    dob: z.string().min(1, 'Date of Birth daalo'),
    location: z.string().min(2, 'Location daalo')
})

const state = reactive({
    name: authStore.user?.name || '',
    email: authStore.user?.email || '',
    phone: authStore.user?.phone || '',
    gender: authStore.user?.gender || '',
    dob: authStore.user?.dob || '',
    location: authStore.user?.location || ''
})

const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' }
]

const loading = ref(false)

async function onSubmit(event) {
    loading.value = true
    try {
        authStore.updateProfile(event.data)
        toast.add({ title: 'Profile updated', color: 'success', icon: 'i-lucide-check' })
        isEditing.value = false
    } finally {
        loading.value = false
    }
}

const sidebarSections = [
    {
        title: null,
        items: [{ label: 'Overview', to: '/account', icon: 'i-lucide-layout-dashboard' }]
    },
    {
        title: 'ORDERS',
        items: [{ label: 'Orders & Returns', to: '/orders', icon: 'i-lucide-package' }]
    },
    // {
    //     title: 'CREDITS',
    //     items: [
    //         { label: 'Coupons', to: '/account/coupons' },
    //         { label: 'Wallet', to: '/account/wallet' }
    //     ]
    // },
    {
        title: 'ACCOUNT',
        items: [
            { label: 'Profile', to: '/profile' },
            // { label: 'Saved Cards', to: '/account/cards' },
            // { label: 'Addresses', to: '/account/addresses' },
            { label: 'Wishlist', to: '/wishlist' }
        ]
    }
]

const route = useRoute()
</script>

<template>
    <UContainer class="py-8">
        <div class="mb-6">
            <h1 class="text-2xl font-bold">Account</h1>
            <p class="text-sm text-neutral-500">{{ authStore.user?.name }}</p>
        </div>
        <USeparator class="mb-6" />

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <!-- Sidebar -->
            <aside class="lg:col-span-1">
                <nav class="space-y-6">
                    <div v-for="section in sidebarSections" :key="section.title || 'main'">
                        <p v-if="section.title" class="text-xs font-medium text-neutral-400 mb-2">
                            {{ section.title }}
                        </p>
                        <ul class="space-y-2">
                            <li v-for="item in section.items" :key="item.to">
                                <NuxtLink :to="item.to" class="text-sm block"
                                    :class="route.path === item.to ? 'text-primary font-semibold' : 'text-neutral-600 hover:text-neutral-900'">
                                    {{ item.label }}
                                </NuxtLink>
                            </li>
                        </ul>
                        <USeparator class="mt-4" />
                    </div>
                </nav>
            </aside>

            <!-- Main content -->
            <div class="lg:col-span-3">
                <UCard class="bg-white  rounded-xs px-32.5 py-10.75 ring-neutral-200 " :ui="{
                    header: 'border-b-neutral-200'
                }">
                    <template #header>
                        <p class="font-semibold text-lg">Profile Details</p>
                    </template>

                    <!-- Read-only view -->
                    <div v-if="!isEditing" class="divide-y divide-neutral-100">
                        <div class="flex py-3">
                            <span class="w-40 text-sm text-neutral-500">Full Name</span>
                            <span class="text-sm font-medium">{{ authStore.user?.name }}</span>
                        </div>
                        <div class="flex py-3">
                            <span class="w-40 text-sm text-neutral-500">Mobile Number</span>
                            <span class="text-sm font-medium">{{ authStore.user?.phone }}</span>
                        </div>
                        <div class="flex py-3">
                            <span class="w-40 text-sm text-neutral-500">Email ID</span>
                            <span class="text-sm font-medium">{{ authStore.user?.email }}</span>
                        </div>
                        <div class="flex py-3">
                            <span class="w-40 text-sm text-neutral-500">Gender</span>
                            <span class="text-sm font-medium capitalize">{{ authStore.user?.gender || '- not added -'
                            }}</span>
                        </div>
                        <div class="flex py-3">
                            <span class="w-40 text-sm text-neutral-500">Date of Birth</span>
                            <span class="text-sm font-medium">{{ authStore.user?.dob || '- not added -' }}</span>
                        </div>
                        <div class="flex py-3">
                            <span class="w-40 text-sm text-neutral-500">Location</span>
                            <span class="text-sm font-medium">{{ authStore.user?.location || '- not added -' }}</span>
                        </div>
                    </div>
                    <div v-if="!isEditing" class="flex justify-center">

                        <UButton size="lg"
                            class="mt-6 px-40 py-3 rounded-xs bg-red-400 text-white hover:bg-red-400 uppercase active:bg-red-400"
                            @click="isEditing = true">
                            EDIT
                        </UButton>
                    </div>
                    <!-- Edit form -->
                    <UForm v-else :schema="schema" :state="state" class="space-y-4 " @submit="onSubmit">
                        <UFormField label="Full Name" name="name" :ui="{
                            label: 'text-red-400'
                        }">
                            <UInput v-model="state.name" class="w-full"
                                :ui="{ base: 'bg-white  focus-visible:ring-1 ring-neutral-200 focus-visible:ring-neutral-200 text-red-400 rounded-xs' }" />
                        </UFormField>
                        <UFormField label="Email" name="email" :ui="{
                            label: 'text-red-400'
                        }">
                            <UInput v-model="state.email" type="email" class="w-full"
                                :ui="{ base: 'bg-white  focus-visible:ring-1 ring-neutral-200 focus-visible:ring-neutral-200 text-red-400 rounded-xs' }" />
                        </UFormField>
                        <UFormField label="Phone" name="phone" :ui="{
                            label: 'text-red-400'
                        }">
                            <UInput v-model="state.phone" maxlength="10" class="w-full"
                                :ui="{ base: 'bg-white  focus-visible:ring-1 ring-neutral-200 focus-visible:ring-neutral-200 text-red-400 rounded-xs' }" />
                        </UFormField>

                        <UFormField label="Gender" name="gender" :ui="{
                            label: 'text-red-400'
                        }">
                            <URadioGroup v-model="state.gender" orientation="horizontal" :items="genderOptions" :ui="{
                                label: 'text-red-400',
                                base: 'bg-white border border-red-400  rounded-sm',
                                indicator: 'bg-white after:bg-red-400 after:rounded-sm  after:size-3'
                            }" />
                        </UFormField>

                        <UFormField label="Date of Birth" name="dob" :ui="{
                            label: 'text-red-400'
                        }">
                            <UInput v-model="state.dob" type="date" class="w-full  " :ui="{
                                base: 'bg-white text-red-400 rounded-xs focus-visible:ring-1 ring-neutral-200 focus-visible:ring-neutral-200'
                            }" style="color-scheme: light;" />
                        </UFormField>

                        <UFormField label="Location" name="location" :ui="{
                            label: 'text-red-400'
                        }">
                            <UInput v-model="state.location" placeholder="City, State" class="w-full"
                                :ui="{ base: 'bg-white  focus-visible:ring-1 ring-neutral-200 focus-visible:ring-neutral-200 text-red-400 rounded-xs' }" />
                        </UFormField>

                        <div class="flex gap-3">
                            <UButton type="submit" block :loading="loading"
                                class="bg-red-400 hover:bg-red-400 active:bg-red-400  p-3 text-white rounded-xs">
                                Save Changes
                            </UButton>
                            <UButton variant="outline" block color="neutral" @click="isEditing = false"
                                class="bg-white ring-red-400 text-red-400 rounded-xs hover:bg-white active:bg-white  p-3">
                                Cancel
                            </UButton>
                        </div>
                    </UForm>
                </UCard>
            </div>
        </div>
    </UContainer>
</template>