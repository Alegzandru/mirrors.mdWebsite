import 'react-multi-carousel/lib/styles.css';

import Image from 'next/image';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';

import { getCurrency, getCurrencyString, getPrice, isRoDomain } from '../../utils/general';
import { CustomButtonGroupAsArrows2 } from './CustomButtonGroup';
import { useEffect, useState } from 'react';

export default function NewProducts(props) {

    const roDomain = isRoDomain()

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1367 },
          items: 3,
          slidesToSlide: 3,
          partialVisibilityGutter: 40
        },
        tablet: {
          breakpoint: { max: 1366, min: 769 },
          items: 2,
          slidesToSlide: 2,
          partialVisibilityGutter: 40
        },
        mobile: {
          breakpoint: { max: 768, min: 0 },
          items: 1,
          slidesToSlide: 1,
          partialVisibilityGutter: 100
        }
    };

    const [currency, setCurrency] = useState(4)

    useEffect(async() => {
      const currencyStrapi = await getCurrency()
      setCurrency(currencyStrapi)
    }, [])

    return(
        <div className="pt-20 pb-24 md:pb-60px md:pt-24 lg:pb-200px lg:pt-200px bg-ui-darkGrey font-Ubuntu">
            <h3 className="text-sm-h3 md:text-md-h3 lg:text-lg-h3 text-type-dark text-center mx-auto font-bold pb-8 md:pb-44px">
                {
                    props.lang == "ro" ? 
                    "Produse noi"
                    :
                    props.lang == "ru" ?
                    "Новые товары"
                    :
                    "New products"
                }
            </h3>

            <div className="w-full relative">
                <Carousel
                    swipeable={true}
                    ssr
                    partialVisibile
                    deviceType={props.deviceType}
                    itemClass="image-item"
                    responsive={responsive}
                    infinite
                    arrows={false}
                    focusOnSelect
                    centerMode={props.deviceType == "mobile" ? 0 : 1}
                    customButtonGroup={<CustomButtonGroupAsArrows2 />}
                    renderButtonGroupOutside
                    // style={{
                    //     height: "450px"
                    // }}
                >
                    {props.products.map((product, index) => {
                        return (
                            index < 15 &&
                            <Link href={
                              props.lang == "ro" ? 
                              `/produse/${product.slug}` 
                              : 
                              props.lang == "ru" ?
                              `/ru/produse/${product.slug}`
                              :
                              `/en/produse/${product.slug}`
                            }>
                                <a>
                                    <div key={index} className="h-auto w-full px-container-sm md:px-0">
                                        <div className="h-auto md:h-425px bg-ui-white rounded-xl md:ml-4 md:mr-0 p-5 border-2 border-transparent hover:border-accent-accent transition duration-300 group">
                                            <div className="w-auto h-245px relative transform group-hover:scale-105 transition duration-300 rounded-lg overflow-hidden">
                                                <Image
                                                    draggable={false}
                                                    src={product.image.length === 0 ? "/product/placeholder.png" : product.image[0].formats.medium.url}
                                                    layout="fill"
                                                    objectFit="cover"
                                                    alt={product.name}
                                                />
                                            </div>
                                            <div className="text-sm-card-name md:text-lg-card-name-bold text-type-dark mt-6 md:mt-8 font-medium">
                                                {
                                                    props.lang == "ro" ?
                                                    product.name
                                                    :
                                                    props.lang == "ru" ?
                                                    product.nameru
                                                    :
                                                    product.nameen
                                                }
                                            </div>
                                            <div className={`text-sm-p md:text-lg-p text-type-manatee font-normal mt-2 ${product.seria != null ? "block" : "hidden"}`}>
                                                {
                                                    props.lang == "ro" ?
                                                    `Seria ${product.seria}`
                                                    :
                                                    props.lang == "ru" ?
                                                    `Серия ${product.seria}`
                                                    :
                                                    `${product.seria} series`
                                                }
                                            </div>
                                            <div className="text-sm-button md:text-lg-17 text-accent-accent font-medium mt-4 md:mt-6"> 
                                                {
                                                    props.lang == "ro" ? 
                                                    "de la "
                                                    :
                                                    props.lang == "ru" ?
                                                    "от "
                                                    :
                                                    "from "
                                                }
                                                {
                                                  roDomain ?
                                                    currency === 4 ?
                                                      '...' :
                                                      Math.round( getPrice(product, product.defaultsize) * (1 + product.smallcoeficient) / currency) 
                                                    :
                                                    Math.round( getPrice(product, product.defaultsize) * (1 + product.smallcoeficient) )
                                                  } 
                                                {
                                                  getCurrencyString(props.lang, roDomain)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        );
                    })}
                </Carousel>
            </div>

            <Link href={
              props.lang == "ro" ? 
              "/oglinzi" 
              : 
              props.lang == "ru" ?
              "/ru/oglinzi"
              :
              "/en/oglinzi"
            }>
                <a>
                    <div className="hidden mx-auto md:mt-40px lg:mt-72px w-234px h-48px rounded-lg text-lg-button md:text-sm-button font-bold bg-accent-accent text-ui-white md:flex flex-row justify-center items-center  border-2 border-transparent hover:bg-accent-light transition duration-300">
                        {
                            props.lang == "ro" ? 
                            "Deschide Catalogul"
                            :
                            props.lang == "ru" ?
                            "Открыть каталог"
                            :
                            "Open catalog"
                        }
                    </div>
                </a>
            </Link>

            <div className="mx-container-sm">
                <Link href={
                  props.lang == "ro" ? 
                  "/oglinzi" 
                  : 
                  props.lang == "ru" ?
                  "/ru/oglinzi"
                  :
                  "/en/oglinzi"
                }>
                    <a>
                        <div className="text-sm-button mx-auto mt-12 w-full h-48px rounded-lg bg-accent-accent text-ui-white md:hidden flex flex-row justify-center items-center">
                            {
                                props.lang == "ro" ? 
                                "Află ce este în TREND"
                                :
                                props.lang == "ru" ?
                                "Узнайте, что в Тренде"
                                :
                                "Find out what is trending"
                            }
                        </div>
                    </a>
                </Link>
            </div>
        </div>
    )
}