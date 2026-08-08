<!-- components/home/NewsletterStrip.vue -->
<script setup>
const email = ref("");
</script>

<template>
    <!-- Right: App download -->
    <div class="flex flex-col items-start lg:items-end gap-4">
        <p class="text-white/70 text-sm sm:text-base">
            Shop faster on our app
        </p>
        <div class="flex gap-3">

            <a href="#" class="flex items-center gap-2 bg-white/10 hover:bg-white/15 transition-colors rounded-lg px-4 py-2.5 border
            border-white/20">
                <UIcon name="i-simple-icons-apple" class="size-6 shrink-0" />
                <div class="text-left leading-tight">
                    <p class="text-[10px] text-white/60">Download on the</p>
                    <p class="text-sm font-semibold">App Store</p>
                </div>
            </a>


            <a href="#" class="flex items-center gap-2 bg-white/10 hover:bg-white/15 transition-colors rounded-lg px-4 py-2.5 border
            border-white/20">
                <UIcon name="i-simple-icons-googleplay" class="size-6 shrink-0" />
                <div class="text-left leading-tight">
                    <p class="text-[10px] text-white/60">GET IT ON</p>
                    <p class="text-sm font-semibold">Google Play</p>
                </div>
            </a>
        </div>
    </div>
</template>