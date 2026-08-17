<!-- <script setup>
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
    gender: z.object({
        label: z.string(),
        value: z.string()
    }, {
        error: 'Gender select karo'
    }),
    dob: z.string().min(1, 'Date of Birth daalo'),
    // location: z.string().min(2, 'Location daalo'),
    password: z.string().min(6, 'Min 6 characters'),
    confirmPassword: z.string()
}).refine(d => d.password === d.confirmPassword, {
    message: 'Passwords match nahi ho rahe',
    path: ['confirmPassword']
})



const loading = ref(false)
const errorMsg = ref('')

function redirectAfterAuth() {
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

    console.log('EVENT:', event)
    console.log('DATA:', event.data)
    console.log('GENDER:', event.data.gender)
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

onMounted(() => {
    auth.init()
    if (auth.isLoggedIn) {
        redirectAfterAuth()
    }
})



</script>

<template>
    <UContainer class="flex h-screen py-5 ">
        Left: form panel
        <UPageCard class="w-full lg:w-1/2   ring-0 shadow-none bg-white rounded-none"
            :ui="{ container: 'sm:p-16', header: 'mb-0' }">
            <template #header>
                <div class="flex items-center justify-between">
                    <NuxtLink to="/" class="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                        Back
                    </NuxtLink>
                </div>
            </template>

            <UTabs v-model="tab" :items="[
                { label: 'Login', value: 'login' },
                { label: 'Sign Up', value: 'signup' }
            ]" class=" bg-white py-2 " :ui="{
                root: 'gap-0 st',
                list: 'bg-transparent  border-neutral-600 rounded-none relative sticky top-0 z-10',
                indicator: 'bg-transparent border-b rounded-none ',
                trigger: 'data-[state=active]:text-gray-800 hover:data-[state=inactive]:not-disabled:text-gray-800 data-[state=inactive]:text-gray-500'
            }" />

            LOGIN
            <UAuthForm v-if="tab === 'login'" title="Login" align="bottom" :schema="loginSchema" :fields="[
                {
                    name: 'email', type: 'email', label: 'Email', placeholder: 'Email', required: true, class: 'text-gray-800 bg-white/50 ', ui: {
                        base: 'bg-white text-gray-800 rounded-sm focus-visible:ring-1',
                    }
                }, {
                    name: 'password', type: 'password', label: 'Password',
                    placeholder: 'Password', required: true, class: 'text-gray-800 bg-white/50 ', ui: { base: 'bg-white text-gray-800 rounded-sm focus-visible:ring-1', }
                }]" :providers="[
                    { label: 'Login with Google', icon: 'i-simple-icons-google', size: 'xl', variant: 'outline', color: 'neutral', block: true, class: 'px-4 bg-white py-3  text-gray-800 hover:bg-white active:bg-white rounded-sm border-neutral-200 font-normal justify-center' },
                    { label: 'Login with Apple', icon: 'i-simple-icons-apple', size: 'xl', variant: 'outline', color: 'neutral', block: true, class: 'px-4 bg-white  py-3 text-gray-800 hover:bg-white active:bg-white rounded-sm border-neutral-200 font-normal justify-center' }
                ]"
                :submit="{ label: 'Login', block: true, size: 'xl', loading, ui: { base: 'bg-red-400 hover:bg-red-500 active:bg-red-400 text-white rounded-sm' } }"
                :ui="{
                    root: '',
                    title: 'font-serif text-5xl font-normal text-left text-gray-800',
                    description: 'text-neutral-500 text-left mt-1 mb-2',
                }" @submit="handleLogin">
                <template #email-label>
                    <span class="text-gray-800 text-sm font-medium">
                        Email
                    </span>
                </template>

                <template #password-label>
                    <span class="text-gray-800 text-sm font-medium">
                        Password
                    </span>
                </template>
                <template #footer>
                    <p v-if="errorMsg" class="text-sm text-red-500 mb-2">{{ errorMsg }}</p>
                </template>
                <template #separator>
                    <USeparator label="OR" :ui="{
                        label: 'text-gray-500',
                        border: 'border-gray-300'
                    }" />
                </template>
            </UAuthForm>

            <UAuthForm v-else title="Sign Up" :schema="registerSchema" :fields="[
                SIGN UP,
                {
                    name: 'name', type: 'text', label: 'Name', placeholder: 'Name', required: true, ui: {
                        base: 'bg-white text-gray-800 rounded-sm focus-visible:ring-1',
                    }
                },
                {
                    name: 'email', type: 'email', label: 'Email', placeholder: 'Email', required: true, ui: {
                        base: 'bg-white text-gray-800 rounded-sm focus-visible:ring-1',
                    }
                },
                {
                    name: 'phone', type: 'text', label: 'Phone', placeholder: '10-digit mobile number', required: true, ui: {
                        base: 'bg-white text-gray-800 rounded-sm focus-visible:ring-1',
                    }
                },
                {
                    name: 'gender',
                    type: 'select',
                    label: 'Gender',
                    placeholder: 'Select gender',
                    required: true,
                    items: [
                        { label: 'Male', value: 'male' },
                        { label: 'Female', value: 'female' },
                        { label: 'Other', value: 'other' }
                    ],
                    ui: {
                        base: 'bg-white hover:bg-white text-gray-800 rounded-sm focus-visible:ring-1', focusScope: 'bg-white text-gray-800 rounded-sm', item: 'text-gray-800 before:rounded-sm data-highlighted:not-data-disabled:before:bg-red-400/50', content: 'rounded-xs'
                    }
                },
                {
                    name: 'dob', type: 'text', label: 'Date of Birth', placeholder: 'YYYY-MM-DD', required: true, ui: {
                        base: 'bg-white text-gray-800 rounded-sm focus-visible:ring-1',
                    }
                },
                {
                    name: 'password', type: 'password', label: 'Password', placeholder: 'Password', required: true, ui: {
                        base: 'bg-white text-gray-800 rounded-sm focus-visible:ring-1',
                    }
                },
                {
                    name: 'confirmPassword', type: 'password', label: 'Confirm Password', placeholder: 'Confirm Password', required: true, ui: {
                        base: 'bg-white text-gray-800 rounded-sm focus-visible:ring-1',
                    }
                }
            ]" :submit="{ label: 'Create Account', block: true, size: 'xl', loading, ui: { base: 'bg-red-400 hover:bg-red-500 active:bg-red-400 text-white rounded-sm' } }"
                :ui="{
                    title: 'font-serif text-5xl font-normal text-left text-gray-800',
                    header: 'mb-2'
                }" @submit="handleRegister">
                <template #email-label>
                    <span class="text-gray-800 text-sm font-medium">
                        Email
                    </span>
                </template>

                <template #name-label>
                    <span class="text-gray-800 text-sm font-medium">
                        Name
                    </span>
                </template>
                <template #phone-label>
                    <span class="text-gray-800 text-sm font-medium">
                        Phone
                    </span>
                </template>
                <template #dob-label>
                    <span class="text-gray-800 text-sm font-medium">
                        Date of Birth
                    </span>
                </template>
                <template #gender-label>
                    <span class="text-gray-800 text-sm font-medium">
                        Gender
                    </span>
                </template>
                <template #password-label>
                    <span class="text-gray-800 text-sm font-medium">
                        Password
                    </span>
                </template>
                <template #confirmPassword-label>
                    <span class="text-gray-800 text-sm font-medium">
                        Confirm Password
                    </span>
                </template>

                <template #footer>
                    <p v-if="errorMsg" class="text-sm text-red-500 mb-2">{{ errorMsg }}</p>
                </template>
            </UAuthForm>
        </UPageCard>


        Right: editorial hero panel
        <UPageHero title="We use contrast to bring your brand's truest"
            description="We use contrast to bring truest essence into the light." orientation="vertical" :ui="{
                root: 'relative h-full flex flex-col justify-between  text-white lg:w-1/2  hidden lg:block',
                container: 'relative z-10 py-0 gap-0 sm:py-12 lg:py-20',
                title: 'text-3xl leading-snug max-w-xs text-left font-sans',
                description: 'text-sm max-w-[220px] text-right ml-auto leading-relaxed text-white/90 mt-auto'
            }"
            :style="{ backgroundImage: `url(https://images.unsplash.com/photo-1555529771-4f81423a1207?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)` }">
            <template #top>
                <div class="absolute inset-0 -z-10 bg-black/35 " />
            </template>
        </UPageHero>
    </UContainer>
</template> -->



<script setup>
import { z } from 'zod'
import { useAuthStore } from '~~/store/auth'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const tab = ref('login')
const show = ref(false)
const mode = ref('login') // 'login' | 'signup'



const loginSchema = z.object({
    email: z.string().email('Valid email daalo'),
    password: z.string().min(6, 'Min 6 characters'),

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

// async function handleLogin(event) {
//     loading.value = true
//     errorMsg.value = ''
//     try {
//         await auth.login(event.data)
//         redirectAfterAuth()
//     } catch (e) {
//         errorMsg.value = e?.message || 'Login fail ho gaya'
//     } finally {
//         loading.value = false
//     }
// }

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




    <UContainer class="flex  md:h-200 mt-5 md:mt-10">

        <!-- Right: editorial hero panel -->
        <UPageHero orientation="vertical" :ui="{
            root: 'relative h-full flex flex-col justify-end text-white lg:w-1/2 hidden lg:block',
            container: 'relative z-10 py-16 px-12',
            title: 'text-4xl leading-tight max-w-md font-serif tracking-tight'
        }"
            :style="{ backgroundImage: `url(https://images.unsplash.com/photo-1555529771-4f81423a1207?q=80&w=1200&auto=format&fit=crop)`, backgroundSize: 'cover', backgroundPosition: 'center' }">
            <template #top>
                <div class="absolute inset-0 -z-10 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            </template>
        </UPageHero>

        <!-- Left: form panel -->
        <UPageCard class="w-full lg:w-1/2 ring-0 shadow-none bg-gray-200 rounded-none flex items-center  md:h-200"
            :ui="{ container: 'sm:p-16 w-full', header: 'mb-0' }">
            <template #header>
                <NuxtLink to="/" class="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                    ← Back
                </NuxtLink>
            </template>
            <template #body>
                <h2 v-if="mode === 'login'" class="text-gray-800  text-4xl font-semibold mt-3 ">
                    Log into Your account
                </h2>
                <h2 v-else class="text-gray-800 text-4xl font-semibold mt-3 ">
                    Create new account
                </h2>
            </template>
            <!-- 
            <UTabs v-model="tab" :items="tabs" class="w-full h-175 " :ui="{
                list: 'bg-neutral-100 rounded-full p-1 mb-6',
                indicator: 'bg-white rounded-full shadow-sm ',
                trigger: 'rounded-full data-[state=active]:text-neutral-900 data-[state=inactive]:text-neutral-500 font-medium'
            }"> -->
            <!-- <template #login> -->
            <div v-if="mode === 'login'">

                <UForm :schema="loginSchema" :state="loginState" class="space-y-5 mt-2" @submit="handleLogin">
                    <UFormField label="Email" name="email" :ui="{
                        label: 'text-sky-600'
                    }">
                        <UInput icon="i-lucide-mail" v-model="loginState.email" type="email" size="xl" class="w-full "
                            placeholder="you@example.com" :ui="{
                                base: 'bg-white text-sky-600  rounded-full  ring-0  focus-visible:ring-2 focus-visible:ring-sky-600',
                                leadingIcon: 'size-5'
                            }" />
                    </UFormField>

                    <UFormField label="Password" name="password" :ui="{
                        label: 'text-sky-600'
                    }">
                        <!-- <UInput v-model="loginState.password" :type="showPassword ? 'text' : 'password'" size="xl"
                                class="w-full" placeholder="Password"
                                :ui="{ base: 'bg-white text-gray-400  rounded-xl border-neutral-200 focus-visible:ring-2 focus-visible:ring-neutral-900' }" />
                                <template #trailing>
                                    <UButton color="neutral" variant="link" size="sm"
                                        :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'" :padded="false"
                                        @click="showPassword = !showPassword" />
                                </template> -->
                        <!-- <template #hint>
                            <NuxtLink to="/forgot-password" class="text-xs text-neutral-500 hover:text-neutral-900">
                                Forgot password?
                            </NuxtLink>
                        </template> -->
                        <UInput icon="i-lucide-lock-keyhole" v-model="loginState.password" placeholder="Password"
                            :type="show ? 'text' : 'password'" class="w-full" size="xl" :ui="{
                                trailing: 'pe-1', base: 'bg-white text-sky-600  rounded-full ring-0 focus-visible:ring-2 focus-visible:ring-sky-600', leadingIcon: 'size-5'
                            }">
                            <template #trailing>
                                <UButton class="text-sky-600  hover:text-sky-700 active:text-sky-600" variant="link"
                                    size="sm" :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                                    :aria-label="show ? 'Hide password' : 'Show password'" :aria-pressed="show"
                                    aria-controls="password" @click="show = !show" />
                            </template>
                        </UInput>
                    </UFormField>
                    <!-- Remember me + Forgot password -->
                    <div class="flex items-center justify-between">
                        <UCheckbox v-model="loginState.remember" label="Remember me" size="lg" :ui="{
                            label: 'text-sm text-sky-600',
                            base: 'bg-white ring ring-sky-600  rounded-sm',
                            indicator: 'bg-white text-sky-600 '

                        }" />
                        <NuxtLink to="/forgot-password" class="text-xs text-sky-600 hover:text-neutral-900">
                            Forgot password?
                        </NuxtLink>
                    </div>
                    <p v-if="errorMsg" class="text-sm text-red-500">{{ errorMsg }}</p>

                    <UButton type="submit" block size="xl" :loading="loading"
                        class=" bg-sky-600 rounded-full text-white  hover:bg-sky-700 active:bg-sky-600 font-medium tracking-wide">
                        Login
                    </UButton>

                    <!-- Divider -->
                    <!-- <div class="flex items-center gap-3 py-1">
                        <div class="h-px flex-1 bg-neutral-200" />
                        <span class="text-xs text-neutral-400 uppercase tracking-wide">or continue with</span>
                        <div class="h-px flex-1 bg-neutral-200" />
                    </div> -->
                    <USeparator label="OR" :ui="{
                        label: 'text-gray-500',
                        border: 'border-gray-300'
                    }" />
                    <!-- Social logins -->
                    <div class="flex items-center justify-center gap-3">
                        <UButton block size="xl" variant="outline" color="neutral"
                            class="rounded-full  bg-white hover:bg-white active:bg-white ring-2 ring-gray-800 text-gray-800 "
                            icon="i-logos-google-icon" @click="handleGoogleLogin">
                            Google
                        </UButton>
                        <!-- <UButton block size="xl" variant="outline" color="neutral"
                            class="rounded-full bg-white hover:bg-white active:bg-white ring-sky-600 text-sky-600 border-neutral-200"
                            icon="i-simple-icons-apple" @click="handleAppleLogin">
                            Apple
                        </UButton> -->
                    </div>
                </UForm>
                <p class="text-sm text-neutral-500 text-center mt-6">
                    New here?
                    <button type="button" class="text-gray-800 font-medium hover:underline" @click="mode = 'signup'">
                        Create account
                    </button>
                </p>
            </div>
            <!-- </template> -->

            <!-- <template #signup> -->
            <div v-else>

                <UForm :schema="registerSchema" :state="registerState" class="space-y-5 mt-2" @submit="handleRegister">
                    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
                        <UFormField label="Name" name="name" :ui="{
                            label: 'text-sky-600'
                        }">
                            <UInput icon="i-lucide-user" v-model="registerState.name" size="xl" type="text"
                                placeholder="Name" class="w-full" :ui="{
                                    base: 'bg-white text-sky-600  rounded-full  ring-0  focus-visible:ring-2 focus-visible:ring-sky-600',
                                    leadingIcon: 'size-5'

                                }" />
                        </UFormField>
                        <UFormField label="Phone" name="phone" :ui="{
                            label: 'text-sky-600'
                        }">
                            <UInput icon="i-lucide-phone" v-model="registerState.phone" maxlength="10" size="xl"
                                placeholder="10-digit" class="w-full" :ui="{
                                    base: 'bg-white text-sky-600  rounded-full  ring-0  focus-visible:ring-2 focus-visible:ring-sky-600',
                                    leadingIcon: 'size-5'

                                }" />
                        </UFormField>
                    </div>

                    <UFormField label="Email" name="email" :ui="{
                        label: 'text-sky-600'
                    }">
                        <UInput icon="i-lucide-mail" v-model="registerState.email" type="email" size="xl" class="w-full"
                            :ui="{
                                base: 'bg-white text-sky-600  rounded-full  ring-0  focus-visible:ring-2 focus-visible:ring-sky-600',
                                leadingIcon: 'size-5'

                            }" />
                    </UFormField>

                    <!-- :ui="{ base: 'border-neutral-300 rounded-full', indicator: 'bg-white after:bg-neutral-900 after:rounded-full after:size-2.5' }"  -->
                    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
                        <UFormField label="Gender" name="gender" :ui="{
                            label: 'text-sky-600'
                        }">
                            <URadioGroup v-model="registerState.gender" orientation="horizontal" :items="genderOptions"
                                size="lg" :ui="{
                                    fieldset: '  py-2 ',
                                    label: 'text-sky-600',
                                    base: 'bg-white ring ring-sky-600  rounded-sm',
                                    indicator: 'bg-white after:bg-sky-600 after:rounded-sm  after:size-3.5'
                                }" />
                        </UFormField>
                        <UFormField label="Date of Birth" name="dob" :ui="{
                            label: 'text-sky-600'
                        }">
                            <UInput icon="i-lucide-cake" v-model="registerState.dob" type="date" size="xl"
                                class="w-full" :ui="{
                                    base: 'bg-white text-sky-600  rounded-full  ring-0  focus-visible:ring-2 focus-visible:ring-sky-600',
                                    leadingIcon: 'size-5'

                                }" style="color-scheme: light;" />
                        </UFormField>
                    </div>

                    <UFormField label="Location" name="location" :ui="{
                        label: 'text-sky-600'
                    }">
                        <UInput icon="i-lucide-map-pin" v-model="registerState.location" placeholder="City, State"
                            size="xl" class="w-full" :ui="{
                                base: 'bg-white text-sky-600  rounded-full  ring-0  focus-visible:ring-2 focus-visible:ring-sky-600',
                                leadingIcon: 'size-5'

                            }" />
                    </UFormField>

                    <div class="grid grid-cols-2 gap-4">
                        <UFormField label="Password" name="password" :ui="{
                            label: 'text-sky-600'
                        }">
                            <UInput icon="i-lucide-lock-keyhole" v-model="registerState.password" type="password"
                                size="xl" class="w-full" :ui="{
                                    base: 'bg-white text-sky-600  rounded-full  ring-0  focus-visible:ring-2 focus-visible:ring-sky-600',
                                    leadingIcon: 'size-5'

                                }" />
                        </UFormField>
                        <UFormField label="Confirm" name="confirmPassword" :ui="{
                            label: 'text-sky-600'
                        }">
                            <UInput icon="i-lucide-lock-keyhole" v-model="registerState.confirmPassword" type="password"
                                size="xl" class="w-full" :ui="{
                                    base: 'bg-white text-sky-600  rounded-full  ring-0  focus-visible:ring-2 focus-visible:ring-sky-600',
                                    leadingIcon: 'size-5'
                                }" />
                        </UFormField>
                    </div>

                    <p v-if="errorMsg" class="text-sm text-red-500">{{ errorMsg }}</p>


                    <UButton type="submit" block size="xl" :loading="loading"
                        class=" bg-sky-600 rounded-full text-white  hover:bg-sky-700 active:bg-sky-600 font-medium tracking-wide">
                        Sign up
                    </UButton>
                </UForm>
                <p class="text-sm text-neutral-500 text-center mt-6">
                    Already have an account?
                    <button type="button" class="text-gray-800 font-medium hover:underline" @click="mode = 'login'">
                        Login
                    </button>
                </p>
            </div>
            <!-- </template> -->
            <!-- </UTabs> -->
        </UPageCard>


    </UContainer>


    <!-- <UContainer class="flex h-screen py-5 ">
        Left: form panel
        <UPageCard class="w-full lg:w-1/2   ring-0 shadow-none bg-white rounded-none"
            :ui="{ container: 'sm:p-16', header: 'mb-0' }">
            <template #header>
                <div class="flex items-center justify-between">
                    <NuxtLink to="/" class="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                        Back
                    </NuxtLink>
                </div>
            </template>

            <UTabs v-model="tab" :items="tabs" class="w-full bg-white h-200 " :ui="{
                list: 'bg-transparent  border-neutral-600 rounded-none  ',
                indicator: 'bg-transparent duration-500 border-b rounded-none ',
                trigger: 'data-[state=active]:text-gray-800 hover:data-[state=inactive]:not-disabled:text-gray-800 data-[state=inactive]:text-gray-500',

            }">
                <template #login>
                    <UForm :schema="loginSchema" :state="loginState" class="space-y-4 mt-4 h-full"
                        @submit="handleLogin">
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
                    <UForm :schema="registerSchema" :state="registerState" class="space-y-4 mt-4 bg-white h-full"
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
        </UPageCard>


        Right: editorial hero panel
        <UPageHero title="We use contrast to bring your brand's truest"
            description="We use contrast to bring truest essence into the light." orientation="vertical" :ui="{
                root: 'relative h-full flex flex-col justify-between  text-white lg:w-1/2  hidden lg:block',
                container: 'relative z-10 py-0 gap-0 sm:py-12 lg:py-20',
                title: 'text-3xl leading-snug max-w-xs text-left font-sans',
                description: 'text-sm max-w-[220px] text-right ml-auto leading-relaxed text-white/90 mt-auto'
            }"
            :style="{ backgroundImage: `url(https://images.unsplash.com/photo-1555529771-4f81423a1207?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)` }">
            <template #top>
                <div class="absolute inset-0 -z-10 bg-black/35 " />
            </template>
        </UPageHero>
    </UContainer> -->
</template>