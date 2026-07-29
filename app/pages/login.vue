<!-- <script setup>
import { z } from 'zod'
import { useAuthStore } from '~~/store/auth'

const open = defineModel({ default: true })
const auth = useAuthStore()
const tab = ref('login')

const loginSchema = z.object({
    email: z.string().email('Valid email daalo'),
    password: z.string().min(6, 'Min 6 characters')
})

const registerSchema = z.object({
    name: z.string().min(2, 'Name daalo'),
    email: z.string().email('Valid email daalo'),
    password: z.string().min(6, 'Min 6 characters'),
    confirmPassword: z.string()
}).refine(d => d.password === d.confirmPassword, {
    message: 'Passwords match nahi ho rahe',
    path: ['confirmPassword']
})

const loginState = reactive({ email: '', password: '' })
const registerState = reactive({ name: '', email: '', password: '', confirmPassword: '' })

const loading = ref(false)
const errorMsg = ref('')

async function handleLogin(event) {
    loading.value = true
    errorMsg.value = ''
    try {
        await auth.login(event.data)
        open.value = false
    } catch (e) {
        errorMsg.value = e?.message || 'Login fail ho gaya'
    } finally {
        loading.value = false
    }
}

async function handleRegister(event) {
    loading.value = true
    errorMsg.value = ''
    try {
        await auth.register(event.data)
        open.value = false
    } catch (e) {
        errorMsg.value = e?.message || 'Registration fail ho gaya'
    } finally {
        loading.value = false
    }
}

const tabs = [
    { label: 'Login', slot: 'login' },
    { label: 'Sign Up', slot: 'signup' }
]
</script>

<template>
    <UModal v-model:open="open" :ui="{ content: 'sm:max-w-md' }">
        <template #content>
            <div class="p-6">
                <UTabs v-model="tab" :items="tabs" class="w-full">
                    <template #login>
                        <UForm :schema="loginSchema" :state="loginState" class="space-y-4 mt-4" @submit="handleLogin">
                            <UFormField label="Email" name="email">
                                <UInput v-model="loginState.email" type="email" class="w-full"
                                    placeholder="you@example.com" />
                            </UFormField>
                            <UFormField label="Password" name="password">
                                <UInput v-model="loginState.password" type="password" class="w-full" />
                            </UFormField>
                            <p v-if="errorMsg" class="text-sm text-red-500">{{ errorMsg }}</p>
                            <UButton type="submit" block :loading="loading">Login</UButton>
                        </UForm>
                    </template>

                    <template #signup>
                        <UForm :schema="registerSchema" :state="registerState" class="space-y-4 mt-4"
                            @submit="handleRegister">
                            <UFormField label="Name" name="name">
                                <UInput v-model="registerState.name" class="w-full" />
                            </UFormField>
                            <UFormField label="Email" name="email">
                                <UInput v-model="registerState.email" type="email" class="w-full" />
                            </UFormField>
                            <UFormField label="Password" name="password">
                                <UInput v-model="registerState.password" type="password" class="w-full" />
                            </UFormField>
                            <UFormField label="Confirm Password" name="confirmPassword">
                                <UInput v-model="registerState.confirmPassword" type="password" class="w-full" />
                            </UFormField>
                            <p v-if="errorMsg" class="text-sm text-red-500">{{ errorMsg }}</p>
                            <UButton type="submit" block :loading="loading">Create Account</UButton>
                        </UForm>
                    </template>
                </UTabs>
            </div>
        </template>
    </UModal>
</template> -->

<script setup>
import { z } from 'zod'
import { useAuthStore } from '~~/store/auth'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const tab = ref('login')

const loginSchema = z.object({
    email: z.string().email('Valid email daalo'),
    password: z.string().min(6, 'Min 6 characters')
})



const registerSchema = z.object({
    name: z.string().min(2, 'Name daalo'),
    email: z.string().email('Valid email daalo'),
    phone: z.string().length(10, '10-digit number'),
    gender: z.string().min(1, 'Gender select karo'),
    dob: z.string().min(1, 'Date of Birth daalo'),
    location: z.string().min(2, 'Location daalo'),
    password: z.string().min(6, 'Min 6 characters'),
    confirmPassword: z.string()
}).refine(d => d.password === d.confirmPassword, {
    message: 'Passwords match nahi ho rahe',
    path: ['confirmPassword']
})

const loginState = reactive({ email: '', password: '' })
const registerState = reactive({
    name: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    location: '',
    password: '',
    confirmPassword: ''
})

const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' }
]

const loading = ref(false)
const errorMsg = ref('')

function redirectAfterAuth() {
    // login se pehle jis protected page pe jaana tha, wahi bhej do; warna home
    router.push(route.query.redirect || '/')
}

async function handleLogin(event) {
    loading.value = true
    errorMsg.value = ''
    try {
        await auth.login(event.data)
        redirectAfterAuth()
    } catch (e) {
        errorMsg.value = e?.message || 'Login fail ho gaya'
    } finally {
        loading.value = false
    }
}

async function handleRegister(event) {
    loading.value = true
    errorMsg.value = ''
    try {
        await auth.register(event.data)
        redirectAfterAuth()
    } catch (e) {
        errorMsg.value = e?.message || 'Registration fail ho gaya'
    } finally {
        loading.value = false
    }
}

const tabs = [
    { label: 'Login', value: 'login', slot: 'login' },
    { label: 'Sign Up', value: 'signup', slot: 'signup' }
]

// pehle se login hai to login page pe rukna hi nahi
// if (auth.isLoggedIn) {
//     redirectAfterAuth()
// }

onMounted(() => {
    auth.init()

    if (auth.isLoggedIn) {
        redirectAfterAuth()
    }
})
</script>

<template>
    <div class="max-w-md mx-auto py-12 px-4">
        <UCard class="bg-white rounded-xs ring-neutral-200">
            <UTabs v-model="tab" :items="tabs" class="w-full " :ui="{
                list: 'bg-neutral-100',
                indicator: 'bg-red-400 text-white',
                trigger: 'data-[state=active]:text-white'
            }">
                <template #login>
                    <UForm :schema="loginSchema" :state="loginState" class="space-y-4 mt-4" @submit="handleLogin">
                        <UFormField label="Email" name="email" :ui="{
                            label: 'text-red-400'
                        }">
                            <UInput v-model="loginState.email" type="email" class="w-full" placeholder="you@example.com"
                                :ui="{ base: 'bg-white  focus-visible:ring-1 ring-neutral-200 focus-visible:ring-neutral-200 text-red-400 rounded-xs' }" />
                        </UFormField>
                        <UFormField label="Password" name="password" :ui="{
                            label: 'text-red-400'
                        }">
                            <UInput v-model="loginState.password" type="password" class="w-full"
                                :ui="{ base: 'bg-white  focus-visible:ring-1 ring-neutral-200 focus-visible:ring-neutral-200 text-red-400 rounded-xs' }" />
                        </UFormField>
                        <p v-if="errorMsg" class="text-sm text-red-500">{{ errorMsg }}</p>
                        <UButton type="submit" block :loading="loading"
                            class="p-3 rounded-xs bg-red-400 text-white hover:bg-red-400 uppercase active:bg-red-400">
                            Login
                        </UButton>
                    </UForm>
                </template>

                <template #signup>
                    <UForm :schema="registerSchema" :state="registerState" class="space-y-4 mt-4 bg-white"
                        @submit="handleRegister">
                        <UFormField label="Name" name="name" :ui="{
                            label: 'text-red-400'
                        }">
                            <UInput v-model="registerState.name" class="w-full"
                                :ui="{ base: 'bg-white  focus-visible:ring-1 ring-neutral-200 focus-visible:ring-neutral-200 text-red-400 rounded-xs' }" />
                        </UFormField>
                        <UFormField label="Email" name="email" :ui="{
                            label: 'text-red-400'
                        }">
                            <UInput v-model="registerState.email" type="email" class="w-full"
                                :ui="{ base: 'bg-white  focus-visible:ring-1 ring-neutral-200 focus-visible:ring-neutral-200 text-red-400 rounded-xs' }" />
                        </UFormField>
                        <UFormField label="Phone" name="phone" :ui="{
                            label: 'text-red-400'
                        }">
                            <UInput v-model="registerState.phone" maxlength="10" placeholder="10-digit mobile number"
                                class="w-full"
                                :ui="{ base: 'bg-white  focus-visible:ring-1 ring-neutral-200 focus-visible:ring-neutral-200 text-red-400 rounded-xs' }" />
                        </UFormField>

                        <UFormField label="Gender" name="gender" :ui="{
                            label: 'text-red-400'
                        }">
                            <URadioGroup v-model="registerState.gender" orientation="horizontal" :items="genderOptions"
                                :ui="{
                                    label: 'text-red-400',
                                    base: 'bg-white border border-red-400  rounded-sm',
                                    indicator: 'bg-white after:bg-red-400 after:rounded-sm  after:size-3'
                                }" />
                        </UFormField>

                        <UFormField label="Date of Birth" name="dob" :ui="{
                            label: 'text-red-400'
                        }">
                            <UInput v-model="registerState.dob" type="date" class="w-full" :ui="{
                                base: 'bg-white text-red-400 rounded-xs focus-visible:ring-1 ring-neutral-200 focus-visible:ring-neutral-200'
                            }" style="color-scheme: light;" />
                        </UFormField>

                        <UFormField label="Location" name="location" :ui="{
                            label: 'text-red-400'
                        }">
                            <UInput v-model="registerState.location" placeholder="City, State" class="w-full"
                                :ui="{ base: 'bg-white  focus-visible:ring-1 ring-neutral-200 focus-visible:ring-neutral-200 text-red-400 rounded-xs' }" />
                        </UFormField>

                        <UFormField label="Password" name="password" :ui="{
                            label: 'text-red-400'
                        }">
                            <UInput v-model="registerState.password" type="password" class="w-full"
                                :ui="{ base: 'bg-white  focus-visible:ring-1 ring-neutral-200 focus-visible:ring-neutral-200 text-red-400 rounded-xs' }" />
                        </UFormField>
                        <UFormField label="Confirm Password" name="confirmPassword" :ui="{
                            label: 'text-red-400'
                        }">
                            <UInput v-model="registerState.confirmPassword" type="password" class="w-full"
                                :ui="{ base: 'bg-white  focus-visible:ring-1 ring-neutral-200 focus-visible:ring-neutral-200 text-red-400 rounded-xs' }" />
                        </UFormField>
                        <p v-if="errorMsg" class="text-sm text-red-500">{{ errorMsg }}</p>
                        <UButton type="submit" block :loading="loading"
                            class="p-3 rounded-xs bg-red-400 text-white hover:bg-red-400 uppercase active:bg-red-400">
                            Create Account</UButton>
                    </UForm>
                </template>
            </UTabs>
        </UCard>
    </div>
</template>