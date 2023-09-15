const URL_API = 'https://api.escuelajs.co/api'
const VERSION_API = 'v1'

export const urlProducts = `${URL_API}/${VERSION_API}/products`
export const urlProductsBySearch = (title) => `${URL_API}/${VERSION_API}/products/?title=${title}`
export const urlProductsByCategory = (categoryId) => `${URL_API}/${VERSION_API}/categories/${categoryId}/products`
export const urlCategories = `${URL_API}/${VERSION_API}/categories`
