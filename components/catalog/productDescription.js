import { useContext, useRef, useState, useEffect } from "react"
import Image from "next/image"
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import { DeviceTypeContext } from "../context";
import Link from "next/link"

export default function ProductDescription ({
  images, 
  name ,
  description, 
  productData, 
  lang, 
  nameru, 
  nameen, 
  descriptionru, 
  descriptionen
}) {    
  const {deviceType} = useContext(DeviceTypeContext)

  const maxRelated = deviceType === 'desktop' ? 4 : deviceType === 'tablet' ? 3 : 2

  const [page, setPage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(0)
  const imagesLightbox = images.map((image) => {
    return image.src
  })

  const [autoHeight, setAutoHeight] = useState(0)

  const [descriptionHeight, setDescriptionHeight] = useState(0);
  const descriptionRef = useRef(null);

  useEffect(() => {
    setDescriptionHeight(descriptionRef.current.clientHeight);
  }, []);

  const hasLongDescription = descriptionHeight > 239

  const toggleView = () => {
    setAutoHeight(!autoHeight)
  }

  const getColSpan = (index) => {
    switch(deviceType){
      case "mobile" : 
        return index % 3 == 0 ? "col-span-12" : "col-span-6"

      case "tablet" :
        return index % 5 <= 1 ? "col-span-6" : "col-span-4"

      case "desktop" :
        return index % 7 <= 2 ? "col-span-4" : "col-span-3"

      default :
        return index % 3 == 0 ? "col-span-12" : "col-span-6"
    }
  }

  const getColSpanRelated = () => {
    switch(deviceType){
      case "mobile" : 
        return "col-span-6"

      case "tablet" :
        return "col-span-4"

      case "desktop" :
        return "col-span-3"

      default :
        return "col-span-6"
    }
  }

  return (
    <div className="px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl font-Ubuntu bg-ui-darkGrey pb-92px md:pb-0">
      <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu:regular,bold&subset=Latin"/>
      <div className="flex flex-row justify-center items-center mb-60px">
        <div 
          className={`${page == 0 ? "text-accent-accent border-b-2 border-t-0 border-l-0 border-r-0 border-accent-accent" : "text-type-dark"} text-sm-p md:text-lg-17 mx-2 md:mx-8 h-12 flex flex-row justify-center items-center cursor-pointer`}
          onClick={() => setPage(0)}
        >
          {
            lang == "ro" ? 
            "Descriere"
            :
            lang == "ru" ?
            "Описание"
            :
            "Description"
          }
        </div>
        <div 
          className={`${page == 1 ? "text-accent-accent border-b-2 border-t-0 border-l-0 border-r-0 border-accent-accent" : "text-type-dark"} text-sm-p md:text-lg-17 mx-2 md:mx-8 h-12 flex flex-row justify-center items-center cursor-pointer`}
          onClick={() => setPage(1)}
        >
          {
            lang == "ro" ? 
            `Fotografii(${imagesLightbox.length})`
            :
            lang == "ru" ?
            `Фотографии(${imagesLightbox.length})`
            :
            `Photos(${imagesLightbox.length})`
          }
        </div>
      </div>

      <div className={`${page == 0 ? "block" : "hidden"} w-full lg:px-300px pb-60px`}>
        <h4 className="text-type-dark text-sm-h4 md:text-md-h4 lg:text-lg-h4 mb-10">
          {
            lang == "ro" ?
            name
            :
            lang == "ru" ?
            nameru
            :
            nameen
          }
        </h4>

        <pre 
          dangerouslySetInnerHTML={{ __html: lang == "ro" ? 
            description != null ? 
            description
            .replace(/{{{/g, `<img style="max-height: 400px; margin-right: auto; margin-left: auto;" src="`)
            .replace(/}}/g, '"/>')
            .replace(/&&&/g, '<b>').replace(/&&/g, '</b>')
            .replace(/###/g, '<i>').replace(/##/g, '</i>')
            .replace(/-#/g, "&#9679 ")
            : "<div/>"
          : 
            lang == "ru" ?
            descriptionru != null ? descriptionru
            .replace(/{{{/g, `<img style="max-height: 400px; margin-right: auto; margin-left: auto;" src="`)
            .replace(/}}/g, '"/>')
            .replace(/&&&/g, '<b>').replace(/&&/g, '</b>')
            .replace(/###/g, '<i>').replace(/##/g, '</i>')
            .replace(/-#/g, "&#9679 ")
            : "<div/>"
          :
            descriptionen != null ? descriptionen
            .replace(/{{{/g, `<img style="max-height: 400px; margin-right: auto; margin-left: auto;" src="`)
            .replace(/}}/g, '"/>')
            .replace(/&&&/g, '<b>').replace(/&&/g, '</b>')
            .replace(/###/g, '<i>').replace(/##/g, '</i>')
            .replace(/-#/g, "&#9679 ")
            : "<div/>"
          }}
          className={`font-Ubuntu md:text-md-p lg:text-lg-p text-type-manatee mb-11 w-full ${autoHeight ? "h-auto" : "max-h-240px"} overflow-y-hidden font-medium`}
          ref={descriptionRef}
        >
        </pre>

        {hasLongDescription && (
          <div
            className="text-accent-accent text-lg-p underline cursor-pointer"
            onClick={toggleView}
          >
            {
              lang == "ro" ? 
              `mai ${autoHeight ? "puține" : "multe"} detalii...`
              :
              lang == "ru" ?
              `${autoHeight ? "меньше деталей..." : "подробнее"}`
              :
              `${autoHeight ? "less" : "more"} details...`
            }
          </div>)}
      </div>

      <div className={`${page == 1 ? "block" : "hidden"} w-full pb-60px`}>
        <div className="grid grid-flow-row grid-cols-12 gap-2 md:gap-4">        
          {images.map((img, index)=>{
            return(
              <div 
                key={index} 
                className={`${getColSpan(deviceType, index)} pb-image-ratio lg:pb-lg-image-ratio relative cursor-pointer`}
                onClick={() => setLightboxOpen(1)}
              >
                <Image
                  src={img.src}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                  alt={name}
                />
              </div>
            )
          }
          )}
        </div>
        {
          lightboxOpen ? 
          <Lightbox doubleClickZoom={1.2} images={imagesLightbox} onClose={() => setLightboxOpen(0)}/>
          :
          ""
        }
      </div>

      {
        productData[0].related_products.length != 0 &&  
        <div className="w-full pt-40 pb-10">
          <div className="text-lg-32 text-type-dark font-medium mb-3">
            {
              lang == "ro" ? 
              "Produse similare"
              :
              lang == "ru" ?
              "Похожие товары"
              :
              "Similar products"
            }
          </div>
          <div className="w-full h-px bg-ui-blueishGrey mb-6"/>
          <div className="grid grid-flow-row grid-cols-12 gap-4 justify-start items-start">
            {productData[0].related_products.map((product, index) => {
              return (
                index < maxRelated &&
                <Link href={
                  lang == "ro" ? 
                  `/produse/${product.slug}` 
                  : 
                  lang == "ru" ?
                  `/ru/produse/${product.slug}`
                  :
                  `/en/produse/${product.slug}`
                }>
                 <a className={getColSpanRelated()}>
                    <div key={index} className="h-auto w-full">
                      <div className="bg-ui-white rounded-xl p-5 border-2 border-transparent hover:border-accent-accent transition duration-300 group">
                        <div className="w-auto pb-image-ratio lg:pb-lg-image-ratio relative transform group-hover:scale-105 transition duration-300 rounded-lg overflow-hidden">
                          <Image
                            draggable={false}
                            src={product.image.length === 0 ? "/product/placeholder.png" : product.image[0].url}
                            layout="fill"
                            objectFit="cover"
                            alt={product.name}
                          />
                        </div>
                        <div className="text-sm-card-name md:text-lg-card-name-bold text-type-dark mt-6 md:mt-8 font-medium">
                          {
                            lang == "ro" ?
                            product.name
                            :
                            lang == "ru" ?
                            product.nameru
                            :
                            product.nameen
                          }
                        </div>
                        <div className={`text-sm-p md:text-lg-p text-type-manatee font-normal mt-2 ${product.seria != null ? "" : "opacity-0"}`}>
                          {
                            lang == "ro" ?
                            `Seria ${product.seria}`
                            :
                            lang == "ru" ?
                            `Серия ${product.seria}`
                            :
                            `${product.seria} series`
                          }
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              )}
            )}
          </div>
        </div>
      }
    </div>
  )
}