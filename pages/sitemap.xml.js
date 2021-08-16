const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const baseUrl = "https://www.mirrors.md"

  const productsRes = await fetch("https://mirrors-md-admin.herokuapp.com/products");
  const products = await productsRes.json()

  const categoriesRes = await fetch("https://mirrors-md-admin.herokuapp.com/categories");
  const categories = await categoriesRes.json()

  const staticPages = [
    '', 'cos/checkout', 'contacte', 'cos', 'galerie', 'intrebari-frecvente', 'termeni'
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${
        staticPages.map((url) => {
          return `
            <url>
              <loc>${baseUrl}/${url}</loc>
              <lastmod>2021-08-15T19:27:48.340Z</lastmod>
            </url>
            <url>
              <loc>${baseUrl}/ru/${url}</loc>
              <lastmod>2021-08-15T19:27:48.340Z</lastmod>
            </url>
            <url>
              <loc>${baseUrl}/en/${url}</loc>
              <lastmod>2021-08-15T19:27:48.340Z</lastmod>
            </url>
          `
        }).join("")
      }
      ${products
        .map(({ slug, updated_at }) => {
          return `
              <url>
                <loc>${baseUrl}/produse/${slug}</loc>
                <lastmod>${updated_at}</lastmod>
              </url>

              <url>
                <loc>${baseUrl}/ru/produse/${slug}</loc>
                <lastmod>${updated_at}</lastmod>
              </url>

              <url>
                <loc>${baseUrl}/en/produse/${slug}</loc>
                <lastmod>${updated_at}</lastmod>
              </url>

            `;
        })
        .join("")}
      ${categories
        .map(({ slug, updated_at }) => {
          return `
              <url>
                <loc>${baseUrl}/${slug}</loc>
                <lastmod>${updated_at}</lastmod>
              </url>

              <url>
                <loc>${baseUrl}/ru/${slug}</loc>
                <lastmod>${updated_at}</lastmod>
              </url>

              <url>
                <loc>${baseUrl}/en/${slug}</loc>
                <lastmod>${updated_at}</lastmod>
              </url>

            `;
        })
        .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
