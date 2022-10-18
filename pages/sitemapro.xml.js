const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const baseUrlRo = "https://onemillory.ro"

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
              <loc>${baseUrlRo}/${url}</loc>
              <lastmod>2021-08-15T19:27:48.340Z</lastmod>
            </url>
            <url>
              <loc>${baseUrlRo}/ru/${url}</loc>
              <lastmod>2021-08-15T19:27:48.340Z</lastmod>
            </url>
            <url>
              <loc>${baseUrlRo}/en/${url}</loc>
              <lastmod>2021-08-15T19:27:48.340Z</lastmod>
            </url>
          `
        }).join("")
      }
      ${products
        .map(({ slug, updated_at }) => {
          return `
              <url>
                <loc>${baseUrlRo}/produse/${slug}</loc>
                <lastmod>${updated_at}</lastmod>
              </url>
              <url>
                <loc>${baseUrlRo}/ru/produse/${slug}</loc>
                <lastmod>${updated_at}</lastmod>
              </url>
              <url>
                <loc>${baseUrlRo}/en/produse/${slug}</loc>
                <lastmod>${updated_at}</lastmod>
              </url>
            `;
        })
        .join("")}
      ${categories
        .map(({ slug, updated_at }) => {
          return `
              <url>
                <loc>${baseUrlRo}/${slug}</loc>
                <lastmod>${updated_at}</lastmod>
              </url>
              <url>
                <loc>${baseUrlRo}/ru/${slug}</loc>
                <lastmod>${updated_at}</lastmod>
              </url>
              <url>
                <loc>${baseUrlRo}/en/${slug}</loc>
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