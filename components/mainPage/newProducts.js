import 'swiper/css';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getCurrency, getCurrencyString, getPrice, isRoDomain } from '../../utils/general';
import { ButtonBack, ButtonNext } from './CustomButtonGroup';

export default function NewProducts(props) {

  const [currency, setCurrency] = useState(4)

  const roDomain = isRoDomain()
  const swiperRef = useRef();
  const prevSlide = () => swiperRef.current.slidePrev()
  const nextSlide = () => swiperRef.current.slideNext()

  useEffect(() => {
    const withCurrency = async () => {
      const currencyStrapi = await getCurrency()
      setCurrency(currencyStrapi)
    }

    withCurrency()
  }, [] )

  return(
    <div className="pt-20 pb-24 md:pb-60px md:pt-24 lg:pb-200px lg:pt-200px bg-ui-darkGrey font-Ubuntu">
      <div className="w-full flex justify-between items-center px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl pb-8 md:pb-44px">
        <ButtonBack prevSlide={prevSlide}/>
        <h3 className="text-sm-h3 md:text-md-h3 lg:text-lg-h3 text-type-dark text-center mx-auto font-bold">
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
        <ButtonNext nextSlide={nextSlide}/>
      </div>

      <div className="w-full relative">
        <Swiper
          spaceBetween={16}
          slidesPerView="auto"
          loop
          centeredSlides
          grabCursor
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {props.products.map((product, index) => {
            return (
              index < 15 &&
              <SwiperSlide key={index} className="product-card">
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
                            props.lang == "ro" ?
                            product.name
                            :
                            props.lang == "ru" ?
                            product.nameru
                            :
                            product.nameen
                          }
                        </div>
                        <div className={`text-sm-p md:text-lg-p text-type-manatee font-normal mt-2 ${product.seria != null ? "" : "opacity-0"}`}>
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
                              Math.round( getPrice(product, product.smallestsize) * (1 + product.smallcoeficient_ro) / currency) 
                            :
                            Math.round( getPrice(product, product.smallestsize) * (1 + product.smallcoeficient) )
                            } 
                          {
                            getCurrencyString(props.lang, roDomain)
                          }
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
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