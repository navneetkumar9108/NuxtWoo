<!-- <script setup>
const loading = ref(false);
const toast = useToast();

useSeoMeta({
  title: "Contact",
  ogTitle: "Contact",
});

const state = reactive({
  name: "",
  email: "",
  message: "",
});

const errors = reactive({
  name: "",
  email: "",
  message: "",
});

function validate() {
  errors.name = "";
  errors.email = "";
  errors.message = "";

  let valid = true;

  if (!state.name || state.name.length < 2) {
    errors.name = "Name is required";
    valid = false;
  }
  if (!state.email || !state.email.includes("@")) {
    errors.email = "Valid email is required";
    valid = false;
  }
  if (!state.message || state.message.length < 10) {
    errors.message = "Message must be at least 10 characters";
    valid = false;
  }

  return valid;
}

async function onSubmit() {
  if (!validate()) return;

  loading.value = true;
  try {
    await $fetch("/api/contact", {
      method: "POST",
      body: state,
    });

    toast.add({ title: "Message sent!", color: "success" });
    Object.assign(state, { name: "", email: "", message: "" });
  } catch (e) {
    toast.add({ title: "Something went wrong", color: "error" });
  } finally {
    loading.value = false;
  }
}
</script>
<template>
  <UContainer class="py-16 max-w-2xl">
    <h1 class="text-3xl font-bold mb-2">Contact Us</h1>
    <p class="text-gray-500 mb-8">We'll get back to you soon.</p>

    <UForm :state="state" class="space-y-6" @submit="onSubmit">
      <UFormField label="Full Name" name="name" :error="errors.name">
        <UInput v-model="state.name" placeholder="John Doe" class="w-full" />
      </UFormField>

      <UFormField label="Email" name="email" :error="errors.email">
        <UInput v-model="state.email" type="email" placeholder="john@example.com" class="w-full" />
      </UFormField>

      <UFormField label="Message" name="message" :error="errors.message">
        <UTextarea v-model="state.message" placeholder="Your message..." :rows="5" class="w-full" />
      </UFormField>

      <ButtonUButton label="Send Message" type="submit" size="lg" :loading="loading" block />
    </UForm>
  </UContainer>
</template> -->

<script setup>
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Enter a valid phone number').optional().or(z.literal('')),
  subject: z.string().min(3, 'Subject is too short'),
  message: z.string().min(10, 'Message should be at least 10 characters')
})

const state = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitStatus = ref(null) // 'success' | 'error' | null

const toast = useToast()

async function onSubmit(event) {
  isSubmitting.value = true
  submitStatus.value = null

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: event.data
    })

    submitStatus.value = 'success'
    toast.add({
      title: 'Message sent',
      description: "We'll get back to you within 24 hours.",
      icon: 'i-lucide-check-circle',
      color: 'success'
    })

    Object.assign(state, { name: '', email: '', phone: '', subject: '', message: '' })
  } catch (err) {
    submitStatus.value = 'error'
    toast.add({
      title: 'Something went wrong',
      description: err?.data?.message || 'Please try again in a moment.',
      icon: 'i-lucide-alert-circle',
      color: 'error'
    })
  } finally {
    isSubmitting.value = false
  }
}

const contactInfo = [
  {
    icon: 'i-lucide-map-pin',
    title: 'Visit Us',
    lines: ['123 Commerce Street', 'Bengaluru, Karnataka 560001']
  },
  {
    icon: 'i-lucide-phone',
    title: 'Call Us',
    lines: ['+91 98765 43210', 'Mon–Sat, 10am–7pm']
  },
  {
    icon: 'i-lucide-mail',
    title: 'Email Us',
    lines: ['support@mystore.com', 'We reply within 24 hours']
  }
]

useHead({
  title: 'Contact Us — WooNuxt'
})
</script>

<template>
  <div>
    <!-- Hero -->
    <div class="bg-gray-50 border-b border-gray-200">
      <UContainer class="py-16 text-center">
        <h1 class="text-3xl lg:text-4xl font-bold text-gray-900">Get in Touch</h1>
        <p class="text-gray-600 mt-3 max-w-xl mx-auto">
          Have a question about an order, product, or anything else? Our team is happy to help.
        </p>
      </UContainer>
    </div>

    <UContainer class="py-12 lg:py-16">
      <div class="grid lg:grid-cols-3 gap-10">
        <!-- Contact info -->
        <div class="lg:col-span-1 space-y-6">
          <div v-for="info in contactInfo" :key="info.title"
            class="flex items-start gap-4 p-4 rounded-lg border border-gray-200 bg-white">
            <div class="shrink-0 w-10 h-10 rounded-full bg-sky-600 flex items-center justify-center">
              <UIcon :name="info.icon" class="text-white  size-5" />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 text-sm">{{ info.title }}</h3>
              <p v-for="line in info.lines" :key="line" class="text-sm text-gray-600">
                {{ line }}
              </p>
            </div>
          </div>
        </div>

        <!-- Form -->
        <div class="lg:col-span-2">
          <div class="border border-gray-200 rounded-lg p-6 lg:p-8 bg-white">
            <h2 class="text-xl font-semibold text-gray-900 mb-1">Send us a message</h2>
            <p class="text-sm text-gray-500 mb-6">Fill out the form and we'll respond as soon as possible.</p>

            <UForm :schema="schema" :state="state" class="space-y-5" @submit="onSubmit">
              <div class="grid sm:grid-cols-2 gap-5">
                <UFormField label="Full Name" name="name" required :ui="{
                  label: 'text-sky-600'
                }">
                  <UInput v-model="state.name" placeholder="John Doe" size="lg" class="w-full" :ui="{
                    base: 'bg-gray-100 text-sky-600  rounded-sm  ring-0  focus-visible:ring-2 focus-visible:ring-sky-600',
                    leadingIcon: 'size-5'

                  }" />
                </UFormField>

                <UFormField label="Email" name="email" required :ui="{
                  label: 'text-sky-600'
                }">
                  <UInput v-model="state.email" type="email" placeholder="john@example.com" size="lg" class="w-full"
                    :ui="{
                      base: 'bg-gray-100 text-sky-600  rounded-sm  ring-0  focus-visible:ring-2 focus-visible:ring-sky-600',
                      leadingIcon: 'size-5'

                    }" />
                </UFormField>
              </div>

              <div class="grid sm:grid-cols-2 gap-5">
                <UFormField label="Phone" name="phone" hint="Optional" :ui="{
                  label: 'text-sky-600'
                }">
                  <UInput v-model="state.phone" type="tel" placeholder="98765 43210" size="lg" class="w-full" :ui="{
                    base: 'bg-gray-100 text-sky-600  rounded-sm  ring-0  focus-visible:ring-2 focus-visible:ring-sky-600',
                    leadingIcon: 'size-5'

                  }" />
                </UFormField>

                <UFormField label="Subject" name="subject" required :ui="{
                  label: 'text-sky-600'
                }">
                  <UInput v-model="state.subject" placeholder="Order inquiry" size="lg" class="w-full" :ui="{
                    base: 'bg-gray-100 text-sky-600  rounded-sm  ring-0  focus-visible:ring-2 focus-visible:ring-sky-600',
                    leadingIcon: 'size-5'

                  }" />
                </UFormField>
              </div>

              <UFormField label="Message" name="message" required :ui="{
                label: 'text-sky-600'
              }">
                <UTextarea v-model="state.message" placeholder="Tell us how we can help..." :rows="5" class="w-full"
                  :ui="{
                    base: 'bg-gray-100 text-sky-600  rounded-sm  ring-0  focus-visible:ring-2 focus-visible:ring-sky-600',
                    leadingIcon: 'size-5'

                  }" />
              </UFormField>

              <UButton type="submit" label="Send Message" trailing-icon="i-lucide-send" color="neutral" size="lg"
                :loading="isSubmitting" class="rounded-xs bg-sky-600 hover:bg-sky-600 text-white  mx-auto flex w-fit" />
            </UForm>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
