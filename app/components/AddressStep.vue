<script setup>
import { z } from 'zod'
import { useAddressStore } from '~~/store/address'

const addressStore = useAddressStore()

const isFormOpen = ref(false)
const editingId = ref(null)

const emptyForm = () => ({
    fullName: '',
    phone: '',
    pincode: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: '',
    state: '',
    type: 'home',
    isDefault: false
})

const state = reactive(emptyForm())

const schema = z.object({
    fullName: z.string().min(3, 'Enter full name'),
    phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit number'),
    pincode: z.string().regex(/^\d{6}$/, 'Enter a valid 6-digit pincode'),
    addressLine1: z.string().min(5, 'Address is required'),
    addressLine2: z.string().optional(),
    landmark: z.string().optional(),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(1, 'Select a state'),
    type: z.enum(['home', 'work']),
    isDefault: z.boolean().optional()
})

const indianStates = [
    'Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu',
    'Telangana', 'Uttar Pradesh', 'West Bengal', 'Haryana'
]

function openAddForm() {
    editingId.value = null
    Object.assign(state, emptyForm())
    isFormOpen.value = true
}

function openEditForm(address) {
    editingId.value = address.id
    Object.assign(state, emptyForm(), address)
    isFormOpen.value = true
}

function onSubmit() {
    if (editingId.value) {
        addressStore.updateAddress(editingId.value, { ...state })
    } else {
        addressStore.addAddress({ ...state })
    }
    isFormOpen.value = false
}
</script>

<template>
    <div>
        <div v-if="addressStore.addresses.length === 0" class="text-center py-12 text-neutral-500">
            <UIcon name="i-lucide-map-pin" class="size-10 mx-auto mb-3 text-neutral-300" />
            <p>No saved addresses yet</p>
        </div>

        <div v-else class="flex flex-col gap-3">
            <div v-for="address in addressStore.addresses" :key="address.id"
                class="border rounded-lg p-4 cursor-pointer transition-colors"
                :class="address.id === addressStore.selectedAddressId ? 'border-primary ring-1 ring-primary' : 'border-neutral-200'"
                @click="addressStore.selectAddress(address.id)">
                <div class="flex justify-between items-start gap-2">
                    <div class="min-w-0">
                        <div class="flex items-center gap-2 mb-1">
                            <p class="text-sm font-medium">{{ address.fullName }}</p>
                            <BadgeUBadge :label="address.type === 'home' ? 'Home' : 'Work'" variant="subtle"
                                color="neutral" size="sm" />
                            <BadgeUBadge v-if="address.isDefault" label="Default" variant="subtle" color="primary"
                                size="sm" />
                        </div>
                        <p class="text-sm text-neutral-600">
                            {{ address.addressLine1 }}<span v-if="address.addressLine2">, {{ address.addressLine2
                                }}</span><span v-if="address.landmark">, near {{ address.landmark }}</span>,
                            {{ address.city }}, {{ address.state }} - {{ address.pincode }}
                        </p>
                        <p class="text-sm text-neutral-500 mt-1">{{ address.phone }}</p>
                    </div>

                    <div class="flex gap-1 shrink-0">
                        <ButtonUButton icon="i-lucide-pencil" color="neutral" variant="ghost" size="xs"
                            aria-label="Edit address" @click.stop="openEditForm(address)" />

                        <ButtonUButton icon="i-lucide-trash-2" color="error" variant="ghost" size="xs"
                            aria-label="Remove address" @click.stop="addressStore.removeAddress(address.id)" />
                    </div>
                </div>
            </div>
        </div>

        <ButtonUButton label="Add New Address" icon="i-lucide-plus" variant="outline" color="neutral" block class="mt-4"
            @click="openAddForm" />

        <USlideover v-model:open="isFormOpen" side="right" :ui="{ content: 'max-w-md bg-white' }">
            <template #header>
                <h2 class="text-base font-semibold">{{ editingId ? 'Edit Address' : 'Add New Address' }}</h2>
            </template>

            <template #body>
                <UForm :schema="schema" :state="state" class="flex flex-col gap-4" @submit="onSubmit">
                    <UFormField label="Full Name" name="fullName">
                        <UInput v-model="state.fullName" placeholder="Full name" class="w-full" />
                    </UFormField>

                    <UFormField label="Phone Number" name="phone">
                        <UInput v-model="state.phone" placeholder="10-digit mobile number" maxlength="10"
                            class="w-full" />
                    </UFormField>

                    <UFormField label="Pincode" name="pincode">
                        <UInput v-model="state.pincode" placeholder="6-digit pincode" maxlength="6" class="w-full" />
                    </UFormField>

                    <UFormField label="Address (House No, Building, Street)" name="addressLine1">
                        <UTextarea v-model="state.addressLine1" :rows="2" class="w-full" />
                    </UFormField>

                    <UFormField label="Locality / Area (optional)" name="addressLine2">
                        <UInput v-model="state.addressLine2" class="w-full" />
                    </UFormField>

                    <UFormField label="Landmark (optional)" name="landmark">
                        <UInput v-model="state.landmark" placeholder="Nearby landmark" class="w-full" />
                    </UFormField>

                    <div class="grid grid-cols-2 gap-4">
                        <UFormField label="City" name="city">
                            <UInput v-model="state.city" class="w-full" />
                        </UFormField>
                        <UFormField label="State" name="state">
                            <USelect v-model="state.state" :items="indianStates" placeholder="Select state"
                                class="w-full" />
                        </UFormField>
                    </div>

                    <UFormField label="Address Type" name="type">
                        <URadioGroup v-model="state.type" orientation="horizontal"
                            :items="[{ label: 'Home', value: 'home' }, { label: 'Work', value: 'work' }]" />
                    </UFormField>

                    <UCheckbox v-model="state.isDefault" label="Set as default address" />

                    <ButtonUButton label="Save Address" type="submit" block size="lg" color="primary" />

                </UForm>
            </template>
        </USlideover>
    </div>
</template>