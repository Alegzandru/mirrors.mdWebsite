import Head from "next/head"

export const HeadWithMeta = ({title, description, img, index}) => {
  return(
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      <meta name="description" content={description}/>
      <meta name="robots" content={index ? "index, follow" : "noindex"}/>

      <meta property="og:type" content="website"/>
      <meta property="og:title" content={title}/>
      <meta property="og:description" content={description}/>
      <meta property="og:image" content={img} />
      <meta property="og:url" content="PERMALINK"/>
      <meta property="og:site_name" content="Millory"/>

      <meta name="twitter:title" content={title}/>
      <meta name="twitter:description" content={description}/>
      <meta name="twitter:image" content={img}/>
      <meta name="facebook-domain-verification" content="9ecu31cg0nz2klaco1suixncxfsxq5" />
    </Head>
  )
}