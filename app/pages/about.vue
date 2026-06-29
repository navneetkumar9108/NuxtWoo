<script setup>
useSeoMeta({
  title: "About",
  ogTitle: "About",
});
</script>

<template>
  <div>
    <h1>About Page</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut eum
      accusantium pariatur voluptatibus inventore. Soluta modi sunt distinctio
      laudantium et?
    </p>
    <!-- <UPageCard
      class="w-52.5 bg-neutral ring-0 mx-2.5 mb-7.5"
      :ui="{
        container:
          'sm:p-0 gap-0  hover:bg-white hover:shadow-lg transition-all duration-300 ',
        header: 'w-full  h-70 mb-0 relative ',
        body: 'px-2.5 mt-3 leading-tight',
      }"
    >
      <template #header>
        <NuxtImg
          src="https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/31178536/2025/6/6/8483356b-4baa-4571-a1b2-2a516cba93c51749193885580-Roadster-Men-Tshirts-5041749193885046-1.jpg"
          alt=""
          class="w-full h-full object-cover"
        />
        <UBadge
          color="primary"
          variant="subtle"
          class="absolute left-2 bottom-1 backdrop-blur-xl bg-white/50 text-black rounded-xs"
        >
          <div class="flex items-center gap-1">
            <span>4.5</span>
            <UIcon name="i-lucide-star" class="size-3" />
            <USeparator orientation="vertical" size="xs" class="h-3" />
            <span>1.2k</span>
          </div>
        </UBadge>
        <div class="absolute top-3 left-0">
          <UBadge
            label="NEW"
            color="error"
            variant="solid"
            size="sm"
            :ui="{
              base: 'rounded-none bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold tracking-wide pl-1 pr-5 py-1 shadow-md [clip-path:polygon(0_0,100%_0,85%_50%,100%_100%,0_100%)]',
            }"
          />
        </div>
      </template>
      <template #body>
        <h3 class="text-[16px] font-bold text-gray-800">PRONK</h3>
        <h4 class="text-sm text-gray-600 font-normal">
          Men Printed Raw Edge T-shirt
        </h4>
        <div class="text-sm text-gray-800 mt-2.5 mb-1.5">
          <span class="text-sm mr-[5px] font-bold"><strong>₹ 593</strong></span>
          <span class="text-xs mr-[5px] text-error"><s>₹ 1499</s></span>
          <span class="text-xs text-success">(60 % OFF)</span>
        </div>
      </template>
    </UPageCard> -->

    <div class="box1">Content Box</div>
    <div class="box2">Border Box</div>

    <CardShoesCard />
  </div>
</template>

<style scoped>
.box1 {
  width: 200px;
  padding: 20px;
  border: 10px solid red;
  box-sizing: content-box;
}

.box2 {
  width: 200px;
  padding: 20px;
  border: 10px solid blue;
  box-sizing: border-box;
}
</style>
