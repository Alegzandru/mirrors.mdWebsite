import {API_URL} from "../utils/urls"

export async function getProductData(slug) {
    // const fullPath = path.join(postsDirectory, `${product}.md`)
    // const fileContents = fs.readFileSync(fullPath, 'utf8')
    // const matterResult = matter(fileContents)

    const productsRes = await fetch(`${API_URL}/products?slug_eq=${slug}`)
    const productStrapi = await productsRes.json()

    // console.log(productStrapi)

    // Combine the data with the product
    return {
      slug,
      ...productStrapi
    }
}
  

export async function getAllProductPaths() {
    const productsRes = await fetch(`${API_URL}/products`)
    const products = await productsRes.json()

    const productPaths = products.map((product, index) => {
        return({
            params : {
                slug : `${product.slug}`
            }
        })
    })

    console.log(productPaths)
}