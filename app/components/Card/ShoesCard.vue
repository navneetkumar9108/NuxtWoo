<!-- <script setup>
// const colorOption1 = document.querySelector(".card__color--option1");
// const colorOption2 = document.querySelector(".card__color--option2");

// const image = document.querySelector(".card__img");
// const card = document.querySelector(".card");

// colorOption1.addEventListener("click", () => {
//   image.src = "/images/shoe1.png";
//   card.style.backgroundColor = "var(--bg-color-option1)";
// });

// colorOption2.addEventListener("click", () => {
//   image.src = "/images/shoe2.png";
//   card.style.backgroundColor = "var(--bg-color-option2)";
// });
</script>

<template>
  <div class="card">
    <div class="card__img-container">
      <img
        src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/FEBRUARY/28/c7VJsmwL_a7e4277a0e354a2886c966fa60193123.jpg"
        alt="product image"
        class="card__img"
      />
    </div>
    <div class="card__info">
      <h2 class="card__title">Women T-Shirt</h2>
      <span class="card__price">$149.99</span>
      <p class="card__description">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam,
        vel. Ratione recusandae quis molestiae. Laborum, veritatis! Quisquam
        nesciunt quasi laboriosam sint aut, nisi veritatis sunt? Ut
        reprehenderit fugit consequuntur quo!
      </p>

      <div class="card__product-details">
        <div class="card__sizes">
          <span>Size</span>
          <div class="card__size">7</div>
          <div class="card__size">8</div>
          <div class="card__size">9</div>
          <div class="card__size">10</div>
        </div>

        <div class="card__colors">
          <span>Color</span>
          <div class="card__color card__color--option1"></div>
          <div class="card__color card__color--option2"></div>
        </div>

        <button class="card__btn"><a href="#">Buy Now</a></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --font: "Poppins", sans-serif;

  --bg-color-option1: #b4ec32;
  --bg-color-option2: #d4bbf7;
  --circle1-color: #00436a;
  --circle2-color: #9016f4;
  --text-color: #292c2d;
  --white-color: #fff;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}

img {
  width: 100%;
}

body {
  font-family: var(--font);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.card {
  width: 30em;
  height: 40em;
  background-color: var(--bg-color-option1);
  border-radius: 2em;
  box-shadow: 0 1em 1em rgba(0, 0, 0, 0.2);
  color: var(--text-color);

  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
}

.card__img-container {
  width: 20em;
  position: absolute;
  top: 0;

  transform: rotate(40deg);
}

.card__info {
  position: absolute;
  bottom: 0;

  width: 100%;
  height: 50%;
  padding: 0 2em;

  overflow: hidden;
}
.card__title {
  font-size: 2.5rem;
  margin-bottom: 0.3em;
}
.card__price {
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.7);
  font-size: 1.3rem;
  font-weight: 600;
  padding: 0.3em;
  border-radius: 1em;
  margin: 0.5em 1em;
}

.card__description {
  font-size: 1.2rem;
  text-align: justify;
  margin-bottom: 0.8em;
}

.card__product-details {
  opacity: 0;
  display: flex;
  flex-direction: column;
}

.card__sizes,
.card__colors {
  margin-bottom: 0.5em;
}

.card__sizes span,
.card__colors span {
  display: block;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.3em;
}

.card__size {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 1.8em;
  height: 1.8em;
  background-color: var(--white-color);
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0 0.4em;
  border-radius: 0.2em;
  cursor: pointer;
}

.card__size:hover {
  background-color: var(--text-color);
  color: var(--white-color);
}

.card__color {
  display: inline-block;
  width: 3em;
  height: 3em;
  border-radius: 50%;
  margin: 0 0.5em;
  cursor: pointer;
}

.card__color:hover {
  border: 4px solid var(--white-color);
}

.card__color--option1 {
  background-color: var(--circle1-color);
}

.card__color--option2 {
  background-color: var(--circle2-color);
}

.card__btn {
  font-size: 1.2rem;
  font-weight: 600;
  width: 8em;
  height: 3em;
  background-color: var(--white-color);
  border: none;
  border-radius: 1em;
  cursor: pointer;
  align-self: center;
}

.card__btn a {
  color: var(--text-color);
}

.card__btn:hover {
  transform: scale(1.1);
}

.card__img-container,
.card__info {
  transition: 0.5s ease;
}

.card__price,
.card__product-details,
.card__size,
.card__btn {
  transition: 0.3s ease;
}

.card:hover .card__img-container {
  transform: rotate(0deg);
  top: -8em;
}

.card:hover .card__info {
  height: 70%;
}

.card:hover .card__price {
  opacity: 1;
}

.card:hover .card__description {
  font-size: 1.1rem;
}

.card:hover .card__product-details {
  opacity: 1;
}
</style> -->

<!-- <template>
  <div
    class="group relative w-md h-136 rounded-4xl shadow-xl flex flex-col items-center overflow-hidden transition-colors duration-500"
    :style="{ backgroundColor: selectedColor.bg }"
  >
    Rotating product image
    <div class="w-72">
      <NuxtImg :src="selectedColor.image" alt="product image" class="w-full" />
    </div>

    Expanding info panel
    <div
      class="absolute bottom-0 w-full h-1/2 group-hover:h-[70%] px-8 overflow-hidden transition-all duration-500 ease-in-out"
    >
      Price badge - hover pe fade in
      <UBadge
        color="neutral"
        variant="soft"
        class="absolute top-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-base font-semibold backdrop-blur bg-white/70"
      >
        $149.99
      </UBadge>

      <h2 class="text-3xl font-bold mb-1 text-gray-900">Women T-Shirt</h2>

      <p
        class="text-sm text-gray-800 text-justify mb-3 group-hover:text-[1.05rem] transition-all duration-300"
      >
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam,
        vel. Ratione recusandae quis molestiae.
      </p>

      <div
        class="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        Sizes
        <div class="mb-3">
          <span class="block font-semibold text-sm mb-1 text-gray-900"
            >Size</span
          >
          <div class="flex gap-2">
            <UButton
              v-for="size in sizes"
              :key="size"
              :variant="selectedSize === size ? 'solid' : 'soft'"
              color="neutral"
              size="sm"
              class="rounded w-8 h-8 justify-center font-medium"
              @click="selectedSize = size"
            >
              {{ size }}
            </UButton>
          </div>
        </div>

        Colors
        <div class="mb-3">
          <span class="block font-semibold text-sm mb-1 text-gray-900"
            >Color</span
          >
          <div class="flex gap-2">
            <button
              v-for="color in colors"
              :key="color.name"
              class="w-10 h-10 rounded-full transition-all"
              :class="
                selectedColor.name === color.name ? 'ring-4 ring-white' : ''
              "
              :style="{ backgroundColor: color.circle }"
              @click="selectedColor = color"
            />
          </div>
        </div>

        <UButton
          label="Buy Now"
          color="neutral"
          variant="solid"
          size="lg"
          class="self-center rounded-xl font-semibold px-6 hover:scale-110 transition-transform"
        />
      </div>
    </div>
  </div>
</template> -->

<!-- <script setup>
const sizes = ["7", "8", "9", "10"];
const selectedSize = ref("7");

const colors = [
  {
    name: "option1",
    bg: "#b4ec32",
    circle: "#00436a",
    image:
      "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/FEBRUARY/28/c7VJsmwL_a7e4277a0e354a2886c966fa60193123.jpg",
  },
  {
    name: "option2",
    bg: "#d4bbf7",
    circle: "#9016f4",
    image:
      "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/FEBRUARY/28/c7VJsmwL_a7e4277a0e354a2886c966fa60193123.jpg",
  },
];
const selectedColor = ref(colors[0]);
</script> -->
<script setup lang="ts"></script>

<template>
  <div>about</div>
</template>

<style lang="scss" scoped></style>
