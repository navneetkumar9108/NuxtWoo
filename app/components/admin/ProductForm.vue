<script setup>
const props = defineProps({
    initialData: { type: Object, default: null },
})

const emit = defineEmits(['submit'])

const form = reactive({
    sku: '',
    title: '',
    slug: '',
    brand: { name: '' },
    category: { name: '' },
    gender: { name: '' },
    material: { name: '' },
    fit: { name: '' },
    shortDescription: '',
    description: '',
    highlights: [],
    specifications: {},
    tags: [],
    isNew: false,
    isBestSeller: false,
    isFeatured: false,
    isActive: true,
    seo: {
        metaTitle: '',
        metaDescription: '',
        keywords: [],
    },
    colors: [],
})

// Agar edit mode hai, existing data se form fill karo
if (props.initialData) {
    Object.assign(form, JSON.parse(JSON.stringify(props.initialData)))
}

// Highlights ko textarea se comma/newline separated string se manage karne ke liye
const highlightsText = ref(form.highlights?.join('\n') || '')
const tagsText = ref(form.tags?.join(', ') || '')
const keywordsText = ref(form.seo?.keywords?.join(', ') || '')
// script me
const specifications = reactive({
    fabric: form.specifications?.fabric || '',
    pattern: form.specifications?.pattern || '',
    neck: form.specifications?.neck || '',
    sleeves: form.specifications?.sleeves || '',
    fit: form.specifications?.fit || '',
    occasion: form.specifications?.occasion || '',
    countryOfOrigin: form.specifications?.countryOfOrigin || '',
    care: form.specifications?.care || '',
})


// Naya color add karo
function addColor() {
    form.colors.push({
        name: '',
        hex: '#000000',
        slug: '',
        thumbnail: '',
        images: [''],
        sizes: [],
        pricing: { price: 0, originalPrice: 0, discount: 0 },
    })
}

function removeColor(index) {
    form.colors.splice(index, 1)
}

function addSize(colorIndex) {
    form.colors[colorIndex].sizes.push({ name: '', slug: '', stock: 0 })
}

function removeSize(colorIndex, sizeIndex) {
    form.colors[colorIndex].sizes.splice(sizeIndex, 1)
}

function addImage(colorIndex) {
    form.colors[colorIndex].images.push('')
}

function removeImage(colorIndex, imgIndex) {
    form.colors[colorIndex].images.splice(imgIndex, 1)
}

// Auto slug generate from title
watch(() => form.title, (val) => {
    if (!props.initialData) {
        form.slug = val.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    }
})

// function handleSubmit() {
//     form.highlights = highlightsText.value.split('\n').map((s) => s.trim()).filter(Boolean)
//     form.tags = tagsText.value.split(',').map((s) => s.trim()).filter(Boolean)
//     form.seo.keywords = keywordsText.value.split(',').map((s) => s.trim()).filter(Boolean)

//     // Auto-generate color slug from name, and size slug from name
//     form.colors.forEach((color) => {
//         if (!color.slug) color.slug = color.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
//         color.sizes.forEach((size) => {
//             if (!size.slug) size.slug = size.name.toLowerCase()
//         })
//     })

//     emit('submit', { ...form })
// }
// function handleSubmit() {
//     form.highlights = highlightsText.value.split('\n').map((s) => s.trim()).filter(Boolean)
//     form.tags = tagsText.value.split(',').map((s) => s.trim()).filter(Boolean)
//     form.seo.keywords = keywordsText.value.split(',').map((s) => s.trim()).filter(Boolean)

//     // Auto-generate color slug + sku, aur size slug + sku
//     form.colors.forEach((color) => {
//         if (!color.slug) color.slug = color.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

//         // Color-level SKU: PRODUCT-SKU-COLORCODE
//         const colorCode = color.name.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3) || 'CLR'
//         if (!color.sku) color.sku = `${form.sku}-${colorCode}`

//         color.sizes.forEach((size) => {
//             if (!size.slug) size.slug = size.name.toLowerCase()

//             // Size-level SKU: COLOR-SKU-SIZENAME
//             if (!size.sku) size.sku = `${color.sku}-${size.name.toUpperCase()}`
//         })
//     })

//     emit('submit', { ...form })
// }

function handleSubmit() {
    form.highlights = highlightsText.value.split('\n').map((s) => s.trim()).filter(Boolean)
    form.tags = tagsText.value.split(',').map((s) => s.trim()).filter(Boolean)
    form.seo.keywords = keywordsText.value.split(',').map((s) => s.trim()).filter(Boolean)

    // Helper — naam se slug banao
    const toSlug = (str) => str?.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || ''

    // Brand/Category/Gender/Material/Fit ke slugs auto-generate karo
    form.brand.slug = toSlug(form.brand.name)
    form.category.slug = toSlug(form.category.name)
    form.gender.slug = toSlug(form.gender.name)
    form.material.slug = toSlug(form.material.name)
    form.fit.slug = toSlug(form.fit.name)

    // Colors/Sizes SKU + slug
    form.colors.forEach((color) => {
        if (!color.slug) color.slug = toSlug(color.name)

        const colorCode = color.name.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3) || 'CLR'
        if (!color.sku) color.sku = `${form.sku}-${colorCode}`

        color.sizes.forEach((size) => {
            if (!size.slug) size.slug = toSlug(size.name)
            if (!size.sku) size.sku = `${color.sku}-${size.name.toUpperCase()}`
        })
    })

    // Specifications — object bana lo agar form me fields hain (neeche add kar rahe hain)
    form.specifications = { ...specifications }

    emit('submit', { ...form })
}
</script>

<template>
    <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Basic Info -->
        <UCard class="bg-white ring-1 ring-neutral-200 rounded-xs">
            <template #header>
                <span class="font-semibold text-sm">Basic Information</span>
            </template>
            <div class="grid grid-cols-2 gap-4">
                <UFormField label="Title">
                    <UInput v-model="form.title" class="w-full" required />
                </UFormField>
                <UFormField label="Slug">
                    <UInput v-model="form.slug" class="w-full" required />
                </UFormField>
                <UFormField label="SKU">
                    <UInput v-model="form.sku" class="w-full" required />
                </UFormField>
                <UFormField label="Brand Name">
                    <UInput v-model="form.brand.name" class="w-full" required />
                </UFormField>
                <UFormField label="Category Name">
                    <UInput v-model="form.category.name" class="w-full" required />
                </UFormField>
                <UFormField label="Gender">
                    <USelect v-model="form.gender.name" :items="['Men', 'Women', 'Unisex']" class="w-full" />
                </UFormField>
                <UFormField label="Material">
                    <UInput v-model="form.material.name" class="w-full" />
                </UFormField>
                <UFormField label="Fit">
                    <UInput v-model="form.fit.name" class="w-full" />
                </UFormField>
            </div>
        </UCard>

        <!-- Description -->
        <UCard class="bg-white ring-1 ring-neutral-200 rounded-xs">
            <template #header>
                <span class="font-semibold text-sm">Description</span>
            </template>
            <div class="space-y-4">
                <UFormField label="Short Description">
                    <UInput v-model="form.shortDescription" class="w-full" />
                </UFormField>
                <UFormField label="Full Description">
                    <UTextarea v-model="form.description" :rows="4" class="w-full" />
                </UFormField>
                <UFormField label="Highlights (one per line)">
                    <UTextarea v-model="highlightsText" :rows="4" class="w-full" />
                </UFormField>
                <UFormField label="Tags (comma separated)">
                    <UInput v-model="tagsText" class="w-full" />
                </UFormField>
            </div>
        </UCard>

        <!-- Template me, Description card ke baad -->
        <UCard class="bg-white ring-1 ring-neutral-200 rounded-xs">
            <template #header>
                <span class="font-semibold text-sm">Specifications</span>
            </template>
            <div class="grid grid-cols-2 gap-4">
                <UFormField label="Fabric">
                    <UInput v-model="specifications.fabric" class="w-full" />
                </UFormField>
                <UFormField label="Pattern">
                    <UInput v-model="specifications.pattern" class="w-full" />
                </UFormField>
                <UFormField label="Neck">
                    <UInput v-model="specifications.neck" class="w-full" />
                </UFormField>
                <UFormField label="Sleeves">
                    <UInput v-model="specifications.sleeves" class="w-full" />
                </UFormField>
                <UFormField label="Occasion">
                    <UInput v-model="specifications.occasion" class="w-full" />
                </UFormField>
                <UFormField label="Country of Origin">
                    <UInput v-model="specifications.countryOfOrigin" class="w-full" />
                </UFormField>
                <UFormField label="Care Instructions">
                    <UInput v-model="specifications.care" class="w-full" />
                </UFormField>
            </div>
        </UCard>

        <!-- Colors -->
        <UCard class="bg-white ring-1 ring-neutral-200 rounded-xs">
            <template #header>
                <div class="flex items-center justify-between">
                    <span class="font-semibold text-sm">Colors & Variants</span>
                    <ButtonUButton label="Add Color" icon="i-lucide-plus" size="xs" @click="addColor" />
                </div>
            </template>

            <div v-if="!form.colors.length" class="text-sm text-neutral-500 text-center py-6">
                No colors added yet
            </div>

            <div v-for="(color, cIndex) in form.colors" :key="cIndex"
                class="border border-neutral-200 rounded-xs p-4 mb-4">
                <div class="flex items-center justify-between mb-3">
                    <span class="text-sm font-medium">Color #{{ cIndex + 1 }}</span>
                    <ButtonUButton icon="i-lucide-trash-2" color="error" variant="ghost" size="xs"
                        @click="removeColor(cIndex)" />
                </div>

                <div class="grid grid-cols-2 gap-3 mb-3">
                    <UFormField label="Color Name">
                        <UInput v-model="color.name" class="w-full" placeholder="e.g. Black" />
                    </UFormField>
                    <UFormField label="Hex Code">
                        <UInput v-model="color.hex" type="color" class="w-full" />
                    </UFormField>
                    <UFormField label="Price">
                        <UInput v-model.number="color.pricing.price" type="number" class="w-full" />
                    </UFormField>
                    <UFormField label="Original Price">
                        <UInput v-model.number="color.pricing.originalPrice" type="number" class="w-full" />
                    </UFormField>
                    <UFormField label="Discount %">
                        <UInput v-model.number="color.pricing.discount" type="number" class="w-full" />
                    </UFormField>
                    <UFormField label="Thumbnail URL">
                        <UInput v-model="color.thumbnail" class="w-full" />
                    </UFormField>
                </div>

                <!-- Images -->
                <div class="mb-3">
                    <p class="text-xs font-medium mb-2">Images</p>
                    <div v-for="(img, imgIdx) in color.images" :key="imgIdx" class="flex gap-2 mb-2">
                        <UInput v-model="color.images[imgIdx]" placeholder="Image URL" class="flex-1" />
                        <ButtonUButton icon="i-lucide-x" color="error" variant="ghost" size="xs"
                            @click="removeImage(cIndex, imgIdx)" />
                    </div>
                    <ButtonUButton label="Add Image" icon="i-lucide-plus" size="xs" variant="outline"
                        @click="addImage(cIndex)" />
                </div>

                <!-- Sizes -->
                <div>
                    <p class="text-xs font-medium mb-2">Sizes & Stock</p>
                    <div v-for="(size, sIndex) in color.sizes" :key="sIndex" class="flex gap-2 mb-2 items-center">
                        <UInput v-model="size.name" placeholder="Size (e.g. M)" class="w-24" />
                        <UInput v-model.number="size.stock" type="number" placeholder="Stock" class="w-24" />
                        <ButtonUButton icon="i-lucide-x" color="error" variant="ghost" size="xs"
                            @click="removeSize(cIndex, sIndex)" />
                    </div>
                    <ButtonUButton label="Add Size" icon="i-lucide-plus" size="xs" variant="outline"
                        @click="addSize(cIndex)" />
                </div>
            </div>
        </UCard>

        <!-- Flags -->
        <UCard class="bg-white ring-1 ring-neutral-200 rounded-xs">
            <template #header>
                <span class="font-semibold text-sm">Flags</span>
            </template>
            <div class="flex gap-6">
                <UCheckbox v-model="form.isNew" label="New" />
                <UCheckbox v-model="form.isBestSeller" label="Bestseller" />
                <UCheckbox v-model="form.isFeatured" label="Featured" />
                <UCheckbox v-model="form.isActive" label="Active (visible in store)" />
            </div>
        </UCard>

        <!-- SEO -->
        <UCard class="bg-white ring-1 ring-neutral-200 rounded-xs">
            <template #header>
                <span class="font-semibold text-sm">SEO</span>
            </template>
            <div class="space-y-4">
                <UFormField label="Meta Title">
                    <UInput v-model="form.seo.metaTitle" class="w-full" />
                </UFormField>
                <UFormField label="Meta Description">
                    <UTextarea v-model="form.seo.metaDescription" :rows="2" class="w-full" />
                </UFormField>
                <UFormField label="Keywords (comma separated)">
                    <UInput v-model="keywordsText" class="w-full" />
                </UFormField>
            </div>
        </UCard>

        <ButtonUButton type="submit" label="Save Product" block size="lg" color="primary" class="p-3" />
    </form>
</template>