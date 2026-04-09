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
