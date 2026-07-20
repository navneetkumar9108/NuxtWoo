<script setup>
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
</template>
