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
        <UCard>
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
        </UCard>
    </div>
</template>