export const productsQuery = `*[_type == "product"] | order(sortOrder asc, name asc) {
  "id": _id,
  name,
  description,
  price,
  image
}`;

export const svoProductsQuery = `*[_type == "svoProduct"] | order(sortOrder asc, name asc) {
  "id": _id,
  name,
  description,
  priceRegular,
  priceDiscount,
  image
}`;

export const homeCarouselSettingsQuery = `*[_type == "homeCarouselSettings" && _id == "homeCarouselSettings"][0]{
  items[]->{
    "id": _id,
    name,
    description,
    price,
    image
  }
}`;
