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

const publishedArticleFilter = `_type == "article" && !(_id in path("drafts.**"))`;

export const articlesListQuery = `*[${publishedArticleFilter}] | order(sortOrder asc, title asc) {
  title,
  excerpt,
  "slug": slug.current
}`;

export const articleSlugsQuery = `*[${publishedArticleFilter} && defined(slug.current)]{
  "slug": slug.current
}`;

export const articleBySlugQuery = `*[${publishedArticleFilter} && slug.current == $slug][0]{
  title,
  excerpt,
  "slug": slug.current,
  body
}`;

const publishedReviewFilter = `_type == "review" && !(_id in path("drafts.**"))`;

export const reviewsQuery = `*[${publishedReviewFilter}] | order(sortOrder asc, authorName asc) [0...12] {
  "id": _id,
  authorName,
  text,
  ratingTen,
  sortOrder
}`;
