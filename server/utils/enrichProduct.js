import { brands } from "../data/brands";
import { categories } from "../data/categories";
import { materials } from "../data/materials";
import { fits } from "../data/fits";
import { genders } from "../data/genders";
import { licenses } from "../data/licenses";
import { colors } from "../data/colors";
import { sizes } from "../data/sizes";

export function enrichProduct(product) {
  return {
    ...product,

    brand: brands.find((brand) => brand.id === product.brandId),

    category: categories.find((category) => category.id === product.categoryId),

    material: materials.find((item) => item.id === product.materialId),

    fit: fits.find((item) => item.id === product.fitId),

    gender: genders.find((item) => item.id === product.genderId),

    license: licenses.find((item) => item.id === product.licenseId),

    variants: product.variants.map((variant) => ({
      ...variant,

      color: colors.find((color) => color.id === variant.colorId),

      sizes: variant.sizes.map((size) => ({
        ...size,

        size: sizes.find((item) => item.id === size.sizeId),
      })),
    })),
  };
}
