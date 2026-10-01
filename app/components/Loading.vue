<!-- <script setup lang=""></script>

<template>
    <div>
        <div class="skeleton-loading" style="height: 160px;"></div>
        <div class="animated-background large" style="height: 10px; margin-bottom: 10px;"></div>
        <div class="animated-background large" style="height: 10px; width: 80%; margin-bottom: 10px;"></div>
        <div class="animated-background large" style="height: 10px; width: 70%;"></div>
    </div>
</template>

<style scoped>
    .skeleton-loading {
        animation: placeHolderShimmer 1s linear infinite forwards;
        background: linear-gradient(90deg, #eee 8%, #ddd 18%, #eee 33%);
        background-size: 400% 100%;
    }
</style> -->

<!-- <script setup lang="ts">
interface Props {
    pending: any
}
const { pending } = defineProps<Props>()
console.log("object", pending);
</script>
<template>
    <div v-if="pending">
        <div class="position-fixed d-flex align-items-center justify-content-center head">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.head {
    top: 50%;
    left: 50%;
    background-color: rgba(255, 255, 255, 0.8);
    inset: 0 0 0 0;
    z-index: 9999999999;
    backdrop-filter: blur(10px);
    position: fixed;
}
</style> -->

<script lang="ts" setup>
interface Props {
    pending?: any
}
const { pending } = defineProps<Props>()
</script>


<template>
    <div>
        <CommonLoadingCustomLoading :pending="pending">
            <div class="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
                    <g>
                        <circle cx="12" cy="2.5" r="1.5" fill="#191919" opacity=".14" />
                        <circle cx="16.75" cy="3.77" r="1.5" fill="#191919" opacity=".29" />
                        <circle cx="20.23" cy="7.25" r="1.5" fill="#191919" opacity=".43" />
                        <circle cx="21.5" cy="12" r="1.5" fill="#191919" opacity=".57" />
                        <circle cx="20.23" cy="16.75" r="1.5" fill="#191919" opacity=".71" />
                        <circle cx="16.75" cy="20.23" r="1.5" fill="#191919" opacity=".86" />
                        <circle cx="12" cy="21.5" r="1.5" fill="#191919" />
                        <animateTransform attributeName="transform" calcMode="discrete" dur="0.75s"
                            repeatCount="indefinite" type="rotate"
                            values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" />
                    </g>
                </svg>
                <p class="m-0 mt-2 fw-bold text-dark">Please wait...</p>
            </div>
        </CommonLoadingCustomLoading>
    </div>
</template>


<style></style>