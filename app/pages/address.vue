<script setup>
import { useAddressStore } from '~~/store/address'
import { useCartStore } from '~~/store/cart'
import { z } from 'zod'


const addressStore = useAddressStore()
const cartStore = useCartStore()

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
    editingId.value = address._id   // ← id se _id
    Object.assign(state, emptyForm(), address)
    isFormOpen.value = true
}

async function onSubmit() {
    let res
    if (editingId.value) {
        res = await addressStore.updateAddress(editingId.value, { ...state })
    } else {
        res = await addressStore.addAddress({ ...state })
    }

    if (res?.success !== false) {
        isFormOpen.value = false
    }
}

</script>

<template>
    <UContainer class="mt-10 mb-10">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2 space-y-4">
                <div>
                    <ButtonUButton label="Add New Address" icon="i-lucide-plus" variant="outline" color="neutral" block
                        class="mt-0 bg-white ring-neutral-200 rounded-xs text-gray-800  p-5 hover:bg-neutral-200 active:bg-neutral-200 justify-start"
                        @click="openAddForm" />
                    <div v-if="addressStore.addresses.length === 0" class="text-center py-12 text-neutral-500">
                        <UIcon name="i-lucide-map-pin" class="size-10 mx-auto mb-3 text-neutral-300" />
                        <p>No saved addresses yet</p>
                    </div>
                    <div v-else class="flex flex-col gap-4 mt-5">
                        <UCard v-for="address in addressStore.addresses" :key="address._id"
                            class="cursor-pointer transition-colors" :ui="{
                                root: 'rounded-xs bg-white ',

                            }"
                            :class="address._id === addressStore.selectedAddressId ? 'ring-1 ring-neutral-500' : 'ring-1 ring-neutral-200'"
                            @click="addressStore.selectAddress(address._id)">
                            <div class="flex justify-between items-start gap-2 pb-3">
                                <div class="min-w-0">
                                    <div class="flex items-center gap-2 mb-1">
                                        <p class="text-sm font-medium">{{ address.fullName }}</p>
                                        <UBadge :label="address.type === 'home' ? 'Home' : 'Work'" variant="subtle"
                                            color="neutral" size="sm" />
                                        <UBadge v-if="address.isDefault" label="Default" variant="subtle"
                                            color="primary" size="sm" />
                                    </div>
                                    <p class="text-sm text-neutral-600 text-balance">
                                        {{ address.addressLine1 }}<span v-if="address.addressLine2">, {{
                                            address.addressLine2
                                        }}</span><span v-if="address.landmark">, near {{ address.landmark
                                            }}</span>,<br>
                                        {{ address.city }} - {{ address.pincode }}, <br> {{ address.state }} </p>
                                    <p class="text-sm text-neutral-500 mt-1">Mobile: {{ address.phone }}</p>
                                </div>
                            </div>
                            <USeparator :ui="{
                                border: 'border-t-neutral-200'
                            }" />
                            <div class="flex items-center justify-around gap-1 shrink-0 h-8 pt-3">
                                <ButtonUButton label="Edit" icon="i-lucide-pencil" color="error" variant="ghost"
                                    aria-label="Edit address" @click.stop="openEditForm(address)" />

                                <USeparator orientation="vertical" :ui="{
                                    border: 'border-s-gray-800'
                                }" />
                                <ButtonUButton label="Delete" icon="i-lucide-trash-2" color="error" variant="ghost"
                                    aria-label="Remove address" @click.stop="addressStore.removeAddress(address._id)" />
                            </div>
                        </UCard>
                    </div>

                    <UModal v-model:open="isFormOpen" :ui="{ content: 'max-w-md bg-white rounded-xs' }">
                        <template #header>
                            <h2 class="text-base font-semibold">{{ editingId ? 'Edit Address' : 'Add New Address' }}
                            </h2>
                        </template>

                        <template #body>
                            <UForm :schema="schema" :state="state" class="flex flex-col gap-4 " @submit="onSubmit">
                                <UFormField label="Full Name" name="fullName" :ui="{
                                    label: 'text-gray-800'
                                }">
                                    <UInput v-model="state.fullName" placeholder="Full name" class="w-full "
                                        :ui="{ base: 'bg-white  focus-visible:ring-1' }" />
                                </UFormField>

                                <UFormField label="Phone Number" name="phone" :ui="{
                                    label: 'text-gray-800'
                                }">
                                    <UInput v-model="state.phone" placeholder="10-digit mobile number" maxlength="10"
                                        class="w-full" :ui="{ base: 'bg-white focus-visible:ring-1' }" />
                                </UFormField>

                                <UFormField label="Pincode" name="pincode" :ui="{
                                    label: 'text-gray-800'
                                }">
                                    <UInput v-model="state.pincode" placeholder="6-digit pincode" maxlength="6"
                                        class="w-full" :ui="{ base: 'bg-white focus-visible:ring-1' }" />
                                </UFormField>

                                <UFormField label="Address (House No, Building, Street)" name="addressLine1" :ui="{
                                    label: 'text-gray-800'
                                }">
                                    <UTextarea v-model="state.addressLine1" :rows="2" class="w-full"
                                        :ui="{ base: 'bg-white focus-visible:ring-1  ' }" />
                                </UFormField>

                                <UFormField label="Locality / Area (optional)" name="addressLine2" :ui="{
                                    label: 'text-gray-800'
                                }">
                                    <UInput v-model="state.addressLine2" class="w-full"
                                        :ui="{ base: 'bg-white text-gray-800 focus-visible:ring-1' }" />
                                </UFormField>

                                <UFormField label="Landmark (optional)" name="landmark" :ui="{
                                    label: 'text-gray-800'
                                }">
                                    <UInput v-model="state.landmark" placeholder="Nearby landmark" class="w-full"
                                        :ui="{ base: 'bg-white focus-visible:ring-1' }" />
                                </UFormField>

                                <div class="grid grid-cols-2 gap-4">
                                    <UFormField label="City" name="city" :ui="{
                                        label: 'text-gray-800'
                                    }">
                                        <UInput v-model="state.city" class="w-full"
                                            :ui="{ base: 'bg-white focus-visible:ring-1' }" />
                                    </UFormField>
                                    <UFormField label="State" name="state" :ui="{
                                        label: 'text-gray-800'
                                    }">
                                        <USelect v-model="state.state" :items="indianStates" placeholder="Select state"
                                            class="w-full" :ui="{
                                                base: 'bg-white text-gray-500 hover:bg-white focus:ring-1 ',
                                                content: 'bg-white ring-0  rounded-xs',
                                                itemLabel: 'text-gray-500'
                                            }" />
                                    </UFormField>
                                </div>

                                <UFormField label="Address Type" name="type" :ui="{
                                    label: 'text-gray-800'
                                }">
                                    <URadioGroup v-model="state.type" orientation="horizontal"
                                        :items="[{ label: 'Home', value: 'home' }, { label: 'Work', value: 'work' }]"
                                        :ui="{
                                            label: 'text-gray-800'
                                        }" />
                                </UFormField>

                                <UCheckbox v-model="state.isDefault" label="Set as default address" :ui="{
                                    label: 'text-gray-800'
                                }" />

                                <ButtonUButton label="Save Address" type="submit" block size="lg" color=""
                                    class="bg-indigo-600 text-white p-3 rounded-xs" />

                            </UForm>
                        </template>
                    </UModal>

                </div>
            </div>

            <UCard class="h-fit bg-white ring-0 rounded-xs " v-if="cartStore.totalPrice">
                <template #header>
                    <span class="flex items-center gap-1 font-medium text-sm">
                        <UIcon name="i-lucide-receipt" class="size-4" />
                        Price Details ({{ cartStore.items.length }} {{ cartStore.items.length === 1 ? 'item'
                            : 'items' }})
                    </span>
                </template>

                <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                        <span>Total MRP</span>
                        <span>₹ {{ cartStore.totalOriginalPrice }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Discount On MRP</span>
                        <span>- ₹ {{ cartStore.discountAmount }}</span>
                    </div>
                    <div v-if="cartStore.appliedCoupon" class="flex justify-between text-green-600">
                        <span>Coupon Discount</span>
                        <span>- ₹{{ cartStore.appliedCoupon.discount }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Delivery Charges</span>
                        <span :class="cartStore.deliveryCharge === 0 ? 'text-green-600' : ''">
                            {{ cartStore.deliveryCharge === 0 ? 'FREE' : `₹${cartStore.deliveryCharge}` }}
                        </span>
                    </div>
                    <USeparator />
                    <div class="flex justify-between font-semibold">
                        <span>Total Amount</span>
                        <span>₹{{ cartStore.finalPrice }}</span>
                    </div>
                </div>

                <ButtonUButton label="Checkout" block
                    class="mt-4 bg-indigo-600 text-white p-3 hover:bg-indigo-600 active:bg-indigo-600" to="/checkout" />
            </UCard>
        </div>
    </UContainer>
</template>